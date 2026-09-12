import { BackgroundItem, AnimalCharacter, PosePrompt, CharacterFace, ViralTemplate } from '../types';
import castleImg from '../assets/images/cartoon_castle_bg_1789220799611.jpg';
import forestImg from '../assets/images/enchanted_forest_bg_1789220814740.jpg';
import cyberImg from '../assets/images/cyber_cartoon_city_1789220830859.jpg';
import nightImg from '../assets/images/magical_night_bg_1789220844593.jpg';

export const BACKGROUNDS: BackgroundItem[] = [
  {
    id: 'ai-castle',
    name: 'Royal Fairytale Castle',
    nameUrdu: 'شاہی پری محل (AI)',
    emoji: '🏰',
    category: 'fantasy',
    imageUrl: castleImg,
    gradient: 'from-amber-200 via-orange-300 to-amber-500',
    artKeywords: 'majestic fairytale royal cartoon palace with golden minarets, grand arches, lush carpeted courtyard, blue sky with fluffy white clouds, 2D vector animation style',
    description: 'Fairytale royal palace with golden domes, arched bridges, and storybook clouds.',
    descriptionUrdu: 'شاہی محل، سنہری گنبد اور خوبصورت محرابیں',
    resolution: '4K Ultra-HD',
    aiPrompt: 'Vibrant 2D cartoon animation background of a fairytale royal palace castle with golden domes, colorful turrets, arched bridges over a sparkling stream, lush green rolling hills, Disney 2D vector line art',
    isAiGenerated: true,
    decorations: ['👑', '🚩', '✨', '🕌']
  },
  {
    id: 'ai-forest',
    name: 'Enchanted Magical Forest',
    nameUrdu: 'جادوئی سرسبز جنگل (AI)',
    emoji: '🌳',
    category: 'nature',
    imageUrl: forestImg,
    gradient: 'from-emerald-300 via-green-500 to-teal-700',
    artKeywords: 'lush green enchanting animated jungle, giant cartoon trees, hanging vines, colorful blooming flowers, dappled cartoon sunlight filtering through leaves, 2D animation',
    description: 'Ancient whimsical giant trees with glowing moss, fireflies, and sunbeams.',
    descriptionUrdu: 'گھنا سرسبز جنگل، اونچے درخت اور جھومتی بیلیں',
    resolution: '4K Ultra-HD',
    aiPrompt: 'Lush magical 2D cartoon enchanted forest animation background, giant whimsical ancient trees with glowing hanging moss, vibrant luminescent mushrooms, sparkling fireflies, Ghibli style',
    isAiGenerated: true,
    decorations: ['🌿', '🍄', '🌺', '🍃']
  },
  {
    id: 'ai-cyber',
    name: 'Cyber Anime Metropolis',
    nameUrdu: 'جدید سائیبر سٹی (AI)',
    emoji: '🏙️',
    category: 'cyber',
    imageUrl: cyberImg,
    gradient: 'from-blue-300 via-indigo-400 to-slate-600',
    artKeywords: 'lively 2D cartoon metropolis street, colorful modern buildings, retro street lamps, zebra crosswalk, distant clean skyscrapers, playful animated vibe',
    description: 'Vibrant anime city street with neon signs, retro hovering cars, and sunny skyline.',
    descriptionUrdu: 'جدید اور پررونق شہر، اونچی عمارتیں اور روشن سڑکیں',
    resolution: '4K Ultra-HD',
    aiPrompt: 'Vibrant 2D cartoon anime city street background, colorful neon storefront signs, retro flying cars in distance, clean aesthetic cartoon skyscrapers, daylight sunny atmosphere, Makoto Shinkai style',
    isAiGenerated: true,
    decorations: ['🚗', '🚦', '🏢', '💡']
  },
  {
    id: 'ai-night',
    name: 'Starlight Dream Sky',
    nameUrdu: 'پرنور چاند اور تارے (AI)',
    emoji: '🌙',
    category: 'cosmic',
    imageUrl: nightImg,
    gradient: 'from-indigo-950 via-purple-900 to-slate-900',
    artKeywords: 'magical starry deep midnight sky, huge glowing crescent moon, sparkling twinkle stars, dark blue silhouettes of hills and lantern lights, 2D fairytale cartoon',
    description: 'Glowing crescent moon, dreamy indigo clouds, and sparkling constellations.',
    descriptionUrdu: 'تاروں بھری پرکیف رات، چمکتا ہلال اور نیلا آسمان',
    resolution: '4K Ultra-HD',
    aiPrompt: 'Enchanting 2D cartoon starry night sky animation background, huge glowing crescent moon, sparkling constellation stars, dreamy purple and indigo clouds, 2D anime animation aesthetic',
    isAiGenerated: true,
    decorations: ['⭐', '✨', '🪐', '🌌']
  },
  {
    id: 'village',
    name: 'Sunny Countryside Village',
    nameUrdu: 'پرسکون دیہات اور کھیت',
    emoji: '🏘️',
    category: 'nature',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80',
    gradient: 'from-amber-100 via-yellow-200 to-emerald-400',
    artKeywords: 'peaceful colorful countryside village, cute mud and brick houses, thatched roofs, wooden carts, green farm fields and stream, storybook 2D cartoon style',
    description: 'Charming rustic village with rolling green meadows, farmhouses, and fresh breezes.',
    descriptionUrdu: 'روایتی پرسکون دیہات، مٹی کے خوبصورت گھر اور سرسبز کھیت',
    resolution: 'Full HD',
    aiPrompt: 'Peaceful colorful countryside village, cute houses, wooden fences, golden wheat fields and sunbeams, 2D storybook cartoon style',
    decorations: ['🌾', '🌻', '🏡', '🚜']
  },
  {
    id: 'school',
    name: 'Anime Campus Courtyard',
    nameUrdu: 'اسکول اور کھیل کا میدان',
    emoji: '🏫',
    category: 'urban',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&auto=format&fit=crop&q=80',
    gradient: 'from-sky-200 via-blue-300 to-indigo-400',
    artKeywords: 'friendly vibrant 2D cartoon primary school building, bright green playground, colorful slide, swing set, school bell on rooftop, sunny morning ambiance',
    description: 'Bright cheerful animation school yard with cherry trees, playground, and blue skies.',
    descriptionUrdu: 'روشن اسکول کی عمارت، کھیل کا میدان اور جھولے',
    resolution: 'Full HD',
    aiPrompt: 'Vibrant 2D cartoon anime high school campus courtyard, cherry blossom petals falling, clean brick paths, sunny morning, studio Ghibli aesthetic',
    decorations: ['🎒', '⚽', '📚', '🔔']
  },
  {
    id: 'desert',
    name: 'Golden Desert Dunes',
    nameUrdu: 'سنہری ریت کا صحرا',
    emoji: '🏜️',
    category: 'nature',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1200&auto=format&fit=crop&q=80',
    gradient: 'from-amber-300 via-orange-400 to-rose-400',
    artKeywords: 'golden rolling cartoon desert dunes, warm oasis with lone palm tree, clear sunny horizon, storybook adventure backdrop, 2D vector animation style',
    description: 'Endless undulating golden sand dunes with deep shadows and clear azure horizon.',
    descriptionUrdu: 'سنہری ریت کے ٹیلے، کھجور کا درخت اور کھلا افق',
    resolution: 'Full HD',
    aiPrompt: 'Golden rolling 2D cartoon desert dunes at sunset, warm orange sunlight, distant oasis with palm trees, vector animation adventure style',
    decorations: ['🌴', '☀️', '🐪', '🌵']
  },
  {
    id: 'river',
    name: 'Crystal River & Stone Bridge',
    nameUrdu: 'شفاف دریا اور ندی',
    emoji: '🌊',
    category: 'nature',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&auto=format&fit=crop&q=80',
    gradient: 'from-cyan-300 via-sky-400 to-teal-500',
    artKeywords: 'sparkling cartoon blue river, cute arched stone footbridge, riverbank reeds, clear splashing water with ripples, 2D storybook background',
    description: 'Rippling crystal stream with colorful riverbank pebbles and lush green weeping willows.',
    descriptionUrdu: 'بہتی شفاف ندی، پتھروں کا چھوٹا پل اور سرسبز کنارہ',
    resolution: 'Full HD',
    aiPrompt: 'Sparkling cartoon blue mountain river, cobblestone footbridge, lush green mossy banks, clear water ripples, 2D animation background',
    decorations: ['🦆', '🌉', '🪨', '💧']
  },
  {
    id: 'underwater',
    name: 'Coral Reef Kingdom',
    nameUrdu: 'سمندری مرجان محل',
    emoji: '🐠',
    category: 'fantasy',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&auto=format&fit=crop&q=80',
    gradient: 'from-blue-600 via-teal-500 to-cyan-400',
    artKeywords: 'magical glowing cartoon underwater coral reef, colorful sea anemones, rising bubbles, sunbeams penetrating clear ocean water, 2D animation style',
    description: 'Bioluminescent coral reef paradise with rising bubbles and shimmering aquatic sun rays.',
    descriptionUrdu: 'سمندر کی گہرائی، رنگ برنگے مرجان اور تیرتے بلبلے',
    resolution: 'Full HD',
    aiPrompt: 'Enchanting 2D cartoon underwater fantasy ocean floor, glowing colorful coral kingdom, floating air bubbles, turquoise water rays, Finding Nemo aesthetic',
    decorations: ['🐡', '🐚', '🪸', '🫧']
  },
  {
    id: 'cozy-room',
    name: 'Cozy Artist Studio Room',
    nameUrdu: 'آرام دہ کارٹون کمرہ',
    emoji: '🛋️',
    category: 'interior',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&auto=format&fit=crop&q=80',
    gradient: 'from-amber-100 via-orange-100 to-rose-200',
    artKeywords: 'cozy warm cartoon bedroom interior, wooden bookshelf, soft bed with colorful pillows, warm lamp light, potted plants on windowsill, lofi anime aesthetic',
    description: 'Warm, charming animated room with bookshelves, fairy lights, and cozy window sill.',
    descriptionUrdu: 'خوبصورت اندرونی کمرہ، کتابوں کا شیلف اور گرم روشنی',
    resolution: 'Full HD',
    aiPrompt: 'Cozy 2D anime cartoon bedroom interior, warm sunlight through curtained window, desk with art supplies, potted succulents, lofi hip hop animation background',
    decorations: ['📚', '🪴', '☕', '💡']
  }
];

