import React, { useEffect, useState } from 'react';
import { Box, Button, Toolbar, TextField, Select, MenuItem, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const TrackingPanel = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [dateFromFilter, setDateFromFilter] = useState('');
  const [dateToFilter, setDateToFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [requestCount, setRequestCount] = useState(0);

  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/requests'); // Adjust the URL as needed
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setRequests(data.items);
      setRequestCount(data.totalCount);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSearch = () => {
    // Implement search logic here
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setPriorityFilter('');
    setDateFromFilter('');
    setDateToFilter('');
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // Re-fetch data based on the new page if necessary
  };

  return (
    <Box sx={{ padding: 2, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flex: 1 }}>
          <SearchIcon /> Track Requests
        </Typography>
        <Button onClick={() => navigate('/dashboard')}><DashboardIcon /> Dashboard</Button>
        <Button onClick={() => navigate('/request-form')}><AddCircleIcon /> Request Form</Button>
      </Toolbar>
      
      <Box sx={{ my: 2 }}>
        <Box sx={{ display: 'flex', mb: 2 }}>
          <TextField
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Request ID, Compound Name, or Status..."
            fullWidth
          />
          <Button sx={{ ml: 1 }} onClick={handleSearch}>
            <SearchIcon /> Search
          </Button>
        </Box>
        
        <Box sx={{ display: 'flex', mb: 2 }}>
          <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} displayEmpty>
            <MenuItem value=""><em>All Statuses</em></MenuItem>
            <MenuItem value="submitted">Submitted</MenuItem>
            <MenuItem value="pre-screening">Pre-screening</MenuItem>
            <MenuItem value="supervisor-review">Supervisor Review</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="assigned">Assigned</MenuItem>
            <MenuItem value="in-synthesis">In Synthesis</MenuItem>
            <MenuItem value="quality-check">Quality Check</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>

          <Select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} displayEmpty sx={{ ml: 2 }}>
            <MenuItem value=""><em>All Priorities</em></MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>

          <TextField
            type="date"
            value={dateFromFilter}
            onChange={(e) => setDateFromFilter(e.target.value)}
            placeholder="From Date"
            sx={{ ml: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            type="date"
            value={dateToFilter}
            onChange={(e) => setDateToFilter(e.target.value)}
            placeholder="To Date"
            sx={{ ml: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <Button sx={{ ml: 2 }} onClick={clearFilters}>
            <ClearIcon /> Clear
          </Button>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6">Your Requests</Typography>
        <Typography>{requestCount} requests found</Typography>
        
        <Grid container spacing={2}>
          {requests.map((request) => (
            <Grid item xs={12} key={request.id}>
              <Box sx={{ p: 2, boxShadow: 1 }}>
                <Typography variant="body1"><strong>{request.id}</strong></Typography>
                <Typography variant="body2">{request.compoundName}</Typography>
                <Typography variant="body2" className={`priority-badge priority-${request.priorityLevel}`}>{request.priorityLevel}</Typography>
                <Typography variant="body2" className={`status-badge status-${request.status.replace('_', '-')}`}>{request.statusDisplay}</Typography>
                <Typography variant="body2">{request.progressPercentage}%</Typography>
                <Typography variant="body2">{new Date(request.requestDate).toLocaleDateString()}</Typography>
                <Typography variant="body2">{new Date(request.timelineRequired).toLocaleDateString()}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
        <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          <ArrowBackIcon /> Previous
        </Button>
        <Typography sx={{ mx: 2 }}>Page {currentPage} of {totalPages}</Typography>
        <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next <ArrowForwardIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default TrackingPanel;