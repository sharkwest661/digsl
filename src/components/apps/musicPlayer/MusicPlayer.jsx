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
  List,
  Grid,
  Music,
  Heart,
  HeartOff,
} from "lucide-react";
import { useAppStore, useThemeStore } from "../../../store";
import { Button } from "../../ui";
import { PLAYLIST_DATA } from "../../../constants/musicData";

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

  // Local state
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedView, setSelectedView] = useState("player"); // 'player' or 'playlist'
  const [favorites, setFavorites] = useState([]);
  const [previousVolume, setPreviousVolume] = useState(40);
  const [visualizerData, setVisualizerData] = useState([]);

  const audioRef = useRef(null);
  const visualizerRef = useRef(null);

  // Mock playlist data with actual file paths
  const playlist = PLAYLIST_DATA;

  // Initialize visualizer
  useEffect(() => {
    generateVisualizerData();
  }, []);

  // Generate new visualizer data
  const generateVisualizerData = () => {
    const barCount = 32;
    const newData = Array.from({ length: barCount }).map(() => ({
      height: Math.random() * 80 + 20,
      opacity: Math.random() * 0.5 + 0.5,
      animationDuration: (Math.random() * 1 + 0.5).toFixed(2),
    }));
    setVisualizerData(newData);
  };

  // Update visualizer animation when playing changes
  useEffect(() => {
    if (!isPlaying) return;

    const intervalId = setInterval(() => {
      generateVisualizerData();
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
    const wasPlaying = isPlaying;
    audioRef.current.src = playlist[currentTrack].file;
    audioRef.current.load();

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
    if (volume === 0) return <VolumeX size={18} />;
    if (volume < 50) return <Volume1 size={18} />;
    return <Volume2 size={18} />;
  };

  // Mute/unmute toggle function
  const muteVolume = () => {
    if (volume === 0) {
      setVolume(previousVolume);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
    }
  };

  // Toggle favorite status
  const toggleFavorite = (trackId) => {
    if (favorites.includes(trackId)) {
      setFavorites(favorites.filter((id) => id !== trackId));
    } else {
      setFavorites([...favorites, trackId]);
    }
  };

  // Player view
  const renderPlayerView = () => (
    <div className="flex flex-col h-full">
      {/* Visualizer */}
      <div
        ref={visualizerRef}
        className="flex items-end justify-center h-48 mb-6 px-4 py-2"
        style={{
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: "4px",
          border: `1px solid ${themeConfig.accentSecondary}`,
          boxShadow: `inset 0 0 10px rgba(0,0,0,0.5)`,
          overflow: "hidden",
        }}
      >
        {visualizerData.map((bar, i) => (
          <div
            key={i}
            className="mx-px"
            style={{
              height: `${isPlaying ? bar.height : 10}%`,
              width: "6px",
              backgroundColor: themeConfig.accentPrimary,
              opacity: isPlaying ? bar.opacity : 0.3,
              transition: `height ${bar.animationDuration}s ease`,
              boxShadow: `0 0 5px ${themeConfig.accentPrimary}`,
            }}
          />
        ))}
      </div>

      {/* Track info */}
      <div className="px-6 mb-6 text-center">
        <h3
          className="text-2xl font-bold truncate"
          style={{
            color: themeConfig.accentPrimary,
            textShadow: `0 0 5px ${themeConfig.accentPrimary}`,
          }}
        >
          {playlist[currentTrack].title}
        </h3>
        <p className="text-base mb-1" style={{ color: themeConfig.textLight }}>
          {playlist[currentTrack].artist}
        </p>
        <div className="flex justify-center items-center mt-2">
          <button
            onClick={() => toggleFavorite(playlist[currentTrack].id)}
            className="p-1 transition-all duration-200"
          >
            {favorites.includes(playlist[currentTrack].id) ? (
              <Heart
                size={18}
                fill={themeConfig.accentPrimary}
                color={themeConfig.accentPrimary}
              />
            ) : (
              <HeartOff size={18} color={themeConfig.textLight} />
            )}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-6 mb-6">
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
          className="w-full cursor-pointer"
          style={{
            height: "4px",
            background: `linear-gradient(to right, ${themeConfig.accentPrimary} 0%, ${themeConfig.accentPrimary} ${progress}%, rgba(31, 41, 55, 0.7) ${progress}%, rgba(31, 41, 55, 0.7) 100%)`,
            borderRadius: "2px",
            boxShadow: `0 0 5px ${themeConfig.accentPrimary}`,
            WebkitAppearance: "none",
          }}
        />
        <div
          className="flex justify-between text-xs mt-1 font-mono"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
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
          <SkipBack size={24} />
        </button>

        <button
          onClick={handlePlay}
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all"
          style={{
            background: `linear-gradient(135deg, ${themeConfig.accentPrimary} 0%, ${themeConfig.accentSecondary} 100%)`,
            boxShadow: `0 0 15px ${themeConfig.accentPrimary}`,
            transform: isPlaying ? "scale(1.05)" : "scale(1)",
          }}
        >
          {isPlaying ? (
            <Pause size={24} color="#000" />
          ) : (
            <Play size={24} color="#000" className="ml-1" />
          )}
        </button>

        <button
          onClick={handleNext}
          className="text-white hover:text-cyan-400 transition-colors"
        >
          <SkipForward size={24} />
        </button>
      </div>

      {/* Volume slider */}
      <div className="px-6 flex items-center gap-2 mt-8 mb-2">
        {/* Button with pure Tailwind styling */}
        <button
          className="text-white hover:text-cyan-400 transition-colors p-2 rounded-full hover:bg-black hover:bg-opacity-20"
          onClick={muteVolume}
        >
          {getVolumeIcon()}
        </button>

        {/* Custom slider container with Tailwind */}
        <div className="flex-1 relative h-8 flex items-center">
          {/* Background track using Tailwind only */}
          <div className="absolute w-full h-1 bg-gray-800 bg-opacity-50 rounded"></div>

          {/* Colored progress bar using Tailwind + custom width */}
          <div
            className="absolute h-1 bg-cyan-400 rounded"
            style={{
              width: `${volume}%`,
              boxShadow: `0 0 5px ${themeConfig.accentSecondary}`,
            }}
          ></div>

          {/* Actual input with opacity-0 for browser compatibility */}
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="absolute w-full cursor-pointer opacity-0 z-10"
          />

          {/* Thumb indicator using Tailwind */}
          <div
            className="absolute w-3 h-3 rounded-full bg-cyan-400 z-0 pointer-events-none"
            style={{
              left: `calc(${volume}% - 6px)`,
              boxShadow: `0 0 5px ${themeConfig.accentSecondary}`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );

  // Playlist view
  const renderPlaylistView = () => (
    <div className="h-full flex flex-col">
      <div
        className="px-4 py-3 font-mono flex items-center justify-between"
        style={{
          borderBottom: `1px solid ${themeConfig.accentSecondary}`,
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
      >
        <h3 style={{ color: themeConfig.accentSecondary }}>TRACKS</h3>
        <div className="text-xs" style={{ color: themeConfig.textLight }}>
          {playlist.length} songs
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {playlist.map((track, index) => (
          <div
            key={track.id}
            onClick={() => selectTrack(index)}
            className="p-3 mb-1 mx-2 rounded cursor-pointer transition-all duration-200 flex items-center"
            style={{
              backgroundColor:
                index === currentTrack
                  ? "rgba(255,255,255,0.05)"
                  : "transparent",
              borderBottom: `1px solid rgba(255,255,255,0.05)`,
              borderLeft:
                index === currentTrack
                  ? `2px solid ${themeConfig.accentPrimary}`
                  : "2px solid transparent",
            }}
          >
            <div
              className="w-8 font-mono text-center mr-3"
              style={{
                color:
                  index === currentTrack
                    ? themeConfig.accentPrimary
                    : "rgba(255,255,255,0.4)",
              }}
            >
              {isPlaying && index === currentTrack ? (
                <div className="flex justify-center">
                  <div className="playing-animation">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              ) : (
                <span>{String(index + 1).padStart(2, "0")}</span>
              )}
            </div>

            <div className="flex-1 truncate">
              <div
                className="font-medium truncate"
                style={{
                  color:
                    index === currentTrack
                      ? themeConfig.accentPrimary
                      : themeConfig.textLight,
                }}
              >
                {track.title}
              </div>
              <div
                className="text-xs truncate"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {track.artist}
              </div>
            </div>

            <div className="flex items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(track.id);
                }}
                className="p-2 opacity-60 hover:opacity-100 transition-opacity"
              >
                {favorites.includes(track.id) ? (
                  <Heart
                    size={14}
                    fill={themeConfig.accentPrimary}
                    color={themeConfig.accentPrimary}
                  />
                ) : (
                  <Heart size={14} color={themeConfig.textLight} />
                )}
              </button>

              <div
                className="text-xs !ml-2 font-mono"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {track.duration}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="p-3 flex items-center justify-center"
        style={{
          borderTop: `1px solid ${themeConfig.accentSecondary}`,
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
      >
        <div className="text-xs" style={{ color: themeConfig.textLight }}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="w-full h-full flex flex-col relative"
      style={{ backgroundColor: themeConfig.darkBg }}
    >
      {/* Audio element */}
      <audio ref={audioRef} preload="metadata" />

      {/* Navigation tabs */}
      <div
        className="flex border-b border-opacity-20"
        style={{
          borderColor: themeConfig.accentSecondary,
        }}
      >
        <button
          className={`flex-1 py-3 px-4 font-mono text-sm uppercase tracking-wider transition-all duration-200 ${
            selectedView === "player" ? "border-b-2" : ""
          }`}
          style={{
            borderColor: themeConfig.accentPrimary,
            color:
              selectedView === "player"
                ? themeConfig.accentPrimary
                : themeConfig.textLight,
            backgroundColor:
              selectedView === "player" ? "rgba(0,0,0,0.2)" : "transparent",
          }}
          onClick={() => setSelectedView("player")}
        >
          <div className="flex items-center justify-center">
            <Music size={16} className="mr-2" />
            Player
          </div>
        </button>

        <button
          className={`flex-1 py-3 px-4 font-mono text-sm uppercase tracking-wider transition-all duration-200 ${
            selectedView === "playlist" ? "border-b-2" : ""
          }`}
          style={{
            borderColor: themeConfig.accentPrimary,
            color:
              selectedView === "playlist"
                ? themeConfig.accentPrimary
                : themeConfig.textLight,
            backgroundColor:
              selectedView === "playlist" ? "rgba(0,0,0,0.2)" : "transparent",
          }}
          onClick={() => setSelectedView("playlist")}
        >
          <div className="flex items-center justify-center">
            <List size={16} className="mr-2" />
            Playlist
          </div>
        </button>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-hidden p-4">
        {selectedView === "player" ? renderPlayerView() : renderPlaylistView()}
      </div>

      {/* Animated playing indicator style */}
      <style jsx>{`
        .playing-animation {
          display: flex;
          align-items: flex-end;
          height: 16px;
          gap: 1px;
        }

        .playing-animation span {
          display: block;
          width: 2px;
          background-color: ${themeConfig.accentPrimary};
          animation: playing-animation 1.2s ease infinite;
          box-shadow: 0 0 2px ${themeConfig.accentPrimary};
        }

        .playing-animation span:nth-child(1) {
          height: 8px;
          animation-delay: 0s;
        }

        .playing-animation span:nth-child(2) {
          height: 16px;
          animation-delay: 0.2s;
        }

        .playing-animation span:nth-child(3) {
          height: 10px;
          animation-delay: 0.4s;
        }

        @keyframes playing-animation {
          0%,
          100% {
            height: 4px;
          }
          50% {
            height: 12px;
          }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${themeConfig.accentSecondary};
          border-radius: 4px;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: ${themeConfig.accentSecondary};
          box-shadow: 0 0 5px ${themeConfig.accentSecondary};
          cursor: pointer;
          margin-top: -4px;
        }

        input[type="range"]::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border: none;
          border-radius: 50%;
          background: ${themeConfig.accentSecondary};
          box-shadow: 0 0 5px ${themeConfig.accentSecondary};
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
