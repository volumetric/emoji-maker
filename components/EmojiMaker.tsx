"use client";

import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Loader2, Download, Heart } from 'lucide-react';

const EmojiMaker = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedEmoji, setGeneratedEmoji] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateEmoji = async () => {
    setIsGenerating(true);
    // TODO: Implement the API call to generate the emoji
    // For now, we'll simulate a delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGeneratedEmoji('https://placeholder.com/150x150');
    setIsGenerating(false);
  };

  return (
    <Card className="p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Emoji Maker</h2>
      <div className="flex space-x-2 mb-4">
        <Input
          placeholder="Enter your prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button onClick={generateEmoji} disabled={isGenerating}>
          {isGenerating ? <Loader2 className="animate-spin" /> : 'Generate'}
        </Button>
      </div>
      <div className="relative w-32 h-32 mx-auto">
        {generatedEmoji ? (
          <>
            <img src={generatedEmoji} alt="Generated Emoji" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-50">
              <Button variant="ghost" size="icon">
                <Download className="h-6 w-6 text-white" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="h-6 w-6 text-white" />
              </Button>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
            {isGenerating ? <Loader2 className="animate-spin" /> : 'No emoji yet'}
          </div>
        )}
      </div>
    </Card>
  );
};

export default EmojiMaker;