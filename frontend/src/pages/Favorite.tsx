import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/reducers/rootReducer";
import { fetchSongs } from "../store/actions/songActions";
import { Song } from "../store/types/songTypes";
import styled from "styled-components";

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fbe0e6; /* Light pink background */
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  margin: 2rem auto;
  border: 1px solid #d36c7b; /* Pink border */
`;

const Title = styled.h1`
  color: #d36c7b; /* Pinkish color for the title */
  font-size: 2rem;
  margin-bottom: 1.5rem;
  font-family: "Arial", sans-serif;
`;

const SongList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
`;

const SongItem = styled.li`
  background-color: #ffffff; /* White background for list items */
  border: 1px solid #d36c7b; /* Pink border */
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #fddde6; /* Light pink background on hover */
  }
`;

const SongTitle = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
`;

const SongArtist = styled.span`
  color: #555; /* Darker text color for artist */
  font-size: 1rem;
`;

const NoSongs = styled.div`
  text-align: center;
  color: #d36c7b; /* Pink color */
  font-size: 1.1rem;
`;

const Favorite: React.FC = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state: RootState) => state.songs.songs);
  const favoriteSongs =
    songs && Array.isArray(songs)
      ? songs.filter((song) => song.isFavorite)
      : [];

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  return (
    <Container>
      <Title>Favorite Songs</Title>
      <SongList>
        {favoriteSongs.length > 0 ? (
          favoriteSongs.map((song: Song) => (
            <SongItem key={song.id}>
              <SongTitle>{song.title}</SongTitle>
              <SongArtist>{song.artist}</SongArtist>
            </SongItem>
          ))
        ) : (
          <NoSongs>No favorite songs found.</NoSongs>
        )}
      </SongList>
    </Container>
  );
};

export default Favorite;
