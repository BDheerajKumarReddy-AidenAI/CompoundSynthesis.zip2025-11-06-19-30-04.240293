import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { HomeRounded, DescriptionRounded, ShowChartRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const menuItems = [
    {
        text: 'Home',
        iconCls: HomeRounded,
        route: '/home',
        leaf: true
    },
    {
        text: 'Request Form',
        iconCls: DescriptionRounded,
        route: '/request-form',
        leaf: true
    },
    {
        text: 'Tracking Panel',
        iconCls: ShowChartRounded,
        route: '/tracking-panel',
        leaf: true
    },
    {
        text: 'Dashboard',
        iconCls: ShowChartRounded,
        route: '/dashboard',
        leaf: true
    },
    {
        text: 'TechD',
        iconCls: ShowChartRounded,
        route: '/techd',
        leaf: true
    },
    {
        text: 'TX',
        iconCls: ShowChartRounded,
        route: '/tx',
        leaf: true
    }
];

const MenuView = () => {
    const [navCollapsed, setNavCollapsed] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setOpen(!open);
    };

    const handleItemClick = (route) => {
        navigate(route);
    };

    return (
        <List
            sx={{
                width: '100%',
                maxWidth: navCollapsed ? 60 : 250,
                bgcolor: 'background.paper',
                overflow: 'auto',
                flex: '1 1 auto'
            }}
        >
            {menuItems.map((item) => (
                <ListItem
                    key={item.text}
                    button
                    onClick={() => handleItemClick(item.route)}
                    sx={{
                        flexDirection: navCollapsed ? 'column' : 'row',
                        alignItems: navCollapsed ? 'flex-start' : 'center',
                        py: navCollapsed ? 0.5 : 1
                    }}
                >
                    <ListItemIcon>
                        <item.iconCls />
                    </ListItemIcon>
                    {!navCollapsed && <ListItemText primary={item.text} />}
                </ListItem>
            ))}
        </List>
    );
};

export default MenuView;