import React from "react";
import styled from "styled-components";

const Round = styled.div`
  display: flex;
  width: 66.13px;
  height: 66.13px;

  border: ${({theme})=> theme.borderWidths[0]} solid  ${({theme})=> theme.color.lightGray1};
  box-sizing: border-box;
  border-radius: 50%;
  justify-content: center;
  align-content: center;
`;

const Avatar = (props) => {
  return (
    <Round>
      <img src={props.icon} alt="brand avatar icon" />
    </Round>
  );
};

export default Avatar;
