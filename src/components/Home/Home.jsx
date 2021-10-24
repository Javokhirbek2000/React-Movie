import React, { useEffect, useState } from "react";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  POSTER_SIZE,
  BACKDROP_SIZE,
} from "../../config";
import FourColGrid from "../elements/FourColGrid/FourColGrid";
import HeroImage from "../elements/HeroImage/HeroImage";
import SearchBar from "../elements/SearchBar/SearchBar";
import MovieThumb from "../elements/MovieThumb/MovieThumb";
import LoadMoreBtn from "../elements/LoadMoreBtn/LoadMoreBtn";
import Spinner from "../elements/Spinner/Spinner";
import "./Home.css";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [movies, setmovies] = useState([]);
  const [heroImage, setheroImage] = useState(null);
  const [currentPage, setcurrentPage] = useState(0);
  const [totalPages, settotalPages] = useState(0);
  const [searchTerm, setsearchTerm] = useState("");

  useEffect(() => {
    if (localStorage.getItem("homeState")) {
      const state = JSON.parse(localStorage.getItem("homeState"));
      setmovies(state.movies);
      settotalPages(state.totalPages);
      setheroImage(state.heroImage);
      setcurrentPage(state.currentPage);
    } else {
      setLoading(true);
      const endpoint = `${API_URL}movie/popular/?api_key=${API_KEY}&language=en-US&page=1`;
      fetchData(endpoint);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = (endpoint, isNew) => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((res) => {
        setmovies(isNew ? [...res.results] : [...movies, ...res.results]);
        setheroImage(heroImage || res.results[1]);
        setLoading(false);
        setcurrentPage(res.page);
        settotalPages(res.total_pages);
      });
  };

  useEffect(() => {
    localStorage.setItem(
      "homeState",
      JSON.stringify({
        movies,
        heroImage,
        currentPage,
        totalPages,
      })
    );
  }, [movies, currentPage, totalPages, heroImage]);

  const loadMoreItems = () => {
    let endpoint = "";
    setLoading(true);

    if (searchTerm === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
        currentPage + 1
      }`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${
        currentPage + 1
      }`;
    }
    fetchData(endpoint, false);
  };

  const searchItems = (searchTerm) => {
    let endpoint = "";
    setLoading(true);

    setsearchTerm(searchTerm);
    if (searchTerm === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    }
    fetchData(endpoint, true);
  };

  return (
    <div className="rmdb-home">
      {heroImage ? (
        <div>
          <HeroImage
            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}/${heroImage.backdrop_path}`}
            title={heroImage.original_title}
            text={heroImage.overview}
          />
          <SearchBar callback={searchItems} />
        </div>
      ) : null}
      <div className="rmdb-home-grid">
        <FourColGrid
          header={searchTerm ? "Search Results" : "Popular Movies"}
          loading={loading}
        >
          {movies.map((el, index) => (
            <MovieThumb
              key={index}
              clickable={true}
              image={
                el.poster_path
                  ? `${IMAGE_BASE_URL}${POSTER_SIZE}/${el.poster_path}`
                  : "./images/no_image.jpg"
              }
              movieId={el.id}
              movieName={el.original_title}
            />
          ))}
        </FourColGrid>
        {loading ? <Spinner /> : null}
        {currentPage <= totalPages && !loading ? (
          <LoadMoreBtn text="Load More" onClick={loadMoreItems} />
        ) : null}
      </div>
    </div>
  );
}
