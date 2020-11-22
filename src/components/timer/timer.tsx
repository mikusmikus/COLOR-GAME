import React, { FC } from 'react';
import './timer.css';

type Props = {
  timeOut: number;
  shownColor: string;
};

const Timer:FC<Props> = ({ timeOut, shownColor }) => {

  return (
    <div
      className="timer-line"
      style={{
        animation: `timer ${timeOut / 1000}s linear infinite`,
        backgroundColor: shownColor,
      }}
    />
  );
};

export default Timer;
