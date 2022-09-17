import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

function Loading() {
  return (
    <Container
      sx={{
        textAlign: "center",
        margin: "auto",
        minHeight: "70vh",
      }}
    >
      <Typography sx={{ pt: "20vh" }} variant="h2" component="h1">
        A carregar
      </Typography>
    </Container>
  );
}

export default Loading;
