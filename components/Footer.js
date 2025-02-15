import styled from "styled-components";

const FooterWrapper = styled.footer`
  padding: 40px 20px;
  background: #222;
  text-align: center;
  font-size: 14px;
  color: #fff;
  border-top: 2px solid #444;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ContactInfo = styled.div`
  max-width: 800px;
  text-align: center;
`;

const ContactItem = styled.p`
  margin: 5px 0;
  color: #ccc;
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <ContactInfo>
        <ContactItem><strong>Location:</strong> 66, Jalan Abu Bakar, Paloh, Johor</ContactItem>
        <ContactItem><strong>Phone:</strong> +60-12345678</ContactItem>
        <ContactItem><strong>Email:</strong> singuanhin@gmail.com</ContactItem>
      </ContactInfo>
      <div>
        © {new Date().getFullYear()} Sin Guan Hin. All rights reserved.
      </div>
    </FooterWrapper>
  );
}
