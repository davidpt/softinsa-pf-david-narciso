import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import NotFound from "./common/NotFound";
import Photo from "./common/Photo";
import { Container, Grid, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { Box } from "@mui/system";

export default function SectionIntro() {
  const params = useParams();
  const [imovel, setImovel] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    let queryString = "/api/imovel/" + params.id;
    setLoading(true);

    fetch(queryString)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setImovel(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });

    //eslint-disable-next-line
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <NotFound />;
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" sx={{ my: 3 }}>
        {imovel.titulo}
      </Typography>
      <Grid container>
        <Grid item xs={12} md={4} sx={{ margin: "auto" }}>
          <Typography variant="h4" component="h2">
            Tipo de imóvel
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {imovel.tipo}
          </Typography>
          <Typography variant="h4" component="h2">
            Tipologia
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {imovel.tipologia}
          </Typography>
          <Typography variant="h4" component="h2">
            Distrito
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {imovel.distrito}
          </Typography>
          <Typography variant="h4" component="h2">
            Estado
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {imovel.estado}
          </Typography>
          <Typography variant="h4" component="h2">
            ID do imóvel
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {params.id}
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} sx={{ pb: 5 }}>
          {imovel.imagens ? (
            <Carousel swipe={true} autoPlay={false}>
              {imovel.imagens.map((_id) => (
                <Box
                  key={_id}
                  sx={{ padding: 2, height: "600px", maxHeight: "600px" }}
                >
                  <Photo id={_id} />
                </Box>
              ))}
            </Carousel>
          ) : (
            <Typography variant="body1">Este imóvel não tem imagens</Typography>
          )}
        </Grid>
      </Grid>
      <Typography variant="h4">Descrição</Typography>
      <Typography variant="body1">{imovel.descricao}</Typography>
    </Container>
  );
}
