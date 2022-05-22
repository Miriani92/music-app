import React, { useState, useRef, useEffect } from "react";
import { songs } from "./songs";
import styles from "./Player.module.css";
import {
  faPlay,
  faPause,
  faForward,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Player = () => {
  const [tracks, setTracks] = useState(songs);
  const [currentSong, setCurrentSong] = useState(0);
  const [nextSong, setNextSong] = useState(0);
  const [isPlay, setIsPlay] = useState(false);
  const [song, setSong] = useState(tracks[currentSong]);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlay) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlay]);

  const skipSong = () => {
    setCurrentSong(() => {
      let nextSongId = currentSong + 1;
      if (nextSongId > tracks.length - 1) {
        nextSongId = 0;
        return nextSongId;
      }
      if (nextSongId < 0) {
        nextSongId = tracks.length - 1;
        return nextSongId;
      }
      return nextSongId;
    });
  };

  const shoNext = (forWard) => {
    if (forWard) {
      setNextSong(currentSong + 1);
    } else {
      setNextSong(currentSong - 1);
    }
  };
  const { src, img_src, artist, title } = song;
  console.log(src);

  return (
    <div className={styles.wrapper}>
      <p>music player</p>
      <div>
        <audio src={src} ref={audioRef}>
          not supported
        </audio>
        <img src={img_src} alt="image" />
        <p>{artist}</p>
        <span>{title}</span>
        <button onClick={() => setIsPlay(!isPlay)}>
          <FontAwesomeIcon icon={isPlay ? faPause : faPlay} />
        </button>
      </div>
    </div>
  );
};

export default Player;
