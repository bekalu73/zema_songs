// src/App.tsx
import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Favorite from "./pages/Favorite";
import Genre from "./pages/Genre";
import Artist from "./pages/Artist";
import Album from "./pages/Album"; // Ensure this points to your Album component
import AddNewSong from "./pages/AddNewSong";
import RecentPlayed from "./pages/RecentPlayed";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const ContentWrapper = styled.div`
  margin-left: 250px; /* Space for the sidebar */
  padding: 20px;
  padding-top: 80px; /* Space for the navbar */
  min-height: 100vh; /* Ensure content takes full height */
  background-color: #f0f0f0; /* Light background to distinguish content */
`;

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <ContentWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/genre" element={<Genre />} />
          <Route path="/artist" element={<Artist />} />
          <Route path="/album" element={<Album />} />
          <Route path="/add-new-song" element={<AddNewSong />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/recent" element={<RecentPlayed />} />
        </Routes>
      </ContentWrapper>
    </div>
  );
};

export default App;
