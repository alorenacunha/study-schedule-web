import React, { useState, useContext } from "react";
import SyncButton from "./sync-button";
import styled from "styled-components";
import Title from "../Commom/title";
import { EmailsContext } from "../../stores/emails-store";

const SyncBox = styled.div`
  margin-top: ${({ theme }) => theme.spaces[7]};

  @media (max-width: ${({ theme }) => theme.breakpoints[0]}px) {
    margin: ${({ theme }) => theme.spaces[4]} 0px;
  }
`;

const SyncContainer = () => {
  const { syncContacts } = useContext(EmailsContext);
  const [syncDone, setSyncDone] = useState(false);
  const [disableSync, setDisableSync] = useState(false);

  const syncContactsRequest = () => {
    if (disableSync) return;
    const updated = !syncDone;
    setSyncDone(updated);
    
    syncContacts();
    setDisableSync(true);

    setTimeout(() => {
      restart();
    }, 3500);
  };

  const restart = () => {
    setDisableSync(false);
    setSyncDone(false);
  };

  return (
    <SyncBox>
      <SyncButton syncDone={syncDone} onClick={() => syncContactsRequest()} />

      <Title>{!syncDone ? "Sync Contacts" : "All Done!"}</Title>
    </SyncBox>
  );
};

export default SyncContainer;
