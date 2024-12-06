import React from "react";
import styled, { keyframes } from "styled-components";
import "../../Variables.scss";

// Анимация для движения точек
const triangulate = keyframes`
  0%, 100% {
    transform: none;
  }
  33.333% {
    transform: translate(120%, 175%);
  }
  66.666% {
    transform: translate(-95%, 175%);
  }
`;

// Анимация для роста точек
const grow = keyframes`
  0%, 100% {
    transform: scale(1.5);
  }
  20%, 70% {
    transform: none;
  }
`;

// Контейнер лоадера
const JellyTriangle = styled.div<{
  $size: string;
  $color: "white" | "blue";
}>`
  position: relative;
  height: ${({ $size }) => $size};
  width: ${({ $size }) => $size};
  filter: url("#uib-jelly-triangle-ooze");

  // Основная точка
  .dot {
    position: absolute;
    width: 33%;
    height: 33%;
    background: ${({ $color }) =>
      $color === "white"
        ? "var(--color-background)"
        : $color === "blue"
        ? "var(--color-action)"
        : "transparent"};
    border-radius: 50%;
    top: 6%;
    left: 30%;
    animation: ${grow} 1.5s ease infinite;
  }

  // Левая точка
  .dot-left {
    content: "";
    position: absolute;
    width: 33%;
    height: 33%;
    background: ${({ $color }) =>
      $color === "white"
        ? "var(--color-background)"
        : $color === "blue"
        ? "var(--color-action)"
        : "transparent"};
    border-radius: 50%;
    bottom: 6%;
    left: 0;
    animation: ${grow} 1.5s ease calc(1.5s * -0.333) infinite;
  }

  // Правая точка
  .dot-right {
    content: "";
    position: absolute;
    width: 33%;
    height: 33%;
    background: ${({ $color }) =>
      $color === "white"
        ? "var(--color-background)"
        : $color === "blue"
        ? "var(--color-action)"
        : "transparent"};
    border-radius: 50%;
    bottom: 6%;
    right: 0;
    animation: ${grow} 1.5s ease calc(1.5s * -0.666) infinite;
  }

  // Двигающаяся точка
  .traveler {
    position: absolute;
    top: 6%;
    left: 30%;
    width: 33%;
    height: 33%;
    background: ${({ $color }) =>
      $color === "white"
        ? "var(--color-background)"
        : $color === "blue"
        ? "var(--color-action)"
        : "transparent"};
    border-radius: 50%;
    animation: ${triangulate} 1.5s ease infinite;
  }
`;

// SVG-фильтр
const JellyMaker = styled.svg`
  width: 0;
  height: 0;
  position: absolute;
`;

interface LoaderProps {
  size: string;
  color?: "white" | "blue";
}

export const Loader: React.FC<LoaderProps> = ({
  size,
  color = "white",
}) => (
  <>
    <JellyMaker>
      <defs>
        <filter id="uib-jelly-triangle-ooze">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7.3" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="ooze"
          />
          <feBlend in="SourceGraphic" in2="ooze" />
        </filter>
      </defs>
    </JellyMaker>
    <JellyTriangle $size={size} $color={color}>
      <div className="dot"></div>
      <div className="dot-left"></div>
      <div className="dot-right"></div>
      <div className="traveler"></div>
    </JellyTriangle>
  </>
);
