import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import 'flexboxgrid';
import { v4 as uuidv4 } from 'uuid';

// const colorsArray = [
//   {
//     id: uuidv4(),
//     color: 'red',
//     title: 'yellow',
//     show: true,
//   },
//   {
//     id: uuidv4(),
//     color: 'green',
//     title: 'yellow',
//     show: false,
//   },
//   {
//     id: uuidv4(),
//     color: 'blue',
//     title: 'red',
//     show: false,
//   },
//   {
//     id: uuidv4(),
//     color: 'red',
//     title: 'yellow',
//     show: false,
//   },
//   {
//     id: uuidv4(),
//     color: 'green',
//     title: 'blue',
//     show: false,
//   },
//   {
//     id: uuidv4(),
//     color: 'blue',
//     title: 'green',
//     show: false,
//   },
// ];

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
  const [count, setCount] = useState(-1);
  const [results, setResults] = useState(false);
  const [start, setStart] = useState(false);
  const [correctColors, setCorrectColors] = useState(0);
  const isInitialMount = useRef(true);

  useEffect(() => {
    let counter = 0;
    for (let i = 0; i < colors.length; i++) {
      if (colors[i].color === clickedColorArr[i]) {
        counter += 1;
      }
    }
    setCorrectColors(counter);
    console.log(colors);
    console.log(clickedColorArr);
  }, [results]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (count < colors.length) {
      setShowTitle(colors[count].title);
      setShowColor(colors[count].color);
      setTimeout(() => {
        setCount(count + 1);
      }, 2000);
    } else {
      // setTimeout(() => {
      setResults(true);
      setStart(false);
      // }, 2000);
    }
  }, [count]);

  const GenerateColorArray = (size: number) => {
    const copyColors = [];
    const copyColorsClicked = [];
    for (let i = 0; i < size; i++) {
      const randomNumber = Math.floor(Math.random() * 4);
      const randomNumber2 = Math.floor(Math.random() * 4);
      copyColorsClicked.push('majakaja');
      copyColors.push({
        id: uuidv4(),
        color: colorArr[randomNumber],
        title: colorArr[randomNumber2],
        show: false,
      });
    }
    setStart(true);
    setClickedColorArr(copyColorsClicked);
    setColors(copyColors);
    setCount(0);
    setResults(false);
  };

  const changeColorArr = (color: string) => {
    const copyColorArr = [...clickedColorArr];
    copyColorArr[count] = color;
    setClickedColorArr(copyColorArr);
  };

  return (
    <div className="container">
      {!start ? (
        <>
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
      ) : (
        <>
          {colorArr.map((color) => (
            <button
              key={color}
              className="button"
              type="button"
              // style={{ backgroundColor: color }}
              onClick={() => changeColorArr(color)}
            >
              {color}
            </button>
          ))}
        </>
      )}
      {results ? (
        <div>
          <h2 style={{ fontSize: '100px' }}>
            pareizi atminēji {correctColors} krāsas
          </h2>
        </div>
      ) : (
        <div>
          <h1 style={{ color: shownColor, fontSize: '200px' }}>{shownTitle}</h1>
        </div>
      )}
      {/* {colors.map(
        (color: Color) =>
          color.show && (
            <h1 key={color.id} style={{ color: color.color }}>
              {color.title}{' '}
            </h1>
          )
      )} */}
    </div>
  );
};

export default App;
