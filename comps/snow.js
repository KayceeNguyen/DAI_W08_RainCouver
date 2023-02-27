import styled, { keyframes } from 'styled-components';
import React from 'react';

const snowAnimation = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100vh);
  }
`;

const SnowContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Snowflake = styled.div`
  position: absolute;
  top: -10px;
  left: ${(props) => props.left}%;
  width: 10px;
  height: 10px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.1),
              0 5px 15px rgba(255, 255, 255, 0.3),
              0 15px 35px rgba(255, 255, 255, 0.2);
  animation: ${snowAnimation} linear infinite;
  animation-duration: ${(props) => props.duration}s;
  animation-delay: ${(props) => props.delay}s;
`;

const Snow = ({ count }) => {
  const snowflakes = [];

  for (let i = 0; i < count; i++) {
    const left = Math.floor(Math.random() * 100);
    const duration = Math.floor(Math.random() * 10) + 5;
    const delay = Math.floor(Math.random() * 5);

    snowflakes.push(
      <Snowflake key={i} left={left} duration={duration} delay={delay} />
    );
  }

  return <SnowContainer>{snowflakes}</SnowContainer>;
};

export default Snow;
