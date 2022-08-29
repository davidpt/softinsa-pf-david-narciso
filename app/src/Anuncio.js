import "./App.css";
import logo from "./logo.svg";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import NotFound from "./NotFound";

function Anuncio() {
  const params = useParams();
  const [imovel, setImovel] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    let queryString = "/api/imovel/" + params.id;

    console.log(queryString);

    setLoading(true);

    fetch(queryString)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then(data => {
        setImovel(data);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      })

  //eslint-disable-next-line
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <NotFound />
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-intro">
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
          </div>
        </div>
      </header>
    </div>
  );
}

export default Anuncio;
