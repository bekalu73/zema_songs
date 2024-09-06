// src/components/Sidebar.tsx
import React from "react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #222;
  color: white;
  height: 100vh;
  padding: 1rem;
  position: fixed; /* Sidebar stays fixed */
  top: 60px; /* Adjust based on navbar height */
  left: 0;
  overflow-y: auto; /* Scroll if the content exceeds the viewport */
`;

const SidebarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  text-decoration: none;
  color: white;

  &:hover {
    background-color: #444;
  }
`;

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <SidebarLink to="/">🏠 Home</SidebarLink>
      <SidebarLink to="/genre">🎵 Genre</SidebarLink>
      <SidebarLink to="/artist">🎤 Artist</SidebarLink>
      <SidebarLink to="/album">💿 Album</SidebarLink>
      <SidebarLink to="/add-new-song">➕ Add New Song</SidebarLink>
      <SidebarLink to="/favorite">❤️ Favorite</SidebarLink>
      <SidebarLink to="/recent">⏱️ Recent Played</SidebarLink>
    </SidebarContainer>
  );
};

export default Sidebar;