export const ANIMALS: AnimalCharacter[] = [
  {
    id: 'lion',
    name: 'Leo the Lion',
    nameUrdu: 'شیر (راجہ)',
    emoji: '🦁',
    species: 'King Lion',
    personality: 'Brave & Regal Forest King',
    personalityUrdu: 'بہادر جنگل کا راجہ',
    defaultAction: 'Striding forward proudly with a mighty friendly roar',
    defaultActionUrdu: 'شان سے آگے بڑھ رہا ہے اور چنگھاڑ رہا ہے',
    promptSnippet: 'adorable 2D cartoon lion prince, golden fluffy mane, big expressive friendly eyes, expressive regal stance'
  },
  {
    id: 'monkey',
    name: 'Milo the Monkey',
    nameUrdu: 'بندر (شرارتی)',
    emoji: '🐒',
    species: 'Playful Monkey',
    personality: 'Agile & Cheeky Acrobat',
    personalityUrdu: 'چست اور شرارتی',
    defaultAction: 'Jumping between branches and eating a banana',
    defaultActionUrdu: 'درخت کی ڈال پر چھلانگ لگا رہا ہے اور کیلا کھا رہا ہے',
    promptSnippet: 'cute playful cartoon monkey character, brown fur, curved expressive tail, holding a banana, cheerful cheeky smile'
  },
  {
    id: 'elephant',
    name: 'Ellie the Elephant',
    nameUrdu: 'ہاتھی (مہربان)',
    emoji: '🐘',
    species: 'Gentle Elephant',
    personality: 'Big, Wise & Kind-Hearted',
    personalityUrdu: 'بڑا، طاقتور اور مہربان',
    defaultAction: 'Waving trunk joyfully while walking along',
    defaultActionUrdu: 'سونڈ ہلاتے ہوئے خوشی سے چل رہا ہے',
    promptSnippet: 'lovable big friendly cartoon baby elephant, pastel grey, large floppy ears, cute trunk raised happily'
  },
  {
    id: 'fox',
    name: 'Felix the Fox',
    nameUrdu: 'لومڑی (ہوشیار)',
    emoji: '🦊',
    species: 'Clever Fox',
    personality: 'Smart, Quick-witted Detective',
    personalityUrdu: 'چالاک اور ہوشیار',
    defaultAction: 'Tiptoeing quietly and surveying the surroundings',
    defaultActionUrdu: 'دبے پاؤں چل کر چاروں طرف دیکھ رہی ہے',
    promptSnippet: 'clever cute 2D cartoon red fox, fluffy white-tipped bushy tail, pointed alert ears, intelligent playful look'
  },
  {
    id: 'parrot',
    name: 'Pip the Parrot',
    nameUrdu: 'طوطا (مٹھو)',
    emoji: '🦜',
    species: 'Speaking Parrot',
    personality: 'Chirpy, Colorful & Talkative',
    personalityUrdu: 'باتونی اور رنگ برنگا',
    defaultAction: 'Flapping wings cheerfully while telling a joke',
    defaultActionUrdu: 'پر پھڑپھڑا کر بول رہا ہے',
    promptSnippet: 'colorful vibrant cartoon parrot, bright emerald green feathers, red curved beak, flying or perched cheerfully'
  },
  {
    id: 'rabbit',
    name: 'Bella Bunny',
    nameUrdu: 'خرگوش (معصوم)',
    emoji: '🐰',
    species: 'Fast Bunny',
    personality: 'Innocent, Curious & Lightning Fast',
    personalityUrdu: 'معصوم اور تیز رفتار',
    defaultAction: 'Hopping swiftly clutching a crunchy carrot',
    defaultActionUrdu: 'تیزی سے دوڑ رہا ہے اور گاجر تھامے ہے',
    promptSnippet: 'adorable fluffy white cartoon bunny rabbit, long pink-inner ears, twitching cute nose, holding a fresh carrot'
  }
];

