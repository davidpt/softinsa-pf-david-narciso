import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

function NotFound() {
  return (
    <Container
      sx={{
        textAlign: "center",
        margin: "auto",
        minHeight: "70vh",
      }}
    >
      <Typography sx={{ pt: "20vh" }} variant="h1">
        404
      </Typography>
      <Typography variant="h2">Página não encontrada!</Typography>
    </Container>
  );
}

export default NotFound;
