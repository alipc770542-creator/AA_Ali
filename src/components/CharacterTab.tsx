import React, { useState, useRef } from 'react';
import { POSE_PROMPTS, SAMPLE_FACES } from '../data/mockData';
import { PosePrompt, CharacterFace } from '../types';
import { Upload, Copy, Check, Sparkles, User, RefreshCw, Layers, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface CharacterTabProps {
  customFace: string | null;
  characterName: string;
  onFaceChange: (url: string | null, name: string) => void;
  onUseInScene: () => void;
  onToast: (text: string, type?: 'success' | 'info' | 'error') => void;
}

export const CharacterTab: React.FC<CharacterTabProps> = ({
  customFace,
  characterName,
  onFaceChange,
  onUseInScene,
  onToast,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [characterOutfit, setCharacterOutfit] = useState('red hoodie and blue jeans');
  const [selectedPosePreview, setSelectedPosePreview] = useState<PosePrompt>(POSE_PROMPTS[0]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        onFaceChange(url, characterName || 'Cartoon Hero');
        soundEngine.playMagic();
        onToast('Face locked successfully! Now copy angle prompts.', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSampleFace = (face: CharacterFace) => {
    onFaceChange(face.imageUrl, face.name);
    soundEngine.playPop();
    onToast(`Character "${face.name}" selected!`, 'info');
  };

  const handleCopyPrompt = (pose: PosePrompt) => {
    const customizedPrompt = characterOutfit
      ? `${pose.promptEn}, wearing ${characterOutfit}`
      : pose.promptEn;

    navigator.clipboard.writeText(customizedPrompt).then(() => {
      setCopiedId(pose.id);
      soundEngine.playMagic();
      onToast(`Copied prompt: ${pose.titleEn || pose.title}!`, 'success');
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleCopyRaw = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      soundEngine.playMagic();
      onToast(`Prompt copied for ${label}!`, 'success');
    });
  };

  return (
    <div className="space-y-8 pb-12 animate-fadeIn text-slate-800">
      {/* 1. Face Lock Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-purple-700 text-white font-black flex items-center justify-center text-sm shadow-xs">
              1
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-brand">
              Lock Character Face
            </h3>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-purple-50 text-purple-700 rounded-full border border-purple-100">
            Consistent 2D Character Identity
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Upload Area */}
          <div className="lg:col-span-7">
            <input
              type="file"
              id="faceUpload"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              htmlFor="faceUpload"
              id="face-upload-dropzone"
              className="group cursor-pointer border-2 border-dashed border-purple-400 hover:border-purple-600 bg-purple-50/40 hover:bg-purple-50 rounded-2xl p-8 sm:p-10 flex flex-col items-center justify-center text-center transition shadow-xs hover:shadow-md"
            >
              <div className="w-16 h-16 rounded-full bg-purple-100 group-hover:bg-purple-200 text-purple-700 flex items-center justify-center mb-3 transition group-hover:scale-105">
                <Upload className="w-8 h-8" />
              </div>
              <p className="text-base sm:text-lg font-bold text-slate-800 mb-1">
                Click or Drop Image to Lock Face
              </p>
              <p className="text-xs text-slate-500">
                Upload any JPG, PNG or WebP photo — auto-converts to 2D animation character reference
              </p>
            </label>

            {/* Ready-made sample face avatars */}
            <div className="mt-4">
              <span className="text-xs font-bold text-slate-600 mb-2 block">
                Or pick a ready-made animated hero avatar:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {SAMPLE_FACES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handleSelectSampleFace(sample)}
                    className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-slate-100 hover:bg-purple-100 border border-slate-200 hover:border-purple-300 text-xs font-semibold text-slate-700 transition cursor-pointer"
                  >
                    <img
                      src={sample.imageUrl}
                      alt={sample.name}
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full object-cover border border-purple-300"
                    />
                    <span>{sample.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Locked Face Preview Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-purple-50/70 to-fuchsia-50/70 rounded-2xl p-6 border border-purple-200 text-center">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900 mb-3">
              Locked Character Preview
            </h4>

            {customFace ? (
              <div className="space-y-4">
                <div className="relative inline-block">
                  <img
                    id="facePreview"
                    src={customFace}
                    alt="Locked Face"
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-purple-600 shadow-lg mx-auto ring-4 ring-purple-200"
                  />
                  <span className="absolute bottom-1 right-1 p-1.5 rounded-full bg-emerald-500 text-white shadow-sm" title="Face Locked">
                    <Sparkles className="w-3.5 h-3.5" />
                  </span>
                </div>

                <div>
                  <input
                    type="text"
                    value={characterName}
                    onChange={(e) => onFaceChange(customFace, e.target.value)}
                    placeholder="Enter character name (e.g. Leo / Spark)"
                    className="w-full text-center px-3 py-2 bg-white border border-purple-200 rounded-lg text-sm font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      onFaceChange(null, '');
                      soundEngine.playPop();
                      onToast('Character face reset', 'info');
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition cursor-pointer"
                  >
                    Change Face
                  </button>
                  <button
                    onClick={() => {
                      soundEngine.playPop();
                      onUseInScene();
                    }}
                    className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 shadow-sm transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>Use in Scene</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-6 flex flex-col items-center justify-center text-slate-400">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-purple-300 flex items-center justify-center mb-3 bg-white">
                  <User className="w-10 h-10 text-purple-300" />
                </div>
                <p className="text-xs text-slate-500">
                  No face uploaded yet. Upload a photo or select an avatar to lock character.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. 6 Consistent Camera Angles & Pose Prompts */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 mb-6 gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-purple-700 text-white font-black flex items-center justify-center text-sm shadow-xs">
              2
            </span>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-brand">
                Copy 6-Angle Consistency Prompts
              </h3>
              <p className="text-xs text-slate-500">
                Click any camera angle to copy AI prompts for Midjourney, Runway, Kling, or Leonardo
              </p>
            </div>
          </div>

          {/* Quick Buttons row */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => handleCopyRaw('same face, front view, 2D cartoon, full body, white bg', 'Front View')}
              className="px-3 py-1.5 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold transition cursor-pointer"
            >
              Front
            </button>
            <button
              onClick={() => handleCopyRaw('same face, right side view, 2D cartoon, full body, white bg', 'Right Side')}
              className="px-3 py-1.5 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold transition cursor-pointer"
            >
              Right
            </button>
            <button
              onClick={() => handleCopyRaw('same face, left side view, 2D cartoon, full body, white bg', 'Left Side')}
              className="px-3 py-1.5 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold transition cursor-pointer"
            >
              Left
            </button>
            <button
              onClick={() => handleCopyRaw('same face, back view, 2D cartoon, full body, white bg', 'Back View')}
              className="px-3 py-1.5 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold transition cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={() => handleCopyRaw('same face, 3/4 isometric dynamic view, 2D cartoon, full body, white bg', '3/4 Angle')}
              className="px-3 py-1.5 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-bold transition cursor-pointer"
            >
              3/4 Angle
            </button>
            <button
              onClick={() => handleCopyRaw('same face, fierce heroic emotion expression, close up headshot, 2D cartoon, white bg', 'Heroic Expression')}
              className="px-3 py-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 text-xs font-bold transition cursor-pointer"
            >
              Heroic Look
            </button>
          </div>
        </div>

        {/* Outfit Customizer Field */}
        <div className="mb-6 p-4 rounded-2xl bg-purple-50/50 border border-purple-100 flex flex-col sm:flex-row items-center gap-3">
          <span className="text-xs font-bold text-purple-900 shrink-0 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-purple-700" />
            Add Custom Outfit & Clothing:
          </span>
          <input
            type="text"
            value={characterOutfit}
            onChange={(e) => setCharacterOutfit(e.target.value)}
            placeholder="e.g. red hoodie and blue jeans / futuristic armor / superhero cape"
            className="flex-1 w-full bg-white border border-purple-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Pose Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {POSE_PROMPTS.map((pose) => {
            const isCopied = copiedId === pose.id;
            const fullPrompt = characterOutfit
              ? `${pose.promptEn}, wearing ${characterOutfit}`
              : pose.promptEn;

            return (
              <div
                key={pose.id}
                onClick={() => setSelectedPosePreview(pose)}
                className={`group rounded-2xl p-5 border transition-all relative flex flex-col justify-between cursor-pointer ${
                  selectedPosePreview.id === pose.id
                    ? 'border-purple-600 bg-purple-50/40 shadow-sm ring-2 ring-purple-200'
                    : 'border-slate-200 bg-white hover:border-purple-300 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 font-brand">
                      {pose.titleEn || pose.title}
                    </span>
                    <span className="text-[11px] text-slate-400 capitalize">
                      {pose.category}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-base mb-1">
                    {pose.titleEn || pose.title}
                  </h4>
                  <p className="text-xs text-slate-500 mb-3">
                    {pose.description || pose.promptUrdu}
                  </p>

                  <div className="bg-slate-900 text-slate-200 p-3 rounded-xl font-mono text-[11px] leading-relaxed mb-4 break-words select-all line-clamp-3">
                    {fullPrompt}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    id={`copy-pose-${pose.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyPrompt(pose);
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-purple-700 hover:bg-purple-800 text-white shadow-xs'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
