import { Container } from "@mui/material";
import { CountDownText } from "./CountDownText";
import { CountDownVideo } from "./CountDownVideo";

export function About() {
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <CountDownText />
      <CountDownVideo />
    </Container>
  );
}
