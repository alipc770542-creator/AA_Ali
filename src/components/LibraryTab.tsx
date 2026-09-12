import React, { useState } from 'react';
import { BACKGROUNDS, ANIMALS } from '../data/mockData';
import { BackgroundItem, AnimalCharacter } from '../types';
import {
  Check,
  ArrowRight,
  Sparkles,
  Image as ImageIcon,
  Heart,
  Download,
  Copy,
  Wand2,
  SlidersHorizontal,
  Layers,
  Search
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface LibraryTabProps {
  selectedBG: BackgroundItem;
  selectedAnimal: AnimalCharacter | null;
  onSelectBG: (bg: BackgroundItem) => void;
  onSelectAnimal: (animal: AnimalCharacter) => void;
  onGoToScene: () => void;
  onToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const LibraryTab: React.FC<LibraryTabProps> = ({
  selectedBG,
  selectedAnimal,
  onSelectBG,
  onSelectAnimal,
  onGoToScene,
  onToast,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedBgId, setCopiedBgId] = useState<string | null>(null);

  // Custom AI Background generator state
  const [customStyle, setCustomStyle] = useState('Studio Ghibli 2D Anime');
  const [customEnvironment, setCustomEnvironment] = useState('Enchanted Floating Islands');
  const [customLighting, setCustomLighting] = useState('Golden Hour Sunset');
  const [generatedAiBgPrompt, setGeneratedAiBgPrompt] = useState('');

  const categories = [
    { id: 'all', label: 'All Backgrounds' },
    { id: 'ai', label: '✨ AI Generated (4K)' },
    { id: 'fantasy', label: '🏰 Fantasy' },
    { id: 'nature', label: '🌿 Nature' },
    { id: 'cyber', label: '🏙️ Cyber & Urban' },
    { id: 'interior', label: '🛋️ Interior' },
    { id: 'cosmic', label: '🌌 Cosmic Night' }
  ];

  const filteredBGs = BACKGROUNDS.filter((bg) => {
    const matchesCategory =
      activeCategory === 'all'
        ? true
        : activeCategory === 'ai'
        ? bg.isAiGenerated
        : bg.category === activeCategory;

    const matchesSearch =
      bg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bg.artKeywords.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleBGClick = (bg: BackgroundItem) => {
    soundEngine.playPop();
    onSelectBG(bg);
    onToast(`Background selected: ${bg.name}`, 'info');
  };

  const handleAnimalClick = (animal: AnimalCharacter) => {
    soundEngine.playPop();
    onSelectAnimal(animal);
    onToast(`Character selected: ${animal.name}`, 'info');
  };

  const handleDownloadBg = (e: React.MouseEvent, bg: BackgroundItem) => {
    e.stopPropagation();
    soundEngine.playMagic();

    // Trigger instant download or open high-res image
    const link = document.createElement('a');
    link.href = bg.imageUrl;
    link.download = `${bg.id}-2d-animation-background.jpg`;
    link.target = '_blank';
    link.rel = 'noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onToast(`Downloading "${bg.name}" background!`, 'success');
  };

  const handleCopyBgPrompt = (e: React.MouseEvent, bg: BackgroundItem) => {
    e.stopPropagation();
    navigator.clipboard.writeText(bg.aiPrompt).then(() => {
      setCopiedBgId(bg.id);
      soundEngine.playMagic();
      onToast(`AI Prompt copied for: ${bg.name}!`, 'success');
      setTimeout(() => setCopiedBgId(null), 2000);
    });
  };

  const handleGenerateCustomBgPrompt = () => {
    soundEngine.playMagic();
    const prompt = `Vibrant 2D cartoon animation background of ${customEnvironment}, ${customLighting}, ${customStyle} aesthetic, Disney and anime inspired vector scenery, clean art lines, vivid saturated palette, wide panoramic shot --ar 16:9 --v 6.1`;
    setGeneratedAiBgPrompt(prompt);
    onToast('Generated Custom AI Background Prompt!', 'success');
  };

  return (
    <div className="space-y-8 pb-12 animate-fadeIn text-slate-800">
      {/* Background Library Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-5 mb-6 gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-purple-100 text-purple-700">
              <ImageIcon className="w-6 h-6" />
            </span>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-brand">
                Ready-Made 2D Background Library
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Explore AI-crafted 4K backgrounds and download them directly for your animation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-purple-800 bg-purple-50 px-3.5 py-1.5 rounded-full font-bold border border-purple-200">
              Active: {selectedBG.name} {selectedBG.emoji}
            </span>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  soundEngine.playPop();
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-purple-50 text-slate-600 hover:text-purple-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search backgrounds..."
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Background Visual Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBGs.map((bg) => {
            const isSelected = selectedBG.id === bg.id;
            const isCopied = copiedBgId === bg.id;

            return (
              <div
                key={bg.id}
                id={`bg-card-${bg.id}`}
                onClick={() => handleBGClick(bg)}
                className={`group cursor-pointer rounded-2xl border transition-all duration-200 relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'border-purple-700 bg-purple-50/60 shadow-lg ring-2 ring-purple-300'
                    : 'border-slate-200 bg-white hover:border-purple-300 hover:shadow-md'
                }`}
              >
                {/* Visual Image Preview */}
                <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-100">
                  <img
                    src={bg.imageUrl}
                    alt={bg.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

                  {/* Badges */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    {bg.isAiGenerated && (
                      <span className="px-2 py-0.5 rounded-md bg-purple-700/90 backdrop-blur-xs text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-xs">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        <span>AI 4K</span>
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold">
                      {bg.resolution}
                    </span>
                  </div>

                  {isSelected && (
                    <span className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-md">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}

                  {/* Bottom Image Overlay text */}
                  <div className="absolute bottom-2.5 left-3 right-3 text-white pointer-events-none">
                    <div className="flex items-center gap-1 text-sm font-black drop-shadow-md">
                      <span>{bg.emoji}</span>
                      <span>{bg.name}</span>
                    </div>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {bg.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={(e) => handleDownloadBg(e, bg)}
                      className="flex-1 py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-purple-100 text-slate-700 hover:text-purple-800 text-xs font-bold transition flex items-center justify-center gap-1.5"
                      title="Download full resolution background image"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>

                    <button
                      onClick={(e) => handleCopyBgPrompt(e, bg)}
                      className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200'
                      }`}
                      title="Copy Midjourney/Runway prompt for this background"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Copied!' : 'Copy Prompt'}</span>
                    </button>

                    <button
                      onClick={() => handleBGClick(bg)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition ${
                        isSelected
                          ? 'bg-purple-700 text-white'
                          : 'bg-slate-900 hover:bg-purple-800 text-white'
                      }`}
                    >
                      {isSelected ? 'Active' : 'Select'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Background Generator Studio Box */}
      <div className="bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 rounded-3xl p-6 sm:p-8 border border-purple-200 shadow-sm">
        <div className="flex items-center gap-2.5 mb-4">
          <span className="p-2 rounded-xl bg-purple-700 text-white">
            <Wand2 className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              AI Background Prompt Studio
            </h3>
            <p className="text-xs text-slate-500">
              Mix and match animation styles to generate new custom 2D background prompts
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Animation Art Style
            </label>
            <select
              value={customStyle}
              onChange={(e) => setCustomStyle(e.target.value)}
              className="w-full bg-white border border-purple-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
            >
              <option value="Studio Ghibli 2D Anime">Studio Ghibli 2D Anime</option>
              <option value="Disney Classic 2D Storybook">Disney Classic 2D Storybook</option>
              <option value="Makoto Shinkai Vivid Anime">Makoto Shinkai Vivid Anime</option>
              <option value="Clean Cyber Vector Flat">Clean Cyber Vector Flat</option>
              <option value="90s Nostalgic Cartoon Series">90s Nostalgic Cartoon Series</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Environment / Scenery
            </label>
            <select
              value={customEnvironment}
              onChange={(e) => setCustomEnvironment(e.target.value)}
              className="w-full bg-white border border-purple-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
            >
              <option value="Enchanted Floating Sky Castle">Enchanted Floating Sky Castle</option>
              <option value="Secret Ancient Temple Ruins">Secret Ancient Temple Ruins</option>
              <option value="Cozy Rainy Lofi Coffee Shop">Cozy Rainy Lofi Coffee Shop</option>
              <option value="Neon Cyberpunk Alley Market">Neon Cyberpunk Alley Market</option>
              <option value="Crystal Ocean Lagoon & Coral Reef">Crystal Ocean Lagoon & Coral Reef</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Lighting & Atmosphere
            </label>
            <select
              value={customLighting}
              onChange={(e) => setCustomLighting(e.target.value)}
              className="w-full bg-white border border-purple-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
            >
              <option value="Golden Hour Sunset with Warm Rays">Golden Hour Sunset</option>
              <option value="Magical Midnight with Starry Glow">Magical Midnight</option>
              <option value="Crisp Sunny Daylight with Fluffy Clouds">Sunny Daylight</option>
              <option value="Neon Night with Glowing Holograms">Neon Cyber Night</option>
              <option value="Dreamy Foggy Dawn with Dewdrops">Foggy Dawn</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleGenerateCustomBgPrompt}
            className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-sm transition flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Generate AI Background Prompt</span>
          </button>
        </div>

        {generatedAiBgPrompt && (
          <div className="mt-4 p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed select-all space-y-2">
            <p className="text-emerald-400 font-bold">✨ Generated Prompt:</p>
            <p>{generatedAiBgPrompt}</p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(generatedAiBgPrompt);
                soundEngine.playMagic();
                onToast('Prompt copied to clipboard!', 'success');
              }}
              className="mt-2 px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Prompt</span>
            </button>
          </div>
        )}
      </div>

      {/* Characters & Animals Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-100 text-purple-700">
              <Heart className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Cartoon Animals & Character Roster
              </h3>
              <p className="text-xs text-slate-500">
                Select a ready-to-animate animal hero or your custom locked face
              </p>
            </div>
          </div>

          <span className="text-xs text-purple-700 bg-purple-50 px-3 py-1 rounded-full font-bold border border-purple-200">
            {selectedAnimal ? `Selected: ${selectedAnimal.name} ${selectedAnimal.emoji}` : 'Custom Face'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {ANIMALS.map((animal) => {
            const isSelected = selectedAnimal?.id === animal.id;
            return (
              <div
                key={animal.id}
                id={`animal-card-${animal.id}`}
                onClick={() => handleAnimalClick(animal)}
                className={`group cursor-pointer rounded-2xl p-4 text-center transition-all duration-200 relative overflow-hidden flex flex-col items-center justify-between min-h-[150px] ${
                  isSelected
                    ? 'bg-gradient-to-b from-purple-50 to-purple-100 border-2 border-purple-700 shadow-md ring-2 ring-purple-300'
                    : 'bg-slate-50 hover:bg-white border border-slate-200 hover:border-purple-300 hover:shadow-sm'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-purple-700 text-white flex items-center justify-center shadow-xs">
                    <Check className="w-3 h-3" />
                  </span>
                )}

                <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-4xl shadow-xs group-hover:scale-110 transition duration-300 mb-2">
                  {animal.emoji}
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {animal.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 line-clamp-1">
                    {animal.personality}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Bottom Action Banner */}
      <div className="bg-gradient-to-r from-purple-800 via-indigo-900 to-purple-900 text-white rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-white/10 rounded-xl">
            <Sparkles className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <h4 className="font-bold text-base">
              Background: <span className="text-amber-300 font-black">{selectedBG.name}</span> + Character: <span className="text-emerald-300 font-black">{selectedAnimal?.name || 'Custom Face'}</span>
            </h4>
            <p className="text-xs text-purple-200">
              Both are loaded into the 2D stage. Ready to direct and animate!
            </p>
          </div>
        </div>

        <button
          id="library-goto-scene-btn"
          onClick={() => {
            soundEngine.playPop();
            onGoToScene();
          }}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Open Scene Director</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
