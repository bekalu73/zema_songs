// src/pages/Home.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs } from "../store/actions/songActions";
import { RootState } from "../store/reducers/rootReducer";
import { Song } from "../store/types/songTypes";
import SongCard from "../components/SongCard";
import styled from "@emotion/styled";

const SongList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
`;

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state: RootState) => state.songs.songs);

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  return (
    <div>
      <h1>Home</h1>
      <SongList>
        {songs.map((song: Song) => (
          <SongCard key={song._id} song={song} />
        ))}
      </SongList>
    </div>
  );
};

export default Home;
