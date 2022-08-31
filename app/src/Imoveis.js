import "./App.css";
import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

function Imoveis() {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

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

  const remove = async (id) => {
    await fetch(`/api/imovel/apagar/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      let updatedImoveis = [...imoveis].filter((i) => i.id !== id);
      setImoveis(updatedImoveis);
    });
  };

  function getImoveisUsados() {
    searchParams.set("estado", "usado");
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
          {imoveis.map((imovel) => (
            <div key={imovel.id}>
              <p style={{ marginBottom: "0" }}>
                {imovel.tipo}, {imovel.tipologia}
              </p>
              <p style={{ margin: "0" }}>Categoria: {imovel.categoria}</p>
              <p style={{ margin: "0" }}>Estado: {imovel.estado}</p>
              <p style={{ margin: "0" }}>Descrição: {imovel.descricao}</p>
              <Link to={"/anuncio/" + imovel.id}>ABRIR ANUNCIO</Link>
              <Link to={"/anuncio/editar/" + imovel.id}>EDITAR ANUNCIO</Link>
              <button onClick={() => remove(imovel.id)}>APAGAR ANUNCIO</button>
            </div>
          ))}
          <button onClick={() => getImoveisUsados()}>IMOVEIS USADOS</button>
          <Link to={"/anuncio/adicionar"}>ADICIONAR NOVO ANUNCIO</Link>
        </div>
      </header>
    </div>
  );
}

export default Imoveis;
