import React from "react";
import styled from "styled-components";

import Avatar from "../Commom/avatar";
import Paragraph from "../Commom/paragraph";
import Title from "../Commom/title";
import SelectMultipleCheck from "../Selection/select-multiple";

const View = styled.div`
  display: flex;
  flex-flow: column;
  margin: 0 ${({ theme }) => theme.spaces[4]};
  padding: ${({ theme }) => theme.spaces[5]} ${({ theme }) => theme.spaces[4]};
  width: 283.4px;
  height: min-content;

  background: ${({ theme }) => theme.color.background};
  border: ${({ theme }) => theme.borderWidths[2]} solid ${({ theme }) => theme.color.lightGray};
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.color.borderRadius};

  align-items: center;
`;

const Card = ({ id, email }) => {
  return (
    <View id={id}>
      <Avatar icon={email.icon} />
      <Title>{email.title}</Title>
      <Paragraph>{email.description}</Paragraph>
      <SelectMultipleCheck id={id + "-contacts-selection"} emailId={email.id} />
    </View>
  );
};

export default Card;
