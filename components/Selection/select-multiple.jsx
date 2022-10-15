import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { EmailsContext } from "../../stores/emails-store";
import CheckboxList from "./checkbox-list";
import CheckboxSummary from "./checkbox-summary";
import SelectInput from "./select-input";

const SelectBox = styled.div`
  width: 216.72px;
  margin-top: ${({ theme }) => theme.spaces[3]};

  background: ${({ theme }) => theme.color.light};
  border: ${({ theme }) => theme.borderWidths[0]} solid ${({ theme }) => theme.color.gray};
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  height: 44.46px;
  align-items: center;
  padding: 0px ${({ theme }) => theme.spaces[2]};
`;

const SelectMultipleCheck = (props) => {
  const { emails, setEmails } = useContext(EmailsContext);
  const [expandedCheckboxList, setExpandedCheckBoxList] = useState(false);
  const [allSelection, setAllSelection] = useState(1);

  const handleAllSelection = () => {
    let allTrue = true;
    let allFalse = true;
    emails[props.emailId].contactsSelection.forEach((item) => (item.selected ? (allFalse = false) : (allTrue = false)));
    const updateAllselection = allTrue ? 1 : allFalse ? 0 : 2;
    
    setAllSelection(updateAllselection);
  };

  const onShowCheckboxList = () => {
    if (expandedCheckboxList) {
      setExpandedCheckBoxList(false);
    } else {
      setExpandedCheckBoxList(true);
    }
  };

  const onSelectAll = () => {
    const updatedAllselection = allSelection === 1 ? 0 : 1;
    setAllSelection(updatedAllselection);
    emails[props.emailId].contactsSelection = emails[props.emailId].contactsSelection.map((item) => {
      item.selected = updatedAllselection;
      return item;
    });
    setEmails({ ...emails });
  };

  const onCheckboxChange = (index) => {
    emails[props.emailId].contactsSelection[index].selected = !emails[props.emailId].contactsSelection[index].selected;
    
    setEmails({ ...emails });
    handleAllSelection();
  };

  const handleAllSelectionCheckbox = () => {
    let checkbox = document.getElementById(props.id + "-checkbox-all-selection");

    switch (allSelection) {
      case 0:
        checkbox.checked = false;
        checkbox.indeterminate = false;
        break;
      case 1:
        checkbox.checked = true;
        checkbox.indeterminate = false;
        break;
      default:
        checkbox.checked = false;
        checkbox.indeterminate = true;
        break;
    }
  };


  const handleSelectionContacts = () => {
    emails[props.emailId].contactsSelection = emails[props.emailId].contacts.map((item) => {
      return { label: item, selected: true };
    });
    setEmails({ ...emails });
    setAllSelection(1);
  };

  useEffect(handleAllSelectionCheckbox, [allSelection, props.id]);
  useEffect(handleSelectionContacts, [emails[props.emailId].contacts]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SelectBox>
      <SelectContainer>
        <CheckboxSummary type="checkbox" id={props.id + "-checkbox-all-selection"} key={"checkbox-all-selection"} onChange={() => onSelectAll()} />

        <SelectInput id={props.id + "-select"} expanded={expandedCheckboxList} onClick={() => onShowCheckboxList()}></SelectInput>
      </SelectContainer>

      <CheckboxList id={props.id + "-checkbox"} expanded={expandedCheckboxList} labelList={emails[props.emailId].contactsSelection} onChange={(index) => onCheckboxChange(index)}></CheckboxList>
    </SelectBox>
  );
};
export default SelectMultipleCheck;
