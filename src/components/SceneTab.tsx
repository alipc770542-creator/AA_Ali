import React, { useState, useEffect, useRef } from 'react';
import { BackgroundItem, AnimalCharacter } from '../types';
import { QUICK_ACTIONS_EN } from '../data/mockData';
import { soundEngine } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Play,
  Pause,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  Clapperboard,
  Volume2,
  VolumeX,
  Download,
  Share2,
  Film,
  Camera,
  MessageSquare,
  Sun,
  Moon,
  Smartphone,
  Flame,
  ArrowRight
} from 'lucide-react';

interface SceneTabProps {
  selectedBG: BackgroundItem;
  selectedAnimal: AnimalCharacter | null;
  customFace: string | null;
  characterName: string;
  onToast: (text: string, type?: 'success' | 'info' | 'error') => void;
  onGoToViral?: () => void;
}

export const SceneTab: React.FC<SceneTabProps> = ({
  selectedBG,
  selectedAnimal,
  customFace,
  characterName,
  onToast,
  onGoToViral
}) => {
  const [actionText, setActionText] = useState('Sprinting at full speed chasing a golden feather');
  const [dialogueText, setDialogueText] = useState('Hold on tight! The grand adventure begins now!');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isNightMode, setIsNightMode] = useState(selectedBG.id === 'ai-night');
  const [soundActive, setSoundActive] = useState(true);
  const [charPositionX, setCharPositionX] = useState(50);
  const [charDirection, setCharDirection] = useState<'left' | 'right'>('right');
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [activePlatform, setActivePlatform] = useState<'runway' | 'kling' | 'sora' | 'midjourney'>('runway');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16' | '1:1'>('16:9');

  const animFrameRef = useRef<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Active character details
  const activeCharName = selectedAnimal ? selectedAnimal.name : (characterName || 'Hero Character');
  const activeCharPromptSnippet = selectedAnimal
    ? selectedAnimal.promptSnippet
    : `consistent 2D cartoon hero character (${characterName || 'main protagonist'}), expressive face, vibrant outfit, clean line art model sheet`;

  // Animation loop for stage
  useEffect(() => {
    let pos = 45;
    let dir: 'left' | 'right' = 'right';

    const animate = () => {
      if (isPlaying) {
        const lowerAction = actionText.toLowerCase();
        if (lowerAction.includes('sprint') || lowerAction.includes('run') || lowerAction.includes('hop') || lowerAction.includes('walk') || lowerAction.includes('chase')) {
          pos += dir === 'right' ? 0.6 : -0.6;
          if (pos > 76) {
            dir = 'left';
            setCharDirection('left');
          } else if (pos < 22) {
            dir = 'right';
            setCharDirection('right');
          }
          setCharPositionX(pos);
        }
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, actionText]);

  // Generate the AI video prompt
  const generatePromptString = (action: string, platform: string) => {
    const bgKeywords = selectedBG.artKeywords;
    const moodLighting = isNightMode
      ? 'magical nighttime atmospheric lighting, deep purple and navy glowing ambient, sparkling star reflections'
      : 'bright cheerful morning daylight, soft stylized cartoon shadows, rich saturated color grading';

    let base = `2D hand-drawn cartoon animation, Disney and Studio Ghibli 2D storybook style, ${activeCharPromptSnippet} is actively ${action || 'moving dynamically'}, situated inside ${selectedBG.name} (${bgKeywords}), ${moodLighting}, 60 fps, buttery smooth keyframed motion, crisp clean vector lines, expressive acting, cinematic camera composition`;

    if (platform === 'runway') {
      return `${base} --camera smooth cinematic track --motion 6 --upscale`;
    } else if (platform === 'kling') {
      return `${base}, high quality 2D animation, dynamic character movement, vivid colors, best quality, ultra-smooth keyframes`;
    } else if (platform === 'sora') {
      return `Cinematic 2D animated sequence: ${activeCharPromptSnippet} in ${selectedBG.name}, performing action: "${action}". Fluid 2D animation with painterly background aesthetics, high frame rate, expressive character acting`;
    } else {
      return `${base} --ar ${aspectRatio === '9:16' ? '9:16' : aspectRatio === '1:1' ? '1:1' : '16:9'} --style raw --v 6.1`;
    }
  };

  const handleMakeVideo = () => {
    soundEngine.playClapper();
    setTimeout(() => {
      soundEngine.playMagic();
    }, 250);

    // Fire celebratory confetti
    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#673AB7', '#9C27B0', '#FFD700', '#00E676', '#FF5722']
      });
    } catch {
      // ignore
    }

    const action = actionText.trim() || 'moving dynamically';
    const finalPrompt = generatePromptString(action, activePlatform);
    setGeneratedPrompt(finalPrompt);
    setShowPromptModal(true);
    setIsPlaying(true);

    if (soundActive) {
      soundEngine.playSpeechBlip();
    }

    onToast('🎬 Scene directed! Ready-to-use AI Video Prompt generated below.', 'success');
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt).then(() => {
      setCopiedPrompt(true);
      soundEngine.playMagic();
      onToast('AI Video Prompt copied! Paste directly into Runway, Kling, or Sora.', 'success');
      setTimeout(() => setCopiedPrompt(false), 2500);
    });
  };

  const toggleSound = () => {
    const next = soundEngine.toggleSound();
    setSoundActive(next);
  };

  const handleDownloadSnapshot = () => {
    soundEngine.playTada();
    // Create an offscreen canvas to paint the background and character snapshot
    const canvas = document.createElement('canvas');
    const width = aspectRatio === '9:16' ? 720 : 1280;
    const height = aspectRatio === '9:16' ? 1280 : aspectRatio === '1:1' ? 1280 : 720;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      if (isNightMode) {
        gradient.addColorStop(0, '#0f172a');
        gradient.addColorStop(1, '#3b0764');
      } else {
        gradient.addColorStop(0, '#e0f2fe');
        gradient.addColorStop(1, '#a7f3d0');
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Title & watermark
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`DREAM MOVIE HUB - ${selectedBG.name}`, width / 2, 70);

      ctx.fillStyle = '#fef08a';
      ctx.font = '24px sans-serif';
      ctx.fillText(`${activeCharName}: "${dialogueText}"`, width / 2, height - 60);

      // Trigger download
      const link = document.createElement('a');
      link.download = `scene-snapshot-${selectedBG.id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      onToast('Downloaded scene snapshot frame!', 'success');
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-fadeIn text-slate-800">
      {/* Visual Animated Preview Canvas (Stage) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm">
        <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-4 mb-6 gap-3">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-purple-700 text-white shadow-xs">
              <Film className="w-6 h-6" />
            </span>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-brand">
                2D Interactive Live Stage
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Direct character motion, speech bubble dialogues, and lighting in real-time
              </p>
            </div>
          </div>

          {/* Controls Bar on top of stage */}
          <div className="flex items-center gap-2">
            {/* Aspect Ratio Switcher */}
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => {
                  setAspectRatio('16:9');
                  soundEngine.playPop();
                }}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                  aspectRatio === '16:9' ? 'bg-purple-700 text-white' : 'text-slate-600 hover:text-purple-700'
                }`}
                title="16:9 Widescreen (YouTube & Film)"
              >
                16:9
              </button>
              <button
                onClick={() => {
                  setAspectRatio('9:16');
                  soundEngine.playPop();
                  onToast('9:16 Vertical TikTok / Reels format activated!', 'info');
                }}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition flex items-center gap-1 ${
                  aspectRatio === '9:16' ? 'bg-purple-700 text-white' : 'text-slate-600 hover:text-purple-700'
                }`}
                title="9:16 Vertical (TikTok, Reels, Shorts)"
              >
                <Smartphone className="w-3 h-3" />
                <span>9:16</span>
              </button>
              <button
                onClick={() => {
                  setAspectRatio('1:1');
                  soundEngine.playPop();
                }}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${
                  aspectRatio === '1:1' ? 'bg-purple-700 text-white' : 'text-slate-600 hover:text-purple-700'
                }`}
                title="1:1 Square (Instagram Feed)"
              >
                1:1
              </button>
            </div>

            <button
              onClick={() => setIsNightMode(!isNightMode)}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition text-xs font-bold flex items-center gap-1"
              title={isNightMode ? 'Switch to Daylight' : 'Switch to Night'}
            >
              {isNightMode ? <Moon className="w-4 h-4 text-purple-600" /> : <Sun className="w-4 h-4 text-amber-500" />}
              <span className="hidden sm:inline">{isNightMode ? 'Night' : 'Day'}</span>
            </button>

            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border transition text-xs font-bold flex items-center gap-1 ${
                soundActive ? 'border-purple-300 text-purple-700 bg-purple-50' : 'border-slate-200 text-slate-400'
              }`}
              title="Toggle Sound Effects"
            >
              {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                setIsPlaying(!isPlaying);
                soundEngine.playPop();
              }}
              className="px-3.5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <button
              onClick={handleDownloadSnapshot}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition"
              title="Download Snapshot Poster"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* The 2D Interactive Stage Container (#preview) */}
        <div className="flex justify-center">
          <div
            ref={stageRef}
            id="preview"
            className={`rounded-3xl relative overflow-hidden shadow-xl border-4 border-purple-200 transition-all duration-500 select-none ${
              aspectRatio === '9:16'
                ? 'w-full max-w-sm h-[480px] sm:h-[540px]'
                : aspectRatio === '1:1'
                ? 'w-full max-w-md h-[360px] sm:h-[420px]'
                : 'w-full h-80 sm:h-[420px]'
            }`}
          >
            {/* Background Visual Image or Atmospheric Layer */}
            {selectedBG.imageUrl ? (
              <div className="absolute inset-0 z-0">
                <img
                  src={selectedBG.imageUrl}
                  alt={selectedBG.name}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isNightMode ? 'filter brightness-60 hue-rotate-30 saturate-150' : 'filter brightness-100'
                  }`}
                />
                <div
                  className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                    isNightMode
                      ? 'bg-gradient-to-t from-indigo-950/80 via-purple-950/40 to-slate-950/60'
                      : 'bg-gradient-to-t from-black/30 via-transparent to-black/10'
                  }`}
                />
              </div>
            ) : (
              <div
                className={`absolute inset-0 transition-colors duration-700 ${
                  isNightMode
                    ? 'bg-gradient-to-b from-slate-950 via-indigo-950 to-purple-950'
                    : `bg-gradient-to-b ${selectedBG.gradient}`
                }`}
              />
            )}

            {/* Stage Lighting Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
              {/* Sun or Moon */}
              {isNightMode ? (
                <div className="absolute top-6 left-8 w-14 h-14 rounded-full bg-amber-100/90 shadow-[0_0_35px_rgba(255,235,59,0.5)] flex items-center justify-center text-2xl">
                  🌙
                </div>
              ) : (
                <div className="absolute top-6 left-8 w-14 h-14 rounded-full bg-yellow-300 shadow-[0_0_35px_rgba(255,193,7,0.8)] animate-pulse flex items-center justify-center text-2xl">
                  ☀️
                </div>
              )}

              {/* Decorative floating emojis */}
              <div className="absolute top-10 right-10 flex gap-4 opacity-70 text-2xl animate-float">
                {selectedBG.decorations?.slice(0, 3).map((item, idx) => (
                  <span key={idx} className="filter drop-shadow-md">{item}</span>
                ))}
              </div>
            </div>

            {/* Character on Stage */}
            <div
              style={{
                left: `${charPositionX}%`,
                transform: `translateX(-50%) ${charDirection === 'left' ? 'scaleX(-1)' : 'scaleX(1)'}`,
                bottom: '36px',
              }}
              className={`absolute transition-all duration-75 ease-linear cursor-pointer z-30 flex flex-col items-center ${
                isPlaying && (actionText.includes('sprint') || actionText.includes('run') || actionText.includes('chase'))
                  ? 'animate-bounce-short'
                  : isPlaying && actionText.includes('jump')
                  ? 'animate-bounce'
                  : isPlaying && actionText.includes('dance')
                  ? 'animate-wiggle'
                  : ''
              }`}
              onClick={() => {
                soundEngine.playBoing();
                onToast(`${activeCharName}: "${actionText}"`, 'info');
              }}
            >
              {/* Speech Bubble */}
              {dialogueText && (
                <div
                  style={{ transform: charDirection === 'left' ? 'scaleX(-1)' : 'scaleX(1)' }}
                  className="mb-2 bg-white/95 text-slate-900 px-3.5 py-1.5 rounded-2xl shadow-xl border border-purple-200 text-xs font-bold max-w-[210px] text-center relative animate-fade-in"
                >
                  <span>{dialogueText}</span>
                  <div className="w-2.5 h-2.5 bg-white border-r border-b border-purple-200 rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
                </div>
              )}

              {/* Character Graphic */}
              {customFace ? (
                <div className="relative group">
                  <img
                    src={customFace}
                    alt={characterName || 'Avatar'}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-white shadow-2xl ring-2 ring-purple-500"
                  />
                  {/* Cute animated body */}
                  <div className="w-12 h-14 bg-gradient-to-b from-purple-600 to-indigo-700 rounded-t-xl mx-auto -mt-2 shadow-md flex items-center justify-center text-[10px] text-white font-bold">
                    ★
                  </div>
                  <div className="flex justify-center gap-2 -mt-0.5">
                    <div className="w-3 h-5 bg-indigo-900 rounded-b-md" />
                    <div className="w-3 h-5 bg-indigo-900 rounded-b-md" />
                  </div>
                </div>
              ) : selectedAnimal ? (
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/40 backdrop-blur-xs flex items-center justify-center text-6xl sm:text-7xl filter drop-shadow-2xl hover:scale-105 transition">
                    {selectedAnimal.emoji}
                  </div>
                  <span
                    style={{ transform: charDirection === 'left' ? 'scaleX(-1)' : 'scaleX(1)' }}
                    className="px-2.5 py-0.5 mt-1 bg-black/70 text-white rounded-full text-[10px] font-bold shadow-md"
                  >
                    {selectedAnimal.name}
                  </span>
                </div>
              ) : (
                <div className="text-6xl filter drop-shadow-lg animate-bounce">
                  🦸
                </div>
              )}
            </div>

            {/* Stage Watermark / Live Badge */}
            <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[10px] font-bold">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>2D LIVE {aspectRatio}</span>
            </div>

            {/* Selected Status Overlay */}
            <div className="absolute bottom-3 left-3 z-20 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-xl text-xs font-medium">
              <span>Scene: </span>
              <span id="selBG" className="text-amber-300 font-bold">{selectedBG.name}</span>
              <span> + </span>
              <span id="selChar" className="text-emerald-300 font-bold">{activeCharName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action, Dialogue & Video Generation Controls */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-xl bg-purple-100 text-purple-700">
              <Clapperboard className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Direct Scene Action & Dialogue
              </h3>
              <p className="text-xs text-slate-500">
                Describe the movement and lines, then click Generate Video Prompt
              </p>
            </div>
          </div>

          {onGoToViral && (
            <button
              onClick={onGoToViral}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs shadow-sm hover:opacity-90 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5 fill-slate-950" />
              <span>Go Viral Pack (TikTok & Reels)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Action input */}
        <div className="space-y-2">
          <label htmlFor="action" className="block text-xs font-bold text-slate-700">
            Character Action / Movement:
          </label>
          <div className="relative">
            <input
              type="text"
              id="action"
              value={actionText}
              onChange={(e) => setActionText(e.target.value)}
              placeholder="e.g. Sprinting at full speed chasing a golden feather"
              className="w-full px-4 py-3 bg-slate-50 border-2 border-purple-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
            />
          </div>

          {/* Quick action preset chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-xs text-slate-400 self-center mr-1">Quick presets:</span>
            {QUICK_ACTIONS_EN.map((action, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setActionText(action);
                  soundEngine.playPop();
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  actionText === action
                    ? 'bg-purple-700 text-white'
                    : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
                }`}
              >
                {action}
              </button>
            ))}
          </div>
        </div>

        {/* Dialogue input (speech bubble) */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-purple-600" />
            <span>Spoken Dialogue (Character Speech Bubble):</span>
          </label>
          <input
            type="text"
            value={dialogueText}
            onChange={(e) => setDialogueText(e.target.value)}
            placeholder="What does the character say? e.g. Hold on tight! Adventure begins!"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        {/* Big "🎬 Create AI Video" Button */}
        <button
          id="make-video-btn"
          onClick={handleMakeVideo}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-700 via-fuchsia-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-black text-base sm:text-lg shadow-lg hover:shadow-xl transition transform active:scale-98 flex items-center justify-center gap-3 cursor-pointer"
        >
          <Film className="w-5 h-5 animate-pulse" />
          <span>🎬 Generate AI Video Prompt</span>
          <Sparkles className="w-5 h-5 text-amber-300" />
        </button>
      </div>

      {/* Generated AI Prompt Output Box */}
      {showPromptModal && (
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-purple-500/40 shadow-2xl space-y-5 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-purple-600 text-white shadow-xs">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </span>
              <div>
                <h4 className="text-lg font-bold font-brand text-amber-300">
                  Ready-to-Render AI Video Prompt
                </h4>
                <p className="text-xs text-slate-400">
                  Paste into Runway Gen-3, Kling AI, Luma Dream Machine, Sora, or Midjourney
                </p>
              </div>
            </div>

            {/* Platform switcher pills */}
            <div className="flex flex-wrap gap-1 bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => {
                  setActivePlatform('runway');
                  setGeneratedPrompt(generatePromptString(actionText, 'runway'));
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  activePlatform === 'runway' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Runway Gen-3
              </button>
              <button
                onClick={() => {
                  setActivePlatform('kling');
                  setGeneratedPrompt(generatePromptString(actionText, 'kling'));
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  activePlatform === 'kling' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Kling AI
              </button>
              <button
                onClick={() => {
                  setActivePlatform('sora');
                  setGeneratedPrompt(generatePromptString(actionText, 'sora'));
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  activePlatform === 'sora' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                OpenAI Sora
              </button>
              <button
                onClick={() => {
                  setActivePlatform('midjourney');
                  setGeneratedPrompt(generatePromptString(actionText, 'midjourney'));
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  activePlatform === 'midjourney' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Midjourney
              </button>
            </div>
          </div>

          {/* Prompt Code Block */}
          <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 font-mono text-xs sm:text-sm text-emerald-400 leading-relaxed break-words select-all">
            {generatedPrompt}
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="text-xs text-slate-400">
              Character: <strong className="text-white">{activeCharName}</strong> | Background: <strong className="text-white">{selectedBG.name}</strong> | Action: <strong className="text-white">{actionText}</strong>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="copy-final-prompt-btn"
                onClick={handleCopyPrompt}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition flex items-center gap-2 cursor-pointer ${
                  copiedPrompt
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md'
                }`}
              >
                {copiedPrompt ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Prompt Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Prompt (1-Click)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