export const POSE_PROMPTS: PosePrompt[] = [
  {
    id: 'front',
    title: 'Front View',
    titleUrdu: 'Front (سامنے کا رخ)',
    category: 'pose',
    promptEn: 'same face, front view, 2D cartoon animation character, full body, clean vector line art, studio lighting, solid neutral bg',
    promptUrdu: 'سامنے کا رخ، مکمل جسم، 2D کارٹون اسٹائل، صاف بیک گراؤنڈ',
    iconName: 'User'
  },
  {
    id: 'right',
    title: 'Right Side Profile',
    titleUrdu: 'Right (دائیں طرف)',
    category: 'pose',
    promptEn: 'same face, right side profile view, 2D cartoon, full body, consistent proportions, neutral bg',
    promptUrdu: 'دائیں رخ، سائیڈ پروفائل، 2D کارٹون اینیمیشن، سفید پس منظر',
    iconName: 'ArrowRight'
  },
  {
    id: 'left',
    title: 'Left Side Profile',
    titleUrdu: 'Left (بائیں طرف)',
    category: 'pose',
    promptEn: 'same face, left side profile view, 2D cartoon, full body, consistent character design, neutral bg',
    promptUrdu: 'بائیں رخ، سائیڈ پروفائل، 2D کارٹون اینیمیشن، سفید پس منظر',
    iconName: 'ArrowLeft'
  },
  {
    id: 'back',
    title: 'Back View',
    titleUrdu: 'Back (پیچھے کا رخ)',
    category: 'pose',
    promptEn: 'same face character, back view, showing hairstyle and clothes from behind, 2D cartoon, full body, neutral bg',
    promptUrdu: 'پیچھے کا مکمل رخ، بال اور لباس کی تفصیلات، سفید پس منظر',
    iconName: 'Undo'
  },
  {
    id: 'three_quarter',
    title: '3/4 Dynamic Angle',
    titleUrdu: '3/4 View (تین چوتھائی رخ)',
    category: 'pose',
    promptEn: 'same face, dynamic 3/4 three-quarter perspective angle view, 2D cartoon animation character model sheet, full body, neutral bg',
    promptUrdu: 'تین چوتھائی ڈائنامک اینگل، ہیرو لک، سفید پس منظر',
    iconName: 'Compass'
  },
  {
    id: 'angry',
    title: 'Angry Expression',
    titleUrdu: 'غصہ (Angry Expression)',
    category: 'expression',
    promptEn: 'same face, angry fierce expression, furrowed eyebrows, dramatic anime/cartoon emotion, headshot close-up, 2D cartoon, neutral bg',
    promptUrdu: 'غصے کے تاثرات، کھنچی بھنویں، ڈرامائی کلوز اپ، سفید پس منظر',
    iconName: 'Flame'
  },
  {
    id: 'happy',
    title: 'Joyful Smile',
    titleUrdu: 'خوشی و مسکراہٹ (Happy)',
    category: 'expression',
    promptEn: 'same face, joyful beaming warm smile, twinkling bright eyes, pleasant friendly expression, 2D cartoon, headshot, neutral bg',
    promptUrdu: 'کھلکھلاتی مسکراہٹ، چمکتی آنکھیں، پرجوش تاثرات',
    iconName: 'Smile'
  },
  {
    id: 'shocked',
    title: 'Shocked / Surprised',
    titleUrdu: 'حیرت و خوف (Surprised)',
    category: 'expression',
    promptEn: 'same face, wide open eyes, mouth open in astonishment, surprised comical cartoon expression, headshot, neutral bg',
    promptUrdu: 'حیرت سے کھلی آنکھیں اور منہ، سنسنی خیز تاثرات',
    iconName: 'Zap'
  }
];

