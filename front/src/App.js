import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./containers/Layout/Layout";
import HomePage from "./containers/HomePage/HomePage";
import GalleryPage from "./containers/GalleryPage/GalleryPage";

const CustomRoute = (props) => {
  const user = useSelector((state) => state.user.user);
  if (user?.token) {
    return <Route {...props} />;
  }
  return <Redirect to="/" />;
};

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/gallery/" exact component={GalleryPage} />
        <Route path="/gallery/:id" exact component={GalleryPage} />
        
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
};

export default App;
