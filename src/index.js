import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PrintShortTalk from "./components/PrintShortTalk";
import PrintConversation from "./components/PrintConversation";

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/print-short-talk",
        element: <PrintShortTalk />,
    },
    {
        path: "/print-conversation",
        element: <PrintConversation />,
    },
]);

root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
