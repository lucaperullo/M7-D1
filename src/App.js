import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import JobDetail from "./Components/JobDetail";
import NavBar from "./Components/NavBar";
import { connect } from "react-redux";
const mapStateToProps = (state) => state;
function App(props) {
  const selectedJob = props.selectedJob;

  return (
    <div className="App">
      <Router>
        <Route path="/">
          <NavBar />
        </Route>
        <Route exact path="/job-search/:id">
          <JobDetail selectedJob={selectedJob} />
        </Route>
      </Router>
    </div>
  );
}

export default connect(mapStateToProps)(App);
