// pages/api/signup.js
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract email and any other form data
    const { email, marketing, timestamp, source } = req.body;

    // Basic validation
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Send data to Make webhook
    const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL;
    
    if (!makeWebhookUrl) {
      console.error('MAKE_WEBHOOK_URL is not defined in environment variables');
      // Still return success to the client as we don't want to break the signup flow
      return res.status(200).json({ 
        success: true, 
        message: 'Signup processed, but webhook notification failed due to missing configuration.'
      });
    }
    
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
        // You can add more fields here if needed by Make
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to send data to Make:', errorText);
      throw new Error(`Make webhook error: ${response.status} ${errorText}`);
    }

    return res.status(200).json({ success: true, message: 'Signup data sent to Make successfully' });
  } catch (error) {
    console.error('Signup webhook error:', error);
    return res.status(500).json({ error: 'Failed to send signup data to Make' });
  }
}