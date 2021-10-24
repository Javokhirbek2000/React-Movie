import React, { useEffect, useState } from "react";
import { API_URL, API_KEY } from "../../config";
import Navigation from "../elements/Navigation/Navigation";
import MovieInfo from "../elements/MovieInfo/MovieInfo";
import MovieInfoBar from "../elements/MovieInfoBar/MovieInfoBar";
import FourColGrid from "../elements/FourColGrid/FourColGrid";
import Actor from "../elements/Actor/Actor";
import Spinner from "../elements/Spinner/Spinner";
import "./Movie.css";

export default function Movie(props) {
  const [movie, setmovie] = useState(null);
  const [actors, setactors] = useState([]);
  const [directors, setdirectors] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    const endpoint = `${API_URL}movie/${props.match.params.movieId}?api_key=${API_KEY}&language-en-US`;
    fetchData(endpoint);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = (endpoint) => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((res) => {
        if (res.status_code) {
          setloading(false);
        } else {
          setmovie(res);
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const endpoint = `${API_URL}movie/${props.match.params.movieId}/credits?api_key=${API_KEY}`;
    fetch(endpoint)
      .then((res) => res.json())
      .then((res) => {
        const directors = res.crew.filter(
          (member) => member.job === "Director"
        );
        setactors(res.cast);
        setdirectors(directors);
        setloading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie]);

  return (
    <div className="rmdb-movie">
      {movie ? (
        <div>
          <Navigation movie={props.location.movieName} />
          <MovieInfo movie={movie} directors={directors} />
          <MovieInfoBar
            time={movie.runtime}
            budget={movie.budget}
            revenue={movie.revenue}
          />
        </div>
      ) : null}
      {actors ? (
        <div className="rmdb-movie-grid">
          <FourColGrid header={"Actors"}>
            {actors.map((el, index) => {
              return <Actor key={index} actor={el} />;
            })}
          </FourColGrid>
        </div>
      ) : null}
      {!actors && !loading ? <h1>No Movie Found!</h1> : null}
      {loading ? <Spinner /> : null}
    </div>
  );
}
