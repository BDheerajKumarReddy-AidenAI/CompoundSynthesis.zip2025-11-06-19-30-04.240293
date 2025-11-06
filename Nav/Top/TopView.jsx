import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from './Image';
import './style.scss'; // Ensure this path is correctly set based on your project structure

const ImageComponent = ({ className, height, width, src }) => (
    <img className={className} height={height} width={width} src={src} alt="Logo" />
);

const TopView = ({ navCollapsed, onNavToggle }) => {
    const [layout, setLayout] = useState(navCollapsed ? "flex-direction: column" : "flex-direction: row");

    useEffect(() => {
        setLayout(navCollapsed ? "flex-direction: column" : "flex-direction: row");
    }, [navCollapsed]);

    return (
        <AppBar position="static" className="topview" elevation={0} style={{ height: 80, padding: '10px 20px' }}>
            <Toolbar style={{ display: 'flex', flexDirection: layout, alignItems: 'center', justifyContent: 'space-between' }}>
                <ImageComponent
                    className="topview-logo"
                    height={40}
                    width={170}
                    src={navCollapsed ? "resources/images/AidenAI_Short.svg" : "resources/images/AidenAI_Logo.svg"}
                />
                <Box>
                    <IconButton
                        className="nav-toggle-btn"
                        onClick={onNavToggle}
                        color="inherit"
                        aria-label="Toggle Navigation"
                        sx={{ marginRight: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TopView;