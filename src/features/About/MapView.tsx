import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { addPopupToMapWidget, createMapWidget } from "./mapWidjet";
import { Map } from "leaflet";

import { Box, Container, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

export function MapView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [popupContainer, setPopupContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (mapRef.current === null) {
      const map = createMapWidget(containerRef.current!);
      mapRef.current = map;
      const popupDiv = addPopupToMapWidget(map);
      setPopupContainer(popupDiv);
    }
  }, []);

  return (
    <Container ref={containerRef} sx={{ width: 800, height: 500, my: 2 }}>
      <>{popupContainer && createPortal(<Greeting />, popupContainer)}</>
    </Container>
  );
}

function Greeting() {
  return (
    <Box>
      <Typography>Greeting from Ukraine</Typography>
      <FavoriteIcon sx={{ color: "#0056B9" }} />
      <FavoriteIcon sx={{ color: "#FFD800" }} />
    </Box>
  );
}
