import React from "react";
import "./podcast.css";
import ReactJkMusicPlayer from "react-jinke-music-player";
import { useEffect } from "react";
import { useState } from "react";
//for data, change it if you want to make it dynamic
import podcastList from "./data";

let x = undefined;
function Podcast() {
  const [index, setIndex] = useState(0);
  const [play, setPlay] = useState("play");
  const [size, setSize] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 780 ? true : false
  );
  const [full, setFull] = useState("full");
  const [song, setSong] = useState(0);
  const [vah, setVah] = useState(1);
  const [dur, setDur] = useState({});

  function spritHandler() {
    if (x.paused) {
      setPlay("play");
    } else {
      setPlay("pause");
    }
  }
  function playHandler() {
    if (x.paused) {
      x.play();
      setPlay("play");
    } else {
      x.pause();
      setPlay("pause");
    }
  }
  function audio(e) {
    x = e;
  }

  useEffect(() => {
    function resizeHandler() {
      setSize(window.innerWidth);
      if (size >= 768) {
        setIsMobile(false);
        setFull("full");
      } else {
        setIsMobile(true);
        setFull("mini");
      }
    }
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [size]);
  function clickListHandler(e) {
    setVah((e) => {
      return e + 1;
    });
    setIndex(+e.currentTarget.dataset.id - 1);
    x.pause();
  }

  function indexHandler(xe, d) {
    if (x.paused) {
      setSong(+xe.currentTarget.dataset.index - 1);
      x.play();
      setPlay("play");
    } else {
      if (d.id - 1 === song) {
        x.pause();
        setPlay("pause");
      } else {
        setSong(+xe.currentTarget.dataset.index - 1);
        x.play();
      }
    }
  }

  useEffect(() => {
    podcastList[index].audioList.forEach((e) => {
      const audioz = new Audio(e.musicSrc);
      audioz.addEventListener("loadedmetadata", () => {
        setDur((z) => {
          return {
            ...z,
            [e.id]: audioz.duration,
          };
        });
      });
    });
  }, [index]);
  //change this
  const mappedPodcastList = podcastList[index].audioList.map((e) => {
    // code to render each item in the list here...
    return (
      <tr
        data-index={e.id}
        onClick={(x) => {
          indexHandler(x, e);
        }}
        key={e.name}
      >
        <td>
          <img
            style={{ width: "20px", borderRadius: "5px" }}
            src={`images/${
              play === "play" ? "play" : song === e.id - 1 ? "pause" : "play"
            } 1.png`}
            alt=""
          />
        </td>
        <td>
          <img
            src={e.cover}
            alt=""
            style={{ width: "50px", aspectRatio: "1/1", borderRadius: "10px" }}
          />
        </td>
        <td
          style={{
            transition: "ease-in 100ms",
            color: song === e.id - 1 && play !== "play" ? "#5c67de" : "white",
          }}
        >
          {e.name} <br />
          <span className="sub-text">
            {podcastList[index].podcastGroupName}
          </span>
        </td>
        <td className="sub-text">{podcastList[index].authorName}</td>
        <td className="sub-text">3,454</td>
        <td className="sub-text">
          <FormatTime durs={dur[e.id]} />
        </td>
        <td>
          <img src="images/Frame 7.png" alt="" />
        </td>
      </tr>
    );
  });

  //also change this
  const mappedPodcast = podcastList.map((e) => {
    return (
      <div
        id={e.id}
        onClick={clickListHandler}
        data-id={e.id}
        key={e.id}
        className="podcast-list"
      >
        <div>
          <div>
            <img src="images/Rectangle 1.png" alt="" />
          </div>
          <div className="text-up-down">
            <div
              style={{
                color: index === e.id - 1 ? "#5c67de" : "white",
                transition: "ease-in 100ms",
              }}
            >
              {e.podcastGroupName}
            </div>
            <div className="sub-text">
              {31} podcasts &#x2022; by {e.authorName}
            </div>
          </div>
        </div>
        <div>
          <img
            style={{ opacity: index === e.id - 1 ? "1" : "0" }}
            className="img-listGroup"
            src="images/pause-circle 1.png"
            alt=""
          />
        </div>
      </div>
    );
  });

  useEffect(() => {
    setSong(0);
    setPlay("play");

    console.log(">?");
  }, [vah]);

  return (
    <div className="container">
      <div className="parent">
        <div className="div1 laye">
          <div className="list-acses">
            <img src="./images/house-chimney 1.png" alt="" />
            <a href="https://hanousa.ir">home</a>
          </div>
          <div className="list-acses">
            <img src="./images/flame 1.png" alt="" /> best podcast
          </div>
        </div>

        <div className="div2 laye">
          <img src="./images/Vector (3).png" alt="" />
        </div>
        <div className="div3 laye">
          <img src="./images/bell (1) 1.png" alt="" />
        </div>
        <div className="div4 laye">
          <img src="images/search (2) 1.png" alt="" />
          <input type="text" placeholder="I want to listen" />
        </div>
        <div className="div5 laye">
          <div className="user-voise">
            <img src="./images/angle-left 3.png" alt="" />
            <div>
              <b>Ken Adam</b>
              <p>51k Followers</p>
            </div>
          </div>
          <div className="info-voise">40,142 Monthly Listeners</div>
        </div>
        <div className="div6 laye">
          <div className="list-podcasts-top">
            <div>
              <img src="images/list-music 1.png" alt="" />
              <h4>Your playlist (9)</h4>
            </div>
            <div>
              {/* <img src="images/search (2) 1.png" alt="" />
              <img src="images/plus 1.png" alt="" /> */}
            </div>
          </div>
          {mappedPodcast}
        </div>

        <div className="div7 laye">
          <div className="row-controll">
            <div className="left-controll">
              <div className="blueviolet" onClick={playHandler}>
                <img
                  alt=""
                  id="play1"
                  style={{ width: "20px", borderRadius: "5px" }}
                  className="img-pouse1"
                  src={`./images/${play} 1.png`}
                />
              </div>
              <div className="shaer">
                {/* <img src="images/Vector (5).png" alt="" /> */}
              </div>
            </div>
            <div className="right-controll">
              <button className="search-btn">
                {/* <img src="images/search (2) 1.png" alt="" /> */}
              </button>
              <div className="order">
                Order by <img src="images/Vector (3).png" alt="" />
              </div>
            </div>
          </div>
          <table id="table1">
            <thead>
              <tr>
                <th className="sub-text">#</th>
                <th className="sub-text">Title</th>
                <th className="sub-text"></th>
                <th className="sub-text">Playlist</th>
                <th className="sub-text">
                  <img src="images/head-side-headphones 1.png" alt="" />
                </th>
                <th className="sub-text">
                  <img src="images/clock-three 1.png" alt="" />
                </th>
              </tr>
            </thead>
            <tbody>{mappedPodcastList}</tbody>
          </table>
        </div>
        <ReactJkMusicPlayer
          theme="dark"
          autoHiddenCover={true}
          autoPlay={false}
          showThemeSwitch={false}
          clearPriorAudioLists={true}
          autoPlayInitLoadPlayList={false}
          audioLists={podcastList[index].audioList}
          toggleMode={isMobile}
          mode={full}
          responsive={true}
          drag={false}
          defaultPosition={{ bottom: 40, left: 40 }}
          getAudioInstance={audio}
          onAudioPlay={spritHandler}
          onAudioPause={spritHandler}
          playIndex={song}
          onPlayIndexChange={(e) => {
            setSong(e);
          }}
          onAudioListsChange={() => {
            x.pause();
          }}
          remove={false}
        />
      </div>
    </div>
  );
}

function FormatTime(props) {
  const minutes = Math.floor(props.durs / 60);
  const remainingSeconds = Math.floor(props.durs % 60);
  const formattedMinutes = `${minutes < 10 ? "0" : ""}${minutes}`;
  const formattedSeconds = `${
    remainingSeconds < 10 ? "0" : ""
  }${remainingSeconds}`;
  return `${formattedMinutes}:${formattedSeconds}`;
}
export default Podcast;
