import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './App'
import Popular from './routes/common/Popular.jsx'
import Author from './routes/channel/Author.jsx'
import Post from './routes/common/Post.jsx'
import Login from './routes/common/Login.jsx'
import VideosByGenre from './routes/common/VideosByGenre.jsx'
import Genres from './routes/common/Genres.jsx'
import VideoNew from './routes/video/VideoNew.jsx'
import AddVideo from './routes/video/AddVideo';
import './index.css'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TestForms from './utils/testforms.jsx';
import { AuthProvider } from './context/AuthContext';
import CreateChannel from './routes/channel/CreateChannel';
import Register from './routes/common/Register';
import VideoTest from './routes/video/VideoTest';
import VideoEdit from './routes/video/VideoEdit'
import PrivacyPolicy from "./routes/common/privacy-policy.jsx";
import Cookies from "./routes/common/cookies.jsx";
import Settings from "./routes/common/settings.jsx";
import Search from './routes/common/Search';

const router = createBrowserRouter(
  [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Popular />
      },
      {
        path: "upload",
        element: <AddVideo></AddVideo>
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "popular",
        element: <Popular />
      },
      {
        path: "author/:username",
        element: <Author />,
      },
      {
        path: "author/null",
        element: <CreateChannel />
      },
      {
        path: "channel/create",
        element: <CreateChannel />
      },

      {
        path: `video/:id`,
        element: <VideoNew />
      },
      {
        path: "post",
        element: <Post />
      },
      {
        path: "genres",
        element: <Genres />
      },
      {
        path: "genre/:name",
        element: <VideosByGenre />
      },
      {
        path: "test",
        element: <TestForms />
      },
      {
        path: "register",
        element: <Register/>
      },
      {
        path: "videoTest",
        element: <VideoTest/>
      },
      {
        path: "video/edit/:id",
        element: <VideoEdit/>
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy/>
      },
      {
        path: "cookies",
        element: <Cookies/>
      },
      {
        path: 'settings',
        element: <Settings/>
      },
      {
        path: 'search/:query',
        element: <Search/>
      }
    ]
  },
]
  );

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
  </React.StrictMode>,
)

//

// 


//createRoutesFromElements(
  //   <Route component={<Root />} path="/" exact>
  //     <Route component={<Popular/>} path="/"></Route>
  //     <PrivateRoute component={<CreateChannel/>} path="author/null"></PrivateRoute>
  //     <PrivateRoute component={<CreateChannel/>} path="author/create"></PrivateRoute>
  //     <Route component={<VideoNew />} path="video/:id"></Route>
  //     <Route component={<Post/>} path="post/:id"></Route>
  //     <Route component={<Genres/>} path="genres"></Route>
  //     <PrivateRoute component={<TestForms/>} path="test"></PrivateRoute>
  //     <Route component={<VideosByGenre/>} path="genre/:name"></Route>
  //     <PrivateRoute component={<AddVideo />} path="add" exact></PrivateRoute>
  //     <Route component={<Author />} path="author/:username" exact></Route>
  //     <Route component={<Login />} path="login" exact></Route>
  //     <PrivateRoute component={<AddVideo/>} path="upload"></PrivateRoute>
  //   </Route>