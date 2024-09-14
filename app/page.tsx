import EmojiMaker from '../components/EmojiMaker';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Emoji Generator</h1>
        <div className="flex justify-center mb-12">
          <EmojiMaker />
        </div>
        <h2 className="text-2xl font-semibold mb-4">Generated Emojis</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {/* TODO: Replace with actual generated emojis */}
          {[...Array(12)].map((_, index) => (
            <div key={index} className="relative w-full pt-[100%]">
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Emoji {index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
