
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { datasetId, fileUrl, fileType } = await req.json();
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log(`Processing dataset ${datasetId} with file type ${fileType}`);

    // Fetch the file content
    const fileResponse = await fetch(fileUrl);
    const fileContent = await fileResponse.text();
    
    // Parse the data based on file type
    let parsedData: any[] = [];
    let columns: string[] = [];
    
    if (fileType === 'csv') {
      const lines = fileContent.split('\n').filter(line => line.trim());
      if (lines.length > 0) {
        columns = lines[0].split(',').map(col => col.trim().replace(/"/g, ''));
        for (let i = 1; i < Math.min(lines.length, 1000); i++) { // Limit to first 1000 rows
          const values = lines[i].split(',').map(val => val.trim().replace(/"/g, ''));
          if (values.length === columns.length) {
            const row: any = {};
            columns.forEach((col, index) => {
              row[col] = values[index];
            });
            parsedData.push(row);
          }
        }
      }
    } else if (fileType === 'json') {
      parsedData = JSON.parse(fileContent);
      if (parsedData.length > 0) {
        columns = Object.keys(parsedData[0]);
      }
    }

    // Update dataset with column info and row count
    await supabase
      .from('datasets')
      .update({
        columns_info: columns.reduce((acc, col) => ({ ...acc, [col]: 'string' }), {}),
        row_count: parsedData.length,
        status: 'ready'
      })
      .eq('id', datasetId);

    // Generate AI insights
    const dataPreview = parsedData.slice(0, 10); // First 10 rows for analysis
    const prompt = `
      Analyze this dataset and provide comprehensive insights:
      
      Dataset Info:
      - Columns: ${columns.join(', ')}
      - Total Rows: ${parsedData.length}
      - File Type: ${fileType}
      
      Sample Data:
      ${JSON.stringify(dataPreview, null, 2)}
      
      Please provide insights in the following categories:
      1. Summary: Key statistics and overview
      2. Trends: Notable patterns or trends in the data
      3. Anomalies: Any unusual or outlier data points
      4. Recommendations: Actionable insights and suggestions
      
      Format your response as clear, actionable insights.
    `;

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a data analyst AI that provides clear, actionable insights from datasets.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 2000,
      }),
    });

    const aiResponse = await openAIResponse.json();
    const insights = aiResponse.choices[0].message.content;

    // Parse insights into categories
    const insightCategories = [
      { type: 'summary', title: 'Data Summary', content: insights },
      { type: 'trends', title: 'Key Trends', content: insights },
      { type: 'anomalies', title: 'Anomalies Detected', content: insights },
      { type: 'recommendations', title: 'Recommendations', content: insights }
    ];

    // Store insights in database
    for (const insight of insightCategories) {
      await supabase
        .from('insights')
        .insert({
          dataset_id: datasetId,
          user_id: (await supabase.auth.getUser()).data.user?.id,
          insight_type: insight.type,
          title: insight.title,
          content: insight.content,
          metadata: {
            columns: columns,
            rowCount: parsedData.length,
            generatedAt: new Date().toISOString()
          }
        });
    }

    console.log(`Successfully processed dataset ${datasetId}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Dataset processed successfully',
        insights: insightCategories.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing dataset:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
