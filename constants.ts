
import { WordGraphic } from './types';

export const ARABIC_ALPHABET = [
  'أ', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'هـ', 'و', 'ي'
];

const col1Base = [
  { en: "overcome", ar: "تغلب" }, { en: "strike", ar: "ضرب" }, { en: "lift", ar: "رفع" }, 
  { en: "ignite", ar: "أشعل" }, { en: "dissolve", ar: "أذاب" }, { en: "bridge", ar: "جسر" }, 
  { en: "pierce", ar: "خرق" }, { en: "mend", ar: "أصلح" }, { en: "scatter", ar: "بعثر" }, 
  { en: "gather", ar: "جمع" }, { en: "twist", ar: "لوى" }, { en: "crush", ar: "سحق" }, 
  { en: "nurture", ar: "رعى" }, { en: "expose", ar: "كشف" }, { en: "shield", ar: "حمى" }, 
  { en: "summon", ar: "استدعى" }, { en: "anchor", ar: "رسخ" }, { en: "release", ar: "حرر" }, 
  { en: "echo", ar: "صدى" }, { en: "mask", ar: "قنّع" }, { en: "reveal", ar: "أظهر" }, 
  { en: "carve", ar: "نحت" }, { en: "bind", ar: "ربط" }, { en: "weave", ar: "نسج" }, 
  { en: "shatter", ar: "حطم" }, { en: "polish", ar: "صقل" }, { en: "tilt", ar: "أمال" }, 
  { en: "balance", ar: "وازن" }
];

const col2Base = [
  { en: "relation of expansion", ar: "علاقة التوسع" }, { en: "state of fusion", ar: "حالة الانصهار" }, 
  { en: "web of tension", ar: "شبكة التوتر" }, { en: "sphere of calm", ar: "مجال الهدوء" }, 
  { en: "void of space", ar: "فراغ المكان" }, { en: "axis of rotation", ar: "محور الدوران" }, 
  { en: "path of descent", ar: "مسار الهبوط" }, { en: "wall of resistance", ar: "جدار المقاومة" },
  { en: "field of attraction", ar: "حقل الجذب" }, { en: "link of dependency", ar: "رابط التبعية" }, 
  { en: "layer of sediment", ar: "طبقة الترسب" }, { en: "node of connection", ar: "عقدة الاتصال" },
  { en: "grid of order", ar: "شبكة النظام" }, { en: "cloud of chaos", ar: "سحابة الفوضى" }, 
  { en: "ring of cycle", ar: "حلقة الدورة" }, { en: "core of heat", ar: "قلب الحرارة" },
  { en: "bridge of trust", ar: "جسر الثقة" }, { en: "gap of distance", ar: "فجوة المسافة" }, 
  { en: "pulse of rhythm", ar: "نبض الإيقاع" }, { en: "wave of energy", ar: "موجة الطاقة" },
  { en: "slope of progress", ar: "منحدر التقدم" }, { en: "plain of stasis", ar: "سهل الركود" }, 
  { en: "root of growth", ar: "جذر النمو" }, { en: "bloom of life", ar: "زهرة الحياة" },
  { en: "cell of isolation", ar: "خلية العزلة" }, { en: "crowd of unity", ar: "حشد الوحدة" }, 
  { en: "mask of identity", ar: "قناع الهوية" }, { en: "mirror of truth", ar: "مرآة الحقيقة" }
];

