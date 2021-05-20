import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";

const mapStateToProps = (state) => state;

function JobDetail(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: "flex",
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  }));
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    console.log(props.selectedJob);
  });
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <img
          width="300"
          style={{ position: "relative", top: "-100px", left: "-700px" }}
          src={props.selectedJob.company_logo}
        />
        <h1 style={{ fontSize: "40px", marginTop: "-200px" }}>
          {props.selectedJob.title}
        </h1>
        <h3 style={{ color: "grey" }}>{props.selectedJob.company}</h3>
        <div className={classes.root}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab label="Description" {...a11yProps(0)} />
            <Tab label="How to apply" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <div
              style={{ maxWidth: "1350px" }}
              dangerouslySetInnerHTML={{
                __html: props.selectedJob.description,
              }}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div
              style={{ maxWidth: "500px" }}
              dangerouslySetInnerHTML={{
                __html: props.selectedJob.how_to_apply,
              }}
            />
          </TabPanel>
        </div>
      </Container>
    </React.Fragment>
  );
}
export default connect(mapStateToProps)(JobDetail);
