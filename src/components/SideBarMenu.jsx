import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import styles from "./SideBarMenu.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function TemporaryDrawer(props) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleUpdateClick = () => {
    props.setProfile(false);
    props.setUpdateProfile(true);
    navigate("/ProfilePage");
  };

  const handleProfileClick = () => {
    props.setProfile(true);
    props.setUpdateProfile(false);
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogOutClick = () => {
    const userCtx = useContext(UserContext);
    userCtx.accessToken = "";
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding component={Link} to="/ProfilePage">
          <ListItemButton>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary={"Profile Page"} />
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/SearchUsersPage">
            <ListItemIcon>
              <PersonSearchIcon />
            </ListItemIcon>
            <ListItemText primary={"Search User"} />
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleUpdateClick}>
            <ListItemIcon>
              <ModeEditIcon />
            </ListItemIcon>
            <ListItemText primary={"Update Profile"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/FriendsPage">
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary={"Friends"} />
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/" onClick={handleLogOutClick}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Log Out"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className={styles.rightarrow}>
      <Button onClick={toggleDrawer(true)}>
        <KeyboardDoubleArrowRightIcon className="Mui-fontSizeLarge"></KeyboardDoubleArrowRightIcon>
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