export const SAMPLE_FACES: CharacterFace[] = [
  {
    id: 'face_ali',
    name: 'Alex (Boy Hero)',
    nameUrdu: 'علی (بہادر لڑکا)',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80',
    description: 'Courageous, energetic teenage cartoon hero.',
    descriptionUrdu: 'ہمت والا اور ذہین نوجوان ہیرو'
  },
  {
    id: 'face_pari',
    name: 'Zara (Princess / Heroine)',
    nameUrdu: 'زارا (معصوم بچی)',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    description: 'Curious, cheerful and smart fairytale protagonist.',
    descriptionUrdu: 'ہنس مکھ اور ہوشیار کہانی کی ہیروئن'
  },
  {
    id: 'face_baba',
    name: 'Master Wu (Wise Mentor)',
    nameUrdu: 'چچا جی (دانا بزرگ)',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    description: 'Wise, benevolent cartoon elder and martial mentor.',
    descriptionUrdu: 'سفید داڑھی والے مہربان اور دانا بزرگ'
  }
];

export const QUICK_ACTIONS_EN = [
  'Sprinting at full speed chasing a golden feather',
  'Jumping high in the air with joyful laughter',
  'Whispering a top secret prophecy to a friend',
  'Waving hand enthusiastically saying hello',
  'Dancing to a cheerful cartoon drum beat',
  'Reading an ancient glowing spell book with amazement',
  'Sneaking on tiptoes through a mysterious archway'
];

