/* eslint-disable react/jsx-curly-newline */
import React, { useState, useEffect, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import 'flexboxgrid';
import { v4 as uuidv4 } from 'uuid';
// @ts-ignore
import simpleSound from './sounds/simple.wav';
import Button from './components/button/button';
import Timer from './components/timer/timer';

type Color = {
  id: string;
  color: string;
  title: string;
  show: boolean;
};
const colorArr = ['red', 'green', 'yellow', 'blue'];
const counterArr = [10, 20, 40];

type TimeOut = {
  name: string;
  speed: number;
};

const timeOutArr: TimeOut[] = [
  { name: 'slow', speed: 3000 },
  { name: 'medium', speed: 2000 },
  { name: 'fast', speed: 1000 },
];

const App = () => {
  const [colors, setColors] = useState<Color[]>([]);
  const [clickedColorArr, setClickedColorArr] = useState(['']);
  const [shownTitle, setShowTitle] = useState('');
  const [shownColor, setShowColor] = useState('');
  const [count, setCount] = useState(-15);
  const [whatWeSee, setWhatWeSee] = useState({
    startButton: true,
    gameOptions: false,
    gameOptions2: false,
    gameOptions3: false,
    withButtons: false,
    // withKeyboard: false,
    results: false,
    startGame: false,
    animation: false,
  });
  const [correctColors, setCorrectColors] = useState(0);
  const [keyPress, setKeyPress] = useState('');
  const [timeOut, setTimeOut] = useState(2000);
  const isInitialMount = useRef(true);

  const audio = new Audio(simpleSound);

  const playSound = (audioFile: { play: () => void }) => {
    audioFile.play();
  };

  useEffect(() => {
    let counter = 0;
    for (let i = 0; i < colors.length; i++) {
      if (
        colors[i].color.substring(0, 1).toLowerCase() ===
        clickedColorArr[i].substring(0, 1).toLowerCase()
      ) {
        counter += 1;
      }
    }
    setCorrectColors(counter);
  }, [whatWeSee.results]);

  useEffect(() => {
    if (whatWeSee.withButtons) {
      return;
    }
    if (keyPress) {
      const copyColorArr = [...clickedColorArr];
      copyColorArr[count] = keyPress;
      setClickedColorArr(copyColorArr);
    }
  }, [keyPress]);

  console.log(clickedColorArr);
  // console.log(whatWeSee);

  useEffect(() => {
    if (isInitialMount.current) {
      // @ts-ignore
      document.body.addEventListener('keydown', (e) => setKeyPress(e.key));
      isInitialMount.current = false;
      return;
    }
    if (!whatWeSee.startGame) {
      return;
    }

    if (count > 0 && !clickedColorArr[count - 1]) {
      playSound(audio);
    }

    if (count < colors.length) {
      // console.log(count, 'gii');
      setShowTitle(colors[count].title);
      setShowColor(colors[count].color);
      setKeyPress('');
      setTimeout(() => {
        setCount(count + 1);
      }, timeOut);
    } else {
      setWhatWeSee({
        ...whatWeSee,
        withButtons: false,
        results: true,
        startGame: false,
      });
    }
  }, [count, whatWeSee.startGame]);

  const GenerateColorArray = (size: number) => {
    const copyColors = [];
    const copyColorsClicked = [];
    for (let i = 0; i < size; i++) {
      const randomCardName = Math.floor(Math.random() * 4);
      const randomTitleName = Math.floor(Math.random() * 4);
      copyColorsClicked.push('');
      copyColors.push({
        id: uuidv4(),
        color: colorArr[randomCardName],
        title: colorArr[randomTitleName],
        show: false,
      });
    }
    setWhatWeSee({
      ...whatWeSee,
      gameOptions: false,
      gameOptions2: true,
    });
    setClickedColorArr(copyColorsClicked);
    setColors(copyColors);
  };

  const changeColorArr = (color: string) => {
    const copyColorArr = [...clickedColorArr];
    copyColorArr[count] = color;
    setClickedColorArr(copyColorArr);
  };

  const animationBeforeStart = (buttons: boolean) => {
    setWhatWeSee({
      ...whatWeSee,
      gameOptions3: false,
      animation: true,
    });
    setTimeout(() => {
      setCount(0);
      setWhatWeSee({
        ...whatWeSee,
        gameOptions3: false,
        withButtons: buttons,
        startGame: true,
        animation: false,
      });
    }, 2000);
  };

  return (
    <>
      <div className="background-color" />
      <div className="container header">
        <div className="row middle-xs center-xs">
          <div className="col-xs-12">
            <h1 className="header__heading">Welcome to Color game</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            {!whatWeSee.startGame ? (
              <div className="playArea">
                {whatWeSee.startButton && (
                  <Button
                    className="start__button"
                    label="START"
                    buttonClickHandler={() =>
                      setWhatWeSee({
                        ...whatWeSee,
                        startButton: false,
                        gameOptions: true,
                      })
                    }
                  />
                )}
                {whatWeSee.gameOptions && (
                  <>
                    <h1 className="gameOption__header">Select game size</h1>
                    {counterArr.map((counter) => (
                      <Button
                        className="button"
                        key={counter}
                        label={`${counter} color game`}
                        buttonClickHandler={() => GenerateColorArray(counter)}
                      />
                    ))}
                  </>
                )}
                {whatWeSee.gameOptions2 && (
                  <>
                    <h1 className="gameOption__header">Select game speed</h1>
                    {timeOutArr.map(({ name, speed }) => (
                      <Button
                        className="button"
                        key={name}
                        label={`${name}: ${speed / 1000} sec`}
                        buttonClickHandler={() => {
                          setTimeOut(speed);
                          setWhatWeSee({
                            ...whatWeSee,
                            gameOptions3: true,
                            gameOptions2: false,
                          });
                        }}
                      />
                    ))}
                  </>
                )}

                {whatWeSee.gameOptions3 && (
                  <>
                    <h1 className="gameOption__header">
                      Select keyboard or mouse to play with
                    </h1>
                    <Button
                      className="button"
                      label="mouse"
                      buttonClickHandler={() => animationBeforeStart(true)}
                    />
                    <Button
                      className="button"
                      label="keyboard"
                      buttonClickHandler={() => animationBeforeStart(false)}
                    />
                    {colorArr.map((color) => (
                      <span key={color} style={{ color }} className="heading2">
                        {`press ${color.substring(0, 1)} = ${color}`}
                      </span>
                    ))}
                  </>
                )}
                {whatWeSee.animation && (
                  <span className="animation">
                    <span style={{ color: 'yellow' }}>Let's</span>
                    <span style={{ color: 'red' }}>GO!!!</span>
                  </span>
                )}

                {whatWeSee.results && (
                  <div>
                    <h2 className="result__header">
                      {!correctColors && 'sorry... 0 points'}
                      {correctColors === 1 && 'you got 1 point'}
                      {correctColors > 1 && `you got ${correctColors} points`}
                    </h2>
                    <div className="result__button-wrapper">
                      <Button
                        className="button button--result"
                        label="play again!"
                        buttonClickHandler={() => {
                          setWhatWeSee({
                            ...whatWeSee,
                            startButton: true,
                            results: false,
                          });
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="playArea">
                {whatWeSee.withButtons ? (
                  <div>
                    <div className="shownColor-wrapper">
                      <div className="shownColor__footer">
                        <span>
                          color {count + 1}/{clickedColorArr.length}
                        </span>
                        <Button
                          label="end game"
                          className="button button--result"
                          buttonClickHandler={() => {
                            setTimeout(() => {
                              setWhatWeSee({
                                ...whatWeSee,
                                startButton: true,
                                withButtons: false,
                                startGame: false,
                              });
                            }, 300);
                          }}
                        />
                      </div>
                      <span
                        className="shownColor"
                        style={{ color: shownColor }}
                      >
                        {shownTitle}
                      </span>
                      <Timer timeOut={timeOut} shownColor={shownColor} />
                    </div>
                    {colorArr.map((color) => (
                      <Button
                        key={color}
                        label={color}
                        className="button button--game"
                        buttonClickHandler={() => {
                          changeColorArr(color);
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="shownColor-wrapper">
                    <p>
                      you pressed:{' '}
                      <span className="keyPress" style={{ color: shownColor }}>
                        {' '}
                        {keyPress}
                      </span>
                    </p>
                    <span className="shownColor" style={{ color: shownColor }}>
                      {shownTitle}
                    </span>
                    <Timer timeOut={timeOut} shownColor={shownColor} />
                    <div className="shownColor__footer">
                      <span>
                        color {count + 1}/{clickedColorArr.length}
                      </span>
                      <Button
                        label="end game"
                        className="button button--result"
                        buttonClickHandler={() => {
                          setTimeout(() => {
                            setWhatWeSee({
                              ...whatWeSee,
                              startButton: true,
                              withButtons: false,
                              startGame: false,
                            });
                          }, 300);
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
