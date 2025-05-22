// pages/api/signup.js
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract data from request
    const { email, marketing, timestamp, source } = req.body;

    // Basic validation
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Send data to Make webhook
    const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL;
    
    if (!makeWebhookUrl) {
      console.error('MAKE_WEBHOOK_URL is not defined in environment variables');
      return res.status(200).json({ 
        success: true, 
        message: 'Signup processed, but webhook notification failed due to missing configuration.'
      });
    }
    
    console.log('Sending to Make webhook:', makeWebhookUrl);
    
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Make webhook error:', response.status, errorText);
      throw new Error(`Make webhook error: ${response.status} ${errorText}`);
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