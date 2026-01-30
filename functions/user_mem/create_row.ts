declare const Deno: {
  env: {
    get(key: string): string | undefined;
  };
};

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Import your existing functions (ensure these files export the functions)
import { queryGemini } from "./summary.js";
import { generateVector } from "./vector_embed.js";

// Supabase client (service role key for insert)
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

serve(async (req: Request) => {
  // 1️⃣ Authenticate the user (simplified - adjust based on your auth setup)
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) return new Response("Unauthorized", { status: 401 });

  const token = authHeader.replace("Bearer ", "");
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return new Response("Unauthorized", { status: 401 });
  }

  // 2️⃣ Parse the request
  const body = await req.json();
  const { messages } = body;

  if (!messages || !Array.isArray(messages)) {
    return new Response("Invalid request body", { status: 400 });
  }

  // 3️⃣ Combine messages into a single chunk
  const chunk = messages.join("\n");

  // 4️⃣ Send to Gemini for summary bullets
  const geminiResponse = await queryGemini("TODO", chunk);

  // 5️⃣ Split into clean bullet points
  const bullets = geminiResponse
    .split("\n")
    .map((b: string) => b.replace(/^[-•]\s*/, "").trim())
    .filter((b: string) => b.length > 0);

  if (bullets.length === 0) {
    return new Response("No bullets generated", { status: 500 });
  }

  // 6️⃣ Vectorize each bullet
  const rowsToInsert = await Promise.all(
    bullets.map(async (bullet: string) => {
      const vector = await generateVector(bullet);
      return {
        user_id: user.id,
        content: bullet,
        embedding: vector,
        created_at: new Date().toISOString(),
      };
    })
  );

  // 7️⃣ Insert into Supabase
  const { data, error } = await supabase
    .from("user_memories")
    .insert(rowsToInsert)
    .select();

  if (error) {
    console.error("Supabase insert error:", error);
    return new Response("Error inserting into database", { status: 500 });
  }

  return new Response(
    JSON.stringify({ inserted: data.length }),
    { headers: { "Content-Type": "application/json" } }
  );
});