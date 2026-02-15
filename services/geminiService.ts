
import { GoogleGenAI } from "@google/genai";
import { Language } from "../types";

const API_KEY = process.env.API_KEY || "";

export const generateStorySentence = async (
  words: { 1: string; 2: string; 3: string; 4: string },
  lang: Language = 'ar'
): Promise<string> => {
  if (!API_KEY) {
    return lang === 'ar' 
      ? `تأثر ${words[2]} بـ ${words[1]}، مما أدى إلى ${words[4]} ثم ${words[3]}.`
      : `The ${words[2]} was affected by ${words[1]}, a change led to ${words[4]} then ${words[3]}.`;
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const instruction = lang === 'ar' 
    ? `أنشئ جملة وصفية بسيطة ومباشرة باللغة العربية بناءً على أربعة مفاهيم:
       المفهوم 2 هو الحالة الأولية.
       المفهوم 1 هو المحرك للتغيير.
       المفهوم 4 هو النتيجة المسبقة.
       المفهوم 3 هو النتيجة النهائية.
       اتبع النمط: "تأثر [المفهوم 2] بـ [المفهوم 1]، أدى التغيير إلى [المفهوم 4] ثم [المفهوم 3]."`
    : `Create a simple, literal descriptive sentence in English based on four concepts:
       Word 2 is the initial state.
       Word 1 is the starter of change.
       Word 4 is the pre-result.
       Word 3 is the outcome.
       Follow the formula: "The [Word 2] was affected by [Word 1], a change led to [Word 4] then [Word 3]."`;

  const prompt = `
    ${instruction}
    
    Words:
    1: "${words[1]}"
    2: "${words[2]}"
    3: "${words[3]}"
    4: "${words[4]}"

    Return ONLY the result sentence. No explanation.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Gemini Error:", error);
    return lang === 'ar' 
      ? `تأثر ${words[2]} بـ ${words[1]}، أدى التغيير إلى ${words[4]} ثم ${words[3]}.`
      : `The ${words[2]} was affected by ${words[1]}, a change led to ${words[4]} then ${words[3]}.`;
  }
};
