import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import jwtDecode from "jwt-decode";
import PostForm from "./components/post/PostForm";
import ErrorBoundary from "./components/ErrorBoundary";
import PostsContainer from "./containers/post/allPosts";
import OnePostContainer from "./containers/post/singlePost";
import ProfilesContainer from "./containers/profile/allProfiles";
import ProfileContainer from "./containers/profile/profile";
import LoginPage from "./containers/auth/LoginPage";
import authContext from "./authContext";
import RegisterPage from "./containers/auth/RegistryPage";
import ProtectedRoute from "./routeProtection/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  // eslint-disable-next-line no-unused-vars
  const [context, setContext] = useState({
    token: {},
    user: {},
  });

  const logout = () => {
    localStorage.removeItem("token");
    setContext({
      token: {},
      user: {},
    });
    document.location.reload();
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const tokenStr = JSON.parse(token);
      setContext({ token: tokenStr, user: jwtDecode(tokenStr.accessToken) });
    } else {
      setContext({
        token: {},
        user: {},
      });
    }
    console.log(Object.keys(context.token).length);
  }, []);
  useEffect(() => {
    console.log(context);
  }, [context]);
  const memoContext = useMemo(() => ({ context, setContext }), [context]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="App">
          <authContext.Provider value={memoContext}>
            <ErrorBoundary>
              <div className="header">
                <ul>
                  <li>
                    <Link to="/posts">Posts</Link>
                  </li>
                  <li>
                    <Link to="/posts/add-post">Add Post</Link>
                  </li>
                  <li>
                    <Link to="/profiles">Profile</Link>
                  </li>
                  {context.token.length !== 0 && (
                    <li>
                      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                      <Link component="button" onClick={logout} to="">
                        Log Out
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </ErrorBoundary>
            <div className="body">
              <ErrorBoundary>
                <Routes>
                  <Route element={<ProtectedRoute token={context.token} />}>
                    <Route path="/" element="Это главная" />
                    <Route path="/posts" element={<PostsContainer />} />

                    <Route path="/posts/add-post" element={<PostForm />} />
                    <Route path="/profiles" element={<ProfilesContainer />} />

                    <Route
                      path="/profiles/:userid"
                      element={<ProfileContainer />}
                    />
                    <Route path="/posts/:id" element={<OnePostContainer />} />
                  </Route>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/registry" element={<RegisterPage />} />

                  <Route path="*" element={<div>404</div>} />
                </Routes>
              </ErrorBoundary>
            </div>
          </authContext.Provider>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
