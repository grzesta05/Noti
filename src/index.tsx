import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  Router,
  RouterProvider,
  Routes,
} from "react-router-dom";
import MainPage from "./routes/MainPage";
import NoteBooks from "./routes/NoteBooks";
import NoteBookView from "./routes/NoteBookView";
import TopicsList from "./components/TopicsList";
import Planner from "./components/Planner";
import Statistics from "./components/Statistics";
import TopicView from "./routes/TopicView";
import Train from "./routes/Train";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/train/:topicID" element={<Train />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/topic/:topicID" element={<TopicView />} />
        <Route path="/notebooksList" element={<NoteBooks />} />
        <Route path="/notebook/:id" element={<NoteBookView />}>
          <Route path="" element={<TopicsList />} />
          <Route path="planner" element={<Planner />} />
          <Route path="statistics" element={<Statistics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
