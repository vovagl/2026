import { useEffect, useState } from "react";
import girlsImage from './images/girls.jpg';
import FlipNumber from './FlipNumber';
import musicFile from './images/music.mp3';
// Склонение слов
function declOfNum(number, words) {
  const n = Math.abs(number);
  const n100 = n % 100;
  if (n100 >= 11 && n100 <= 19) return words[2];
  const n10 = n % 10;
  if (n10 === 1) return words[0];
  if (n10 >= 2 && n10 <= 4) return words[1];
  return words[2];
}

function Timer() {
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const target = new Date("2026-01-01T00:00:00").getTime();
      const now = new Date().getTime();
      const diff = target - now;
      setCountdown(diff > 0 ? diff : 0);
      if (diff <= 0) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
  const audio = new Audio(musicFile);
  audio.loop = true;

  const startAudio = () => {
    audio.play().catch(() => {});
    document.removeEventListener('click', startAudio);
  };

  document.addEventListener('click', startAudio);
}, []);

  const rawDays = Math.floor(countdown / (1000*60*60*24));
  const rawHours = Math.floor((countdown % (1000*60*60*24)) / (1000*60*60));
  const rawMinutes = Math.floor((countdown % (1000*60*60)) / (1000*60));
  const rawSeconds = Math.floor((countdown % (1000*60)) / 1000);

  const displayDays = rawDays < 10 ? `0${rawDays}` : `${rawDays}`;
  const displayHours = rawHours < 10 ? `0${rawHours}` : `${rawHours}`;
  const displayMinutes = rawMinutes < 10 ? `0${rawMinutes}` : `${rawMinutes}`;
  const displaySeconds = rawSeconds < 10 ? `0${rawSeconds}` : `${rawSeconds}`;

  return (
    <div className="timer-container" style={{ backgroundImage: `url(${girlsImage})` }}>
      <div className="timer-overlay">
        <h1>До Нового 2026 года:</h1>
        <div className="timer-blocks">
          <div className="timer-block">
            <FlipNumber value={displayDays} />
            <div className="timer-label">{declOfNum(rawDays, ["день","дня","дней"])}</div>
          </div>
          <div className="timer-block">
            <FlipNumber value={displayHours} />
            <div className="timer-label">{declOfNum(rawHours, ["час","часа","часов"])}</div>
          </div>
          <div className="timer-block">
            <FlipNumber value={displayMinutes} />
            <div className="timer-label">{declOfNum(rawMinutes, ["минута","минуты","минут"])}</div>
          </div>
          <div className="timer-block">
            <FlipNumber value={displaySeconds} />
            <div className="timer-label">{declOfNum(rawSeconds, ["секунда","секунды","секунд"])}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timer;
