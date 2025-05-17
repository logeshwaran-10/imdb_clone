//Dependencies
import React from "react";
import { useSelector } from "react-redux";
import { Layout } from "antd";
import { Link } from "react-router";

//CSS
import "./style/style.scss";

//Component
import Routes from "./route/routes";
import AppRouter from "./route/appRouter";
const { Header, Content } = Layout;

function App() {
  const loggedIn = useSelector((state) => state.AuthReducer.loggedIn);
  const loading = useSelector((state) => state.AuthReducer.loading);

  return (
    <Layout className={"app-layout"}>
      <Header className={"app-header"}>
        <Link to={"/user"}>
          <p className={"app-name"}>IMDb</p>
        </Link>
      </Header>
      <Content className={"app-body mt-10"}>
        <AppRouter routes={Routes} loggedIn={loggedIn} loading={loading} />
      </Content>
    </Layout>
  );
}
export default App;
