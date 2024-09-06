import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSong } from "../store/actions/songActions";
import { RootState } from "../store/reducers/rootReducer";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fbe0e6; /* Light pink background */
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 2rem auto;
`;

const Title = styled.h1`
  color: #d36c7b; /* Pinkish color for the title */
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #d36c7b;
  border-radius: 4px;
  font-size: 1rem;
`;

const Label = styled.label`
  color: #d36c7b;
  margin-bottom: 0.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const Checkbox = styled.input`
  margin-left: 0.5rem;
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #d36c7b; /* Pink button */
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c55a6c;
  }
`;

const StatusMessage = styled.p<{ isSubmitting: boolean }>`
  color: ${({ isSubmitting }) => (isSubmitting ? "#d36c7b" : "#000")};
  margin-bottom: 1rem;
`;

const AddNewSong: React.FC = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.songs);

  interface NewSong {
    id?: string;
    title: string;
    artist: string;
    album: string;
    genre: string;
    isFavorite: boolean;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionMessage("Submitting your song...");

    const newSong: NewSong = { title, artist, album, genre, isFavorite };

    try {
      dispatch(addSong(newSong));
      setSubmissionMessage("Song added successfully!");
    } catch (error) {
      setSubmissionMessage("Error adding song. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Title>Add New Song</Title>
      <StatusMessage isSubmitting={isSubmitting}>
        {isSubmitting ? "Submitting your song..." : submissionMessage}
        {error && !isSubmitting && (
          <span style={{ color: "red" }}>{error}</span>
        )}
      </StatusMessage>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Album"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          required
        />
        <Label>
          Favorite
          <Checkbox
            type="checkbox"
            checked={isFavorite}
            onChange={(e) => setIsFavorite(e.target.checked)}
          />
        </Label>
        <Button type="submit" disabled={isSubmitting}>
          Add Song
        </Button>
      </Form>
    </Container>
  );
};

export default AddNewSong;
