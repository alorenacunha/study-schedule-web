import styled from "styled-components";
import CheckSmallImg from "../../assets/img/check-small.svg";
import SelectText from "./select-text";

const CheckboxListContainer = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[2]};
  line-height: 22px;
  max-height: 140px;
  overflow-y: auto;
  margin-right: 5px;

  max-height: 0;
  -moz-transition: max-height ${({ theme }) => theme.transition.duration} ease;
  -webkit-transition: max-height ${({ theme }) => theme.transition.duration} ease;
  -o-transition: max-height ${({ theme }) => theme.transition.duration} ease;
  transition: max-height ${({ theme }) => theme.transition.duration} ease;
  ${({ expanded }) => {
    return (
      expanded &&
      `
      max-height: 140px;
      -moz-transition: max-height  ${({ theme }) => theme.transition.duration} ease;
      -webkit-transition: max-height ${({ theme }) => theme.transition.duration} ease;
      -o-transition: max-height ${({ theme }) => theme.transition.duration} ease;
      transition: max-height ${({ theme }) => theme.transition.duration} ease;
      `
    );
  }}

  label {
    display: block;
    padding-left: ${({ theme }) => theme.spaces[2]};
    line-height: 22px;
    height: 44.46px;
    display: flex;
    align-items: center;
  }
  label:hover {
    background-color: ${({ theme }) => theme.color.lightHighlight};
  }

  input[type="checkbox"] {
    -webkit-appearance: none;
    width: 14px;
    height: 14px;
    border: ${({ theme }) => theme.borderWidths[1]} solid ${({ theme }) => theme.color.primary};
    background: transparent;
    box-sizing: border-box;
    border-radius: ${({ theme }) => theme.borderRadius};
    margin-right: ${({ theme }) => theme.spaces[2]};
    cursor: pointer;
  }

  input[type="checkbox"]:checked {
    background: ${({ theme }) => theme.color.primary};
    content: url(${CheckSmallImg});
  }

`;

const CheckboxList = (props) => {
  return (
    <CheckboxListContainer id={props.id + "-list"} expanded={props.expanded}>
      {props.labelList.map((item, index) => (
        <label key={"label-" + item.label + "-" + index}>
          <input type="checkbox" key={"checkbox-" + item.label + "-" + index} checked={item.selected} onChange={() => props.onChange(index)} />
          <SelectText>{item.label}</SelectText>
        </label>
      ))}
    </CheckboxListContainer>
  );
};

export default CheckboxList;
