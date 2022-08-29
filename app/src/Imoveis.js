import "./App.css";
import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function Imoveis() {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    let queryString = "/api/imoveis";

    //Provavelmente no futuro alterar isto para usar searchParam ( /venda ) e não um useSearchParam ( compra=venda )
    if (searchParams.get("categoria") != null) {
      queryString += "?categoria=" + searchParams.get("categoria");
      if (searchParams.get("estado") != null) {
        queryString += "&estado=" + searchParams.get("estado");
      }
    } else if (searchParams.get("estado") != null) {
      queryString += "?estado=" + searchParams.get("estado");
    }

    //console.log(queryString);

    setLoading(true);

    fetch(queryString)
      .then((response) => response.json())
      .then((data) => {
        setImoveis(data);
        setLoading(false);
      });
  }, [searchParams]);

  function getImoveisUsados() {
    searchParams.set("estado", "novo");
    setSearchParams(searchParams);
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-intro">
          <h2>Lista de Apartamentos</h2>
          {imoveis.map((imoveis) => (
            <div key={imoveis.id}>
              <p style={{ marginBottom: "0" }}>
                {imoveis.tipo}, {imoveis.tipologia}
              </p>
              <p style={{ margin: "0" }}>Categoria: {imoveis.categoria}</p>
              <p style={{ margin: "0" }}>Estado: {imoveis.estado}</p>
              <p style={{ margin: "0" }}>Descrição: {imoveis.descricao}</p>
              <button onClick={() => navigate("/anuncio/" + imoveis.id)}>ABRIR ANUNCIO</button>
            </div>
          ))}
          <button onClick={() => getImoveisUsados()}>IMOVEIS USADOS</button>
        </div>
      </header>
    </div>
  );
}

export default Imoveis;