export const QUICK_ACTIONS_URDU = [
  'تیزی سے دوڑ رہا ہے',
  'خوشی سے ہوا میں چھلانگ لگا رہا ہے',
  'دوسرے کردار سے سنجیدہ باتیں کر رہا ہے',
  'ہاتھ ہلا کر سلام کر رہا ہے',
  'ڈھول بجا کر ناچ رہا ہے',
  'کتاب پڑھ کر کچھ نیا سوچ رہا ہے',
  'خفیہ راستے پر دبے پاؤں چل رہا ہے'
];

export const VIRAL_TEMPLATES: ViralTemplate[] = [
  {
    id: 'viral-1',
    title: 'The King’s Secret Roar',
    badge: '🔥 1.2M Potential',
    hook: 'Wait until he notices who is standing behind him... 😱',
    hookUrdu: 'آخر تک دیکھیں! راجہ کے پیچھے کون کھڑا ہے؟ 😱',
    dialogue: 'Who dares enter my golden throne room uninvited?!',
    soundEffect: 'Suspense Stinger',
    action: 'Striding forward proudly with a mighty friendly roar',
    bgId: 'ai-castle',
    hashtags: ['#2DAnimation', '#CartoonMaker', '#ViralReels', '#Shorts', '#AIVideo', '#FunnyAnimation']
  },
  {
    id: 'viral-2',
    title: 'Late For Anime Class Run',
    badge: '⚡ Trending Sound',
    hook: 'POV: You woke up at 8:59 AM and exam starts at 9:00 AM 🏃‍♂️💨',
    hookUrdu: 'جب صبح دیر سے آنکھ کھلے اور کلاس شروع ہو چکی ہو! 🏃‍♂️💨',
    dialogue: 'I am not going to make it! Move out of the way!!',
    soundEffect: 'Boing & Whoosh',
    action: 'Sprinting at full speed chasing a golden feather',
    bgId: 'school',
    hashtags: ['#AnimeVibes', '#AnimeShorts', '#RelatableComedy', '#AnimationTrends', '#TikTokHumor']
  },
  {
    id: 'viral-3',
    title: 'Neon Cyberpunk Hover Drift',
    badge: '🚀 Sci-Fi Hit',
    hook: 'If 2D Cartoons were set in the year 2099... Mind-blowing! 🌌',
    hookUrdu: 'اگر 2D کارٹون 2099 میں بنتے! شاندار منظر 🌌',
    dialogue: 'Engaging quantum thrusters. Hold on tight!',
    soundEffect: 'Magic & Tada',
    action: 'Jumping high in the air with joyful laughter',
    bgId: 'ai-cyber',
    hashtags: ['#CyberpunkAnimation', '#SciFiArt', '#Gen3Prompt', '#KlingAI', '#ViralVideo']
  },
  {
    id: 'viral-4',
    title: 'The Whispering Mushroom Tree',
    badge: '✨ Magical Story',
    hook: 'Legend says this forest only appears once every thousand years... 🍄',
    hookUrdu: 'روایت ہے کہ یہ جادوئی جنگل ہزار سال میں ایک بار نظر آتا ہے... 🍄',
    dialogue: 'Look! The mushrooms are actually singing in harmony!',
    soundEffect: 'Magic Chime',
    action: 'Sneaking on tiptoes through a mysterious archway',
    bgId: 'ai-forest',
    hashtags: ['#Storytime', '#GhibliAesthetic', '#FantasyArt', '#AnimationCommunity', '#CozyVibes']
  }
];
