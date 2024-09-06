import React from "react";
import styled from "@emotion/styled";
import { Song } from "../store/types/songTypes";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin: 10px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 300px;
`;

const SongTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #333;
`;

const SongDetail = styled.p`
  font-size: 0.9rem;
  margin: 5px 0;
  color: #555;
`;

const FavoriteBadge = styled.span`
  background-color: #ff6363;
  color: white;
  font-size: 0.8rem;
  padding: 4px 8px;
  border-radius: 4px;
  align-self: flex-start;
`;

const SongCard: React.FC<{ song: Song }> = ({ song }) => {
  return (
    <CardContainer>
      <SongTitle>{song.title}</SongTitle>
      <SongDetail>Artist: {song.artist}</SongDetail>
      <SongDetail>Album: {song.album}</SongDetail>
      <SongDetail>Genre: {song.genre}</SongDetail>
      {song.isFavorite && <FavoriteBadge>Favorite</FavoriteBadge>}
    </CardContainer>
  );
};

export default SongCard;
