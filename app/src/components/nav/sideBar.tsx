"use client";
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import {
    Box,
    MenuList,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Avatar,
    Menu,
    Divider
} from "@mui/material/";
import { red } from '@mui/material/colors';
import MuiDrawer from '@mui/material/Drawer';

// Next Components
import Link from "next/link";
import { usePathname } from "next/navigation";

// React Icons
import { FcHome } from 'react-icons/fc';
import { BsPersonPlusFill } from 'react-icons/bs';
import { GiBookshelf } from "react-icons/gi";

import { useState, MouseEvent } from "react";

import DarkMode from "@/components/buttons/darkMode"


const drawerWidth = 260;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const styleMenuActive = {
    borderRadius: "6px",
    mx: "0.5rem",
    pl: "0.5rem",
    backgroundColor: "hover.background",
    ":hover": { backgroundColor: "hover.background" }
};

const styleMenu = {
    borderRadius: "6px",
    mx: "0.5rem",
    pl: "0.5rem",
    ":hover": { backgroundColor: "hover.background" },
};
const styleMenuText = {
    fontWeight: 400,
    fontSize: "0.9rem",
    lineHeight: 1.3,
    ml: "0.5rem",
}
interface Props {
    open: boolean
}

export default function SideBar({ open }: Props) {
    const pathname = usePathname();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openSubMenu = Boolean(anchorEl);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Drawer variant="permanent" open={open}>
            <Box sx={{ height: "100%", pl: "5px", display: "flex", flexDirection: "column", justifyContent: "space-between"  }}>
                <div>
                <Box
                    sx={{
                        minHeight: "60px",
                        display: "flex",
                        gap: "1rem",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        pl: "10px",
                        fontWeight: 600,
                        borderBottom: "solid 1px gray"
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
                                    sx={styleMenuText}
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
                                sx={styleMenuText}
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
                        <Link href="/admin/authority/names">
                            <MenuItem onClick={handleClose}>Nomes</MenuItem>
                        </Link>
                        <Link href="/admin/authority/subjects">
                            <MenuItem onClick={handleClose}>Assuntos</MenuItem>
                        </Link>
                    </Menu>
                    <Link href="/admin/catalog" >
                    <MenuItem sx={pathname === "/admin/catalog" ? styleMenuActive : styleMenu}>
                        <ListItemIcon //sx={{ color: "black"}}
                        >
                            <GiBookshelf />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography
                                variant="h6"
                                sx={styleMenuText}
                            >
                                Catalogo
                            </Typography>
                        </ListItemText>
                    </MenuItem>
                    </Link>

                </MenuList>
                </div>
                <DarkMode />

            </Box>
        </Drawer>)
}