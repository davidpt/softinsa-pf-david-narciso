import { Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ pt: 15, pb: 5, textAlign: "center" }}>
        <Typography variant="h2" sx={{ pb: 5 }}>
          Plataforma para gestão de imóveis
        </Typography>
        <Typography variant="body1" sx={{ pb: 10 }}>
          Bem-vindo à plataforma de gestão de imóveis IMO SOFT. Esta plataforma
          tem como objetivo permitir a um administrador gerir uma base de dados
          que contém informações sobre imóveis.
        </Typography>
        <Button
          component={Link}
          to="/imoveis"
          variant="contained"
          sx={{ mb: "20vh" }}
        >
          Lista de imóveis
        </Button>
      </Container>
    </React.Fragment>
  );
}
