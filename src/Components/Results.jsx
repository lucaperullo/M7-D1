import React, { useState, useEffect } from "react";
import CardHeader from "@material-ui/core/CardHeader";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { Spinner } from "@chakra-ui/react";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Switch from "@material-ui/core/Switch";
import Avatar from "@material-ui/core/Avatar";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { red } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    width: 345,
    marginLeft: 15,
    marginBottom: 15,
  },
  media: {
    height: 150,
  },
  avatar: {
    backgroundColor: red[500],
  },
});
const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  setSelectedJob: (job) => dispatch({ type: "SET_SELECTED_JOB", payload: job }),
  addToFavourites: (job) =>
    dispatch({ type: "ADD_NEW_FAVOURITE", payload: job }),
  removeFromFavourites: (job) =>
    dispatch({ type: "REMOVE_FAVOURITE", payload: job }),
});
function Results(props) {
  let history = useHistory();
  const [isFavourited, setIsFavourited] = useState(false);
  useEffect(() => {
    if (
      props.user.favourites.filter(
        (favourite) => favourite.id === props.searchResults.id
      ).length === 1
    ) {
      setIsFavourited(true);
    } else {
      setIsFavourited(false);
    }
  }, []);

  useEffect(() => {
    if (
      props.user.favourites.filter(
        (favourite) => favourite.id === props.searchResults.id
      ).length === 1
    ) {
      setIsFavourited(true);
      console.log(props.user);
    } else {
      setIsFavourited(false);
    }
  }, [props.user.favourites]);

  const classes = useStyles();
  const jobs = props.searchResults.length !== 0 ? props.searchResults : [];

  <div dangerouslySetInnerHTML={{ __html: jobs.description }} />;
  return (
    <div style={{ marginTop: "50px", padding: "20px" }}>
      <Router>
        <Grid container spacing={2}>
          {jobs.map((job) => (
            <Route key={job.id} exact path="/">
              <Card className={classes.root}>
                <CardActionArea>
                  <Link to={"/job-search/" + job.id}>
                    {job.company_logo ? (
                      <CardMedia
                        onClick={() => {
                          props.setSelectedJob(job);
                          history.push("/job-search/" + job.id);
                        }}
                        className={classes.media}
                        image={job.company_logo}
                        title="Contemplative Reptile"
                      />
                    ) : (
                      <img
                        onClick={() => {
                          props.setSelectedJob(job);
                          history.push("/job-search/" + job.id);
                        }}
                        height="150"
                        src="https://www.altalex.com/~/media/Images/Lex/Informatica/smart-contract-GI-1058690558%20jpg.jpg"
                        alt={job.title}
                      />
                    )}
                  </Link>
                  <CardHeader
                    style={{ height: "150px" }}
                    title={job.title}
                    subheader={job.company}
                  />
                </CardActionArea>

                <CardActions>
                  <Switch
                    // checked={state.checkedA}
                    onChange={
                      isFavourited
                        ? () => props.removeFromFavourites(job)
                        : () => props.addToFavourites(job)
                    }
                    name="checkedA"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                  <Link to={"/job-search/" + job.id}>
                    <Button
                      onClick={() => {
                        props.setSelectedJob(job);
                        history.push("/job-search/" + job.id);
                      }}
                      size="small"
                      color="primary"
                    >
                      Learn More
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Route>
          ))}
        </Grid>
      </Router>
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Results);
