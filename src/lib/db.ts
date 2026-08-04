import fs from 'fs';
import path from 'path';

export interface Category {
  id: string;
  nameEn: string;
  nameAr: string;
  icon: string; // Lucide icon name, e.g., 'Zap', 'Coffee', 'Gamepad2', 'ShoppingBag', or others
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: string;
  image: string;
  tag?: string;
  tagAr?: string;
  badge?: string;
}

export interface Feedback {
  id: string;
  name: string;
  text: string;
  rating: number; // 1–5
  status: 'pending' | 'approved' | 'hidden';
  createdAt: string; // ISO date string
}

const DB_DIR = path.join(process.cwd(), 'src/lib');
const DB_PATH = path.join(DB_DIR, 'db.json');

const DEFAULT_CATEGORIES: Category[] = [
  { id: 'mana-drinks',  nameEn: 'Mana Refuels',   nameAr: 'مشروبات الطاقة', icon: 'Zap' },
  { id: 'xp-boosters', nameEn: 'XP Boosters',     nameAr: 'قهوة الأداء',    icon: 'Coffee' },
  { id: 'loot-boxes',  nameEn: 'Loot Boxes',      nameAr: 'وجبات',           icon: 'Gamepad2' },
  { id: 'gear-merch',  nameEn: 'Gear & Merch',    nameAr: 'منتجاتنا',        icon: 'ShoppingBag' },
];

