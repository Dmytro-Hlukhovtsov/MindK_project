import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import PostForm from "./components/post/PostForm";
import ErrorBoundary from "./components/ErrorBoundary";
import PostsContainer from "./containers/post/allPosts";
import OnePostContainer from "./containers/post/singlePost";
import ProfilesContainer from "./containers/profile/allProfiles";
import ProfileContainer from "./containers/profile/profile";
import Login from "./components/auth/login";
import authContext from "./authContext";

const queryClient = new QueryClient();

function DataCheck() {
  try {
    const { data } = useParams();
    const secondData = new Date(data);

    if (secondData.getTime() <= Date.now()) {
      return <div>Time is in past</div>;
    }

    return <div>Time is in Future</div>;
  } catch (e) {
    return <div>Your time is invalid</div>;
  }
}

function App() {
  // eslint-disable-next-line no-unused-vars
  const [userData, setUserData] = useState({
    authenticated: true,
    user: { id: 1 },
    setUserData: () => {},
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="App">
          <authContext.Provider value={userData}>
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
                </ul>
              </div>
            </ErrorBoundary>
            <div className="body">
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element="Это главная" />
                  <Route path="/posts" element={<PostsContainer />} />

                  <Route path="/posts/add-post" element={<PostForm />} />
                  <Route path="/profiles" element={<ProfilesContainer />} />

                  <Route
                    path="/profiles/:userid"
                    element={<ProfileContainer />}
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/posts/:id" element={<OnePostContainer />} />
                  <Route path="/date/:data" element={<DataCheck />} />
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
