import React from "react";
import Imoveis from "./Imoveis";
import Anuncio from "./Anuncio";
import Editar from "./editar/Editar";
import NotFound from "./common/NotFound";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { responsiveFontSizes } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FindPhoto from "./FindPhoto";
import { SnackbarProvider } from "notistack";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Homepage from "./Homepage";
import Header from "./common/Header";
import Footer from "./common/Footer";

// add action to all snackbars
const notistackRef = React.createRef();
const onClickDismiss = (key) => () => {
  notistackRef.current.closeSnackbar(key);
};

function App() {
  let theme = createTheme({
    palette: {
      mode: "light",
    },
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
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <BrowserRouter>
          <SnackbarProvider
            maxSnack={4}
            ref={notistackRef}
            action={(key) => (
              <Button sx={{ color: "white" }} onClick={onClickDismiss(key)}>
                <CloseIcon />
              </Button>
            )}
          >
            <Header />
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route path="/foto/:id" element={<FindPhoto />} />
              <Route path="/imoveis" element={<Imoveis />} />
              <Route path="/anuncio/:id" element={<Anuncio />} />
              <Route path="/anuncio/editar/:id" element={<Editar />} />
              <Route path="/anuncio/adicionar" element={<Editar />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </SnackbarProvider>
        </BrowserRouter>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
