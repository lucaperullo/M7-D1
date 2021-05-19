import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import JobDetail from "./Components/JobDetail";
import NavBar from "./Components/NavBar";
import React, { useState, useEffect } from "react";
function App() {
  const [currentJob, setCurrentJob] = useState({});
  const selectJob = (data) => {
    setCurrentJob(data);
    console.log(data);
  };
  return (
    <div className="App">
      <Router>
        <Route path="/">
          <NavBar selectJob={selectJob} />
        </Route>
        <Route exact path="/job-search/:id">
          <JobDetail currentJob={currentJob} />
        </Route>
      </Router>
    </div>
  );
}

export default App;
