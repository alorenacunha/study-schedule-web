import styled from "styled-components";
const Title = styled.h1`
  margin: unset;
  margin-top: ${({ theme }) => theme.spaces[0]};
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSizes[2]};
  line-height: 25px;
  text-align: center;
  color: ${({ theme }) => theme.color.title};
`;
export default Title;
