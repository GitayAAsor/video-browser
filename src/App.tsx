import React, { useEffect, useState } from "react";
import axios from "axios";
import { Data, Genre, Video } from "./types";
import Header from "./components/Header";
import VideoList from "./components/VideoList";
import "./index.css";
import "./App.css";

const App: React.FC = () => {
  const [data, setData] = useState<Data>({ genres: [], videos: [] });
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [filters, setFilters] = useState({
    searchTerm: "",
    year: "",
    genres: [] as number[],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndSetData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { videos, genres } = (
          await axios.get(
            "https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json"
          )
        ).data;

        setYears(getUniqueYears(videos) as number[]);
        setGenres(genres as Genre[]);
        setData({ videos, genres });
        setFilteredVideos(videos);
      } catch (error) {
        setError("Error fetching data");
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetData();
  }, []);

  useEffect(() => {
    const { searchTerm, year, genres } = filters;
    let videos = data.videos;

    if (searchTerm) {
      videos = videos.filter(
        (video) =>
          isMatch(video.artist, searchTerm) || isMatch(video.title, searchTerm)
      );
    }
    if (year) {
      videos = videos.filter(
        (video) => video.release_year.toString() === filters.year
      );
    }
    if (searchTerm || year) {
      setGenres(getFilteredGenres(videos));
    }

    if (genres.length > 0) {
      videos = videos.filter((video) => genres.includes(video.genre_id));
    }

    setYears(getUniqueYears(videos) as number[]);
    setFilteredVideos(videos);
  }, [filters]);

  const getUniqueYears = (videos: Video[]): number[] =>
    Array.from(new Set(videos.map((video: Video) => video.release_year))).sort(
      (a, b) => b - a
    );

  const getFilteredGenres = (videos: Video[]): Genre[] =>
    data.genres.filter((genre) =>
      videos.find((video) => video.genre_id === genre.id)
    ) as Genre[];

  const isMatch = (
    artistOrTitle: string | undefined,
    searchTerm: string
  ): boolean =>
    typeof artistOrTitle === "string" &&
    artistOrTitle.toLowerCase().includes(searchTerm.toLowerCase());

  return (
    <>
      {loading ? (
        <>Loading...</>
      ) : error ? (
        <>{error}</>
      ) : (
        <>
          <div className="container">
            <Header
              genres={genres}
              years={years}
              filters={filters}
              setFilters={setFilters}
            />
            <VideoList videos={filteredVideos} />
          </div>
        </>
      )}
    </>
  );
};

export default App;
