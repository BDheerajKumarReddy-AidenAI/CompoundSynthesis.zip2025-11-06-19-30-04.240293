import React from 'react';
import { Box, Toolbar, List, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TopView from './TopView';
import MenuView from './MenuView';

const NavView = () => {
    const navigate = useNavigate();
    const [menuviewWidth, setMenuviewWidth] = React.useState(260);

    const handleMenuViewSelectionChange = (event, selectedItem) => {
        if (selectedItem.path) {
            navigate(selectedItem.path);
        }
    };

    return (
        <Box className="navview" sx={{ width: menuviewWidth, display: 'flex', flexDirection: 'column' }}>
            <Toolbar variant="dense" sx={{ height: 60 }}>
                <TopView />
            </Toolbar>
            <Box sx={{ overflow: 'auto', flex: 1 }}>
                <MenuView
                    width={menuviewWidth}
                    onSelectionChange={handleMenuViewSelectionChange}
                />
            </Box>
        </Box>
    );
};

export default NavView;

// MenuView component declared separately, ensure proper linking of files
import React from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';

const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
];

const MenuView = ({ width, onSelectionChange }) => {
    return (
        <List sx={{ width: width }}>
            {menuItems.map((item, index) => (
                <ListItemButton key={index} onClick={(event) => onSelectionChange(event, item)}>
                    <ListItemText primary={item.name} />
                </ListItemButton>
            ))}
        </List>
    );
};

export default MenuView;