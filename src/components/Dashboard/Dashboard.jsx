import * as React from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListItems from "./listItems";
import { Link, useLoaderData } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { tokenActions } from "../../store/tokenPayload";
import { useEffect } from "react";
import { getAuthToken } from "../../utils/auth";
import { getTokenEmail, getTokenId, getTokenPermission } from "../../helpers/functions.helper";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.

export default function Dashboard(props) {
  const [open, setOpen] = React.useState(true);
  const loaderData = useLoaderData();
  const dispatch = useDispatch()
  const logOrNot = useSelector(state => state.token.permission)

  useEffect(() => {
    const token = getAuthToken();

    if (!token) {
      return;
    }
    const id = getTokenId();
    const userEmail = getTokenEmail();
    const userPermission = getTokenPermission();

    // console.log("userEmail useEffect");
    // console.log(userEmail);

    dispatch(
      tokenActions.addTokenPayload({
        id,
        userEmail,
        userPermission,
      })
    );
  }, [dispatch]);


  // console.log('loaderData', loaderData);
  let closedNotifications;
  let length = 0;
  // console.log("loaderData", loaderData);

  if (loaderData) {
    closedNotifications = loaderData.filter(
      (notifications) => notifications.isOpen === false
    );
    length = closedNotifications.length;
  }

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box sx={{ display: "flex", width: "100vw" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="secondary"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              TeamBridge
            </Typography>
            {logOrNot !== '' && <IconButton color="inherit" component={Link} to={`/notificacoes`}>
              <Badge badgeContent={length} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={{ bgcolor: "primary.dark", height: "100vh" }}
        >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              bgcolor: "primary.dark",
              px: [1],
            }}
          >
            <Link to="/" style={{ margin: "auto" }}>
              <img src={Logo} style={{ height: "50px" }} />
            </Link>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List
            component="nav"
            sx={{ bgcolor: "primary.dark", height: "100%" }}
          >
            <ListItems />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            display: "flex",
            backgroundColor: "#DAE8FC",
            justifySelf: "center",
            flexGrow: 1,
            height: "100vh",
            width: {
              xs: 500, // 0
              sm: 600, // 600
              md: 960, // 900
              lg: 1200, // 1200
              xl: 1300, // 1536
            },
            objectFit: "contain",
            // paddingY: "auto",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
            <Grid container spacing={2}></Grid>
            {props.Outlet}
          </Container>
        </Box>
        {/* <Box component="div" sx={{ bgcolor: "blue" }}>
          teste
        </Box> */}
      </Box>
    </>
  );
}
