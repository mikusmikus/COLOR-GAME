import React, { FC } from 'react';
// import styles from './button.module.scss';
import './button.css';

type Props = {
  key?: number | string;
  className: string;
  label: string;
  buttonClickHandler: () => void;
};

const Button: FC<Props> = ({ key, buttonClickHandler, className, label }) => {
  return (
    <>
      <button
        key={key}
        type="button"
        className={className}
        onClick={buttonClickHandler}
      >
        {label}
      </button>
    </>
  );
};

export default Button;
