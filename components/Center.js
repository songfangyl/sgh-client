import styled from "styled-components";

const StyledDiv = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 0 20px 40px 20px;
`;

export default function Center({children}) {
  return (
    <StyledDiv>{children}</StyledDiv>
  );
}