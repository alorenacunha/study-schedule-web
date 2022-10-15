import React from "react";
import styled from "styled-components";
import ArrowsImg from "../../assets/img/arrows.svg";

const Button = styled.button`
  border-radius: 50%;
  width: 132px;
  height: 133px;
  background: ${({ theme }) => theme.color.background};
  cursor: pointer;
  border: unset;

  transition-duration: ${({ theme }) => theme.transition.duration};
  transition-property: transform;

  ${({ spin, theme }) => {
    const split = theme.transition.rotations[1];
    return (
      spin &&
      `
      transform: rotate(${split});
      -webkit-transform: rotate(${split});
    `
    );
  }}

  @media (max-width: ${({ theme }) => theme.breakpoints[0]}px) {
    ${({ theme }) => {
      const split = theme.transition.rotations[0];
      return `
        transform: rotate(${split});
        -webkit-transform: rotate(${split});
      `;
    }}
    ${({ spin, theme }) => {
      const split = theme.transition.rotations[2];
      return (
        spin &&
        `
        transform: rotate(${split});
        -webkit-transform: rotate(${split});
      `
      );
    }}
  }
`;

const SyncButton = (props) => {
  return (
    <Button spin={props.syncDone} onClick={() => props.onClick()}>
      <img alt="icon to expand selection" src={ArrowsImg} />
    </Button>
  );
};
export default SyncButton;
