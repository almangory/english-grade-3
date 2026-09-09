import React, { useState, useRef, useEffect } from "react";
import { 
  Volume2, 
  Play, 
  Square, 
  Search, 
  BookOpen, 
  Headphones, 
  Sparkles
} from "lucide-react";
import { ALL_LISTENING_SCRIPTS } from "../smileData";
import { ListeningScriptItem } from "../types";

interface ListeningScriptsViewerProps {
  speakText: (text: string, voiceName?: string) => void;
  selectedUnitId?: number;
  onSelectUnitId?: (id: number) => void;
}

export default function ListeningScriptsViewer({
  speakText,
  selectedUnitId,
  onSelectUnitId
}: ListeningScriptsViewerProps) {
  const [selectedUnitFilter, setSelectedUnitFilter] = useState<number | "all">(
    selectedUnitId || "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [playingScriptId, setPlayingScriptId] = useState<string | null>(null);
  const [activeLineIndex, setActiveLineIndex] = useState<number | null>(null);
  const playTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (selectedUnitId && selectedUnitFilter !== "all" && selectedUnitFilter !== selectedUnitId) {
      setSelectedUnitFilter(selectedUnitId);
    }
  }, [selectedUnitId]);

  useEffect(() => {
    return () => {
      if (playTimerRef.current) clearTimeout(playTimerRef.current);
    };
  }, []);

  const handleUnitFilterChange = (unit: number | "all") => {
    setSelectedUnitFilter(unit);
    if (unit !== "all" && onSelectUnitId) {
      onSelectUnitId(unit);
    }
  };

  const filteredScripts = ALL_LISTENING_SCRIPTS.filter((script) => {
    const matchesUnit =
      selectedUnitFilter === "all" || script.unitId === selectedUnitFilter;
    const matchesQuery =
      searchQuery.trim() === "" ||
      script.activityTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.unitTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.lines.some(
        (l) =>
          l.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (l.arabic && l.arabic.includes(searchQuery)) ||
          (l.speaker && l.speaker.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    return matchesUnit && matchesQuery;
  });

  const stopSequentialPlay = () => {
    if (playTimerRef.current) {
      clearTimeout(playTimerRef.current);
      playTimerRef.current = null;
    }
    setPlayingScriptId(null);
    setActiveLineIndex(null);
  };

  const playScriptSequentially = (script: ListeningScriptItem) => {
    if (playingScriptId === script.id) {
      stopSequentialPlay();
      return;
    }

    stopSequentialPlay();
    setPlayingScriptId(script.id);

    let idx = 0;
    const playNextLine = () => {
      if (idx >= script.lines.length) {
        stopSequentialPlay();
        return;
      }

      setActiveLineIndex(idx);
      const line = script.lines[idx];
      const spoken = line.speaker ? `${line.speaker}: ${line.text}` : line.text;
      speakText(spoken);

      const durationMs = Math.max(2200, spoken.split(" ").length * 550);
      idx++;
      playTimerRef.current = setTimeout(playNextLine, durationMs);
    };

    playNextLine();
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-sky-900 text-white p-6 sm:p-8 rounded-[32px] shadow-lg border-4 border-purple-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Headphones className="w-48 h-48" />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-purple-500/30 text-purple-200 border border-purple-400/40 text-xs font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Pupil's Book • Pages 111 – 117
              </span>
              <span className="bg-amber-400 text-purple-950 text-xs font-extrabold px-3 py-1 rounded-full">
                SMILE 1
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
              Official Listening Scripts
            </h2>
            <p className="text-sm sm:text-base text-purple-200 mt-1 font-semibold">
              نصوص الاستماع الرسمية المعتمدة من وزارة التربية والتعليم - استمع وتدرب بالصوت والنص
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 text-center shrink-0">
            <span className="text-2xl font-black text-amber-300 block leading-none">
              {ALL_LISTENING_SCRIPTS.length}
            </span>
            <span className="text-[11px] font-bold text-purple-100 uppercase tracking-wider">
              Total Audio Scripts
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-[28px] border-2 border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search text, words or arabic meaning... (ابحث في نصوص الاستماع)"
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
          />
        </div>

        {/* Unit Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <button
            onClick={() => handleUnitFilterChange("all")}
            className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
              selectedUnitFilter === "all"
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All Units
          </button>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((unitNum) => (
            <button
              key={unitNum}
              onClick={() => handleUnitFilterChange(unitNum)}
              className={`px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                selectedUnitFilter === unitNum
                  ? "bg-purple-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              U{unitNum}
            </button>
          ))}
        </div>
      </div>

      {/* Script List */}
      <div className="grid grid-cols-1 gap-5">
        {filteredScripts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <Headphones className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-base font-bold text-slate-600">
              No listening scripts found matching your criteria.
            </p>
            <p className="text-xs text-slate-400 mt-1">
              حاول تغيير خيار الوحدة أو كلمة البحث.
            </p>
          </div>
        ) : (
          filteredScripts.map((script) => {
            const isPlayingThis = playingScriptId === script.id;

            return (
              <div
                key={script.id}
                className="bg-white rounded-[28px] border-2 border-slate-200/80 hover:border-purple-300 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col"
              >
                {/* Script Header */}
                <div className="bg-gradient-to-r from-purple-50 via-slate-50 to-indigo-50/40 p-4 sm:p-5 border-b border-slate-150 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-2xl bg-purple-600 text-white font-black flex items-center justify-center text-sm shadow-xs shrink-0">
                      U{script.unitId}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-purple-700 uppercase tracking-wider">
                          Unit {script.unitId}: {script.unitTitle} • Lesson {script.lessonId}
                        </span>
                        <span className="text-[10px] bg-purple-100 text-purple-900 font-black px-2 py-0.5 rounded-md">
                          Page {script.pageNumber}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                        {script.activityTitle}
                      </h3>
                    </div>
                  </div>

                  {/* Play All Button */}
                  <button
                    onClick={() => playScriptSequentially(script)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-xs active:scale-95 shrink-0 ${
                      isPlayingThis
                        ? "bg-rose-500 hover:bg-rose-600 text-white animate-pulse"
                        : "bg-purple-600 hover:bg-purple-700 text-white"
                    }`}
                  >
                    {isPlayingThis ? (
                      <>
                        <Square className="w-4 h-4 fill-white" />
                        <span>Stop Playing</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-white" />
                        <span>Play Full Script (تشغيل كامل)</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Dialogue / Script Lines */}
                <div className="p-4 sm:p-6 flex flex-col gap-2.5">
                  {script.lines.map((line, lineIdx) => {
                    const isLineActive = isPlayingThis && activeLineIndex === lineIdx;

                    return (
                      <div
                        key={lineIdx}
                        onClick={() => {
                          stopSequentialPlay();
                          const toSpeak = line.speaker
                            ? `${line.speaker}: ${line.text}`
                            : line.text;
                          speakText(toSpeak);
                        }}
                        className={`group p-3 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isLineActive
                            ? "bg-purple-100/70 border-purple-400 ring-2 ring-purple-300 shadow-sm"
                            : "bg-slate-50/70 hover:bg-purple-50/50 border-slate-200/70 hover:border-purple-200"
                        }`}
                      >
                        <div className="flex-1 flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3">
                          {line.speaker && (
                            <span className="text-[11px] sm:text-xs font-black uppercase px-2.5 py-1 rounded-lg bg-indigo-600 text-white self-start shrink-0 shadow-3xs">
                              {line.speaker}
                            </span>
                          )}
                          <div className="flex-1">
                            <p className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-purple-950 leading-snug">
                              "{line.text}"
                            </p>
                            {line.arabic && (
                              <p className="text-xs sm:text-sm font-semibold text-slate-500 group-hover:text-slate-700 mt-1 leading-normal">
                                {line.arabic}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 group-hover:bg-purple-600 group-hover:border-purple-600 flex items-center justify-center shrink-0 transition-colors shadow-3xs">
                          <Volume2 className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
