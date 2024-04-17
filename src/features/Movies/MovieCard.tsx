import { Link as RouterLink } from "react-router-dom";
import { memo } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

interface MovieCardProps {
  id: number;
  title: string;
  popularity: number;
  overview: string;
  image?: string;
  enableUserAction?: boolean;
  onAddFavorite?(id: number): void;
}

function MovieCard({
  id,
  title,
  overview,
  popularity,
  enableUserAction = false,
  onAddFavorite,
  image = "./movie-thumb.png",
}: MovieCardProps) {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia component="div" image={image} sx={{ pt: "56.25%" }} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {overview}
        </Typography>
        <Typography variant="button" display="block" mt={2}>
          {popularity}
        </Typography>
      </CardContent>

      <CardActions>
        <Button component={RouterLink} to={`/movies/${id}`} color="secondary">
          Datails
        </Button>
        {enableUserAction && (
          <Tooltip title="Add to favorite">
            <IconButton onClick={() => onAddFavorite?.(id)}>
              <FavoriteIcon />
            </IconButton>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
}

export default memo(MovieCard);
