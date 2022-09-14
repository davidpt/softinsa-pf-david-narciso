import * as React from "react";
import Container from "@mui/material/Container";
import { Grid, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Grid sx={{ backgroundColor: "gray" }}>
      <Container
        maxWidth="lg"
        sx={{ pt: 2, pb: 5, textAlign: "center" }}
      >
        <Typography variant="h1">Footer placeholder</Typography>
      </Container>
    </Grid>
  );
}
