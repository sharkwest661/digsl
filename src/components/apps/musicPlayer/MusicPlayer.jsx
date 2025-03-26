// components/apps/musicPlayer/MusicPlayer.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Volume1,
  VolumeX,
} from "lucide-react";
import { useAppStore, useThemeStore } from "../../../store";

const MusicPlayer = () => {
  // Get theme configuration
  const themeConfig = useThemeStore((state) => state.themeConfig);

  // Get music player state from app store
  const isPlaying = useAppStore((state) => state.isPlaying);
  const setIsPlaying = useAppStore((state) => state.setIsPlaying);
  const currentTrack = useAppStore((state) => state.currentTrack);
  const setCurrentTrack = useAppStore((state) => state.setCurrentTrack);
  const volume = useAppStore((state) => state.volume);
  const setVolume = useAppStore((state) => state.setVolume);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(40); // Store previous volume level
  const [visualizerCells, setVisualizerCells] = useState([]);

  const audioRef = useRef(null);

  // Mock playlist data with actual file paths
  const playlist = [
    {
      id: 1,
      title: "Sahte",
      artist: "Hande Yener",
      duration: "3:45",
      active: true,
      file: "/assets/music/hande_yener_sahte.mp3",
    },
    {
      id: 2,
      title: "Oyun Bitti",
      artist: "Sertab Erener",
      duration: "4:21",
      active: false,
      file: "/assets/music/sertab_erener_oyun_bitti.mp3",
    },
    {
      id: 3,
      title: "Intikam",
      artist: "Demet Akalin",
      duration: "4:21",
      active: false,
      file: "/assets/music/demet_akalin_intikam.mp3",
    },
    {
      id: 4,
      title: "Hardadir",
      artist: "Qaraqan",
      duration: "4:21",
      active: false,
      file: "/assets/music/qaraqan_hardadir.mp3",
    },
    {
      id: 5,
      title: "Talking in your sleep",
      artist: "The Romantics",
      duration: "4:21",
      active: false,
      file: "/assets/music/talking_in_your_sleep_the_romantics.mp3",
    },
    {
      id: 6,
      title: "Virtual World",
      artist: "Fibre",
      duration: "4:21",
      active: false,
      file: "/assets/music/virtual_world_fibre.mp3",
    },
  ];

  // Initialize visualizer cells with random values
  useEffect(() => {
    // Generate random opacity and animation values for each cell
    const cells = Array.from({ length: 64 }).map((_, i) => ({
      animationDelay: `${Math.random() * 2}s`,
      animationDuration: `${0.5 + Math.random() * 2}s`,
      baseOpacity: 0.1 + Math.random() * 0.2,
    }));
    setVisualizerCells(cells);
  }, []);

  // Update visualizer animation while playing
  useEffect(() => {
    if (!isPlaying) return;

    // Update cell opacities at intervals when playing
    const intervalId = setInterval(() => {
      setVisualizerCells((cells) =>
        cells.map((cell) => ({
          ...cell,
          // Only update some cells randomly
          baseOpacity:
            Math.random() > 0.7 ? 0.1 + Math.random() * 0.2 : cell.baseOpacity,
        }))
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPlaying]);

  // Set up audio event listeners
  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleDurationChange = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      handleNext();
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("ended", handleEnded);

    // Set initial volume
    audio.volume = volume / 100;

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrack]);

  // Handle play state changes
  useEffect(() => {
    if (isPlaying) {
      audioRef.current
        .play()
        .catch((e) => console.error("Error playing audio:", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handle track changes
  useEffect(() => {
    // Store the current playback position and playing state before changing tracks
    const wasPlaying = isPlaying;

    // Update audio source
    audioRef.current.src = playlist[currentTrack].file;
    audioRef.current.load();

    // If it was playing before, resume playback after track change
    if (wasPlaying) {
      audioRef.current
        .play()
        .catch((e) => console.error("Error playing audio:", e));
    }
  }, [currentTrack]);

  // Handle volume changes
  useEffect(() => {
    audioRef.current.volume = volume / 100;
  }, [volume]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrack(
      currentTrack === playlist.length - 1 ? 0 : currentTrack + 1
    );
  };

  const handlePrev = () => {
    setCurrentTrack(
      currentTrack === 0 ? playlist.length - 1 : currentTrack - 1
    );
  };

  const handleVolumeChange = (e) => {
    setVolume(parseInt(e.target.value));
  };

  const handleProgressChange = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    audioRef.current.currentTime = (newProgress / 100) * duration;
  };

  const togglePlaylist = () => {
    setShowPlaylist(!showPlaylist);
  };

  const selectTrack = (index) => {
    setCurrentTrack(index);
    setIsPlaying(true);
  };

  // Format time in minutes:seconds
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Volume icon logic
  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={20} />;
    if (volume < 50) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
  };

  // Mute/unmute toggle function
  const muteVolume = () => {
    if (volume === 0) {
      // If currently muted, restore to previous volume
      setVolume(previousVolume);
    } else {
      // If not muted, save current volume and set to 0
      setPreviousVolume(volume);
      setVolume(0);
    }
  };

  return (
    <div
      className="w-full h-full flex flex-col overflow-auto p-4 bg-opacity-80"
      style={{ backgroundColor: "rgba(18, 4, 88, 0.7)" }}
    >
      {/* Audio element */}
      <audio ref={audioRef} preload="metadata" />

      {/* Header */}
      <div
        className="h-2 mb-6"
        style={{
          background: `linear-gradient(to right, ${themeConfig.accentPrimary}, ${themeConfig.accentSecondary})`,
          boxShadow: themeConfig.glowEffect,
        }}
      ></div>

      <div className="p-4 flex justify-center items-center mb-4">
        <h2
          className="text-xl font-bold font-mono uppercase text-center"
          style={{ color: themeConfig.accentSecondary }}
        >
          AUDIO PLAYER
        </h2>
      </div>

      {/* Album art & visualizer */}
      <div className="flex justify-center w-full mb-6">
        <div
          className="relative w-44 h-44 overflow-hidden"
          style={{
            border: `3px solid ${themeConfig.accentPrimary}`,
            boxShadow: themeConfig.glowEffect,
          }}
        >
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-px pointer-events-none">
            {visualizerCells.map((cell, i) => (
              <div
                key={i}
                className={`${
                  isPlaying ? "animate-pulse" : ""
                } transition-all duration-300`}
                style={{
                  backgroundColor: themeConfig.accentPrimary,
                  animationDelay: cell.animationDelay,
                  animationDuration: cell.animationDuration,
                  opacity: isPlaying
                    ? cell.baseOpacity + Math.random() * 0.3
                    : cell.baseOpacity,
                }}
              ></div>
            ))}
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center text-lg font-bold font-mono text-center"
            style={{ color: themeConfig.accentSecondary }}
          >
            MUSIC VISUALIZER
          </div>
        </div>
      </div>

      {/* Track info */}
      <div className="px-6 mb-6 text-center">
        <h3
          className="text-lg font-bold text-white truncate"
          style={{ textShadow: `0 0 5px ${themeConfig.accentPrimary}` }}
        >
          {playlist[currentTrack].title}
        </h3>
        <p
          className="text-sm mb-2"
          style={{ color: themeConfig.accentSecondary }}
        >
          {playlist[currentTrack].artist}
        </p>
      </div>

      {/* Progress bar */}
      <div className="px-6 mb-6">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
          className="w-full h-1 appearance-none rounded-full overflow-hidden cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${themeConfig.accentPrimary} 0%, ${themeConfig.accentPrimary} ${progress}%, #1f2937 ${progress}%, #1f2937 100%)`,
          }}
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-8 px-6 mb-6">
        <button
          onClick={handlePrev}
          className="text-white hover:text-cyan-400 transition-colors"
        >
          <SkipBack size={32} />
        </button>

        <button
          onClick={handlePlay}
          className="w-14 h-14 rounded-full flex items-center justify-center text-black transition-all"
          style={{
            background: `linear-gradient(to right, ${themeConfig.accentPrimary}, ${themeConfig.accentSecondary})`,
            boxShadow: themeConfig.glowEffect,
          }}
        >
          {isPlaying ? (
            <Pause size={28} />
          ) : (
            <Play size={28} className="ml-1" />
          )}
        </button>

        <button
          onClick={handleNext}
          className="text-white hover:text-cyan-400 transition-colors"
        >
          <SkipForward size={32} />
        </button>
      </div>

      {/* Volume slider */}
      <div className="px-6 flex items-center space-x-2 mb-6">
        <button
          className="text-white hover:text-cyan-400 transition-colors"
          onClick={muteVolume}
        >
          {getVolumeIcon()}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="flex-1 h-1 appearance-none rounded-full overflow-hidden cursor-pointer"
          style={{
            background: `linear-gradient(to right, ${themeConfig.accentPrimary} 0%, ${themeConfig.accentPrimary} ${volume}%, #1f2937 ${volume}%, #1f2937 100%)`,
          }}
        />
      </div>

      {/* Playlist toggle button */}
      <div className="px-6 mb-4 mt-auto">
        <button
          onClick={togglePlaylist}
          className="w-full py-2 rounded-md text-sm font-bold tracking-wider font-mono uppercase transition-colors"
          style={{
            border: `1px solid ${themeConfig.accentPrimary}`,
            color: themeConfig.accentSecondary,
            background: showPlaylist ? "rgba(0,0,0,0.3)" : "transparent",
          }}
        >
          {showPlaylist ? "HIDE PLAYLIST" : "SHOW PLAYLIST"}
        </button>
      </div>

      {/* Playlist with sliding animation */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          height: showPlaylist ? "35%" : "0",
          opacity: showPlaylist ? 1 : 0,
          marginTop: showPlaylist ? "1rem" : "0",
          transitionProperty: "height, opacity, margin",
        }}
      >
        <div
          className="px-4 overflow-y-auto"
          style={{ height: "100%", paddingBottom: "8px" }}
        >
          {playlist.map((track, index) => (
            <div
              key={track.id}
              onClick={() => selectTrack(index)}
              className="p-3 mb-2 rounded cursor-pointer transition-all hover:bg-opacity-30"
              style={{
                backgroundColor:
                  index === currentTrack ? "rgba(0,0,0,0.3)" : "transparent",
                border:
                  index === currentTrack
                    ? `1px solid ${themeConfig.accentPrimary}`
                    : "none",
                color:
                  index === currentTrack
                    ? themeConfig.accentPrimary
                    : "#f5f5f5",
                boxShadow:
                  index === currentTrack
                    ? `0 0 5px ${themeConfig.accentPrimary}`
                    : "none",
              }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="mr-2 w-4 text-xs">{index + 1}</span>
                  <div>
                    <div className="font-medium">{track.title}</div>
                    <div className="text-xs text-gray-400">{track.artist}</div>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{track.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional style fixes */}
      <style jsx>{`
        input[type="range"] {
          -webkit-appearance: none;
          height: 4px;
          background: transparent;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: ${themeConfig.accentPrimary};
          box-shadow: 0 0 5px ${themeConfig.accentPrimary};
          cursor: pointer;
          margin-top: -4px;
        }

        input[type="range"]::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border: none;
          border-radius: 50%;
          background: ${themeConfig.accentPrimary};
          box-shadow: 0 0 5px ${themeConfig.accentPrimary};
          cursor: pointer;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
