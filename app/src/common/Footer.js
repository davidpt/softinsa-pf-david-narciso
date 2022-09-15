import * as React from "react";
import Container from "@mui/material/Container";
import { Grid, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useTheme } from "@mui/material";

export default function Footer(props) {
  const theme = useTheme();

  return (
    <Grid
      sx={{
        backgroundColor: theme.palette.mode === "light" ? "white" : "#797474",
      }}
    >
      <Container maxWidth="lg" sx={{ pt: 10, pb: 15, textAlign: "center" }}>
        <Stack>
          <Typography variant="body1" sx={{ fontSize: 20 }}>Imo Soft, uma plataforma de confiança.</Typography>
        </Stack>
        <Grid
          sx={{
            marginTop: "3rem",
            marginBottom: "3rem",
            borderTop: "1px solid #dee2e6",
          }}
        ></Grid>
        <Stack spacing={2} sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: 14 }}>
            © 2022 Imo Soft
          </Typography>
          <Typography sx={{ fontSize: 12 }}>
            Todos os direitos reservados.
          </Typography>
        </Stack>
      </Container>
    </Grid>
  );
}
