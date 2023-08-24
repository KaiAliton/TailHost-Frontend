import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Link
} from "react-router-dom";
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import './index.css'
import Login from './pages/Login';
import Register from './pages/Register';
import PopularTest from './pages/PopularTest';
const LazyRoot = React.lazy(() => import('./App'));
const LazyPopular = React.lazy(() => import('./pages/Popular'));
const LazyListOfGenres = React.lazy(() => import ('./pages/ListOfGenres'));
const LazyGenre = React.lazy(() => import('./pages/Genre'));
const LazyProfile = React.lazy(() => import('./pages/Profile'));
const LazySettings = React.lazy(() => import('./pages/Settings'));
//const LazyTrack = React.lazy(() => import('./pages/Track'));
const LazyAlbum = React.lazy(() => import('./pages/Album'));
const LazySearch = React.lazy(() => import('./pages/Search'));

const router = createBrowserRouter(
  [
  {
    path: "/",
    element: <LazyRoot />,
    children: [
      {
        path: "/",
        element: <LazyPopular />
      },
      {
        path: "genres",
        element: <PrivateRoute><LazyListOfGenres/></PrivateRoute>
      },
      {
        path: "genre/:id",
        element: <LazyGenre/>
      },
      {
        path: "author/:id",
        element: <LazyProfile/>
      },
      {
        path: "settings",
        element: <LazySettings/>
      },
      {
        path: "login",
        element: <Login/>
      },
      {
        path: "register",
        element: <Register/>
      },
      {
        path: "test",
        element: <PopularTest/>
      },
      //{
      //  path: "track/:id",
      //  element: <LazyTrack />
      //},
      {
        path: "album/:id",
        element: <LazyAlbum />
      },
      {
        path: "search/:query",
        element: <LazySearch/>
      }
    ]
  },
]
  );

ReactDOM.createRoot(document.getElementById('root')).render(
      <AuthProvider>
      <RouterProvider router={router} />
      </AuthProvider>
)
