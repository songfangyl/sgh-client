import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import Center from "@/components/Center";
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";

const StyledHeader = styled.header`
  background-color: #222;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1.4rem;
  font-weight: bold;
  position: relative;
  z-index: 3;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const StyledNav = styled.nav`
  ${props => props.mobileNavActive ? `
    display: block;
  ` : `
    display: none;
  `}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const NavLink = styled(Link)`
  display: block;
  color: ${props => props.active ? "#fff" : "#aaa"}; /* Highlight active link */
  font-weight: ${props => props.active ? "bold" : "normal"};
  text-decoration: none;
  padding: 10px 0;
  transition: color 0.3s ease;

  &:hover {
    color: #fff;
  }

  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const router = useRouter(); // Get the current route

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href="/">Sin Guan Hin</Logo>
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href="/" active={router.pathname === "/"}>Home</NavLink>
            <NavLink href="/products" active={router.pathname.startsWith("/products")}>All products</NavLink>
            <NavLink href="/contact" active={router.pathname === "/contact"}>Contact us</NavLink>
            <NavLink href="/cart" active={router.pathname === "/cart"}>
              Cart ({cartProducts.length})
            </NavLink>
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
