// i18n.js - Translation setup
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Translation resources
const resources = {
  en: {
    translation: {
      startGame: "Start Game",
      settings: "Settings",
      language: "Language",
      english: "English",
      azerbaijani: "Azerbaijani",
      theme: "Theme",
      cyberpunk: "Cyberpunk",
      frutigeraero: "Frutiger Aero",
      retrowave: "Retrowave",
      vaporwave: "Vaporwave",
      miamivice: "Miami Vice",
      darkhacker: "Dark Hacker",
      tagline: "Uncover the truth in early 2000s Azerbaijan",
      gameDescription: "Welcome to Digital Sleuth",
      gameDescriptionText1:
        "Navigate a simulated OS interface to solve a complex mystery set in a cyberpunk version of early 2000s Azerbaijan.",
      gameDescriptionText2:
        "Search databases, analyze evidence, connect clues, and discover the truth hidden within the digital landscape.",
      gameStarted: "Game Loading...",
      gameStartedMessage: "The OS is initializing. Please wait...",
      musicPlayer: "Music Player",
      showPlaylist: "SHOW PLAYLIST",
      hidePlaylist: "HIDE PLAYLIST",
      switchTheme: "SWITCH THEME",
    },
  },
  az: {
    translation: {
      startGame: "Oyuna Başla",
      settings: "Parametrlər",
      language: "Dil",
      english: "İngiliscə",
      azerbaijani: "Azərbaycanca",
      theme: "Mövzu",
      cyberpunk: "Sayberpank",
      frutigeraero: "Frutiger Aero",
      retrowave: "Retrodalğa",
      vaporwave: "Vapordalğa",
      miamivice: "Mayami Vays",
      darkhacker: "Qaranlıq Haker",
      tagline: "2000-ci illərin əvvəllərində Azərbaycanda həqiqəti kəşf edin",
      gameDescription: "Digital Detectivə xoş gəlmisiniz",
      gameDescriptionText1:
        "2000-ci illərin əvvəllərində Azərbaycanın sayberpank versiyasında mürəkkəb bir sirri həll etmək üçün simulyasiya edilmiş OS interfeysi ilə işləyin.",
      gameDescriptionText2:
        "Verilənlər bazalarında axtarış aparın, sübutları təhlil edin, ipuçları birləşdirin və rəqəmsal landşaftda gizlənmiş həqiqəti kəşf edin.",
      gameStarted: "Oyun yüklənir...",
      gameStartedMessage: "OS işə salınır. Zəhmət olmasa gözləyin...",
      musicPlayer: "Musiqi Pleyeri",
      showPlaylist: "PLEYLIST GÖSTƏR",
      hidePlaylist: "PLEYLIST GİZLƏT",
      switchTheme: "MÖVZUNU DƏYİŞDİR",
    },
  },
};

// Initialize i18next
i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
