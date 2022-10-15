import React from "react";
import styled from "styled-components";
import ArrowImg from "../../assets/img/arrow-down.svg";

const SelectInputBox = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  width: 100%;
  justify-content: space-between;
  select  {
    background: transparent;
    border: unset;
    height: 44.46px;
    padding-left: ${({ theme }) => theme.spaces[1]};

    font-family: Noto Sans;
    font-style: normal;
    font-weight: normal;
    font-size: ${({ theme }) => theme.fontSizes[1]};
    line-height: 22px;

    -webkit-appearance: none;
    -moz-appearance: none;
  }
`;

const ArrowCollapse = styled.div`
  content: url(${ArrowImg});

  transition-duration: ${({ theme }) => theme.transition.duration};
  transition-property: transform;

  ${({ expanded, theme }) => {
    const split = theme.transition.rotations[1];
    return (
      expanded &&
      `
    transform: rotate(${split});
    -webkit-transform: rotate(${split});
  `
    );
  }}
`;

const SelectOver = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const SelectInput = (props) => {
  return (
    <SelectInputBox id={props.id + "-input"} onClick={() => props.onClick()}>
      <select id="select-checkbox">
        <option id="option-title" value="1">
          All Contacts
        </option>
      </select>
      <SelectOver />
      <ArrowCollapse expanded={props.expanded}></ArrowCollapse>
    </SelectInputBox>
  );
};

export default SelectInput;
