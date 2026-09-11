import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2 } from "lucide-react";
import { SMILE_UNITS } from "../smileData";
import { lookupCurriculumWord, CURRICULUM_DICTIONARY, DictionaryEntry } from "../curriculumDictionary";

interface InteractiveWordProps {
  word: string; // original word (might contain punctuation)
  cleanWord: string; // cleaned word
  voiceName: string;
  isHighlighted: boolean;
  speakText: any;
}

// Fast O(1) synchronous translation lookup with morphological lemmatization and curriculum fallback
export const getArabicTranslation = (cleanWord: string): string | null => {
  const entry = lookupCurriculumWord(cleanWord);
  if (entry && entry.arabic) {
    return entry.arabic;
  }

  // Fallback to searching inside SMILE_UNITS lists
  const normalized = cleanWord.trim().toLowerCase();
  for (const unit of SMILE_UNITS) {
    if (unit.words) {
      const match = unit.words.find(w => w.word.toLowerCase() === normalized);
      if (match) {
        return match.arabic;
      }
    }
  }

  return null;
};

// Fast O(1) synchronous child-friendly English definition lookup
export const getEnglishDefinition = (cleanWord: string): string | null => {
  const entry = lookupCurriculumWord(cleanWord);
  if (entry && entry.definition) {
    return entry.definition;
  }
  return null;
};

// Shared dynamic translation cache helper functions
const getPersistentTranslationCache = (): Record<string, string> => {
  try {
    const cached = localStorage.getItem("smile_translation_cache");
    return cached ? JSON.parse(cached) : {};
  } catch (e) {
    return {};
  }
};

const savePersistentTranslation = (word: string, translation: string) => {
  try {
    const cache = getPersistentTranslationCache();
    cache[word.toLowerCase().trim()] = translation;
    localStorage.setItem("smile_translation_cache", JSON.stringify(cache));
  } catch (e) {
    console.error("Failed to save persistent translation:", e);
  }
};

// Shared dynamic dictionary definition cache helper functions
const getPersistentDefinitionCache = (): Record<string, string> => {
  try {
    const cached = localStorage.getItem("smile_definition_cache");
    return cached ? JSON.parse(cached) : {};
  } catch (e) {
    return {};
  }
};

const savePersistentDefinition = (word: string, definition: string) => {
  try {
    const cache = getPersistentDefinitionCache();
    cache[word.toLowerCase().trim()] = definition;
    localStorage.setItem("smile_definition_cache", JSON.stringify(cache));
  } catch (e) {
    console.error("Failed to save persistent definition:", e);
  }
};

