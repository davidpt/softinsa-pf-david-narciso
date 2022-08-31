import React from "react";
import Imoveis from "./Imoveis";
import Anuncio from "./Anuncio";
import Editar from "./Editar";
import NotFound from "./NotFound";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { responsiveFontSizes } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  let theme = createTheme({
    typography: {
      //Exemplo de novo estilo, atribuído através da tag variant=
      subtitle1: {
        fontSize: 12,
      },
      //Exemplo de alteração do estilo de um componente existente
      h1: {
        //fontSize: 30
      },
    },
  });
  theme = responsiveFontSizes(theme);

  return (
    <React.Fragment>
      <CssBaseline enableColorScheme />
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/imoveis" element={<Imoveis />} />
            <Route path="/anuncio/:id" element={<Anuncio />} />
            <Route path="/anuncio/editar/:id" element={<Editar />} />
            <Route path="/anuncio/adicionar" element={<Editar />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
