import { NextResponse } from 'next/server';
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
});

// Debug flag
const DEBUG = true;

const debugLog = (...args: unknown[]) => {
  if (DEBUG) {
    console.log('%cDebug:', 'color: #bada55; font-weight: bold', ...args);
  }
};

export const runtime = 'edge'; // Optional: Use Edge Runtime
export const maxDuration = 300; // This sets the maximum duration to 300 seconds (5 minutes)

export async function POST(request: Request) {
  const { prompt } = await request.json();
  debugLog('Received prompt:', prompt);

  if (!prompt) {
    debugLog('Error: Prompt is required');
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
  }

  try {
    debugLog('Calling Replicate API with prompt:', prompt);

    const input = {
        prompt: "A TOK emoji of a " + prompt,
        apply_watermark: false
    };

    const output = await replicate.run("fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e", { input });
    console.log(output)

    if (Array.isArray(output) && output.length > 0) {
      debugLog('Successfully generated emoji URL:', output);
      return NextResponse.json({ emojiUrl: output });
    } else {
      debugLog('Error: Unexpected output format from Replicate API:', output);
      return NextResponse.json({ error: 'Unexpected output format from API' }, { status: 500 });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      debugLog('Error generating emoji:', error.message);
      return NextResponse.json({ error: 'Failed to generate emoji', details: error.message }, { status: 500 });
    } else {
      debugLog('Unknown error generating emoji');
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}