//Components
import MovieList from "../container/Movies/MoiveList";
import Login from "../container/Auth/Login";
import Register from "../container/Auth/Register";

const routes = [
  {
    path: "*",
    component: <MovieList />,
    type: "public",
  },
  {
    path: "/",
    component: <MovieList />,
    type: "public",
  },
  {
    path: "/login",
    component: <MovieList />,
    type: "public",
  },
  {
    path: "/register",
    component: <MovieList />,
    type: "public",
  },
  {
    path: "/movies",
    component: <MovieList />,
    type: "private",
  },
];

export default routes;
