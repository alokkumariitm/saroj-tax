export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ reply: "API Key not configured on Vercel." });
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `You are S4 Assistant, an AI helper for Saroj Tax Consultancy. Help users professionally with tax, ITR, GST, and business queries. User query: ${message}` }]
        }]
      })
    });

    const data = await response.json();

    // Check if the API returned an error structure
    if (data.error) {
      return res.status(500).json({ reply: `Gemini Error: ${data.error.message}` });
    }

    // Safely extract the text response
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that.";

    return res.status(200).json({ reply });
  } catch (error) {
    return res.status(500).json({ reply: "Internal server error connecting to Gemini." });
  }
}