import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import PostContainer from "./containers/post/post";
import AddPost from "./components/post/AddPost";
import avatar from "./img/avatar.png";
import ErrorBoundary from "./components/ErrorBoundary";
import PostsContainer from "./containers/post/allPosts";
import SinglePostContainer from "./containers/post/singlePost";
import ProfilesContainer from "./containers/profile/allProfiles";
import ProfileContainer from "./containers/profile/profile";

const queryClient = new QueryClient();

const post = {
  logo: avatar,
  username: "username",
  tag: "tag",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  timestamp: new Date(),
  retweet: 34,
  likes: 260,
};

/* function RegularCheck() {
  const { id } = useParams();
  const re1 = /^\d+$/;
  const re2 = /^[A-Z]+$/;
  const re3 = /([\w\d]+\.(doc|pdf|jpeg)$)/;
  const digit = re1.test(id);
  const upperString = re2.test(id);
  const file = re3.test(id);
  if (digit) {
    return <div>ID is {id} - it is number</div>;
  }
  if (upperString) {
    return <div>ID is {id} - it is string</div>;
  }
  if (file) {
    return <div>ID is {id} - it is file</div>;
  }
  return <div>Go out here!</div>;
} */

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
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="App">
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
                <Route
                  path="/post"
                  element={
                    <PostContainer
                      logo={post.logo}
                      username={post.username}
                      tag={post.tag}
                      text={post.text}
                      timestamp={post.timestamp}
                      retweet={post.retweet}
                      likes={post.likes}
                    />
                  }
                />
                <Route path="/posts/add-post" element={<AddPost />} />
                <Route path="/profiles" element={<ProfilesContainer />} />

                <Route
                  path="/profiles/:userid"
                  element={<ProfileContainer />}
                />

                <Route path="/posts/:id" element={<SinglePostContainer />} />
                <Route path="/date/:data" element={<DataCheck />} />
                <Route path="*" element={<div>404</div>} />
              </Routes>
            </ErrorBoundary>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
