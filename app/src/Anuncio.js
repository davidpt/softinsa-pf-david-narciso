import "./App.css";
import logo from "./logo.svg";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

function Anuncio() {
  const params = useParams();
  const [imovel, setImovel] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let queryString = "/api/imovel/" + params.id;

    //console.log(queryString);

    setLoading(true);

    fetch(queryString)
      .then((response) => response.json())
      .then((data) => {
        setImovel(data);
        setLoading(false);
      });
  }, [params]);

  if (loading) {
    return <p>Loading...</p>;
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
