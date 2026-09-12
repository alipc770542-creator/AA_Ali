import React from 'react';
import { TabType, Language } from '../types';
import { PWAInstallButton } from './PWAInstallButton';
import {
  Sparkles,
  UserCheck,
  Image as ImageIcon,
  Clapperboard,
  ArrowRight,
  Play,
  ShieldCheck,
  Zap,
  Flame,
  Download,
  Share2,
  TrendingUp
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface HomeTabProps {
  onNavigate: (tab: TabType) => void;
  lang?: Language;
}

export const HomeTab: React.FC<HomeTabProps> = ({ onNavigate }) => {
  const handleStart = (targetTab: TabType) => {
    soundEngine.playPop();
    onNavigate(targetTab);
  };

  return (
    <div className="space-y-8 pb-12 animate-fadeIn text-slate-800">
      {/* Welcome Hero Card */}
      <div className="bg-gradient-to-br from-white via-purple-50/70 to-fuchsia-50 rounded-3xl p-6 sm:p-10 border border-purple-100 shadow-sm text-center relative overflow-hidden">
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-purple-200/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-fuchsia-200/40 rounded-full blur-2xl pointer-events-none" />

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold mb-3 border border-purple-200 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>Professional 2D Animation & Viral Shorts Studio</span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 font-brand mb-3 tracking-tight">
          Create & Go Viral with 2D Cartoons 👋
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed mb-8">
          Design consistent characters with <strong className="text-purple-700 font-bold">Face Lock</strong>, choose ready-made <strong className="text-purple-700 font-bold">AI 4K Backgrounds</strong>, direct live scenes, and optimize for <strong className="text-amber-600 font-bold">TikTok, Reels & Shorts</strong>!
        </p>

        {/* 4 Interactive Workflow Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {/* Step 1: Character */}
          <div
            onClick={() => handleStart('character')}
            className="group cursor-pointer bg-white p-5 rounded-2xl border-2 border-dashed border-purple-200 hover:border-purple-600 transition shadow-xs hover:shadow-md relative overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-black flex items-center justify-center text-xs">
                  1
                </span>
                <div className="p-2 rounded-xl bg-purple-50 text-purple-700 group-hover:scale-110 transition">
                  <UserCheck className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1 flex items-center justify-between">
                <span>Lock Character</span>
                <ArrowRight className="w-4 h-4 text-purple-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition" />
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Upload or select an avatar to lock identity and copy 6-angle consistency prompts.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-purple-700 font-bold">
              Face Lock & Prompts &rarr;
            </div>
          </div>

          {/* Step 2: AI Backgrounds */}
          <div
            onClick={() => handleStart('library')}
            className="group cursor-pointer bg-white p-5 rounded-2xl border-2 border-dashed border-purple-200 hover:border-purple-600 transition shadow-xs hover:shadow-md relative overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-black flex items-center justify-center text-xs">
                  2
                </span>
                <div className="p-2 rounded-xl bg-purple-50 text-purple-700 group-hover:scale-110 transition">
                  <ImageIcon className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1 flex items-center justify-between">
                <span>AI Backgrounds</span>
                <ArrowRight className="w-4 h-4 text-purple-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition" />
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Explore 4K castles, fantasy forests, cyber cities, and download ready-made visuals.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-purple-700 font-bold">
              Download & Select &rarr;
            </div>
          </div>

          {/* Step 3: Scene Director */}
          <div
            onClick={() => handleStart('scene')}
            className="group cursor-pointer bg-white p-5 rounded-2xl border-2 border-dashed border-purple-200 hover:border-purple-600 transition shadow-xs hover:shadow-md relative overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-black flex items-center justify-center text-xs">
                  3
                </span>
                <div className="p-2 rounded-xl bg-purple-50 text-purple-700 group-hover:scale-110 transition">
                  <Clapperboard className="w-5 h-5" />
                </div>
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1 flex items-center justify-between">
                <span>Direct Scene</span>
                <ArrowRight className="w-4 h-4 text-purple-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition" />
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Live 2D animation stage with speech bubbles, actions, and instant AI video prompts.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-purple-700 font-bold">
              Generate Prompts &rarr;
            </div>
          </div>

          {/* Step 4: Viral Launchpad */}
          <div
            onClick={() => handleStart('viral')}
            className="group cursor-pointer bg-gradient-to-b from-amber-50 to-white p-5 rounded-2xl border-2 border-dashed border-amber-300 hover:border-amber-500 transition shadow-xs hover:shadow-md relative overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs">
                  🚀
                </span>
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800 group-hover:scale-110 transition">
                  <Flame className="w-5 h-5 fill-amber-500 text-amber-500" />
                </div>
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1 flex items-center justify-between">
                <span>Go Viral</span>
                <ArrowRight className="w-4 h-4 text-amber-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition" />
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Trending hooks, 9:16 vertical framing, sound effects board, and 1-click social sharing.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-amber-200 text-[11px] text-amber-800 font-bold">
              Viral Templates & Sharing &rarr;
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            id="home-quick-start-btn"
            onClick={() => handleStart('character')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm md:text-base shadow-md transition active:scale-95 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Start Directing Your Cartoon</span>
          </button>

          <button
            id="home-viral-btn"
            onClick={() => handleStart('viral')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold text-sm md:text-base shadow-md transition active:scale-95 cursor-pointer"
          >
            <Flame className="w-4 h-4 fill-slate-950" />
            <span>Open Viral Studio 🚀</span>
          </button>

          <PWAInstallButton variant="primary" />
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-xs flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">High-Speed AI Prompts</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Optimized for Runway Gen-3, Kling AI, Luma Dream Machine, Sora, and Midjourney.
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-xs flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-purple-100 text-purple-800 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Face Lock Identity</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Maintain consistent character facial identity across all scene angles and animation keyframes.
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-xs flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Built-in Viral Mechanics</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Equipped with viral hooks, 9:16 vertical crop, soundboard triggers, and direct social distribution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
