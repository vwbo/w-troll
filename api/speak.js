const FISH_TTS_URL = "https://api.fish.audio/v1/tts";
const MAX_CHARS = 500;

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "POST only" });
    return;
  }

  const apiKey = (process.env.FISH_API_KEY || "").trim();
  if (!apiKey) {
    res.status(502).json({ error: "voice: Fish Audio not configured. Set FISH_API_KEY" });
    return;
  }

  const text = typeof req.body?.text === "string" ? req.body.text.trim() : "";
  if (!text) {
    res.status(400).json({ error: "validation: text must not be empty" });
    return;
  }
  if (text.length > MAX_CHARS) {
    res.status(400).json({
      error: "validation: text exceeds 500 characters (tags and new lines included)",
    });
    return;
  }

  const voiceId = (
    (typeof req.body?.reference_id === "string" && req.body.reference_id) ||
    process.env.FISH_VOICE_ID ||
    ""
  ).trim();
  const model = process.env.FISH_MODEL || "s2.1-pro-free";
  const payload = { text, format: "mp3" };
  if (voiceId) payload.reference_id = voiceId;

  let response;
  try {
    response = await fetch(FISH_TTS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        model,
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    res.status(502).json({ error: `Fish Audio request failed: ${err.message}` });
    return;
  }

  if (!response.ok) {
    const detail = (await response.text()).slice(0, 300);
    res.status(502).json({ error: `Fish Audio error ${response.status}: ${detail}` });
    return;
  }

  const audio = Buffer.from(await response.arrayBuffer());
  if (!audio.length) {
    res.status(502).json({ error: "Fish Audio returned an empty audio body" });
    return;
  }

  res.setHeader("Content-Type", "audio/mpeg");
  res.setHeader("Cache-Control", "no-store");
  res.status(200).send(audio);
};