const col3Base = [
  { en: "state of silence", ar: "حالة الصمت" }, { en: "aura of splendor", ar: "هالة الفخامة" }, 
  { en: "dust of decay", ar: "غبار التحلل" }, { en: "light of dawn", ar: "ضوء الفجر" },
  { en: "shadow of dusk", ar: "ظل الغسق" }, { en: "glow of hope", ar: "بريق الأمل" }, 
  { en: "cold of winter", ar: "برد الشتاء" }, { en: "heat of summer", ar: "حر الصيف" },
  { en: "weight of burden", ar: "ثقل العبء" }, { en: "flight of freedom", ar: "طيران الحرية" }, 
  { en: "deep of ocean", ar: "عمق المحيط" }, { en: "peak of mountain", ar: "قمة الجبل" },
  { en: "scent of memory", ar: "رائحة الذكرى" }, { en: "sound of thunder", ar: "صوت الرعد" }, 
  { en: "touch of velvet", ar: "لمس المخمل" }, { en: "taste of iron", ar: "طعم الحديد" },
  { en: "breath of wind", ar: "نسمة الريح" }, { en: "eye of storm", ar: "عين العاصفة" }, 
  { en: "spark of genius", ar: "شرارة العبقرية" }, { en: "seed of doubt", ar: "بذرة الشك" },
  { en: "fruit of labor", ar: "ثمرة العمل" }, { en: "crown of success", ar: "تاج النجاح" }, 
  { en: "thorn of failure", ar: "شوكة الفشل" }, { en: "vein of gold", ar: "عرق الذهب" },
  { en: "mark of time", ar: "علامة الزمن" }, { en: "fleck of paint", ar: "بقعة طلاء" }, 
  { en: "grain of sand", ar: "حبة رمل" }, { en: "drop of rain", ar: "قطرة مطر" }
];

const col4Base = [
  { en: "forcing to set", ar: "الإجبار على التثبيت" }, { en: "bending to fit", ar: "الانحناء للملاءمة" }, 
  { en: "slowing to stop", ar: "التباطؤ للتوقف" }, { en: "stretching to break", ar: "التمدد للكسر" },
  { en: "melting to flow", ar: "الانصهار للجريان" }, { en: "drying to crack", ar: "الجفاف للتصدع" }, 
  { en: "cooling to freeze", ar: "التبريد للتجميد" }, { en: "heating to boil", ar: "التسخين للغليان" },
  { en: "leaning to fall", ar: "الميل للسقوط" }, { en: "rising to soar", ar: "الارتفاع للتحليق" }, 
  { en: "fading to gray", ar: "البهتان للرمادي" }, { en: "darkening to black", ar: "التعتيم للأسود" },
  { en: "turning to ash", ar: "التحول لرماد" }, { en: "turning to stone", ar: "التحول لحجر" }, 
  { en: "turning to gold", ar: "التحول لذهب" }, { en: "turning to dust", ar: "التحول لغبار" },
  { en: "shifting to right", ar: "الانزياح لليمين" }, { en: "shifting to left", ar: "الانزياح لليسار" }, 
  { en: "climbing to top", ar: "التسلق للقمة" }, { en: "falling to bottom", ar: "السقوط للقاع" },
  { en: "opening to view", ar: "الافتتاح للعرض" }, { en: "closing to hide", ar: "الإغلاق للاختباء" }, 
  { en: "shrinking to naught", ar: "الانكماش للعدم" }, { en: "growing to huge", ar: "النمو للضخامة" },
  { en: "breaking to bits", ar: "التكسر لأجزاء" }, { en: "fixing to whole", ar: "الإصلاح للاكتمال" }, 
  { en: "locking to stay", ar: "القفل للبقاء" }, { en: "freeing to go", ar: "التحرير للذهاب" }
];

export const INITIAL_WORDS: WordGraphic[][] = [
  col1Base.map((w, i) => ({ id: `c1-${i}`, text: w.en, textAr: w.ar, imageUrl: `https://picsum.photos/seed/c1-${i}/500/500` })),
  col2Base.map((w, i) => ({ id: `c2-${i}`, text: w.en, textAr: w.ar, imageUrl: `https://picsum.photos/seed/c2-${i}/500/500` })),
  col3Base.map((w, i) => ({ id: `c3-${i}`, text: w.en, textAr: w.ar, imageUrl: `https://picsum.photos/seed/c3-${i}/500/500` })),
  col4Base.map((w, i) => ({ id: `c4-${i}`, text: w.en, textAr: w.ar, imageUrl: `https://picsum.photos/seed/c4-${i}/500/500` })),
];
