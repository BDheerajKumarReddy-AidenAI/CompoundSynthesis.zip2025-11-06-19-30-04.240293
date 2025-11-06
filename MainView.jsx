import React, { useState } from 'react';
import { Box, AppBar, Drawer, Grid } from '@mui/material';
import NavView from './NavView';
import HeaderView from './HeaderView';
import FooterView from './FooterView';
import CenterView from './CenterView';

const MainView = () => {
    const [navViewWidth, setNavViewWidth] = useState(200);
    const [headerViewHeight, setHeaderViewHeight] = useState(64);
    const [footerViewHeight, setFooterViewHeight] = useState(32);

    const handleMenuViewSelectionChange = () => {
        // Implement the selection change logic here
    };

    return (
        <Grid container direction="column" sx={{ height: '100vh' }}>
            <AppBar position="static" sx={{ height: headerViewHeight }}>
                <HeaderView />
            </AppBar>
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    overflow: 'hidden',
                    backgroundColor: 'background.default',
                }}
            >
                <Drawer
                    variant="permanent"
                    sx={{
                        width: navViewWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: navViewWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                >
                    <NavView
                        width={navViewWidth}
                        onSelect={handleMenuViewSelectionChange}
                    />
                </Drawer>
                <Box sx={{ flex: 1, padding: 2 }}>
                    <CenterView />
                </Box>
            </Box>
            <Box sx={{ height: footerViewHeight }}>
                <FooterView />
            </Box>
        </Grid>
    );
};

export default MainView;