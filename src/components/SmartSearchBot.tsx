import React, { useState, useEffect, useRef } from "react";
import { 
  MessageCircle, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Trash2, 
  BookOpen, 
  Phone, 
  PhoneOff, 
  Camera, 
  CameraOff, 
  RefreshCw, 
  Image as ImageIcon, 
  Upload, 
  Check, 
  Radio, 
  Smile, 
  Star, 
  HelpCircle,
  Award,
  BookMarked,
  ArrowRight,
  Maximize2,
  Minimize2,
  Volume1,
  Headphones
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { searchSMILECurriculum, SearchResult } from "../smartSearch";
import { Lesson, UnitItem, WordItem } from "../types";

const CLOUD_FALLBACK_ENDPOINT = "https://local-ai-arsenal.pages.dev/api/mentor/chat";
const NAQLA_BOT_AVATAR = "/assets/naqla_bot_avatar.png";

interface SmartSearchBotProps {
  onSelectLesson?: (lesson: Lesson, unitId: number) => void;
  speakText?: (text: string, voiceName?: string) => void;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
}

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  image?: string;
  result?: SearchResult;
  media?: {
    type: "video" | "image";
    title: string;
    url?: string;
    embed_url?: string;
    channel?: string;
  };
  timestamp: Date;
}

const GRADE_3_QUICK_PROMPTS = [
  { label: "🔤 Phonics & ABCs", query: "Can we practice Phonics and letter sounds?" },
  { label: "🎨 Colors & Numbers", query: "Teach me colors and numbers from 1 to 20!" },
  { label: "🐶 Animals & Pets", query: "What are the animal names in English?" },
  { label: "🏫 School & Classroom", query: "What are my school items in English?" },
  { label: "👨‍👩‍👧 Family Members", query: "How do I talk about my family in English?" },
  { label: "💡 Show Me Al-Zayt!", query: "اديني الزيت في انجليزي الصف الثالث الابتدائي" }
];

