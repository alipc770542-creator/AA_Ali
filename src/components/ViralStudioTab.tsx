import React, { useState } from 'react';
import { BackgroundItem, AnimalCharacter, ViralTemplate } from '../types';
import { VIRAL_TEMPLATES, BACKGROUNDS } from '../data/mockData';
import { soundEngine } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Share2,
  Copy,
  Check,
  TrendingUp,
  Flame,
  Music,
  Video,
  ExternalLink,
  MessageCircle,
  Hash,
  Play,
  Volume2,
  Smartphone
} from 'lucide-react';

interface ViralStudioTabProps {
  selectedBG: BackgroundItem;
  selectedAnimal: AnimalCharacter | null;
  customFace: string | null;
  characterName: string;
  onApplyTemplate: (template: ViralTemplate) => void;
  onGoToScene: () => void;
  onToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const ViralStudioTab: React.FC<ViralStudioTabProps> = ({
  selectedBG,
  selectedAnimal,
  customFace,
  characterName,
  onApplyTemplate,
  onGoToScene,
  onToast
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<ViralTemplate>(VIRAL_TEMPLATES[0]);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '16:9' | '1:1'>('9:16');
  const [customCaption, setCustomCaption] = useState(
    'Wait till the very end! 😂 What would you do in this situation? Made with Dream Movie Hub #2DAnimation #ViralCartoon #Shorts'
  );

  const characterDisplayName = selectedAnimal ? selectedAnimal.name : (characterName || 'Hero Character');

  const handleSoundPlay = (soundName: string) => {
    if (soundName === 'Boing & Whoosh') {
      soundEngine.playBoing();
      setTimeout(() => soundEngine.playWhoosh(), 200);
    } else if (soundName === 'Suspense Stinger') {
      soundEngine.playSuspense();
    } else if (soundName === 'Magic & Tada') {
      soundEngine.playMagic();
      setTimeout(() => soundEngine.playTada(), 300);
    } else {
      soundEngine.playMagic();
    }
  };

  const handleCopy = (text: string, sectionId: string, toastMessage: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedSection(sectionId);
      soundEngine.playMagic();
      onToast(toastMessage, 'success');
      setTimeout(() => setCopiedSection(null), 2500);
    });
  };

  const handleNativeShare = async () => {
    soundEngine.playTada();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore
    }

