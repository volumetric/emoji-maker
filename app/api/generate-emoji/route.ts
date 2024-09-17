import { NextResponse } from 'next/server';
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
});

// Debug flag
const DEBUG = true;

const debugLog = (...args: any[]) => {
  if (DEBUG) {
    console.log('%cDebug:', 'color: #bada55; font-weight: bold', ...args);
  }
};

export async function POST(request: Request) {
  const { prompt } = await request.json();
  debugLog('Received prompt:', prompt);

  if (!prompt) {
    debugLog('Error: Prompt is required');
    return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
  }

  try {
    debugLog('Calling Replicate API with prompt:', prompt);
    // const output = await replicate.run(
    //   "fofr/sdxl-emoji:d830ba5dabf8090ec0db6c10fc862c6eb1c929e1a194a5411852d25fd954ac82",
    //   {
    //     input: {
    //       prompt: prompt,
    //       width: 1024,
    //       height: 1024,
    //       num_outputs: 1,
    //       scheduler: "K_EULER",
    //       num_inference_steps: 50,
    //       guidance_scale: 7.5,
    //       prompt_strength: 0.8,
    //       refine: "no_refiner",
    //       high_noise_frac: 0.8,
    //       apply_watermark: false,
    //     }
    //   }
    // );

    // debugLog('Replicate API output:', output);

    // const model = await replicate.models.get("fofr/sdxl-emoji");
    // model.predict(text="python")

    const replicate = new Replicate();

    const input = {
        prompt: "A TOK emoji of a " + prompt,
        apply_watermark: false
    };

    const output = await replicate.run("fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e", { input });
    console.log(output)
    //=> ["https://replicate.delivery/pbxt/a3z81v5vwlKfLq1H5uBqpVm...

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