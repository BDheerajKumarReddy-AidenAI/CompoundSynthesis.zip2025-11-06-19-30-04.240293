import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types'; // Adding PropTypes for future prop validation
import './footerview.css';

const FooterView = () => {
    return (
        <AppBar position="fixed" sx={{ bottom: 0, top: 'auto', minHeight: 60 }} className="footerview">
            <Toolbar>
                <Typography className="footerviewtext">
                    © 2025 AidenAI. All Rights Reserved.
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

FooterView.propTypes = {
    // Future props can be validated here
};

export default FooterView;