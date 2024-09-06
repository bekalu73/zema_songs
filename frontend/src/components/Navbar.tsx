import React from "react";
import styled from "@emotion/styled";

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  color: white;
  position: fixed; /* Navbar stays fixed */
  width: 100%; /* Stretch to full width */
  top: 0; /* Fix it to the top */
  left: 0;
  z-index: 1000; /* Ensure it's above other content */
  height: 60px; /* Define height to align with content padding */
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const SearchInput = styled.input`
  width: 50%;
  padding: 0.5rem;
`;

const UserIcon = styled.div`
  position: relative;
  cursor: pointer;
`;

const Navbar: React.FC = () => {
  return (
    <NavbarContainer>
      <Logo>Zema Songs</Logo>
      <SearchInput type="text" placeholder="Search..." />
      <UserIcon>👤</UserIcon>
    </NavbarContainer>
  );
};

export default Navbar;
