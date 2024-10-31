import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import BaseTemplate from "./template";
import { AppContextProvider, useAppContext } from "./shared/contexts";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Activate from "./pages/Activate";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost";
import CounterPage from "./pages/Counter";
import { Provider } from "react-redux";
import store from "api/store";
import { SnackBarContextProvider } from "shared/contexts/SnackBarContext";
import Login from "./pages/Login";
import UserDashboard from "components/UserDashboard/UserDashboard";

const AutorizedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/:postId" element={<Post />} />
      <Route path="posts/create" element={<CreatePost />} />
      <Route path="/dashboard" element={<UserDashboard/>} />
      <Route path="/counter" element={<CounterPage />} />
    </Routes>
  )
}

const UnautorizedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/activate/:uid/:token" element={<Activate />} />
      
    </Routes>
  )
}

const APP = () => {
  const { userToken } = useAppContext();

  return (
    <BaseTemplate> 
      {userToken ? 
        <AutorizedRoutes />
        : <UnautorizedRoutes />
      }
    </BaseTemplate>
  )
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AppContextProvider> 
          <SnackBarContextProvider>
            <APP />
          </SnackBarContextProvider>
        </AppContextProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
