import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import JobDetail from "./JobDetail";

const useStyles = makeStyles({
  root: {
    width: 345,
    marginLeft: 10,
  },
  media: {
    height: 140,
  },
});

export default function Results(props) {
  const classes = useStyles();
  const jobs = props.results.length !== 0 ? props.results : [];

  //   <div dangerouslySetInnerHTML={{ __html: job.description }} />
  return (
    <div style={{ marginTop: "50px", marginBottom: "100px", padding: "20px" }}>
      <Router>
        <Grid container spacing={2}>
          {jobs.map((job) => (
            <>
              <Route exact path="/">
                <Card className={classes.root}>
                  <CardActionArea>
                    <Link to={"/job-search/" + job.id}>
                      <CardMedia
                        className={classes.media}
                        image={job.company_logo}
                        title="Contemplative Reptile"
                      />
                    </Link>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {job.company}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      ></Typography>
                    </CardContent>
                  </CardActionArea>

                  <CardActions>
                    <Button size="small" color="primary">
                      Share
                    </Button>

                    <Button
                      onClick={() => props.selectJob(job)}
                      size="small"
                      color="primary"
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Route>
            </>
          ))}
        </Grid>
      </Router>
    </div>
  );
}
