// import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { Form, Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TaskIcon from "@mui/icons-material/Task";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { getAuthToken } from "../../utils/auth";
import { Divider } from "@mui/material";
import { useSelector } from "react-redux";

const token = getAuthToken();

export default function ListItems() {
  const logOrNot = useSelector(state => state.token.permission)

  return (
    <>
      <Link to="/">
        <ListItemButton>
          <ListItemIcon>
            <HomeIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Home" sx={{ color: "secondary" }} />
        </ListItemButton>
      </Link>
      {logOrNot !== '' && <><Link to="/profile">
        <ListItemButton>
          <ListItemIcon>
            <AccountBoxIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Perfil" sx={{ color: "secondary" }} />
        </ListItemButton>
      </Link>
      <Link to="/company">
        <ListItemButton>
          <ListItemIcon>
            <BusinessIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Empresa" sx={{ color: "secondary" }} />
        </ListItemButton>
      </Link>
      <Link to="/projects">
        <ListItemButton>
          <ListItemIcon>
            <FormatListBulletedIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Projetos" sx={{ color: "secondary" }} />
        </ListItemButton>
      </Link>
      <Link to="/tasks">
        <ListItemButton>
          <ListItemIcon>
            <TaskIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Tarefas" sx={{ color: "secondary" }} />
        </ListItemButton>
      </Link>
      <ListItemButton component={Link} to="/notificacoes">
        <ListItemIcon>
          <NotificationsIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Notificações" sx={{ color: "secondary" }} />
      </ListItemButton>
      </>}

      <Divider sx={{ my: 1 }} />

      <ListSubheader component="div" inset sx={{ bgcolor: "primary.dark" }}>
        Autentication
      </ListSubheader>
      {/* {!token && ( */}
      {logOrNot === '' && <>
        <Link to="/">
          <ListItemButton>
            <ListItemIcon>
              <LoginIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Login" sx={{ color: "secondary" }} />
          </ListItemButton>
        </Link>
      </>}
      {/* )} */}
      {/* {token && ( */}
      {logOrNot !== '' &&
        <Form action="/logout" method="post">
          <button
            style={{
              backgroundColor: "inherit",
              border: "none",
              color: "black",
              width: "100%",
              height: "100%",
              padding: "0",
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ color: "secondary" }} />
            </ListItemButton>
          </button>
        </Form>}
      {/* )} */}
    </>
  );
}
