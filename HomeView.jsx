import React, { useState } from 'react';
import { Box, Container, Typography, Button, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomeView = () => {
    const navigate = useNavigate();

    const handleCardClick = (message) => {
        console.log(message); // Replace alert with console log for better practices
    };

    return (
        <Container className="home-view" sx={{ pt: 3, pb: 3 }}>
            <Box mb={2}>
                <Typography variant="h3" component="h1" className="main-heading">
                    Start Exploring our Innovations
                </Typography>
            </Box>

            <Paper className="highlight-card" sx={{ display: 'flex', flexDirection: 'row', p: 3, mb: 3 }}>
                <Box flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                    <Typography variant="h4" component="h2" className="highlight-title">
                        Welcome to the Compound Synthesis Request Management System
                    </Typography>
                    <Typography variant="body1" className="highlight-desc">
                        Streamline your pharmaceutical research with our comprehensive compound synthesis request platform.
                    </Typography>
                </Box>
                <Box display="flex" flexDirection="column" justifyContent="flex-end" alignItems="flex-end">
                    <Button variant="contained" color="primary" size="medium" onClick={() => navigate('/start')}>
                        Get Started →
                    </Button>
                </Box>
            </Paper>

            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                    <Paper className="feature-card" onClick={() => handleCardClick('Submit Requests clicked!')} sx={{ p: 2, cursor: 'pointer' }}>
                        <div className="feature-content">
                            <i className="fas fa-paper-plane"></i>
                            <Typography variant="h5" component="h3">
                                Submit Requests
                            </Typography>
                            <Typography variant="body1">
                                Submit detailed compound synthesis requests with automated validation and pre-screening.
                            </Typography>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper className="feature-card" onClick={() => handleCardClick('Track Progress clicked!')} sx={{ p: 2, cursor: 'pointer' }}>
                        <div className="feature-content">
                            <i className="fas fa-search"></i>
                            <Typography variant="h5" component="h3">
                                Track Progress
                            </Typography>
                            <Typography variant="body1">
                                Monitor your requests in real-time through our comprehensive tracking system.
                            </Typography>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper className="feature-card" onClick={() => handleCardClick('Compliance clicked!')} sx={{ p: 2, cursor: 'pointer' }}>
                        <div className="feature-content">
                            <i className="fas fa-shield-alt"></i>
                            <Typography variant="h5" component="h3">
                                Compliance
                            </Typography>
                            <Typography variant="body1">
                                Automated compliance checks for controlled substances and regulatory requirements.
                            </Typography>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper className="feature-card" onClick={() => handleCardClick('Collaboration clicked!')} sx={{ p: 2, cursor: 'pointer' }}>
                        <div className="feature-content">
                            <i className="fas fa-users"></i>
                            <Typography variant="h5" component="h3">
                                Collaboration
                            </Typography>
                            <Typography variant="body1">
                                Seamless workflow between discovery scientists, supervisors, and synthesis teams.
                            </Typography>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomeView;