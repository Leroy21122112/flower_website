// pages/api/signup.js
export default async function handler(req, res) {
  console.log('API called with method:', req.method);
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract data from request
    const { email, marketing, timestamp, source } = req.body;
    console.log('Received data:', { email, marketing, timestamp, source });

    // Basic validation
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Send data to Make webhook
    const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL;
    console.log('Webhook URL available:', !!makeWebhookUrl);
    
    if (!makeWebhookUrl) {
      console.error('MAKE_WEBHOOK_URL is not defined');
      return res.status(200).json({ 
        success: true, 
        message: 'Signup processed, but webhook notification failed due to missing configuration.'
      });
    }
    
    console.log('Sending to Make webhook...');
    
    const response = await fetch(makeWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        marketing: marketing || false,
        timestamp: timestamp || new Date().toISOString(),
        source: source || 'flower_website',
      }),
    });

    console.log('Make response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Make webhook error:', response.status, errorText);
      return res.status(500).json({ 
        error: 'Failed to send signup data to Make',
        details: `Make webhook error: ${response.status} ${errorText}`
      });
    }

    console.log('Successfully sent data to Make');
    return res.status(200).json({ 
      success: true, 
      message: 'Signup data sent to Make successfully' 
    });
  } catch (error) {
    console.error('Signup API error:', error);
    return res.status(500).json({ 
      error: 'Failed to send signup data to Make',
      details: error.message 
    });
  }
}