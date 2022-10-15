import styled from "styled-components";
import CheckMediumImg from "../../assets/img/check-medium.svg";
import StraightImg from "../../assets/img/straight.svg";

const CheckboxSummary = styled.input`
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  border: ${({ theme }) => theme.borderWidths[1]} solid ${({ theme }) => theme.color.primary};
  background: transparent;
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.borderRadius};

  font-size: ${({ theme }) => theme.fontSizes[1]};
  cursor: pointer;

  :checked {
    background: transparent;
    content: url(${CheckMediumImg});
    border: unset;
  }

  :indeterminate {
    background: transparent;
    content: url(${StraightImg});
    border: unset;
  }
`;

export default CheckboxSummary;