const DEFAULT_ITEMS: MenuItem[] = [
  {
    id: 'cd1',
    categoryId: 'mana-drinks',
    name: 'Iced Overclocked Brew',
    nameAr: 'كولد برو المحسّن',
    description: 'Slow-steeped 18-hour cold brew with blue raspberry elixir, natural ginseng & pure agave. Engineered to double your focus.',
    descriptionAr: 'كولد برو مُنقع ١٨ ساعة مع توت أزرق وجينسنج طبيعي وعسل الصبار. مصمم لمضاعفة تركيزك.',
    price: '5,000 IQD',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80',
    tag: 'Best Seller',
    tagAr: 'الأكثر مبيعاً',
  },
  {
    id: 'cd2',
    categoryId: 'mana-drinks',
    name: 'Chrono Shakerato',
    nameAr: 'شاكيراتو كرونو',
    description: 'Double espresso shaken with fresh mint, raw sugar & botanical tonic. Resets your mental cool-downs.',
    descriptionAr: 'إسبريسو مزدوج مُرج مع النعناع الطازج والسكر الخام والتونيك النباتي.',
    price: '4,500 IQD',
    image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=80',
    badge: 'Meta',
  },
  {
    id: 'cd3',
    categoryId: 'mana-drinks',
    name: 'Lag-Free Tonic',
    nameAr: 'تونيك بلا تأخير',
    description: 'Single-origin cold drip over botanical tonic with a lime wheel. Clean caffeine, zero lag.',
    descriptionAr: 'قطرة باردة أصيلة المصدر مع التونيك النباتي والليمون. طاقة نظيفة بلا تأخير.',
    price: '4,000 IQD',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80',
  },
  {
    id: 'cd4',
    categoryId: 'mana-drinks',
    name: 'HP Recovery Latte',
    nameAr: 'لاتيه استعادة الطاقة',
    description: 'Signature espresso with organic oat milk, vanilla-cardamom syrup over large block ice.',
    descriptionAr: 'إسبريسو مميز مع حليب الشوفان العضوي وشراب الفانيليا والهيل.',
    price: '4,500 IQD',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&q=80',
  },
  {
    id: 'hd1',
    categoryId: 'xp-boosters',
    name: 'APM Optimizer Cappuccino',
    nameAr: 'كابتشينو المحترف',
    description: 'Double espresso with ultra-thick velvety microfoam and dark chocolate dust. Perfect for high actions-per-minute.',
    descriptionAr: 'إسبريسو مزدوج مع رغوة مخملية كثيفة وغبار الشوكولاتة الداكنة.',
    price: '4,000 IQD',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80',
    tag: 'Signature',
    tagAr: 'مميز',
  },
  {
    id: 'hd2',
    categoryId: 'xp-boosters',
    name: 'Overclocked Mocha',
    nameAr: 'موكا المسرّع',
    description: 'Fresh double espresso, house-melted dark chocolate, oat milk & a pinch of chili for peak circulation.',
    descriptionAr: 'إسبريسو مزدوج مع شوكولاتة داكنة وحليب شوفان ورشة فلفل حار لتحسين الدورة الدموية.',
    price: '5,000 IQD',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80',
  },
  {
    id: 'hd3',
    categoryId: 'xp-boosters',
    name: 'Liquid Loot Pour Over',
    nameAr: 'بور أوفر النادر',
    description: 'Exclusive Panama Geisha beans hand-poured via V60. Notes of jasmine, floral honey & bright citrus.',
    descriptionAr: 'حبوب بنما جيشا النادرة مُعدّة يدوياً عبر V60. نكهات الياسمين والعسل الزهري والحمضيات.',
    price: '8,000 IQD',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    badge: 'Legendary',
  },
  {
    id: 'hd4',
    categoryId: 'xp-boosters',
    name: 'Double Jump Cortado',
    nameAr: 'كورتادو القفزة المزدوجة',
    description: 'Equal parts signature double espresso and steamed microfoam. Concentrated boost for instant alertness.',
    descriptionAr: 'جزء متساوٍ من الإسبريسو المزدوج والرغوة المُبخّرة. دفعة مركّزة لتنبه فوري.',
    price: '3,500 IQD',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=600&q=80',
  },
  {
    id: 'fb1',
    categoryId: 'loot-boxes',
    name: 'Carbon Fiber Croissant',
    nameAr: 'كرواسون الكربون',
    description: 'Multi-layered dark cocoa-infused butter croissant filled with premium molten dark chocolate.',
    descriptionAr: 'كرواسون زبدي بطبقات متعددة من الكاكاو الداكن ممزوج بالشوكولاتة الداكنة المذابة.',
    price: '3,500 IQD',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80',
  },
  {
    id: 'fb2',
    categoryId: 'loot-boxes',
    name: "Gamer's Fuel Sourdough",
    nameAr: 'خبز اللاعب المحترف',
    description: 'Thick artisanal toasted sourdough with whipped avocado cream, soft-boiled egg & pumpkin seeds.',
    descriptionAr: 'خبز محمص فني سميك مع كريمة الأفوكادو والبيضة الطرية وبذور القرع.',
    price: '7,000 IQD',
    image: 'https://images.unsplash.com/photo-1603046891726-36bfd957e0bf?w=600&q=80',
    tag: 'High Protein',
    tagAr: 'بروتين عالي',
  },
  {
    id: 'fb3',
    categoryId: 'loot-boxes',
    name: 'Respawn Brioche Roll',
    nameAr: 'بريوش الإحياء',
    description: 'Fluffy brioche dough spiced with cardamom & cinnamon, glazed with vanilla cream cheese frosting.',
    descriptionAr: 'عجينة بريوش هشة بالهيل والقرفة مع طبقة كريمة الجبن والفانيليا.',
    price: '4,000 IQD',
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=600&q=80',
  },
  {
    id: 'fb4',
    categoryId: 'loot-boxes',
    name: 'Guild Leader Salmon Bagel',
    nameAr: 'بيغل السلمون',
    description: 'Toasted everything bagel with wild-caught smoked salmon, whipped dill cream cheese & pickled onions.',
    descriptionAr: 'بيغل محمص مع سلمون مدخن طبيعي وكريمة الجبن بالشبت والبصل المخلل.',
    price: '9,000 IQD',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=600&q=80',
  },
  {
    id: 'oi1',
    categoryId: 'gear-merch',
    name: 'Vega Signature Beans 250g',
    nameAr: 'حبوب فيغا المميزة ٢٥٠ج',
    description: "Vega's proprietary focus-optimized coffee beans. Tasting notes of sweet cacao and forest berries.",
    descriptionAr: 'حبوب قهوة فيغا المخصصة لتعزيز التركيز. نكهات الكاكاو الحلو والتوت البري.',
    price: '14,000 IQD',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80',
    tag: 'Roastery',
    tagAr: 'محمصة',
  },
  {
    id: 'oi2',
    categoryId: 'gear-merch',
    name: 'Vega Custom Keycap Set',
    nameAr: 'مجموعة كيكاب فيغا',
    description: 'High-durability PBT double-shot keycaps in black and Vega gradient. Fits cherry switch layouts.',
    descriptionAr: 'كيكاب PBT عالي الجودة بتصميم فيغا المتدرج. يناسب مفاتيح cherry.',
    price: '30,000 IQD',
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&q=80',
    badge: 'Limited',
  },
  {
    id: 'oi3',
    categoryId: 'gear-merch',
    name: 'High-Focus Ceramic Mug',
    nameAr: 'كوب سيراميك فيغا',
    description: 'Wheel-thrown matte black ceramic mug with gradient inner glaze finish. 8oz capacity.',
    descriptionAr: 'كوب سيراميك أسود مطفي مع طبقة داخلية متدرجة. سعة ٨ أونصة.',
    price: '18,000 IQD',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80',
  },
];

export interface DbData {
  categories: Category[];
  items: MenuItem[];
  feedback: Feedback[];
}

export function readDb(): DbData {
  try {
    if (!fs.existsSync(DB_PATH)) {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
      const initialData: DbData = {
        categories: DEFAULT_CATEGORIES,
        items: DEFAULT_ITEMS,
        feedback: [],
      };
      fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2), 'utf-8');
      return initialData;
    }
    const content = fs.readFileSync(DB_PATH, 'utf-8');
    const parsed = JSON.parse(content);
    // Backward-compat: ensure feedback field exists
    if (!parsed.feedback) parsed.feedback = [];
    return parsed;
  } catch (error) {
    console.error('Error reading DB, returning defaults', error);
    return {
      categories: DEFAULT_CATEGORIES,
      items: DEFAULT_ITEMS,
      feedback: [],
    };
  }
}

export function writeDb(data: DbData): boolean {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing DB', error);
    return false;
  }
}
