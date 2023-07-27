'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import Link from 'next/link';
import { Badge, styled } from '@mui/material';
import { useSelector } from 'react-redux'

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const drawerWidth = 240;

export default function Navbar(props) {
    const { count } = useSelector(state => state.addFavourite)

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                <ShoppingCartOutlinedIcon sx={{ color: "#ff7800" }} />
            </Typography>
            <Divider />
            <List sx={{ display: 'flex', flexDirection: "column" }}>
                <ListItem disablePadding>
                    <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Link href={'/'}>
                            <ListItemText primary={"Home"} />
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Link href={'/italian'}>
                            <ListItemText primary={"italian"} />
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Link href={'/french'}>
                            <ListItemText primary={"French"} />
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Link href={'/american'}>
                            <ListItemText primary={"American"} />
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Link href={'/kenyan'}>
                            <ListItemText primary={"Kenyan"} />
                        </Link>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Link href={'/turkish'}>
                            <ListItemText primary={"Turkish"} />
                        </Link>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar component="nav" color="inherit">
                    <Toolbar sx={{ display: 'flex', justifyContent: { sm: "flex-start", md: "space-around" }, flexDirection: { sm: "column", md: "row" } }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            sx={{ display: { xs: 'none', sm: 'flex' }, gap: '10px', alignItems: 'center' }}
                        >
                            <ShoppingCartOutlinedIcon sx={{ color: "#ff7800" }} /> Food
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: '10px' }}>
                            <Link href={'./'} style={{ textDecoration: 'none', color: "#1976d2" }} >
                                <Button sx={{ color: 'inherit' }}>
                                    Home
                                </Button>
                            </Link>
                            <Link href={'/italian'} style={{ textDecoration: 'none', color: "#1976d2" }} >
                                <Button sx={{ color: '#inherit' }}>
                                    Italian
                                </Button>
                            </Link>
                            <Button sx={{ color: '#inherit' }}>
                                French
                            </Button>
                            <Button sx={{ color: '#inherit' }}>
                                American
                            </Button>
                            <Button sx={{ color: '#inherit' }}>
                                Kenyan
                            </Button>
                            <Button sx={{ color: "#inherit" }}>
                                Turkish
                            </Button>
                        </Box>
                        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: '10px' }}>
                            <Button sx={{ color: '#inherit' }}>
                                <SearchOutlinedIcon />
                            </Button>
                            <IconButton aria-label="cart">
                                <StyledBadge badgeContent={count} color="secondary">
                                    <StarOutlinedIcon />
                                </StyledBadge>
                            </IconButton>
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
        </>
    );
}
