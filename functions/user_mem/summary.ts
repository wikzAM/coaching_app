// Editor-only Deno env shim for VS Code
declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

if (!GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY environment variable");
}

export async function queryGemini(prompt: string, content: string): Promise<string> {
    
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `
You will receive a chunk of user messages.
Summarize them into concise, atomic bullet points.
Each bullet point should be a single standalone memory.
Return ONLY bullet points separated by newlines.

${prompt}

MESSAGES:
${content}
                `.trim(),
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          topP: 0.9,
          maxOutputTokens: 512,
        },
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error: ${errText}`);
  }

  const json = await res.json();

  const text =
    json?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text || typeof text !== "string") {
    throw new Error("Invalid Gemini response format");
  }

  return text;
}
