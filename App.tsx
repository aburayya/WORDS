
import React, { useState, useEffect } from 'react';
import { WordGraphic, SelectionState, SelectionSlot, Language } from './types';
import { INITIAL_WORDS, ARABIC_ALPHABET } from './constants';
import { generateStorySentence } from './services/geminiService';

const App: React.FC = () => {
  const [allWords, setAllWords] = useState<WordGraphic[][]>(INITIAL_WORDS);
  const [selection, setSelection] = useState<SelectionState>({
    1: null,
    2: null,
    3: null,
    4: null,
  });
  const [activeSlot, setActiveSlot] = useState<SelectionSlot>(1);
  const [storyText, setStoryText] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [lang, setLang] = useState<Language>('ar');

  const t = {
    ar: {
      title: "لوحة الكلمات",
      adminOn: "إيقاف المسؤول",
      adminOff: "وضع المسؤول",
      reset: "إعادة تعيين",
      waiting: "بانتظار الاختيارات",
      waitingSub: "اختر أربع كلمات لبناء القصة.",
      narrative: "سرد التسلسل",
      starter: "1. البداية",
      initial: "2. الحالة الأولية",
      preResult: "4. النتيجة المسبقة",
      outcome: "3. النتيجة النهائية",
      col: "عمود",
      empty: "فارغ",
      updateImg: "تغيير الرسم",
      help: "تعليمات التدفق:\n- الكلمات تظهر من اليمين إلى اليسار (4، 3، 2، 1).\n- يبدأ العرض من البداية -> الحالة الأولية -> النتيجة المسبقة -> النتيجة النهائية."
    },
    en: {
      title: "Word Palette",
      adminOn: "Admin Off",
      adminOff: "Admin Mode",
      reset: "Reset",
      waiting: "Awaiting Selections",
      waitingSub: "Select four words from the palette to build the story.",
      narrative: "Sequence Narrative",
      starter: "1. Starter",
      initial: "2. Initial State",
      preResult: "4. Pre-result",
      outcome: "3. Outcome",
      col: "Col",
      empty: "Empty",
      updateImg: "Change Graphic",
      help: "Flow Instructions:\n- Palette columns flow Right to Left (4, 3, 2, 1).\n- Visualization builds: Starter -> Initial State -> Pre-result -> Outcome."
    }
  }[lang];

  const handleWordClick = (word: WordGraphic) => {
    setSelection(prev => ({
      ...prev,
      [activeSlot]: word,
    }));
    if (activeSlot < 4) {
      setActiveSlot((activeSlot + 1) as SelectionSlot);
    }
  };

  const clearSelection = () => {
    setSelection({ 1: null, 2: null, 3: null, 4: null });
    setActiveSlot(1);
    setStoryText("");
  };

  useEffect(() => {
    const fetchStory = async () => {
      if (selection[1] && selection[2] && selection[3] && selection[4]) {
        setLoading(true);
        const text = await generateStorySentence({
          1: lang === 'ar' ? selection[1].textAr : selection[1].text,
          2: lang === 'ar' ? selection[2].textAr : selection[2].text,
          3: lang === 'ar' ? selection[3].textAr : selection[3].text,
          4: lang === 'ar' ? selection[4].textAr : selection[4].text,
        }, lang);
        setStoryText(text);
        setLoading(false);
      }
    };
    fetchStory();
  }, [selection, lang]);

  const updateWordText = (colIndex: number, wordId: string, newText: string) => {
    setAllWords(prev => {
      const newGrid = [...prev];
      const col = [...newGrid[colIndex]];
      const idx = col.findIndex(w => w.id === wordId);
      if (idx !== -1) {
        if (lang === 'ar') col[idx] = { ...col[idx], textAr: newText };
        else col[idx] = { ...col[idx], text: newText };
      }
      newGrid[colIndex] = col;
      return newGrid;
    });
  };

  // Fixed visual order for the palette columns: 4 3 2 1 | RowLabel
  const displayColIndices = [3, 2, 1, 0];

  return (
    <div 
      className={`h-screen w-screen overflow-hidden flex flex-col md:flex-row-reverse transition-colors duration-300 ${isDark ? "bg-slate-950 text-slate-100" : "bg-gray-50 text-gray-900"}`}
    >
      
      {/* Sidebar - Word Palette (Always Fixed on the Right) */}
      <aside className={`w-full md:w-[480px] h-1/2 md:h-full flex flex-col border-l transition-colors duration-300 ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200 shadow-sm"}`}>
        <div className={`p-4 border-b flex items-center justify-between transition-colors duration-300 ${isDark ? "border-slate-800" : "border-gray-100"}`}>
          <h1 className={`text-xl font-bold tracking-tight ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t.title}</h1>
          <div className="flex gap-2">
            <button 
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className={`px-2 py-1 rounded text-[10px] font-bold transition-colors ${isDark ? "bg-slate-800 text-indigo-400 hover:bg-indigo-900" : "bg-gray-100 text-indigo-600 hover:bg-indigo-50"}`}
            >
              {lang === 'ar' ? 'EN' : 'AR'}
            </button>
            <button 
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-full transition-colors ${isDark ? "bg-slate-800 text-yellow-400 hover:bg-slate-700" : "bg-gray-100 text-slate-600 hover:bg-gray-200"}`}
            >
              {isDark ? "☀" : "🌙"}
            </button>
            <button 
              onClick={() => setIsAdmin(!isAdmin)}
              className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded transition-colors ${isDark ? "bg-slate-800 text-slate-400" : "bg-gray-100 text-slate-500"}`}
            >
              {isAdmin ? t.adminOn : t.adminOff}
            </button>
          </div>
        </div>

        {/* Selected Slots Header */}
        <div className={`px-4 py-2 flex flex-wrap gap-1 items-center border-b transition-colors duration-300 ${isDark ? "bg-slate-950/40 border-slate-800" : "bg-indigo-50/50 border-gray-100"}`}>
          {[1, 2, 3, 4].map(s => (
            <button
              key={s}
              onClick={() => setActiveSlot(s as SelectionSlot)}
              className={`text-[10px] px-2 py-1 rounded border transition-all ${
                activeSlot === s 
                ? "bg-indigo-600 border-indigo-600 text-white font-bold" 
                : isDark ? "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              W{s}: {selection[s as SelectionSlot] ? (
                <span className="truncate max-w-[60px] inline-block align-bottom">{lang === 'ar' ? selection[s as SelectionSlot]!.textAr : selection[s as SelectionSlot]!.text}</span>
              ) : t.empty}
            </button>
          ))}
          <button onClick={clearSelection} className={`ml-auto text-[10px] text-red-500 font-bold hover:underline`}>{t.reset}</button>
        </div>

        {/* Word Table with Fixed RTL Placement */}
        <div className="flex-1 overflow-y-auto p-3 scrollbar-hide">
          <div className="grid grid-cols-[1fr_1fr_1fr_1fr_30px] gap-x-1 gap-y-1">
            {/* Column Headers: 4, 3, 2, 1 | Spacer */}
            {displayColIndices.map(colIdx => (
              <div key={colIdx} className="h-10 flex items-center justify-center">
                <span className={`text-2xl font-black ${isDark ? "text-indigo-400" : "text-indigo-700"}`}>
                  {colIdx + 1}
                </span>
              </div>
            ))}
            <div className="h-10"></div> {/* Row label column spacer */}

            {/* Rows with Arabic Letter labels at the end of the row */}
            {ARABIC_ALPHABET.map((letter, rowIdx) => (
              <React.Fragment key={rowIdx}>
                {displayColIndices.map(colIdx => {
                  const word = allWords[colIdx][rowIdx];
                  if (!word) return <div key={colIdx} className="h-8"></div>;
                  const wordLabel = lang === 'ar' ? word.textAr : word.text;
                  const isSelected = selection[1]?.id === word.id || selection[2]?.id === word.id || selection[3]?.id === word.id || selection[4]?.id === word.id;

                  return (
                    <div key={colIdx} className="group relative h-8">
                      <button
                        onClick={() => handleWordClick(word)}
                        title={wordLabel}
                        dir={lang === 'ar' ? 'rtl' : 'ltr'}
                        className={`w-full h-full text-center px-1 py-0.5 text-[9px] rounded transition-colors truncate border
                          ${isSelected
                            ? "bg-indigo-600 text-white border-indigo-500 shadow-sm"
                            : isDark ? "bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300" : "bg-gray-50 border-gray-100 hover:bg-indigo-100 text-gray-700"}
                        `}
                      >
                        {wordLabel}
                      </button>
                      {isAdmin && (
                        <div className={`absolute top-0 right-full mr-1 hidden group-hover:flex flex-col shadow-xl border p-2 z-50 w-44 rounded-md ${isDark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}`}>
                          <input 
                            type="text" 
                            value={lang === 'ar' ? word.textAr : word.text} 
                            onChange={(e) => updateWordText(colIdx, word.id, e.target.value)}
                            className={`border p-1 text-[10px] w-full mb-1 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500 ${isDark ? "bg-slate-900 border-slate-600 text-white" : "bg-white border-gray-300"}`}
                          />
                          <button className="text-[9px] bg-indigo-500 text-white p-1 rounded hover:bg-indigo-600 transition">{t.updateImg}</button>
                        </div>
                      )}
                    </div>
                  );
                })}
                {/* Row Label (Arabic Alphabet) - Fixed on the right of the palette grid */}
                <div className="flex items-center justify-center">
                  <span className={`text-sm font-bold ${isDark ? "text-slate-600" : "text-gray-400"}`}>
                    {letter}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Area - Story Visualization (Always on Left) */}
      <main className="flex-1 h-1/2 md:h-full flex flex-col overflow-hidden relative">
        <div className={`flex-1 relative flex items-center justify-center p-4 transition-colors duration-300 ${isDark ? "bg-slate-950" : "bg-gray-100"}`}>
          <div className="relative flex flex-col items-center justify-center scale-75 lg:scale-90 xl:scale-100 transition-transform">
            
            {/* Visual Grid Layout - No Border Colors as requested */}
            <div className="grid grid-cols-[150px_300px] grid-rows-[300px_300px] gap-8 items-end">
              
              {/* Box 1: Starter */}
              <div className="flex flex-col items-center justify-end h-full pb-4">
                <div className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${isDark ? "text-indigo-400" : "text-indigo-500"}`}>{t.starter}</div>
                <div className={`w-[150px] h-[150px] rounded-lg shadow-lg overflow-hidden flex items-center justify-center group relative transition-colors ${isDark ? "bg-slate-900" : "bg-white"}`}>
                  {selection[1] ? (
                    <img src={selection[1].imageUrl} alt={selection[1].text} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-gray-400 text-xs italic">...</div>
                  )}
                </div>
              </div>

              {/* Box 2: Initial State */}
              <div className="flex flex-col items-center justify-end h-full">
                <div className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${isDark ? "text-slate-500" : "text-gray-400"}`}>{t.initial}</div>
                <div className={`w-[300px] h-[300px] rounded-xl shadow-xl overflow-hidden flex items-center justify-center group relative transition-colors ${isDark ? "bg-slate-900" : "bg-white"}`}>
                  {selection[2] ? (
                    <img src={selection[2].imageUrl} alt={selection[2].text} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-gray-400 text-sm italic">...</div>
                  )}
                </div>
              </div>

              {/* Box 4: Pre-result */}
              <div className="flex flex-col items-center justify-start h-full pt-4">
                <div className={`w-[150px] h-[150px] rounded-lg shadow-lg overflow-hidden flex items-center justify-center group relative transition-colors ${isDark ? "bg-slate-900" : "bg-white"}`}>
                  {selection[4] ? (
                    <img src={selection[4].imageUrl} alt={selection[4].text} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-gray-400 text-xs italic">...</div>
                  )}
                </div>
                <div className={`text-[10px] font-bold uppercase tracking-widest mt-2 ${isDark ? "text-amber-500" : "text-amber-600"}`}>{t.preResult}</div>
              </div>

              {/* Box 3: Final Outcome */}
              <div className="flex flex-col items-center justify-start h-full">
                <div className={`w-[300px] h-[300px] rounded-xl shadow-xl overflow-hidden flex items-center justify-center group relative transition-colors ${isDark ? "bg-slate-900" : "bg-white"}`}>
                  {selection[3] ? (
                    <img src={selection[3].imageUrl} alt={selection[3].text} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-gray-400 text-sm italic">...</div>
                  )}
                </div>
                <div className={`text-[10px] font-bold uppercase tracking-widest mt-2 ${isDark ? "text-emerald-500" : "text-emerald-600"}`}>{t.outcome}</div>
              </div>
            </div>

            {/* Path Connectors */}
            <div className={`absolute inset-0 pointer-events-none opacity-20 ${isDark ? "text-indigo-900" : "text-indigo-200"}`}>
              <svg className="w-full h-full" viewBox="0 0 500 700">
                <path d="M 150 250 L 200 250" stroke="currentColor" fill="none" strokeWidth="2" strokeDasharray="4" />
                <path d="M 350 350 L 350 400" stroke="currentColor" fill="none" strokeWidth="2" strokeDasharray="4" />
                <path d="M 200 550 L 150 550" stroke="currentColor" fill="none" strokeWidth="2" strokeDasharray="4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Narrative Box */}
        <div className={`h-32 p-4 flex items-center justify-center shrink-0 border-t transition-colors duration-300 ${isDark ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"}`}>
          <div className="max-w-3xl w-full">
            <div className={`transition-all duration-300 ${loading ? "opacity-40 grayscale" : "opacity-100"}`}>
              {selection[1] && selection[2] && selection[3] && selection[4] ? (
                <div className={`flex items-start gap-4 ${lang === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="shrink-0 mt-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${isDark ? "bg-indigo-700" : "bg-indigo-600"}`}>
                      💬
                    </div>
                  </div>
                  <div className={`flex-1 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    <p className={`text-lg font-medium leading-tight ${isDark ? "text-slate-200" : "text-gray-800"}`}>
                      {storyText}
                    </p>
                    <p className={`text-[10px] mt-1 italic uppercase tracking-tighter ${isDark ? "text-slate-500" : "text-gray-400"}`}>{t.narrative}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center opacity-60">
                  <p className="text-sm font-bold uppercase tracking-widest">{t.waiting}</p>
                  <p className="text-xs">{t.waitingSub}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <div className={`fixed top-4 left-4 flex gap-2`}>
         <button 
           onClick={() => alert(t.help)}
           className={`w-8 h-8 rounded-full shadow border flex items-center justify-center transition-colors ${isDark ? "bg-slate-800 border-slate-700 text-indigo-400" : "bg-white border-gray-200 text-indigo-600"}`}
         >
           <span className="text-sm font-bold">?</span>
         </button>
      </div>
    </div>
  );
};

export default App;