    const shareData = {
      title: 'Dream Movie Hub - Viral 2D Animation',
      text: `${selectedTemplate.hook}\n\n🎬 Created with Dream Movie Hub 2D Animation Studio!\n${selectedTemplate.hashtags.join(' ')}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        onToast('Shared successfully!', 'success');
      } catch {
        // user cancelled
      }
    } else {
      handleCopy(
        `${shareData.text}\n${shareData.url}`,
        'native-share',
        'Share text and link copied to clipboard!'
      );
    }
  };

  const handleShareToPlatform = (platform: 'tiktok' | 'reels' | 'shorts' | 'whatsapp' | 'twitter') => {
    soundEngine.playPop();
    const shareText = encodeURIComponent(
      `${selectedTemplate.hook}\n\nCheck out this 2D Animation created on Dream Movie Hub!\n${selectedTemplate.hashtags.join(' ')}`
    );
    const url = encodeURIComponent(window.location.href);

    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${shareText}%20${url}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${url}`, '_blank');
    } else if (platform === 'tiktok') {
      handleCopy(
        `${selectedTemplate.hook} ${selectedTemplate.hashtags.join(' ')}`,
        'tiktok',
        'TikTok Caption & Hashtags copied! Open TikTok and paste.'
      );
    } else if (platform === 'reels') {
      handleCopy(
        `${selectedTemplate.hook} ${selectedTemplate.hashtags.join(' ')}`,
        'reels',
        'Instagram Reels Caption & Hashtags copied! Open Instagram and paste.'
      );
    } else if (platform === 'shorts') {
      handleCopy(
        `${selectedTemplate.hook} ${selectedTemplate.hashtags.join(' ')}`,
        'shorts',
        'YouTube Shorts Title & Tags copied! Open YouTube Studio and paste.'
      );
    }
  };

  const handleSelectAndApply = (template: ViralTemplate) => {
    setSelectedTemplate(template);
    handleSoundPlay(template.soundEffect);
    onApplyTemplate(template);
    onToast(`Applied Viral Template: "${template.title}"`, 'info');
  };

  return (
    <div className="space-y-8 pb-12 animate-fadeIn text-slate-800">
      {/* Hero Banner for Going Viral */}
      <div className="bg-gradient-to-r from-purple-800 via-fuchsia-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute -top-16 -right-16 w-60 h-60 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold mb-3 border border-white/15">
            <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>Go Viral on TikTok, Reels & YouTube Shorts</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-2">
            Viral 2D Animation Launchpad 🚀
          </h2>
          <p className="text-purple-100 text-sm sm:text-base leading-relaxed mb-6">
            Turn your 2D animation clips into viral sensations! Use proven viral hooks, vertical 9:16 framing, trending hashtags, and instant 1-click social sharing.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleNativeShare}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm shadow-md transition flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Share2 className="w-4 h-4" />
              <span>Share App & Go Viral</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playPop();
                onGoToScene();
              }}
              className="px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm border border-white/20 transition flex items-center gap-2 cursor-pointer"
            >
              <Video className="w-4 h-4" />
              <span>Open Scene Director</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Templates + Aspect Ratio & Social Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Viral Templates */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-purple-100 text-purple-700">
                  <TrendingUp className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    Trending 2D Animation Hooks
                  </h3>
                  <p className="text-xs text-slate-500">
                    Pre-tested high-engagement scenarios for maximum watch time
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3.5">
              {VIRAL_TEMPLATES.map((tmpl) => {
                const isSelected = selectedTemplate.id === tmpl.id;
                return (
                  <div
                    key={tmpl.id}
                    onClick={() => handleSelectAndApply(tmpl)}
                    className={`group cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50/50 shadow-sm ring-2 ring-purple-200'
                        : 'border-slate-200 bg-white hover:border-purple-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                          {tmpl.badge}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                          {tmpl.title}
                        </h4>
                      </div>
                      <span className="text-[11px] text-purple-700 font-semibold flex items-center gap-1">
                        <Volume2 className="w-3.5 h-3.5" />
                        {tmpl.soundEffect}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-100 mb-3 font-medium">
                      &ldquo;{tmpl.hook}&rdquo;
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                        <span>Dialogue:</span>
                        <span className="font-semibold text-slate-700 italic">
                          &ldquo;{tmpl.dialogue}&rdquo;
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectAndApply(tmpl);
                          onGoToScene();
                        }}
                        className="px-3 py-1 rounded-lg bg-purple-700 text-white font-bold hover:bg-purple-800 transition flex items-center gap-1"
                      >
                        <span>Direct Scene</span>
                        <Play className="w-3 h-3 fill-white" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Viral Soundboard */}
          <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="p-2 rounded-xl bg-fuchsia-100 text-fuchsia-700">
                <Music className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Cartoon Viral Soundboard</h3>
                <p className="text-xs text-slate-500">Trigger playful sound effects used in top viral animations</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <button
                onClick={() => soundEngine.playBoing()}
                className="p-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center gap-2 border border-purple-200 transition active:scale-95"
              >
                <span>🔊 Boing Jump</span>
              </button>
              <button
                onClick={() => soundEngine.playWhoosh()}
                className="p-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center gap-2 border border-purple-200 transition active:scale-95"
              >
                <span>💨 Speed Whoosh</span>
              </button>
              <button
                onClick={() => soundEngine.playSuspense()}
                className="p-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center gap-2 border border-purple-200 transition active:scale-95"
              >
                <span>⚡ Dun-Dun-Dun!</span>
              </button>
              <button
                onClick={() => soundEngine.playMagic()}
                className="p-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center gap-2 border border-purple-200 transition active:scale-95"
              >
                <span>✨ Magic Chime</span>
              </button>
              <button
                onClick={() => soundEngine.playTada()}
                className="p-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center gap-2 border border-purple-200 transition active:scale-95"
              >
                <span>🎉 Tada Fanfare</span>
              </button>
              <button
                onClick={() => soundEngine.playClapper()}
                className="p-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center gap-2 border border-purple-200 transition active:scale-95"
              >
                <span>🎬 Action Clapper</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Social Distribution & Hashtags */}
        <div className="lg:col-span-5 space-y-6">
          {/* Format / Aspect Ratio Card */}
          <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-purple-600" />
              <span>Video Aspect Ratio (For Socials)</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Switch stage format to match your targeted platform
            </p>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  setAspectRatio('9:16');
                  soundEngine.playPop();
                  onToast('Set format to 9:16 Vertical (TikTok / Reels / Shorts)', 'info');
                }}
                className={`p-3 rounded-xl border text-center transition ${
                  aspectRatio === '9:16'
                    ? 'border-purple-600 bg-purple-50 text-purple-800 font-bold ring-2 ring-purple-200'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs font-bold">9:16</div>
                <div className="text-[10px] text-slate-500">TikTok / Reels</div>
              </button>

              <button
                onClick={() => {
                  setAspectRatio('16:9');
                  soundEngine.playPop();
                  onToast('Set format to 16:9 Widescreen (YouTube)', 'info');
                }}
                className={`p-3 rounded-xl border text-center transition ${
                  aspectRatio === '16:9'
                    ? 'border-purple-600 bg-purple-50 text-purple-800 font-bold ring-2 ring-purple-200'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs font-bold">16:9</div>
                <div className="text-[10px] text-slate-500">YouTube / TV</div>
              </button>

              <button
                onClick={() => {
                  setAspectRatio('1:1');
                  soundEngine.playPop();
                  onToast('Set format to 1:1 Square (Instagram Feed)', 'info');
                }}
                className={`p-3 rounded-xl border text-center transition ${
                  aspectRatio === '1:1'
                    ? 'border-purple-600 bg-purple-50 text-purple-800 font-bold ring-2 ring-purple-200'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="text-xs font-bold">1:1</div>
                <div className="text-[10px] text-slate-500">Square Post</div>
              </button>
            </div>
          </div>

          {/* Viral Hashtags & Caption Generator */}
          <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                <Hash className="w-4 h-4 text-purple-600" />
                <span>Viral Caption & Hashtags</span>
              </h3>
              <button
                onClick={() =>
                  handleCopy(
                    `${selectedTemplate.hook}\n\n${selectedTemplate.hashtags.join(' ')}`,
                    'hashtags',
                    'Caption & Hashtags copied!'
                  )
                }
                className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1"
              >
                {copiedSection === 'hashtags' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy All</span>
              </button>
            </div>

            <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl text-xs font-mono leading-relaxed select-all">
              <p className="text-amber-300 font-bold mb-2">&ldquo;{selectedTemplate.hook}&rdquo;</p>
              <p className="text-emerald-400">{selectedTemplate.hashtags.join(' ')}</p>
            </div>

            {/* Platform Quick Share Buttons */}
            <div>
              <span className="text-xs font-bold text-slate-700 mb-2 block">
                1-Click Social Publish & Share:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleShareToPlatform('tiktok')}
                  className="p-2.5 rounded-xl bg-black text-white hover:bg-slate-800 text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  <span>🎵 TikTok</span>
                </button>
                <button
                  onClick={() => handleShareToPlatform('reels')}
                  className="p-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:opacity-90 text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  <span>📸 Instagram</span>
                </button>
                <button
                  onClick={() => handleShareToPlatform('shorts')}
                  className="p-2.5 rounded-xl bg-red-600 text-white hover:bg-red-700 text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  <span>▶️ YT Shorts</span>
                </button>
                <button
                  onClick={() => handleShareToPlatform('whatsapp')}
                  className="p-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  <span>💬 WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

          {/* Pro Tips for Viral Cartoon Content */}
          <div className="bg-purple-50 rounded-2xl p-5 border border-purple-200">
            <h4 className="font-bold text-purple-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>3 Golden Rules to Go Viral</span>
            </h4>
            <ul className="text-xs text-purple-950/80 space-y-2 list-disc list-inside leading-relaxed">
              <li>
                <strong>The 3-Second Rule</strong>: Put the character in mid-action or deliver a shocking dialogue in the first 3 seconds.
              </li>
              <li>
                <strong>Loop Seamlessly</strong>: Make the character end near where they started so viewers re-watch the clip.
              </li>
              <li>
                <strong>Use Ready-Made 4K Backgrounds</strong>: High-resolution vibrant backgrounds increase viewer retention by 45%.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
