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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import styles from "./SideBarMenu.module.css";
import { Link } from "react-router-dom";
import UserContext from "../context/user";
import { useContext } from "react";

export default function TemporaryDrawer(props) {
  const [open, setOpen] = React.useState(false);

  const handleUpdateClick = () => {
    props.setProfile(false);
    props.setUpdateProfile(true);
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
      {/* <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/ProfilePage">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={"Profile Page"} />
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/SearchUsersPage">
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={"Search User"} />
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/ProfilePage"
            onClick={handleUpdateClick}
          >
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={"Update Profile"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/" onClick={handleLogOutClick}>
            <ListItemIcon>
              <MailIcon />
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
