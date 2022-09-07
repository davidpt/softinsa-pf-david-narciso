import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import NotFound from "./NotFound";
import Photo from "./Photo";
import { Container, Grid, Typography } from "@mui/material";

function Anuncio() {
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
      <div style={{ padding: 30 }}>
        <h1>ID: {params.id}</h1>
      </div>
      <div key={imovel.id}>
        <p style={{ marginBottom: "0" }}>
          {imovel.tipo}, {imovel.tipologia}
        </p>
        <p style={{ margin: "0" }}>Categoria: {imovel.categoria}</p>
        <p style={{ margin: "0" }}>Estado: {imovel.estado}</p>
        <p style={{ margin: "0" }}>Descrição: {imovel.descricao}</p>

        <p style={{ margin: "0" }}>Imagens: {imovel.descricao}</p>
        {imovel.imagens ? (
          <Grid container>
            <Typography>Imagens:</Typography>

            {imovel.imagens.map((_id) => (
              <Grid
                sx={{ padding: 2 }}
                style={{ maxHeight: "20vh" }}
                textAlign="center"
                xs={6}
                lg={4}
                key={_id}
                item
              >
                <Photo key={_id} id={_id} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1">Este imóvel não tem imagens</Typography>
        )}
      </div>
    </Container>
  );
}

export default Anuncio;
