import React, { useContext } from "react";
import styled from "styled-components";
import ShadowImg from "../assets/img/shadow.svg";
import Card from "../components/Card/card";
import SyncContainer from "../components/Sync/sync-container";
import EmailsStore, { EmailsContext } from "../stores/emails-store";

const View = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  display: flex;
  flex-flow: row;
  justify-content: center;
`;

const Background = styled.img`
  position: absolute;
  z-index: -1;
  top: ${({ theme }) => theme.spaces[3]};
  @media (max-width: ${({ theme }) => theme.breakpoints[0]}px) {
    top: ${({ theme }) => theme.spaces[9]};
  }
`;

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  margin: ${({ theme }) => theme.spaces[6]} 0px;
  justify-content: center;
  @media (max-width: ${({ theme }) => theme.breakpoints[0]}px) {
    flex-flow: column wrap;
    align-items: center;
    margin: ${({ theme }) => theme.spaces[5]} 0px;
  }
`;

const Home = () => {
  const { emails } = useContext(EmailsContext);

  

  return (
    <EmailsStore>
      <View>
        <Background src={ShadowImg} />
        <Container>
          <Card id="gmail-contacts" email={emails.gmail}></Card>
          <SyncContainer />
          <Card id="mailchimp-contacts" email={emails.mailchimp}></Card>
        </Container>
      </View>
    </EmailsStore>
  );
};
export default Home;
