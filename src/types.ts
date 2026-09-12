export type Language = 'en' | 'ur';

export type TabType = 'home' | 'character' | 'library' | 'scene' | 'viral';

export interface CharacterFace {
  id: string;
  name: string;
  nameUrdu: string;
  imageUrl: string;
  description: string;
  descriptionUrdu: string;
}

export interface PosePrompt {
  id: string;
  title: string;
  titleEn?: string;
  titleUrdu: string;
  category: 'pose' | 'expression' | 'action';
  promptEn: string;
  promptUrdu: string;
  iconName: string;
  description?: string;
}

export interface BackgroundItem {
  id: string;
  name: string;
  nameUrdu: string;
  emoji: string;
  category: 'fantasy' | 'nature' | 'urban' | 'cyber' | 'interior' | 'cosmic';
  imageUrl: string;
  gradient: string;
  artKeywords: string;
  description: string;
  descriptionUrdu: string;
  resolution: string;
  aiPrompt: string;
  isAiGenerated?: boolean;
  decorations?: string[];
}

export interface AnimalCharacter {
  id: string;
  name: string;
  nameUrdu: string;
  emoji: string;
  species: string;
  personality: string;
  personalityUrdu: string;
  defaultAction: string;
  defaultActionUrdu: string;
  promptSnippet: string;
}

export interface SceneConfig {
  selectedBG: BackgroundItem;
  selectedChar: {
    type: 'animal' | 'customFace';
    name: string;
    nameUrdu: string;
    imageUrl?: string;
    emoji?: string;
    promptSnippet: string;
  };
  action: string;
  actionUrdu: string;
  dialogue: string;
  dialogueUrdu: string;
  cameraMovement: 'static' | 'pan-left' | 'pan-right' | 'zoom-in' | 'dramatic';
  lighting: 'day' | 'golden-hour' | 'night' | 'sunset';
  artStyle: 'classic-2d' | 'disney-2d' | 'vector-flat' | 'anime-chibi' | 'ghibli-watercolor';
  aspectRatio: '16:9' | '9:16' | '1:1';
  isPlaying: boolean;
  generatedPromptEn: string;
}

export interface ViralTemplate {
  id: string;
  title: string;
  badge: string;
  hook: string;
  hookUrdu: string;
  dialogue: string;
  soundEffect: string;
  action: string;
  bgId: string;
  hashtags: string[];
}