export default function SmartSearchBot({ 
  onSelectLesson, 
  speakText, 
  isOpen: controlledIsOpen, 
  setIsOpen: controlledSetIsOpen 
}: SmartSearchBotProps) {
  const [localIsOpen, setLocalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : localIsOpen;
  const setIsOpen = controlledSetIsOpen !== undefined ? controlledSetIsOpen : setLocalIsOpen;

  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hello superstar! 🤖🌟 I am **Naqla Bot (نقلة بوت)**, your friendly English AI Teacher from **Naqla Platform**!\n\nI am here to help you practice speaking, phonics, vocabulary, and reading for your **SMILE Grade 3 English** book.\n\n✨ You can:\n- 💬 Type any English question\n- 🎙️ Click the **Mic** to talk to me\n- 📞 Click **Live Call** for a real voice conversation (you can interrupt me anytime!)\n- 📸 Click the **Camera** to show me your book or homework!",
      timestamp: new Date()
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [botSoundEnabled, setBotSoundEnabled] = useState(true);

  // Live Call State
  const [isLiveCallActive, setIsLiveCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [callSubtitle, setCallSubtitle] = useState("Connecting to Naqla Bot...");
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);
  const [isUserTalking, setIsUserTalking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [userMicLevel, setUserMicLevel] = useState(0);

  // Camera & vision state
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // Connection endpoint resolution state
  const [resolvedEndpoint, setResolvedEndpoint] = useState<string>(CLOUD_FALLBACK_ENDPOINT);
  const [isLocalConnected, setIsLocalConnected] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const callRecognitionRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const callTimerRef = useRef<any>(null);

  // AudioContext for Barge-in sound detection
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const bargeInCheckIntervalRef = useRef<any>(null);
  const silenceTimerRef = useRef<any>(null);
  const currentAccumulatedTranscript = useRef<string>("");
  const isBotSpeakingRef = useRef<boolean>(false);
  const isCallActiveRef = useRef<boolean>(false);

  // Keep refs in sync with state for instantaneous event callbacks
  useEffect(() => {
    isBotSpeakingRef.current = isBotSpeaking;
  }, [isBotSpeaking]);

  useEffect(() => {
    isCallActiveRef.current = isLiveCallActive;
  }, [isLiveCallActive]);

  // 1. Detect and resolve active local tunnel or cloud fallback
  useEffect(() => {
    let isMounted = true;
    async function resolveEndpoint() {
      const candidates = [
        "http://127.0.0.1:8000/api/mentor/chat",
        "http://localhost:8000/api/mentor/chat"
      ];
      for (const url of candidates) {
        try {
          const controller = new AbortController();
          const tid = setTimeout(() => controller.abort(), 1200);
          const res = await fetch(url.replace("/chat", "/health"), { signal: controller.signal });
          clearTimeout(tid);
          if (res.ok && isMounted) {
            setResolvedEndpoint(url);
            setIsLocalConnected(true);
            return;
          }
        } catch (e) {
          // continue checking
        }
      }
      if (isMounted) {
        setResolvedEndpoint(CLOUD_FALLBACK_ENDPOINT);
        setIsLocalConnected(false);
      }
    }
    resolveEndpoint();
    return () => { isMounted = false; };
  }, []);

  // 2. Setup speech recognition for regular chat
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = "en-US";
      
      rec.onstart = () => setIsListening(true);
      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setQuery(transcript);
          sendMessage(transcript);
        }
        setIsListening(false);
      };
      rec.onerror = () => setIsListening(false);
      rec.onend = () => setIsListening(false);
      recognitionRef.current = rec;
    }
  }, []);

  // 3. Scroll to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  // 4. Live Call Duration Timer
  useEffect(() => {
    if (isLiveCallActive) {
      setCallDuration(0);
      callTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
        callTimerRef.current = null;
      }
    }
    return () => {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
    };
  }, [isLiveCallActive]);

  // ⚡ 5. THE BARGE-IN INTERRUPTION ENGINE (مقاطعة الكلام الفورية)
  // When the child speaks, Naqla Bot cuts off immediately and listens!
  const triggerBargeInInterruption = () => {
    if (isBotSpeakingRef.current) {
      // 1. Stop speech synthesis immediately
      window.speechSynthesis.cancel();
      isBotSpeakingRef.current = false;
      setIsBotSpeaking(false);
      setIsUserTalking(true);
      setCallSubtitle("I hear you! I'm listening... 👂✨");
      console.log("⚡ Barge-in triggered! Naqla Bot cut off speech to listen to student.");
    }
  };

  // Start Mic Volume Monitoring for instant sound-based barge-in
  const startMicBargeInMonitor = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.4;
      source.connect(analyser);
      analyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      // Check audio levels 20 times per second (every 50ms)
      bargeInCheckIntervalRef.current = setInterval(() => {
        if (!isCallActiveRef.current || !analyserRef.current) return;

        analyserRef.current.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const average = sum / dataArray.length;
        const normalizedVolume = Math.min(100, Math.round((average / 128) * 100));
        setUserMicLevel(normalizedVolume);

        // Volume threshold for human speech (ambient room noise is usually < 12-15)
        if (normalizedVolume > 18) {
          setIsUserTalking(true);
          // If bot was speaking, cut it off NOW!
          if (isBotSpeakingRef.current) {
            triggerBargeInInterruption();
          }
        } else {
          setIsUserTalking(false);
        }
      }, 50);

    } catch (err) {
      console.warn("Microphone barge-in monitor init error:", err);
    }
  };

  const stopMicBargeInMonitor = () => {
    if (bargeInCheckIntervalRef.current) {
      clearInterval(bargeInCheckIntervalRef.current);
      bargeInCheckIntervalRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(t => t.stop());
      micStreamRef.current = null;
    }
    if (audioContextRef.current) {
      try { audioContextRef.current.close(); } catch(e) {}
      audioContextRef.current = null;
    }
    analyserRef.current = null;
  };

  // English Voice Synthesis
  const speakEnglish = (text: string, onEndCallback?: () => void) => {
    if (!botSoundEnabled && !isCallActiveRef.current) {
      if (onEndCallback) onEndCallback();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const clean = text.replace(/[*#`_\[\]()]/g, "").replace(/\n/g, " ").trim();
      if (!clean) {
        if (onEndCallback) onEndCallback();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = "en-US";
      utterance.rate = 0.94; // Friendly, clear primary grade pace
      utterance.pitch = 1.05;

      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(v => v.lang.startsWith("en-US") && v.name.toLowerCase().includes("natural")) ||
                           voices.find(v => v.lang.startsWith("en-US")) ||
                           voices.find(v => v.lang.startsWith("en-GB")) ||
                           voices.find(v => v.lang.startsWith("en"));
      if (englishVoice) {
        utterance.voice = englishVoice;
      }

      utterance.onstart = () => {
        isBotSpeakingRef.current = true;
        setIsBotSpeaking(true);
      };

      utterance.onend = () => {
        isBotSpeakingRef.current = false;
        setIsBotSpeaking(false);
        if (onEndCallback) onEndCallback();
      };

      utterance.onerror = () => {
        isBotSpeakingRef.current = false;
        setIsBotSpeaking(false);
        if (onEndCallback) onEndCallback();
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis error:", e);
      isBotSpeakingRef.current = false;
      setIsBotSpeaking(false);
      if (onEndCallback) onEndCallback();
    }
  };

  // Setup Continuous Call Speech Recognition with Barge-in Interruption
  const startCallRecognitionLoop = () => {
    if (isMuted || !isCallActiveRef.current) return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    try {
      if (callRecognitionRef.current) {
        try { callRecognitionRef.current.abort(); } catch(e) {}
      }
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "en-US";

      rec.onsoundstart = () => {
        // Child started making sound: immediately interrupt bot if speaking!
        triggerBargeInInterruption();
      };

      rec.onspeechstart = () => {
        // Child started speech: immediately interrupt bot if speaking!
        triggerBargeInInterruption();
      };

      rec.onresult = (event: any) => {
        // As soon as any word or interim syllable is detected: interrupt bot!
        triggerBargeInInterruption();

        let interimText = "";
        let finalText = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalText += event.results[i][0].transcript;
          } else {
            interimText += event.results[i][0].transcript;
          }
        }

        const activeDisplay = finalText || interimText;
        if (activeDisplay) {
          setCallSubtitle(`"${activeDisplay}"`);
          currentAccumulatedTranscript.current = (currentAccumulatedTranscript.current + " " + activeDisplay).trim();
        }

        // If final sentence delivered, or pause detected: trigger response
        if (finalText) {
          if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = setTimeout(() => {
            const toSend = currentAccumulatedTranscript.current;
            currentAccumulatedTranscript.current = "";
            sendCallMessage(toSend);
          }, 700);
        }
      };

      rec.onerror = (e: any) => {
        if (isCallActiveRef.current && !isBotSpeakingRef.current) {
          setTimeout(startCallRecognitionLoop, 1200);
        }
      };

      rec.onend = () => {
        if (isCallActiveRef.current && !isLoading) {
          // Restart recognition to stay live
          setTimeout(startCallRecognitionLoop, 350);
        }
      };

      callRecognitionRef.current = rec;
      rec.start();
    } catch (e) {
      console.warn("Call recognition start error:", e);
    }
  };

  // Send message during Live Call
  const sendCallMessage = async (userText: string) => {
    if (!userText.trim()) return;
    setIsLoading(true);
    setCallSubtitle("Naqla Bot is thinking... 🤖💭");

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text: userText,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);

    try {
      const historyPayload = messages.slice(-6).map(m => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text
      }));

      const res = await fetch(resolvedEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          stage: "english-grade-3",
          is_voice_call: true,
          history: historyPayload
        })
      });

      let replyText = "";
      if (res.ok) {
        const data = await res.json();
        replyText = data.reply || data.text || "That's great! Let's keep talking!";
      } else {
        const localRes = searchSMILECurriculum(userText);
        replyText = localRes.reply || "Good job! Say it one more time for me!";
      }

      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: "bot",
        text: replyText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      setCallSubtitle(replyText);

      // Speak response aloud — but child can interrupt at any moment!
      speakEnglish(replyText);
    } catch (err) {
      const fallbackMsg = "Superstar! Let's practice saying: Hello Naqla Bot!";
      setCallSubtitle(fallbackMsg);
      speakEnglish(fallbackMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle Live Audio Call
  const toggleLiveCall = () => {
    if (isLiveCallActive) {
      // Hang up
      setIsLiveCallActive(false);
      window.speechSynthesis.cancel();
      isBotSpeakingRef.current = false;
      setIsBotSpeaking(false);
      stopMicBargeInMonitor();
      if (callRecognitionRef.current) {
        try { callRecognitionRef.current.abort(); } catch(e) {}
      }
    } else {
      // Answer / Start Call
      window.speechSynthesis.cancel();
      setIsLiveCallActive(true);
      startMicBargeInMonitor();
      const greeting = "Hello! I am Naqla Bot! I can hear you clearly. You can speak to me or interrupt me anytime!";
      setCallSubtitle(greeting);
      speakEnglish(greeting, () => {
        setTimeout(startCallRecognitionLoop, 200);
      });
      startCallRecognitionLoop();
    }
  };

  // Send message in regular chat
  const sendMessage = async (textToSend?: string) => {
    const rawText = textToSend !== undefined ? textToSend : query;
    if (!rawText.trim() && !capturedImage) return;

    const userText = rawText.trim();
    const currentImg = capturedImage;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text: userText || "📸 [Shared a picture from Camera]",
      image: currentImg || undefined,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setQuery("");
    setCapturedImage(null);
    setIsLoading(true);

    try {
      let replyText = "";
      let mediaData = undefined;

      if (currentImg) {
        try {
          const scanUrl = resolvedEndpoint.replace("/api/mentor/chat", "/api/mentor/scan-camera-question");
          const byteString = atob(currentImg.split(",")[1]);
          const mimeString = currentImg.split(",")[0].split(":")[1].split(";")[0];
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ab], { type: mimeString });
          const formData = new FormData();
          formData.append("image", blob, "camera_capture.jpg");
          formData.append("stage", "english-grade-3");
          formData.append("history", JSON.stringify(messages.slice(-4).map(m => ({ role: m.sender === "user" ? "user" : "assistant", content: m.text }))));

          const scanRes = await fetch(scanUrl, {
            method: "POST",
            body: formData
          });

          if (scanRes.ok) {
            const scanData = await scanRes.json();
            replyText = scanData.reply || `I looked at your picture! 📸🌟 ${scanData.extracted_text ? `It says: "${scanData.extracted_text}".` : "Let's read this together!"}`;
          }
        } catch (imgErr) {
          console.warn("Camera scan error:", imgErr);
        }
      }

      if (!replyText) {
        const historyPayload = messages.slice(-6).map(m => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text
        }));

        const res = await fetch(resolvedEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: userText || "Look at the picture I sent!",
            stage: "english-grade-3",
            history: historyPayload
          })
        });

        if (res.ok) {
          const data = await res.json();
          replyText = data.reply || data.text;
          if (data.media) mediaData = data.media;
        } else {
          const localSearch = searchSMILECurriculum(userText);
          replyText = localSearch.reply;
        }
      }

      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: "bot",
        text: replyText || "Great job practicing! Keep it up!",
        media: mediaData,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);

      if (botSoundEnabled) {
        speakEnglish(replyText);
      }
    } catch (error) {
      console.warn("Fetch error, using local fallback:", error);
      const localResult = searchSMILECurriculum(userText);
      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: "bot",
        text: localResult.reply,
        result: localResult,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      if (botSoundEnabled) {
        speakEnglish(localResult.reply);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Camera Management
  const startCamera = async () => {
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (e) {
      console.warn("Camera stream error, falling back to file input:", e);
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setIsCameraOpen(false);
  };

  const takePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      setCapturedImage(dataUrl);
      stopCamera();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setCapturedImage(event.target?.result as string);
      stopCamera();
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const toggleMic = () => {
    if (!speechSupported || !recognitionRef.current) {
      alert("Microphone voice input is not supported in this browser or permissions were not granted.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      window.speechSynthesis.cancel();
      recognitionRef.current.start();
    }
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="no-print relative z-50">
      {/* 
        1. Floating Action Button (FAB) featuring Naqla Bot Mascot
        📍 ELEVATED POSITION: bottom-20 (80px) on mobile so it never covers bottom nav bar icons!
        On desktop (sm:), smoothly positions at bottom-8.
      */}
      <motion.button
        id="smart-search-fab"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-20 sm:bottom-8 right-3 sm:right-6 bg-gradient-to-br from-sky-500 via-indigo-600 to-violet-700 text-white p-2 sm:p-2.5 rounded-full shadow-[0_8px_30px_rgba(3,105,161,0.5)] cursor-pointer flex items-center justify-center border-[3px] border-white select-none transition-all hover:shadow-[0_12px_35px_rgba(79,70,229,0.65)] group z-40"
        title="Naqla Bot • English AI Tutor"
      >
        <span className="absolute -top-2 -left-2 bg-gradient-to-r from-amber-400 to-rose-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full animate-bounce shadow-md flex items-center gap-1 border border-white/50">
          <Sparkles className="w-2.5 h-2.5 fill-white" />
          AI BOT
        </span>

        {isOpen ? (
          <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
            <X className="w-6 h-6 text-white" />
          </div>
        ) : (
          <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12">
            <img 
              src={NAQLA_BOT_AVATAR} 
              alt="Naqla Bot Avatar" 
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-full drop-shadow-md group-hover:scale-110 transition-transform"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
            {/* Pulsing online badge */}
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white animate-pulse" />
          </div>
        )}
      </motion.button>

      {/* 2. Interactive Chat Window Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="smart-search-chat-window"
            initial={{ opacity: 0, scale: 0.88, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 40 }}
            className="fixed bottom-24 sm:bottom-24 right-2 sm:right-6 w-[95vw] sm:w-[460px] h-[640px] max-h-[82vh] bg-white rounded-[32px] shadow-[0_25px_60px_rgba(15,23,42,0.25)] border-4 border-sky-500/80 flex flex-col overflow-hidden z-50 font-sans"
            style={{ direction: "ltr" }}
          >
            {/* Header with Naqla Bot identity and Direct Live Call button */}
            <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-violet-700 text-white p-3.5 sm:p-4 flex items-center justify-between border-b-2 border-sky-300 shadow-sm shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-2xl bg-white/15 p-0.5 flex items-center justify-center border border-white/30 shadow-inner">
                  <img 
                    src={NAQLA_BOT_AVATAR} 
                    alt="Naqla Bot" 
                    className="w-full h-full object-contain rounded-xl"
                  />
                  <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${isLocalConnected ? "bg-emerald-400" : "bg-sky-300"}`} title={isLocalConnected ? "Local AI Server Connected" : "Cloudflare Edge Connected"} />
                </div>
                <div className="text-left">
                  <h3 className="font-black text-sm sm:text-base leading-tight flex items-center gap-1.5">
                    NAQLA BOT
                    <span className="text-[10px] bg-amber-400 text-slate-900 font-extrabold px-1.5 py-0.5 rounded-md shadow-xs">
                      Primary 3
                    </span>
                  </h3>
                  <p className="text-[11px] font-bold text-sky-100/90 flex items-center gap-1">
                    English Teacher • منصة نَقْـلَة 🇸🇩
                  </p>
                </div>
              </div>

              {/* Action buttons: Live Call, Audio Mute, and Close */}
              <div className="flex items-center gap-1.5">
                {/* Direct Live Call Button */}
                <button
                  onClick={toggleLiveCall}
                  className="bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/30 animate-pulse"
                  title="Start Live Audio Call with Naqla Bot"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </button>

                <button
                  onClick={() => {
                    const nextState = !botSoundEnabled;
                    setBotSoundEnabled(nextState);
                    if (!nextState) window.speechSynthesis.cancel();
                  }}
                  className={`p-2 rounded-xl transition-all ${botSoundEnabled ? "bg-white/15 text-white hover:bg-white/25" : "bg-rose-500/40 text-rose-100"}`}
                  title={botSoundEnabled ? "Mute English Voice" : "Enable English Voice"}
                >
                  {botSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
                  title="Close Assistant"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Grade 3 English Topics Bar */}
            <div className="bg-sky-50/90 border-b border-sky-100 px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 text-xs">
              <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" /> Topics:
              </span>
              {GRADE_3_QUICK_PROMPTS.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(chip.query)}
                  className="shrink-0 bg-white hover:bg-sky-100 text-sky-900 border border-sky-200 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-2xs"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Chat Messages Feed */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-gradient-to-b from-sky-50/40 via-white to-slate-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Sender Avatar */}
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-sky-200 shadow-xs mt-0.5">
                    {msg.sender === "bot" ? (
                      <img src={NAQLA_BOT_AVATAR} alt="Bot" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-sky-500 text-white flex items-center justify-center font-bold text-xs">
                        Me
                      </div>
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[82%] rounded-2xl p-3 shadow-xs text-xs sm:text-[13px] leading-relaxed select-text ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-tr-none"
                        : "bg-white text-slate-800 border border-slate-200/80 rounded-tl-none"
                    }`}
                  >
                    {/* Attached Image if any */}
                    {msg.image && (
                      <div className="mb-2 rounded-xl overflow-hidden border border-white/20 shadow-sm max-h-48">
                        <img src={msg.image} alt="User submission" className="w-full h-full object-cover" />
                      </div>
                    )}

                    {/* Message Text with simple bold parser */}
                    <div className="whitespace-pre-wrap font-medium">
                      {msg.text.split("\n").map((line, i) => (
                        <p key={i} className={i > 0 ? "mt-1.5" : ""}>
                          {line}
                        </p>
                      ))}
                    </div>

                    {/* YouTube Video Recommendation if provided */}
                    {msg.media && msg.media.embed_url && (
                      <div className="mt-2.5 rounded-xl overflow-hidden border border-sky-200 bg-sky-50 p-2 text-left">
                        <p className="text-[11px] font-bold text-sky-800 mb-1 flex items-center gap-1">
                          🎬 {msg.media.title}
                        </p>
                        <iframe
                          src={msg.media.embed_url}
                          title={msg.media.title}
                          className="w-full aspect-video rounded-lg"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}

                    {/* Lesson jump button if matching curriculum */}
                    {msg.result && msg.result.lesson && onSelectLesson && (
                      <button
                        onClick={() => onSelectLesson(msg.result!.lesson!, msg.result!.unitId || 1)}
                        className="mt-2.5 bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Open Lesson in SMILE Book</span>
                      </button>
                    )}

                    {/* Audio read-aloud button for bot messages */}
                    {msg.sender === "bot" && (
                      <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                        <span>Naqla Bot • Grade 3</span>
                        <button
                          onClick={() => speakEnglish(msg.text)}
                          className="hover:text-sky-600 flex items-center gap-1 font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 px-2 py-0.5 rounded-md transition-all"
                          title="Listen in English"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>Listen 🔊</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-sky-200 shadow-xs">
                    <img src={NAQLA_BOT_AVATAR} alt="Bot" className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-3 shadow-xs flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                    <span className="text-xs text-slate-500 font-bold">Naqla Bot is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Image Preview Bar before sending */}
            {capturedImage && (
              <div className="bg-amber-50 border-t border-amber-200 px-4 py-2 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <img src={capturedImage} alt="Preview" className="w-10 h-10 object-cover rounded-lg border border-amber-300" />
                  <span className="font-bold text-amber-900">Photo ready to send to Naqla Bot! 📸</span>
                </div>
                <button
                  onClick={() => setCapturedImage(null)}
                  className="text-amber-800 hover:text-rose-600 font-bold"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Input Bar: Camera, Mic, Text Input, Send */}
            <div className="p-3 bg-white border-t border-slate-200/90 flex items-center gap-2 shrink-0">
              {/* Camera Trigger */}
              <button
                onClick={startCamera}
                className="p-2.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-700 transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
                title="Scan Book or Homework with Camera"
              >
                <Camera className="w-4 h-4" />
              </button>

              {/* Voice Recognition Trigger */}
              <button
                onClick={toggleMic}
                className={`p-2.5 rounded-xl transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95 ${
                  isListening
                    ? "bg-rose-500 text-white animate-pulse"
                    : "bg-indigo-100 hover:bg-indigo-200 text-indigo-700"
                }`}
                title={isListening ? "Listening... click to stop" : "Speak in English"}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Text Input */}
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Ask in English (e.g. What is apple?)..."
                className="flex-1 bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-800 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none transition-all"
              />

              {/* Send Button */}
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || (!query.trim() && !capturedImage)}
                className="p-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        3. Direct Live Call Modal Interface (الاتصال المباشر مع مقاطعة الكلام الفورية Barge-in)
      */}
      <AnimatePresence>
        {isLiveCallActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 font-sans select-none"
            style={{ direction: "ltr" }}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              className="w-full max-w-lg bg-gradient-to-b from-slate-900 via-sky-950 to-indigo-950 border-2 border-sky-400/60 rounded-[36px] p-6 shadow-[0_25px_70px_rgba(3,105,161,0.5)] flex flex-col items-center text-white relative overflow-hidden"
            >
              {/* Call Header */}
              <div className="w-full flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${isUserTalking ? "bg-amber-400 animate-ping" : "bg-emerald-400 animate-pulse"}`} />
                  <span className="text-xs font-black tracking-wider text-emerald-300 uppercase flex items-center gap-1.5">
                    Live Audio Call • مكالمة مباشرة
                  </span>
                </div>
                <div className="text-xs font-mono font-bold bg-white/10 px-3 py-1 rounded-full border border-white/20">
                  ⏱️ {formatTimer(callDuration)}
                </div>
              </div>

              {/* Instant Interruption Badge Indicator */}
              <div className="mt-3 bg-sky-500/20 border border-sky-400/30 text-sky-200 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <ZapIcon />
                <span>Real-Time Interruption: Speak anytime to cut off Naqla Bot!</span>
              </div>

              {/* Animated Mascot Avatar Area */}
              <div className="my-6 relative flex flex-col items-center justify-center">
                {/* Expanding Glowing Waves */}
                <div className={`absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-sky-500/20 blur-xl ${isBotSpeaking ? "animate-ping scale-110" : ""}`} />
                <div className={`absolute w-36 h-36 sm:w-48 sm:h-48 rounded-full border-2 border-sky-400/40 ${isBotSpeaking ? "animate-pulse scale-105" : ""}`} />

                {/* Naqla Bot Avatar Image */}
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-tr from-sky-400/20 to-indigo-500/20 p-2 border-4 border-sky-400 shadow-[0_0_40px_rgba(56,189,248,0.5)] flex items-center justify-center overflow-hidden">
                  <img
                    src={NAQLA_BOT_AVATAR}
                    alt="Naqla Bot Live"
                    className={`w-full h-full object-contain ${isBotSpeaking ? "animate-bounce" : "hover:scale-105 transition-transform"}`}
                  />
                </div>

                {/* Sound wave visualizer bars - dynamically reflects both bot and pupil speech */}
                <div className="mt-5 flex items-center gap-1.5 h-6">
                  {[...Array(9)].map((_, i) => (
                    <span
                      key={i}
                      className={`w-1 rounded-full transition-all duration-100 ${
                        isUserTalking
                          ? "bg-amber-400 h-6 scale-110 animate-pulse"
                          : isBotSpeaking
                          ? "bg-sky-400 h-5 animate-pulse"
                          : "bg-slate-600 h-1.5 opacity-40"
                      }`}
                      style={{ animationDelay: `${i * 90}ms` }}
                    />
                  ))}
                </div>

                <h3 className="text-lg sm:text-xl font-black mt-3 flex items-center gap-2">
                  Naqla Bot
                  <span className="text-xs bg-sky-500 text-white font-bold px-2 py-0.5 rounded-full">
                    نقلة بوت
                  </span>
                </h3>
              </div>

              {/* Live Subtitle / Speech Bubble */}
              <div className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 min-h-[90px] flex items-center justify-center text-center mb-6">
                <p className="text-xs sm:text-sm font-medium text-sky-100 italic leading-relaxed">
                  {callSubtitle}
                </p>
              </div>

              {/* Live Call Control Actions */}
              <div className="flex items-center gap-4">
                {/* Mute / Unmute */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-4 rounded-full border-2 transition-all cursor-pointer shadow-lg hover:scale-110 ${
                    isMuted
                      ? "bg-rose-600 border-rose-400 text-white"
                      : "bg-white/10 hover:bg-white/20 border-white/30 text-white"
                  }`}
                  title={isMuted ? "Unmute Microphone" : "Mute Microphone"}
                >
                  {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                </button>

                {/* End Call Button */}
                <button
                  onClick={toggleLiveCall}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-black text-sm px-6 py-4 rounded-full shadow-[0_10px_25px_rgba(225,29,72,0.5)] border-2 border-rose-400 flex items-center gap-2 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  title="End Live Call"
                >
                  <PhoneOff className="w-5 h-5" />
                  <span>End Call</span>
                </button>

                {/* Open Camera in Call */}
                <button
                  onClick={() => {
                    toggleLiveCall();
                    startCamera();
                  }}
                  className="p-4 rounded-full bg-white/10 hover:bg-white/20 border-2 border-white/30 text-white transition-all cursor-pointer shadow-lg hover:scale-110"
                  title="Show Camera to Naqla Bot"
                >
                  <Camera className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Interactive Camera Viewport & Capture Modal */}
      <AnimatePresence>
        {isCameraOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 sm:p-6"
            style={{ direction: "ltr" }}
          >
            {/* Camera Top Bar */}
            <div className="w-full max-w-md flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-sky-400" />
                <span className="text-sm font-bold">Show Your Book or Homework</span>
              </div>
              <button
                onClick={stopCamera}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Viewfinder */}
            <div className="relative w-full max-w-md aspect-3/4 sm:aspect-square bg-slate-900 rounded-3xl overflow-hidden border-2 border-sky-400/50 shadow-2xl flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-8 border-2 border-dashed border-white/40 rounded-2xl pointer-events-none flex items-end justify-center p-3">
                <span className="bg-black/60 text-white text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-xs">
                  Place textbook page or word here
                </span>
              </div>
            </div>

            {/* Camera Bottom Controls */}
            <div className="w-full max-w-md flex items-center justify-around py-4">
              <label className="p-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white cursor-pointer transition-all">
                <Upload className="w-5 h-5" />
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <button
                onClick={takePhoto}
                className="w-16 h-16 rounded-full bg-white border-4 border-sky-500 shadow-[0_0_25px_rgba(56,189,248,0.8)] flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
                title="Capture Photo"
              >
                <div className="w-12 h-12 rounded-full bg-sky-500" />
              </button>

              <button
                onClick={stopCamera}
                className="p-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white cursor-pointer transition-all"
                title="Cancel"
              >
                <CameraOff className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ZapIcon() {
  return (
    <svg className="w-3 h-3 text-amber-300 fill-amber-300" viewBox="0 0 24 24">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
