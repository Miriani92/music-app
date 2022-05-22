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
  const [isPlay, setIsPlay] = useState(false);
  const [song, setSong] = useState(tracks[currentSong]);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlay) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  });

  const skipSong = (forwards = true) => {
    setCurrentSong(() => {
      let next = currentSong + 1;
      if (forwards) {
        if (next > tracks.length - 1) {
          next = 0;
          return next;
        }
        return next;
      } else {
        let prev = currentSong - 1;
        if (prev < 0) {
          prev = tracks.length - 1;
          return prev;
        }
        return prev;
      }
    });
  };
  useEffect(() => {
    setSong(tracks[currentSong]);
  }, [currentSong]);
  console.log(isPlay);

  const { src, img_src, artist, title } = song;

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
        <div className={styles.buttonWrapper}>
          <button onClick={() => skipSong(false)}>
            <FontAwesomeIcon icon={faBackward} />
          </button>

          <button onClick={() => setIsPlay(!isPlay)}>
            <FontAwesomeIcon icon={isPlay ? faPause : faPlay} />
          </button>
          <button onClick={() => skipSong()}>
            {" "}
            <FontAwesomeIcon icon={faForward} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Player;