export default function InteractiveWord({
  word,
  cleanWord,
  voiceName,
  isHighlighted,
  speakText
}: any) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  
  const longPressTimerRef = React.useRef<any>(null);
  const hideTimerRef = React.useRef<any>(null);
  const touchStartPosRef = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasTriggeredLongPressRef = React.useRef<boolean>(false);

  const normalized = cleanWord.trim().toLowerCase();
  const localTranslation = getArabicTranslation(cleanWord);
  
  const getInitialTranslation = () => {
    if (localTranslation) return localTranslation;
    const persistentCache = getPersistentTranslationCache();
    return persistentCache[normalized] || null;
  };

  const getInitialDefinition = () => {
    const persistentCache = getPersistentDefinitionCache();
    return persistentCache[normalized] || null;
  };

  const [translation, setTranslation] = useState<string | null>(getInitialTranslation());
  const [definition, setDefinition] = useState<string | null>(getInitialDefinition());
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDefinition, setIsLoadingDefinition] = useState(false);

  // Check if touch device is active and clean up timers on unmount
  useEffect(() => {
    const handleTouch = () => {
      setIsTouchDevice(true);
    };
    window.addEventListener("touchstart", handleTouch, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouch);
      if (longPressTimerRef.current) clearTimeout(longPressTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  // Sync translation when cleanWord changes
  useEffect(() => {
    const local = getArabicTranslation(cleanWord);
    if (local) {
      setTranslation(local);
    } else {
      const cache = getPersistentTranslationCache();
      setTranslation(cache[normalized] || null);
    }
    const defCache = getPersistentDefinitionCache();
    setDefinition(defCache[normalized] || null);
  }, [cleanWord, normalized]);

  // Fetch translation if not available locally when tooltip is shown
  useEffect(() => {
    if (showTooltip && !translation && !isLoading) {
      setIsLoading(true);
      fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: cleanWord }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Translation request failed");
          return res.json();
        })
        .then((data) => {
          if (data.translation) {
            savePersistentTranslation(normalized, data.translation);
            setTranslation(data.translation);
          }
        })
        .catch((err) => {
          console.error("Failed to translate word dynamically:", err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [showTooltip, translation, cleanWord, isLoading, normalized]);

  // Fetch definition from Free Dictionary API if not available locally when tooltip is shown
  useEffect(() => {
    if (showTooltip && !definition && !isLoadingDefinition) {
      setIsLoadingDefinition(true);
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(normalized)}`)
        .then((res) => {
          if (!res.ok) throw new Error("Definition request failed or word not found");
          return res.json();
        })
        .then((data) => {
          if (data && data[0] && data[0].meanings && data[0].meanings[0]) {
            const firstMeaning = data[0].meanings[0];
            const partOfSpeech = firstMeaning.partOfSpeech || "";
            const defText = firstMeaning.definitions && firstMeaning.definitions[0]
              ? firstMeaning.definitions[0].definition
              : "";
            
            if (defText) {
              const fullDef = partOfSpeech ? `(${partOfSpeech}) ${defText}` : defText;
              savePersistentDefinition(normalized, fullDef);
              setDefinition(fullDef);
            } else {
              setDefinition("No definition available");
            }
          } else {
            setDefinition("No definition available");
          }
        })
        .catch((err) => {
          console.warn("Failed to retrieve dictionary definition:", err);
          setDefinition("No definition available");
        })
        .finally(() => {
          setIsLoadingDefinition(false);
        });
    }
  }, [showTooltip, definition, isLoadingDefinition, normalized]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouchDevice(true);
    setIsPressing(true);
    e.stopPropagation();

    // Clear any active timers
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }

    hasTriggeredLongPressRef.current = false;

    // Record the starting touch coordinate to check for scrolls
    if (e.touches && e.touches[0]) {
      touchStartPosRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    }

    // Set timer for long press activation (450ms is perfect)
    longPressTimerRef.current = setTimeout(() => {
      hasTriggeredLongPressRef.current = true;
      setShowTooltip(true);

      // Trigger standard touch vibration for responsive haptic feedback
      if (navigator.vibrate) {
        try {
          navigator.vibrate(40);
        } catch (err) {
          // ignore
        }
      }
    }, 450);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!longPressTimerRef.current) return;

    if (e.touches && e.touches[0]) {
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = Math.abs(currentX - touchStartPosRef.current.x);
      const diffY = Math.abs(currentY - touchStartPosRef.current.y);

      // Cancel long press if scrolled / dragged beyond 10px
      if (diffX > 10 || diffY > 10) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
        setIsPressing(false);
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    
    // Prevent the ghost/simulated click event to avoid double triggering on mobile devices
    e.preventDefault();
    
    setIsPressing(false);

    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    if (hasTriggeredLongPressRef.current) {
      // Long press was successfully triggered. Keep tooltip open and auto-fade after 4.5 seconds
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
      hideTimerRef.current = setTimeout(() => {
        setShowTooltip(false);
      }, 4500);
    } else {
      // Short tap: Pronounce/Speak the word
      speakText(cleanWord, voiceName);
    }
  };

  const handleTouchCancel = () => {
    setIsPressing(false);
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setShowTooltip(false);
    }
  };

  return (
    <span 
      className={`relative inline-block ${isTouchDevice ? "select-none" : "select-all"}`}
      style={{
        WebkitTouchCallout: "none",
        WebkitUserSelect: isTouchDevice ? "none" : "auto",
        userSelect: isTouchDevice ? "none" : "auto"
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      onContextMenu={(e) => {
        if (isTouchDevice) {
          // Prevent browser context-menu popup overlay on mobile long-press
          e.preventDefault();
        }
      }}
    >
      <span
        onClick={(e) => {
          e.stopPropagation(); // Stop parent click/touch from speaking whole line
          speakText(cleanWord, voiceName);
        }}
        className={`inline-block cursor-pointer px-1 rounded transition-all duration-150 transform ${
          isHighlighted 
            ? "bg-amber-400 text-slate-900 font-extrabold scale-110 shadow-md ring-2 ring-amber-300" 
            : isPressing
              ? "bg-amber-100 text-amber-950 scale-95 font-extrabold ring-1 ring-amber-300 shadow-inner"
              : "hover:bg-yellow-200 active:bg-yellow-300 text-indigo-950 border-b border-dashed border-indigo-300 hover:border-yellow-600 font-extrabold hover:scale-105"
        }`}
        title={`Click to read: ${cleanWord}`}
      >
        {word}
      </span>

      <AnimatePresence>
        {showTooltip && (translation || isLoading || definition || isLoadingDefinition) && (
          <motion.span
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 23, mass: 0.8 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 z-50 px-3.5 py-2.5 bg-slate-950/95 text-white text-xs rounded-2xl shadow-2xl border border-slate-800/80 flex flex-col gap-1.5 min-w-[150px] w-64 max-w-[280px] md:max-w-[320px] whitespace-normal text-right leading-normal"
            style={{ originX: 0.5, originY: 1 }}
            dir="rtl"
            // Stop touch and click events from bubbling up and triggering outer span's handlers
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Small down arrow indicator */}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-950" />
            
            <span className="flex items-center justify-between gap-2 border-b border-slate-850 pb-1.5 mb-0.5 w-full" dir="ltr">
              <span className="flex items-center gap-1.5">
                <span className="text-amber-400 font-sans font-black tracking-wide text-[13px]">
                  {cleanWord}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakText(cleanWord, voiceName);
                  }}
                  className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer border border-slate-800 flex items-center justify-center active:scale-90"
                  title="Pronounce word"
                  aria-label="Pronounce word"
                >
                  <Volume2 className="w-3 h-3" />
                </button>
              </span>
              <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest px-1.5 py-0.5 bg-slate-900 rounded border border-slate-800/80">
                Dictionary
              </span>
            </span>

            {/* Translation (Arabic) */}
            <span className="flex items-center justify-between gap-1 w-full" dir="rtl">
              <span className="text-slate-400 font-medium text-[10px]">الترجمة:</span>
              {isLoading ? (
                <span className="text-slate-400 text-[10px] animate-pulse flex items-center gap-1" dir="rtl">
                  <svg className="animate-spin h-2.5 w-2.5 text-amber-400 inline-block" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  جاري الترجمة...
                </span>
              ) : (
                <span className="text-white font-black text-xs">
                  {translation || "غير متوفرة"}
                </span>
              )}
            </span>

            {/* Definition (English) */}
            <span className="flex flex-col gap-0.5 text-left border-t border-slate-900 pt-1.5 mt-0.5 w-full" dir="ltr">
              <span className="text-slate-400 font-medium text-[10px]">Definition:</span>
              {isLoadingDefinition ? (
                <span className="text-slate-500 text-[10px] animate-pulse flex items-center gap-1">
                  <svg className="animate-spin h-2.5 w-2.5 text-amber-400 inline-block" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Loading definition...
                </span>
              ) : definition && definition !== "No definition available" ? (
                <span className="text-slate-200 text-[10.5px] leading-relaxed font-sans font-medium">
                  {definition}
                </span>
              ) : (
                <span className="text-slate-500 text-[10px] italic">
                  No English definition found
                </span>
              )}
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
