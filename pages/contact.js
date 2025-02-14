import Header from "@/components/Header";
import Head from "next/head";
import styled from "styled-components";

const ContactWrapper = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const ContactCard = styled.div`
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ContactIcon = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
`;

const ContactItem = styled.p`
  font-size: 16px;
  margin: 10px 0;
`;

const ContactLink = styled.a`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default function ContactPage() {
  return (
    <>
        <Header />
        <ContactWrapper>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Contact Us</h1>
        <ContactGrid>
            <ContactCard>
            <ContactIcon>📍</ContactIcon>
            <h3>Company Location</h3>
            <ContactLink href="https://www.google.com/maps?q=123+Main+Street,City,Country" target="_blank" rel="noopener noreferrer">
                123 Main Street, City, Country
            </ContactLink>
            </ContactCard>
            <ContactCard>
            <ContactIcon>📞</ContactIcon>
            <h3>Phone</h3>
            <ContactLink href="tel:+1234567890">+123 456 7890</ContactLink>
            </ContactCard>
            <ContactCard>
            <ContactIcon>✉️</ContactIcon>
            <h3>Email</h3>
            <ContactLink href="mailto:contact@yourcompany.com">contact@yourcompany.com</ContactLink>
            </ContactCard>
        </ContactGrid>
        <h2 style={{ textAlign: "center", margin: "40px 0 20px" }}>Our Team</h2>
        <ContactGrid>
            <ContactCard>
            <ContactIcon>👤</ContactIcon>
            <h3>John Doe - Manager</h3>
            <ContactLink href="mailto:johndoe@yourcompany.com">johndoe@yourcompany.com</ContactLink>
            </ContactCard>
            <ContactCard>
            <ContactIcon>👩‍💻</ContactIcon>
            <h3>Jane Smith - Support</h3>
            <ContactLink href="mailto:janesmith@yourcompany.com">janesmith@yourcompany.com</ContactLink>
            </ContactCard>
        </ContactGrid>
        </ContactWrapper>
    </>
  );
}
