import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, fade } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import Button from "@material-ui/core/Button";
import ScaleLoader from "react-spinners/ScaleLoader";
import Results from "./Results";
import { connect } from "react-redux";
import MyLoader from "./Skeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  storeSearchResults: (searchResults) =>
    dispatch({ type: "STORE_SEARCH_RESULTS", payload: searchResults }),
  storeRecentSearch: (searchTerm) =>
    dispatch({ type: "ADD_RECENT_SEARCH", payload: searchTerm }),
  setError: (error) => dispatch({ type: "SET_ERROR", payload: error }),
  showErrors: (boolean) =>
    dispatch({ type: "DISPLAY_ERRORS", payload: boolean }),
});
function NavBar(props) {
  const classes = useStyles();
  const [searchInput, setSearchInput] = useState({
    location: "",
    position: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const searchApi = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setIsLoading(true);
    try {
      console.log("hitted");
      // const res = await fetch(
      //   "https://spotify-fetch.herokuapp.com/https://jobs.github.com/positions?description=&location="
      // );
      const res = await fetch(
        `https://spotify-fetch.herokuapp.com/https://jobs.github.com/positions.json?description=${
          searchInput.position && searchInput.position.length > 0
            ? searchInput.position
            : ""
        }${
          "&location" + searchInput.location && searchInput.location.length > 0
            ? "location=" + searchInput.location
            : ""
        }`
      );

      console.log("hitted part 2");
      const data = await res.json();
      if (data) {
        setTimeout(() => {
          props.storeSearchResults(data);
          setIsLoading(false);
        }, 500);
      } else {
        props.setError(data);
        props.showErrors(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => searchApi(), []);
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <Typography onClick={() => window.location.assign("/")} variant="h6">
            DEVJOBS FINDER
          </Typography>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <form onSubmit={searchApi}>
                <InputBase
                  onChange={(event) =>
                    setSearchInput({
                      ...searchInput,
                      position: event.target.value,
                    })
                  }
                  placeholder="job type"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
                <InputBase
                  onChange={(event) =>
                    setSearchInput({
                      ...searchInput,
                      location: event.target.value,
                    })
                  }
                  placeholder="location"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />

                <Button type="submit" variant="contained" color="secondary">
                  {isLoading ? <ScaleLoader height={11} width={1} /> : "Find"}
                </Button>
              </form>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />

      {isLoading === false ? (
        <Results
          results={props.searchResults}
          selectedJob={props.selectedJob}
        />
      ) : (
        <MyLoader />
      )}
      {/* {isLoading && (
        <div
          style={{
            marginTop: "300px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <span className="font-weight-bold">Loading search results...</span>
            <LinearProgress color="secondary" />
          </div>
        </div>
      )} */}
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
