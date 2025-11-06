import React, { useState } from 'react';
import { Card, CardContent, Box } from '@mui/material';

const CenterView = () => {
  const [activeCard, setActiveCard] = useState(0);

  const cards = [
    { id: 0, content: <p>Content for Card 1</p> },
    { id: 1, content: <p>Content for Card 2</p> },
    // Additional card content can be added here
  ];

  return (
    <Box className="centerview">
      <Card>
        {cards[activeCard]?.content}
      </Card>
    </Box>
  );
};

export default CenterView;