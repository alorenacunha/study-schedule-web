import React, { useState } from "react";

import GmailLogo from "../assets/img/gmail.svg";
import MailchimpLogo from "../assets/img/mailchimp.svg";

const emailsInitial = {
  gmail: {
    id: "gmail",
    title: "Gmail",
    description: "These Gmail contacts will sync to MailChimp",
    icon: GmailLogo,
    contacts: ["Family", "Relatives", "Work", "Gym", "Bar"],
    contactsSelection: [],
  },
  mailchimp: {
    id: "mailchimp",
    title: "Mailchimp",
    description: "These Mailchimp contacts will sync to Gmail",
    icon: MailchimpLogo,
    contacts: ["Friends", "College"],
    contactsSelection: [],
  },
};

const initialState = {
  emails: emailsInitial,
  setEmails: () => {},
  syncContacts: () => {},
};

export const EmailsContext = React.createContext(initialState);

const EmailsStore = ({ children }) => {
  const [emails, setEmails] = useState(emailsInitial);

  const syncContacts = () => {
    const e = emails;
    const gmailContactsSelected = e.gmail["contactsSelection"].filter((item) => item.selected).map((item) => item.label);
    e.mailchimp.contacts = [...new Set(e.mailchimp.contacts.concat(gmailContactsSelected))];

    const mailchimpContactsSelected = e.mailchimp["contactsSelection"].filter((item) => item.selected).map((item) => item.label);
    e.gmail.contacts = [...new Set(e.gmail.contacts.concat(mailchimpContactsSelected))];

    setEmails({ ...e });
  };

  return <EmailsContext.Provider value={{ emails, setEmails, syncContacts }}>{children}</EmailsContext.Provider>;
};

export default EmailsStore;
