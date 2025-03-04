import React from 'react';

const BasketIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style={style}>
      <circle cx="176" cy="416" r="16" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></circle>
      <circle cx="400" cy="416" r="16" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></circle>
      <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M48 80h64l48 272h256"></path>
      <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M160 288h249.44a8 8 0 007.85-6.43l28.8-144a8 8 0 00-7.85-9.57H128"></path>
    </svg>
  );
};

export default BasketIcon;