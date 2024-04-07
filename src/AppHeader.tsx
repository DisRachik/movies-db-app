import { Link as RouterLink } from "react-router-dom";

import { AppBar, Toolbar, Typography, Link, Button, Box } from "@mui/material";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import { useContext } from "react";
import { AuthContext, anonymousUser } from "./AuthContext";

interface AuthHeaderProp {
  onLogin(): void;
  onLogout(): void;
}

export function AppHeader({ onLogin, onLogout }: AuthHeaderProp) {
  return (
    <AppBar position="static">
      <Toolbar>
        <LiveTvOutlinedIcon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          The Movies LIST
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <nav>
            <HeaderLink to="/">Home</HeaderLink>
            <HeaderLink to="/movies">Movies</HeaderLink>
            <HeaderLink to="/about">About</HeaderLink>
          </nav>
        </Box>

        <AuthSection onLogin={onLogin} onLogout={onLogout} />
      </Toolbar>
    </AppBar>
  );
}

const HeaderLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link component={RouterLink} to={to} variant="button" color="inherit" sx={{ my: 1, mx: 1.5 }}>
    {children}
  </Link>
);

interface AuthSectionProp extends AuthHeaderProp {}

const AuthSection = ({ onLogin, onLogout }: AuthSectionProp) => {
  const { user } = useContext(AuthContext);
  const loggedIn = user !== anonymousUser;

  return (
    <>
      {loggedIn && <Typography sx={{ mr: 1.5 }}>Hello, {user.name}!</Typography>}
      <Button color="inherit" variant="outlined" onClick={loggedIn ? onLogout : onLogin}>
        {loggedIn ? "Log out" : "Log in"}
      </Button>
    </>
  );
};
