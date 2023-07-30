'use client'

import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Badge, ListItemIcon, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import axios from 'axios';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

const Navbar = (props) => {
    const { favourite } = useSelector(state => state.addFavourites)

    const res = favourite.filter(function (iteam, index) {
        return index === favourite.findIndex(function (obj) {
            return JSON.stringify(iteam) === JSON.stringify(obj)
        })
    })

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [city, setCity] = useState([])

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <Link href="/">
                            <ListItemIcon>
                                Home
                            </ListItemIcon>
                        </Link>
                    </ListItemButton>
                </ListItem>
                {city.map((c) => {
                    return (
                        <ListItem key={c.strArea} disablePadding>
                            <ListItemButton>
                                <Link href={`/city/${c.strArea}`}>
                                    <ListItemIcon>
                                        {c.strArea}
                                    </ListItemIcon>
                                </Link>
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const getApi = async () => {
        try {
            const response = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
            setCity(response.data.meals)
        } catch (error) {
        }
    }

    useEffect(() => {
        getApi()
    }, [])

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }} >
                        <Typography sx={{ display: { xs: 'none', sm: 'flex' }, gap: '15px', alignItems: 'center' }}>
                            <Link href='/' >
                                <ShoppingCartOutlinedIcon sx={{ color: "#ff7800" }} />
                            </Link>
                            Food
                        </Typography>
                        <Toolbar
                            sx={{ ...(open && { display: 'none' }), gap: '10px' }}
                        >
                            <Link href='/search'>
                                <IconButton aria-label="cart">
                                    <SearchOutlinedIcon sx={{ color: 'white' }} />
                                </IconButton>
                            </Link>
                            <IconButton aria-label="cart">
                                <Link href='/favourite'>
                                    <StyledBadge badgeContent={res.length} color="secondary">
                                        <StarOutlinedIcon sx={{ color: 'white' }} />
                                    </StyledBadge>
                                </Link>
                            </IconButton>
                            <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="end"
                                    onClick={handleDrawerOpen}
                                    sx={{ ...(open && { display: 'none' }) }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Box>
                        </Toolbar>
                        {open ?
                            <Box>
                                <Drawer
                                    sx={{
                                        width: drawerWidth,
                                        flexShrink: 0,
                                        '& .MuiDrawer-paper': {
                                            width: drawerWidth,
                                        },
                                    }}
                                    variant="persistent"
                                    anchor="right"
                                    open={open}
                                >
                                    <DrawerHeader sx={{ width: '100%', position: 'fixed', background: 'grey', zIndex: '1' }}>
                                        <IconButton onClick={handleDrawerClose}>
                                            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                                        </IconButton>
                                    </DrawerHeader>
                                    <Divider />
                                    <List sx={{ marginTop: "70px" }}>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <Link href="/">
                                                    <ListItemIcon>
                                                        Home
                                                    </ListItemIcon>
                                                </Link>
                                            </ListItemButton>
                                        </ListItem>
                                        {city.map((c) => {
                                            return (
                                                <ListItem key={c.strArea} disablePadding>
                                                    <ListItemButton>
                                                        <Link href={`/city/${c.strArea}`}>
                                                            <ListItemIcon>
                                                                {c.strArea}
                                                            </ListItemIcon>
                                                        </Link>
                                                    </ListItemButton>
                                                </ListItem>
                                            )
                                        })}
                                    </List>
                                    <Divider />
                                </Drawer>
                            </Box>
                            : <></>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );

}

export default Navbar