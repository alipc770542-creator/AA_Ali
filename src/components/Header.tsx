import React, { useState } from 'react';
import { TabType, Language } from '../types';
import { PWAInstallButton } from './PWAInstallButton';
import {
  Volume2,
  VolumeX,
  Sparkles,
  Film,
  UserCheck,
  Image as ImageIcon,
  Clapperboard,
  Flame,
  Languages
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  lang: Language;
  onLangToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  lang,
  onLangToggle
}) => {
  const [soundOn, setSoundOn] = useState(true);

  const toggleSound = () => {
    const next = soundEngine.toggleSound();
    setSoundOn(next);
    if (next) {
      soundEngine.playPop();
    }
  };

  const handleTabClick = (tab: TabType) => {
    soundEngine.playPop();
    onTabChange(tab);
  };

  const isEn = lang === 'en';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-sm">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-800 via-purple-900 to-indigo-950 text-white px-4 py-3 sm:py-4 shadow-inner">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          {/* Sound & PWA utilities */}
          <div className="flex items-center gap-2">
            <button
              id="sound-toggle-btn"
              onClick={toggleSound}
              className={`p-2 rounded-xl transition cursor-pointer ${
                soundOn ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-red-500/30 text-red-200'
              }`}
              title={soundOn ? 'Mute Sound' : 'Unmute Sound'}
              aria-label="Toggle Sound"
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Language Switcher */}
            <button
              id="lang-toggle-btn"
              onClick={onLangToggle}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-purple-100 text-xs font-bold transition border border-white/15 cursor-pointer"
              title="Toggle Language (English / اردو)"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{isEn ? 'English' : 'اردو'}</span>
            </button>

            <PWAInstallButton variant="compact" />
          </div>

          {/* Central Title */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 justify-center">
              <span className="p-1 rounded-lg bg-amber-400 text-purple-950 shadow-xs">
                <Film className="w-5 h-5" />
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-wider uppercase font-brand drop-shadow-sm">
                DREAM MOVIE HUB
              </h1>
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse hidden sm:inline" />
            </div>
            <p className="text-xs sm:text-sm text-purple-200 mt-0.5 font-semibold">
              {isEn ? 'The Ultimate 2D Animation & Viral Cartoon Studio' : '2D Animation کا سب سے بڑا سٹوڈیو'}
            </p>
          </div>

          {/* Viral Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-xs text-amber-300 border border-amber-400/30">
            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold">Viral Mode ON</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="max-w-4xl mx-auto px-2 sm:px-4" aria-label="Tabs">
        <div className="flex justify-between items-center text-center divide-x divide-purple-100">
          <button
            id="tab-home"
            onClick={() => handleTabClick('home')}
            className={`flex-1 py-3 px-1.5 sm:px-3 text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 border-b-2 cursor-pointer ${
              activeTab === 'home'
                ? 'border-purple-700 text-purple-700 bg-purple-50/70'
                : 'border-transparent text-slate-600 hover:text-purple-600 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isEn ? 'Home' : 'ہوم'}</span>
          </button>

          <button
            id="tab-character"
            onClick={() => handleTabClick('character')}
            className={`flex-1 py-3 px-1.5 sm:px-3 text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 border-b-2 cursor-pointer ${
              activeTab === 'character'
                ? 'border-purple-700 text-purple-700 bg-purple-50/70'
                : 'border-transparent text-slate-600 hover:text-purple-600 hover:bg-slate-50'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>{isEn ? 'Character' : 'کردار'}</span>
          </button>

          <button
            id="tab-library"
            onClick={() => handleTabClick('library')}
            className={`flex-1 py-3 px-1.5 sm:px-3 text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 border-b-2 cursor-pointer ${
              activeTab === 'library'
                ? 'border-purple-700 text-purple-700 bg-purple-50/70'
                : 'border-transparent text-slate-600 hover:text-purple-600 hover:bg-slate-50'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>{isEn ? 'Library & AI BGs' : 'لائبریری'}</span>
          </button>

          <button
            id="tab-scene"
            onClick={() => handleTabClick('scene')}
            className={`flex-1 py-3 px-1.5 sm:px-3 text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 border-b-2 cursor-pointer ${
              activeTab === 'scene'
                ? 'border-purple-700 text-purple-700 bg-purple-50/70'
                : 'border-transparent text-slate-600 hover:text-purple-600 hover:bg-slate-50'
            }`}
          >
            <Clapperboard className="w-4 h-4" />
            <span>{isEn ? 'Scene Director' : 'سین بنائیں'}</span>
          </button>

          <button
            id="tab-viral"
            onClick={() => handleTabClick('viral')}
            className={`flex-1 py-3 px-1.5 sm:px-3 text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 border-b-2 cursor-pointer ${
              activeTab === 'viral'
                ? 'border-amber-500 text-amber-900 bg-amber-50'
                : 'border-transparent text-amber-700 hover:text-amber-800 hover:bg-amber-50/50'
            }`}
          >
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span className="font-extrabold">{isEn ? 'Viral Studio 🚀' : 'وائرل سٹوڈیو'}</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
