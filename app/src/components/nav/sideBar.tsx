"use client";
// MUI Components
import MuiDrawer from "@mui/material/Drawer";
import {
  Box,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Menu 
} from "@mui/material/";
import { red } from '@mui/material/colors';

// MUI Icons
import { MdDashboardCustomize } from 'react-icons/md';
import { FcHome } from 'react-icons/fc';
import { BsPersonPlusFill } from 'react-icons/bs';

// MUI Styles
import { styled } from "@mui/material/styles";

// Next Components
import Link from "next/link";

// Providers BiblioKeia
import { useProgress } from "@/providers/progress";

import { usePathname } from "next/navigation";
import { useState } from "react";

const drawerWidth = 260;

const openedMixin = (theme: any) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: any) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: "60px",
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const menuLinks = [
  { href: "/admin", label: "Inicio", icon: <FcHome /> },
  { href: "/admin/authority", label: "Autoridades", icon: <BsPersonPlusFill /> },
  { href: "/admin/cataloguing", label: "Catalogação", icon: <MdDashboardCustomize /> },
];

interface Props {
  open: Boolean
}

export default function SideBar({ open }: Props) {
  const [isActive, setActive] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openSubMenu = Boolean(anchorEl);
  const pathname = usePathname();
  // console.log(pathname)

  const styleMenu = {
    borderRadius: "6px",
    mx: "0.5rem",
    pl: "0.5rem",
    ":hover": { backgroundColor: "hover.background" },
  };
  const styleMenuActive = {
    borderRadius: "6px",
    mx: "0.5rem",
    pl: "0.5rem",
    backgroundColor: "hover.background",
    ":hover": { backgroundColor: "hover.background" }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Drawer variant="permanent" open={open}>
      <Box
        sx={{
          minHeight: "60px",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "flex-start",
          pl: "10px",
          fontWeight: 600,
        }}
      >
        <Avatar sx={{ bgcolor: red[500] }}>BK</Avatar>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ mb: 0, mt: "0.5rem", fontWeight: 600 }}
        >
          BiblioKeia
        </Typography>
      </Box>
      <MenuList sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Link href="/admin" >
          <MenuItem sx={pathname === "/admin" ? styleMenuActive : styleMenu}>
            <ListItemIcon>
              <FcHome />
            </ListItemIcon>
            <ListItemText>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 400,
                  fontSize: "0.9rem",
                  lineHeight: 1.3,
                  ml: "0.5rem",
                }}
              >
                Inicio
              </Typography>
            </ListItemText>
          </MenuItem>
        </Link>

        <MenuItem
          sx={pathname.includes('authority') ? styleMenuActive : styleMenu}
          onClick={handleClick}
        >
          <ListItemIcon>
            <BsPersonPlusFill />
          </ListItemIcon>
          <ListItemText>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                fontSize: "0.9rem",
                lineHeight: 1.3,
                ml: "0.5rem",
              }}
            >
              Autoridades
            </Typography>
          </ListItemText>
        </MenuItem>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openSubMenu}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Link  href="/admin/authority/names">
        <MenuItem onClick={handleClose}>Nomes</MenuItem>
        </Link>
        
        <MenuItem onClick={handleClose}>Assuntos</MenuItem>
      </Menu>


        {/* {menuLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link href={link.href} key={link.label}>
              <MenuItem sx={isActive ? styleMenuActive : styleMenu}>
                <ListItemIcon>
                  {link.icon}
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 400,
                      fontSize: "0.9rem",
                      lineHeight: 1.3,
                      ml: "0.5rem",
                    }}
                  >
                    {link.label}
                  </Typography>
                </ListItemText>
              </MenuItem>
            </Link>
          );
        })} */}
      </MenuList>
    </Drawer>
  );
}