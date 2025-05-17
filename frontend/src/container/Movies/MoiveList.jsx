// Dependencies
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Spin, Flex, message } from "antd";

// Actions
import {
  getMovieList,
  getActors,
  getProducers,
  setShowAddMovieModal,
} from "../../redux/movie/reducer";

// Components
import { LoadingOutlined } from "@ant-design/icons";
import MovieCard from "../../component/movie/MovieCard";
import ModalForm from "../../component/shared/Modal";
import AddMovie from "../Movies/AddMovie";

function MovieList() {
  const dispatch = useDispatch();
  const showAddMovieModal = useSelector(
    (state) => state.MovieReducer.showAddMovieModal
  );

  const movieList = useSelector((state) => state.MovieReducer.movieList);
  const loader = useSelector((state) => state.MovieReducer.loading);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!movieList.length) dispatch(getMovieList());
    //eslint-disable-next-line
  }, []);

  const setAddModal = () => {
    dispatch(getActors());
    dispatch(getProducers());
    dispatch(setShowAddMovieModal(true));
  };

  const handleEdit = (movie) => {
    const { data } = movie;
    setAddModal();
    setSelectedMovie(data);
  };

  const hadleCancel = () => {
    dispatch(setShowAddMovieModal(false));
    if (selectedMovie) {
      setSelectedMovie(null);
    }
  };

  console.log("movieList", movieList);

  return (
    <div className={"user-container"}>
      <Flex gap="middle" align="end" vertical>
        <Button onClick={setAddModal} className="text-primary">Add New Movie</Button>
      </Flex>

      <div className={`mt-10 ${!movieList?.length ? "no-data" : ""}`}>
        {loader ? (
          <Spin
            spinning={loader}
            indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
          />
        ) : (
          <>
            {movieList?.length > 0 ? (
              <MovieCard movieList={movieList} handleEdit={handleEdit} />
            ) : (
              <div>No Data</div>
            )}
          </>
        )}
      </div>

      {showAddMovieModal && (
        <ModalForm
          showModal={showAddMovieModal}
          handleCancel={hadleCancel}
          title={"Movie Details"}
          width={700}
        >
          <AddMovie handleCancel={hadleCancel} data={selectedMovie} />
        </ModalForm>
      )}
    </div>
  );
}

export default MovieList;
