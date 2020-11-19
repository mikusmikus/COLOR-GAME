/* eslint-disable react/jsx-curly-newline */
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import 'flexboxgrid';
import { v4 as uuidv4 } from 'uuid';

type Color = {
  id: string;
  color: string;
  title: string;
  show: boolean;
};
const colorArr = ['red', 'green', 'yellow', 'blue'];
const counterArr = [10, 20, 40];

const App = () => {
  const [colors, setColors] = useState<Color[]>([]);
  const [clickedColorArr, setClickedColorArr] = useState(['']);
  const [shownTitle, setShowTitle] = useState('');
  const [shownColor, setShowColor] = useState('');
  const [count, setCount] = useState(-15);
  const [whatWeGonnaSee, setWhatWeGonnaSee] = useState({
    startButton: true,
    gameOptions: false,
    gameOptions2: false,
    withKeyboard: false,
    withButtons: false,
    results: false,
    startGame: false,
  });

  const [correctColors, setCorrectColors] = useState(0);
  const [keyPress, setKeyPress] = useState('');
  const [timeOut, setTimeOut] = useState(2000);
  // const [timer, setTimer] = useState(-3);
  const isInitialMount = useRef(true);
  // const countingSteps = useRef(true);

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
  }, [whatWeGonnaSee.results]);

  useEffect(() => {
    if (!whatWeGonnaSee.withKeyboard) {
      return;
    }
    if (keyPress) {
      const copyColorArr = [...clickedColorArr];
      copyColorArr[count] = keyPress;
      setClickedColorArr(copyColorArr);
    }
  }, [keyPress]);

  // console.log(whatWeGonnaSee);
  useEffect(() => {
    if (isInitialMount.current) {
      // @ts-ignore
      document.body.addEventListener('keydown', (e) => setKeyPress(e.key));
      isInitialMount.current = false;
      return;
    }
    if (!whatWeGonnaSee.startGame) {
      return;
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
      setWhatWeGonnaSee({
        startButton: false,
        gameOptions: false,
        gameOptions2: false,
        withKeyboard: false,
        withButtons: false,
        results: true,
        startGame: false,
      });
    }
  }, [count, whatWeGonnaSee.startGame]);

  const GenerateColorArray = (size: number) => {
    const copyColors = [];
    const copyColorsClicked = [];
    for (let i = 0; i < size; i++) {
      const randomNumber = Math.floor(Math.random() * 4);
      const randomNumber2 = Math.floor(Math.random() * 4);
      copyColorsClicked.push(`${i}`);
      copyColors.push({
        id: uuidv4(),
        color: colorArr[randomNumber],
        title: colorArr[randomNumber2],
        show: false,
      });
    }
    setWhatWeGonnaSee({
      startButton: false,
      gameOptions: false,
      gameOptions2: true,
      withKeyboard: false,
      withButtons: false,
      results: false,
      startGame: false,
    });
    setClickedColorArr(copyColorsClicked);
    setColors(copyColors);
  };

  const changeColorArr = (color: string) => {
    const copyColorArr = [...clickedColorArr];
    copyColorArr[count] = color;
    setClickedColorArr(copyColorArr);
  };

  return (
    <>
      <div className="background-color" />
      <div className="container header">
        <div className="row middle-xs center-xs">
          <div className="col-xs-8 col-xs-offset-2">
            <h1 className="header__heading">Welcome to Color game</h1>
          </div>
          <div className="col-xs-2">
            {/* <div className="header__button-wrapper">
              <button type="button" className="header__button">
                LV
              </button>
              <button type="button" className="header__button">
                EN
              </button>
            </div> */}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            {!whatWeGonnaSee.startGame ? (
              <div className="playArea__before">
                {whatWeGonnaSee.startButton && (
                  <button
                    type="button"
                    className="start__button"
                    onClick={() =>
                      setWhatWeGonnaSee({
                        startButton: false,
                        gameOptions: true,
                        gameOptions2: false,
                        withKeyboard: false,
                        withButtons: false,
                        results: false,
                        startGame: false,
                      })
                    }
                  >
                    START
                  </button>
                )}
                {whatWeGonnaSee.gameOptions && (
                  <>
                    <h1 className="gameOption__header">Select game size</h1>
                    {counterArr.map((counter) => (
                      <button
                        key={counter}
                        type="button"
                        className="button"
                        onClick={() => GenerateColorArray(counter)}
                      >
                        {counter} color game
                      </button>
                    ))}
                  </>
                )}
                {whatWeGonnaSee.gameOptions2 && (
                  <>
                    <h1 className="gameOption__header">
                      Select keyboard or mouse to play with
                    </h1>
                    <button
                      type="button"
                      className="button"
                      onClick={() => {
                        setCount(0);
                        setWhatWeGonnaSee({
                          startButton: false,
                          gameOptions: false,
                          gameOptions2: false,
                          withKeyboard: false,
                          withButtons: true,
                          results: false,
                          startGame: true,
                        });
                      }}
                    >
                      mouse
                    </button>
                    <button
                      type="button"
                      className="button"
                      onClick={() => {
                        setCount(0);
                        setWhatWeGonnaSee({
                          startButton: false,
                          gameOptions: false,
                          gameOptions2: false,
                          withKeyboard: true,
                          withButtons: false,
                          results: false,
                          startGame: true,
                        });
                      }}
                    >
                      keyboard
                    </button>

                    <span style={{ color: 'red' }} className="heading2">
                      press r = red
                    </span>
                    <span style={{ color: 'blue' }} className="heading2">
                      press b = blue
                    </span>
                    <span style={{ color: 'green' }} className="heading2">
                      press g = green
                    </span>
                    <span style={{ color: 'yellow' }} className="heading2">
                      press y = yellow
                    </span>
                  </>
                )}
                {whatWeGonnaSee.results && (
                  <div>
                    <h2 className="result__header">
                      {!correctColors && 'sorry... 0 points'}
                      {correctColors === 1 && 'you got 1 point'}
                      {correctColors > 1 && `you got ${correctColors} points`}
                    </h2>
                    <div className="result__button-wrapper">
                      <button
                        type="button"
                        className="button button--result"
                        onClick={() => {
                          setWhatWeGonnaSee({
                            startButton: true,
                            gameOptions: false,
                            gameOptions2: false,
                            withKeyboard: false,
                            withButtons: false,
                            results: false,
                            startGame: false,
                          });
                        }}
                      >
                        play again!
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="playArea__before playArea">
                {whatWeGonnaSee.withButtons ? (
                  <div>
                    {colorArr.map((color) => (
                      <button
                        key={color}
                        className="button button--game"
                        type="button"
                        onClick={() => changeColorArr(color)}
                      >
                        {color}
                      </button>
                    ))}
                    <div className="shownColor-wrapper">
                      <span
                        className="shownColor"
                        style={{ color: shownColor }}
                      >
                        {shownTitle}
                      </span>
                      <div className="shownColor__footer">
                        <span>
                          color {count + 1}/{clickedColorArr.length}
                        </span>
                        <button
                          type="button"
                          className="button button--result"
                          onClick={() => {
                            setTimeout(() => {
                              setWhatWeGonnaSee({
                                startButton: true,
                                gameOptions: false,
                                gameOptions2: false,
                                withKeyboard: false,
                                withButtons: false,
                                results: false,
                                startGame: false,
                              });
                            }, 300);
                            // setCount(-1000);
                          }}
                        >
                          end game
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="shownColor-wrapper">
                    <p>
                      you pressed: <span className="keyPress"> {keyPress}</span>
                    </p>
                    <span className="shownColor" style={{ color: shownColor }}>
                      {shownTitle}
                    </span>
                    <div className="shownColor__footer">
                      <span>
                        color {count + 1}/{clickedColorArr.length}
                      </span>
                      <button
                        type="button"
                        className="button button--result"
                        onClick={() => {
                          setTimeout(() => {
                            setWhatWeGonnaSee({
                              startButton: true,
                              gameOptions: false,
                              gameOptions2: false,
                              withKeyboard: false,
                              withButtons: false,
                              results: false,
                              startGame: false,
                            });
                          }, 300);
                        }}
                      >
                        end game
                      </button>
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
