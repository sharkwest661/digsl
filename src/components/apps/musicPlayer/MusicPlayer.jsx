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
  Music,
  Heart,
  HeartOff,
} from "lucide-react";
import { useAppStore, useThemeStore } from "../../../store";
import { PLAYLIST_DATA } from "../../../constants/musicData";
import styles from "./MusicPlayer.module.scss";

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

  // For styling the progress input
  const progressStyle = {
    "--progress-percent": `${progress}%`,
  };

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
    <div className={styles.playerView}>
      {/* Visualizer */}
      <div ref={visualizerRef} className={styles.visualizer}>
        {visualizerData.map((bar, i) => (
          <div
            key={i}
            className={styles.visualizerBar}
            style={{
              height: `${isPlaying ? bar.height : 10}%`,
              opacity: isPlaying ? bar.opacity : 0.3,
              transition: `height ${bar.animationDuration}s ease`,
              boxShadow: `0 0 5px ${themeConfig.accentPrimary}`,
            }}
          />
        ))}
      </div>

      {/* Track info */}
      <div className={styles.trackInfo}>
        <h3 className={styles.trackTitle}>{playlist[currentTrack].title}</h3>
        <p className={styles.trackArtist}>{playlist[currentTrack].artist}</p>
        <button
          onClick={() => toggleFavorite(playlist[currentTrack].id)}
          className={styles.favoriteButton}
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

      {/* Progress bar */}
      <div className={styles.progressContainer}>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
          className={styles.progressInput}
          style={progressStyle}
        />
        <div className={styles.progressTimes}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <button onClick={handlePrev} className={styles.controlButton}>
          <SkipBack size={24} />
        </button>

        <button
          onClick={handlePlay}
          className={`${styles.playButton} ${
            isPlaying ? styles.isPlaying : ""
          }`}
        >
          {isPlaying ? (
            <Pause size={24} className={styles.pauseIcon} />
          ) : (
            <Play size={24} className={styles.playIcon} />
          )}
        </button>

        <button onClick={handleNext} className={styles.controlButton}>
          <SkipForward size={24} />
        </button>
      </div>

      {/* Volume slider */}
      <div className={styles.volumeContainer}>
        <button className={styles.volumeButton} onClick={muteVolume}>
          {getVolumeIcon()}
        </button>

        <div className={styles.volumeSliderContainer}>
          <div className={styles.volumeTrack}></div>
          <div
            className={styles.volumeProgress}
            style={{ width: `${volume}%` }}
          ></div>
          <div
            className={styles.volumeThumb}
            style={{ left: `calc(${volume}% - 6px)` }}
          ></div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className={styles.volumeInput}
          />
        </div>
      </div>
    </div>
  );

  // Playlist view
  const renderPlaylistView = () => (
    <div className={styles.playlistView}>
      <div className={styles.playlistHeader}>
        <h3 className={styles.playlistTitle}>TRACKS</h3>
        <div className={styles.playlistCount}>{playlist.length} songs</div>
      </div>

      <div
        className={styles.tracksList}
        style={{ maxHeight: "calc(100% - 80px)" }}
      >
        {playlist.map((track, index) => (
          <div
            key={track.id}
            onClick={() => selectTrack(index)}
            className={`${styles.trackItem} ${
              index === currentTrack ? styles.active : ""
            }`}
          >
            <div
              className={`${styles.trackNumber} ${
                index === currentTrack ? styles.active : ""
              }`}
            >
              {isPlaying && index === currentTrack ? (
                <div className={styles.playingAnimation}>
                  <span className={styles.bar}></span>
                  <span className={styles.bar}></span>
                  <span className={styles.bar}></span>
                </div>
              ) : (
                <span>{String(index + 1).padStart(2, "0")}</span>
              )}
            </div>

            <div className={styles.trackDetails}>
              <div
                className={`${styles.trackItemTitle} ${
                  index === currentTrack ? styles.active : ""
                }`}
              >
                {track.title}
              </div>
              <div className={styles.trackItemArtist}>{track.artist}</div>
            </div>

            <div className={styles.trackActions}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(track.id);
                }}
                className={styles.trackFavorite}
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

              <div className={styles.trackDuration}>{track.duration}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.playlistFooter}>
        <div className={styles.playlistFooterText}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {/* Audio element */}
      <audio ref={audioRef} preload="metadata" />

      {/* Navigation tabs */}
      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tab} ${
            selectedView === "player" ? styles.active : ""
          }`}
          onClick={() => setSelectedView("player")}
        >
          <Music size={16} className={styles.tabIcon} />
          Player
        </button>

        <button
          className={`${styles.tab} ${
            selectedView === "playlist" ? styles.active : ""
          }`}
          onClick={() => setSelectedView("playlist")}
        >
          <List size={16} className={styles.tabIcon} />
          Playlist
        </button>
      </div>

      {/* Content area */}
      <div className={styles.content}>
        {selectedView === "player" ? renderPlayerView() : renderPlaylistView()}
      </div>
    </div>
  );
};

export default MusicPlayer;
