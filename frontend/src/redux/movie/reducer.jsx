import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieList: [],
  loading: false,
  addMovieLoader: false,
  showAddMovieModal: false,
  addNewLoader: false,
  showAddNewModal: {
    show: false,
  },
  actorsList: [],
  producersList: [],
};

const MovieReducer = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setShowAddMovieModal(state, action) {
      state.showAddMovieModal = action?.payload;
    },
    getMovieList(state) {
      state.loading = true;
    },
    getMovieListSuccess(state, action) {
      state.loading = false;
      state.movieList = action?.payload;
    },
    getMovieListFailure(state) {
      state.loading = false;
    },
    updateMovie(state, action) {
      state.loading = true;
    },
    updateMovieSuccess(state, action) {
      const { data } = action?.payload;
      state.movieList = state.movieList.map((list) => {
        if (list?._id === data?._id) {
          return data;
        }
        return list;
      });
      state.loading = false;
    },
    updateMovieFailure(state, action) {
      state.loading = false;
    },
    addMovie(state, payload) {
      state.addMovieLoader = true;
    },
    addMovieSuccess(state, action) {
      const { data } = action?.payload;
      state.addMovieLoader = false;
      state.showAddMovieModal = false;
      state.movieList = [...state.movieList, data];
    },
    addMovieFailure(state) {
      state.addMovieLoader = false;
    },
    setShowAddNewModal(state, action) {
      state.showAddNewModal = action?.payload;
    },
    addNewPerson(state) {
      state.addNewLoader = true;
    },
    addNewPersonSuccess(state, action) {
      if (state.showAddNewModal?.name === "actors") {
        state.actorsList = [...state.actorsList, action?.payload?.data];
      } else {
        state.producersList = [...state.producersList, action?.payload?.data];
      }
      state.addNewLoader = false;
      state.showAddNewModal = { show: false };
    },
    addNewPersonFailure(state) {
      state.addNewLoader = false;
    },
    getActors(state) {
      state.addNewLoader = true;
    },
    getActorsSuccess(state, action) {
      state.addNewLoader = false;
      state.actorsList = action?.payload;
    },
    getActorsFailure(state) {
      state.addNewLoader = false;
    },
    getProducers(state) {
      state.addNewLoader = true;
    },
    getProducersSuccess(state, action) {
      state.addNewLoader = false;
      state.producersList = action?.payload;
    },
    getProducersFailure(state) {
      state.addNewLoader = false;
    },
  },
});
export const {
  setShowAddMovieModal,
  getMovieList,
  getMovieListSuccess,
  getMovieListFailure,
  updateMovie,
  updateMovieSuccess,
  updateMovieFailure,
  addMovie,
  addMovieSuccess,
  addMovieFailure,
  setShowAddNewModal,
  addNewPerson,
  addNewPersonSuccess,
  addNewPersonFailure,
  getActors,
  getActorsSuccess,
  getActorsFailure,
  getProducers,
  getProducersSuccess,
  getProducersFailure,
} = MovieReducer.actions;
export default MovieReducer.reducer;
