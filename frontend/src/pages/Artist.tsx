// src/pages/Artist.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStats } from "../store/actions/songActions";
import { RootState } from "../store/reducers/rootReducer";
import styled from "styled-components";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

const Container = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TitleStyled = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ChartTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #666;
`;

const Artist: React.FC = () => {
  const dispatch = useDispatch();
  const stats = useSelector((state: RootState) => state.songs.stats);

  useEffect(() => {
    dispatch(getStats());
  }, [dispatch]);

  if (!stats) return <div>Loading...</div>;

  const artistLabels = stats.artistSongCounts.map((artist) => artist._id);
  const artistData = stats.artistSongCounts.map((artist) => artist.count);

  const barChartData = {
    labels: artistLabels,
    datasets: [
      {
        label: "Songs by Artist",
        data: artistData,
        backgroundColor: "#42A5F5",
        borderColor: "#1E88E5",
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: artistLabels,
    datasets: [
      {
        label: "Artist Distribution",
        data: artistData,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF5733",
          "#33FF57",
          "#5733FF",
          "#FFC300",
          "#FF33A6",
          "#33C6FF",
          "#33FF6B",
          "#C600FF",
          "#FF3366",
          "#33FFB8",
          "#B8FF33",
          "#FFB833",
          "#B833FF",
        ],
      },
    ],
  };

  return (
    <Container>
      <TitleStyled>Artist Statistics</TitleStyled>
      <ChartContainer>
        <div>
          <ChartTitle>Number of Songs by Artist</ChartTitle>
          <Bar data={barChartData} options={{ responsive: true }} />
        </div>
        <div>
          <ChartTitle>Artist Distribution</ChartTitle>
          <Pie data={pieChartData} options={{ responsive: true }} />
        </div>
      </ChartContainer>
    </Container>
  );
};

export default Artist;
