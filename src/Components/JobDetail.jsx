import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import Container from "@material-ui/core/Container";

export default function JobDetail(props) {
  console.log(props);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <h1>details</h1>
        {/* <div dangerouslySetInnerHTML={{ __html: props.info.description }} /> */}
      </Container>
    </React.Fragment>
  );
}
