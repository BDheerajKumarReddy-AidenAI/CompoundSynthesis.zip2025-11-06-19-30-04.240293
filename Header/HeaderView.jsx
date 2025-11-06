import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Container } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';

const HeaderView = ({ heading }) => {
    const navigate = useNavigate();

    const onProfileClick = () => {
        // Implement profile click logic here
    };

    const onNotificationsClick = () => {
        // Implement notifications click logic here
    };

    const onSettingsClick = () => {
        // Implement settings click logic here
    };

    return (
        <AppBar position="static" className="headerview" sx={{ minHeight: 60, padding: '16px 24px' }}>
            <Toolbar>
                <Container sx={{ display: 'flex', alignItems: 'center', flex: 1, paddingLeft: '10px' }}>
                    <Typography variant="h6" className="headerviewtext" style={{ fontFamily: '\'Poppins\', sans-serif', color: '#ffffff' }}>
                        {heading}
                    </Typography>
                </Container>
                <Container className="headerview-icons">
                    <IconButton color="inherit" onClick={() => navigate('/homeview')} style={{ margin: '0 18px' }}>
                        <HomeIcon fontSize="small" className="headerbutton" />
                    </IconButton>
                    <IconButton color="inherit" onClick={onProfileClick} style={{ margin: '0 18px' }}>
                        <PersonIcon fontSize="small" className="headerbutton" />
                    </IconButton>
                    <IconButton color="inherit" onClick={onNotificationsClick} style={{ margin: '0 18px' }}>
                        <NotificationsIcon fontSize="small" className="headerbutton" />
                    </IconButton>
                    <IconButton color="inherit" onClick={onSettingsClick} style={{ margin: '0 18px' }}>
                        <SettingsIcon fontSize="small" className="headerbutton" />
                    </IconButton>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderView;