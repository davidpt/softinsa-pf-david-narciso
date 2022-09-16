import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import NotFound from "./common/NotFound";
import Photo from "./common/Photo";
import { Container, Grid, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material";
import Loading from "./common/Loading";

export default function Anuncio() {
  const params = useParams();
  const [imovel, setImovel] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const theme = useTheme();

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
    return <Loading />;
  }

  if (error) {
    return <NotFound />;
  }

  return (
    <Container maxWidth="lg">
      <Grid container sx={{ mt: 7, pb: 5 }}>
        <Grid
          item
          xs={12}
          sm={5}
          sx={{
            pl: 3,
            pr: 3,
            pb: 3,
            backgroundColor:
              theme.palette.mode === "light" ? "white" : "#35363a",
          }}
        >
          <Typography variant="h4" component="h1" sx={{ mt: 2, mb: 3 }}>
            {imovel.titulo}
          </Typography>
          <Typography variant="h5" component="h2">
            Tipo de imóvel
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {imovel.tipo}
          </Typography>
          <Typography variant="h5" component="h2">
            Tipologia
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {imovel.tipologia}
          </Typography>
          <Typography variant="h5" component="h2">
            Distrito
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {imovel.distrito}
          </Typography>
          <Typography variant="h5" component="h2">
            Estado
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {imovel.estado}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={7}>
          {imovel.imagens ? (
            <Carousel swipe={true} autoPlay={false}>
              {imovel.imagens.map((_id) => (
                <Box
                  key={_id}
                  sx={{
                    height: "600px",
                    maxHeight: "600px",
                  }}
                >
                  <Photo contain={true} id={_id} />
                </Box>
              ))}
            </Carousel>
          ) : (
            <Photo id={"000"} />
          )}
        </Grid>
      </Grid>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Descrição
      </Typography>
      <Typography variant="body1" sx={{ fontSize: 18, whiteSpace:"pre-line" }}>
        {imovel.descricao}
      </Typography>
      <Typography variant="body1" sx={{ mt: 4, mb: 6, fontStyle: "italic" }}>
        ID do imóvel: {params.id}
      </Typography>
    </Container>
  );
}
