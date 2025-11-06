import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [recentRequests, setRecentRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const data = [
        { id: 1, compoundName: 'Compound A', priorityLevel: 'High', status: 'SUBMITTED', requestDate: '2023-04-15' },
        { id: 2, compoundName: 'Compound B', priorityLevel: 'Medium', status: 'PENDING', requestDate: '2023-04-14' },
        { id: 3, compoundName: 'Compound C', priorityLevel: 'Low', status: 'COMPLETED', requestDate: '2023-04-13' },
      ];
      setRecentRequests(data);
    };

    fetchRequests();
  }, []);

  const handleNewRequest = () => {
    navigate('/request-form');
  };

  const handleTrackRequests = () => {
    navigate('/tracking');
  };

  const handleViewRequest = (id) => {
    navigate(`/view-request?id=${id}`);
  };

  const handleEditRequest = (id, status) => {
    if (status === 'SUBMITTED') {
      navigate(`/edit-request?id=${id}`);
    }
  };

  const columns = [
    { field: 'id', headerName: 'Request ID', flex: 1 },
    { field: 'compoundName', headerName: 'Compound Name', flex: 2 },
    { 
      field: 'priorityLevel', 
      headerName: 'Priority', 
      flex: 1,
      renderCell: (params) => (
        <span className={`priority-${params.value.toLowerCase()}`}>{params.value}</span>
      )
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      flex: 1,
      renderCell: (params) => (
        <span className={`status-${params.value.toLowerCase()}`}>{params.value}</span>
      )
    },
    { 
      field: 'requestDate', 
      headerName: 'Submitted', 
      flex: 1,
      type: 'date',
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 2,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={() => handleViewRequest(params.row.id)}
          >
            View
          </Button>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={() => handleEditRequest(params.row.id, params.row.status)}
            disabled={params.row.status !== 'SUBMITTED'}
          >
            Edit
          </Button>
        </Box>
      )
    }
  ];

  return (
    <Box display="flex" flexDirection="column" sx={{ padding: 2 }}>
      <Box display="flex" alignItems="center" marginBottom={2}>
        <Typography variant="h4" sx={{ flex: 1 }}>
          Dashboard
        </Typography>
        <Button 
          variant="contained" 
          onClick={handleNewRequest}
        >
          New Request
        </Button>
        <Button 
          variant="outlined" 
          onClick={handleTrackRequests}
          sx={{ ml: 1 }}
        >
          Track Requests
        </Button>
      </Box>

      <Box display="flex" marginBottom={2}>
        <Paper 
          sx={{ 
            width: 200, 
            height: 100, 
            padding: 1.5, 
            borderRadius: '10px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            marginRight: '20px',
            textAlign: 'center',
            background: '#f8f9fa'
          }}
        >
          <Typography variant="h5">0</Typography>
          <Typography variant="body2">Total Requests</Typography>
        </Paper>
        <Paper 
          sx={{ 
            width: 200, 
            height: 100, 
            padding: 1.5, 
            borderRadius: '10px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            marginRight: '20px',
            textAlign: 'center',
            background: '#f8f9fa'
          }}
        >
          <Typography variant="h5">0</Typography>
          <Typography variant="body2">Pending Approval</Typography>
        </Paper>
        <Paper 
          sx={{ 
            width: 200, 
            height: 100, 
            padding: 1.5, 
            borderRadius: '10px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            marginRight: '20px',
            textAlign: 'center',
            background: '#f8f9fa'
          }}
        >
          <Typography variant="h5">0</Typography>
          <Typography variant="body2">In Synthesis</Typography>
        </Paper>
        <Paper 
          sx={{ 
            width: 200, 
            height: 100, 
            padding: 1.5, 
            borderRadius: '10px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            textAlign: 'center',
            background: '#f8f9fa'
          }}
        >
          <Typography variant="h5">0</Typography>
          <Typography variant="body2">Completed</Typography>
        </Paper>
      </Box>

      <Box marginBottom={2}>
        <Typography variant="h5" gutterBottom>
          Recent Requests
        </Typography>
        <Box height={400} width="100%">
          <DataGrid
            rows={recentRequests}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            disableColumnMenu
            componentsProps={{
              baseCard: {
                sx: {
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }
              }
            }}
            sx={{
              border: 'none',
              borderRadius: '8px',
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#f5f5f5',
                borderBottom: '1px solid #ddd'
              }
            }}
          />
        </Box>
      </Box>

      <Box display="flex" flexDirection="row" marginBottom={2}>
        <Paper 
          sx={{ 
            flex: 1, 
            padding: 2.5, 
            borderRadius: '10px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
            transition: 'transform 0.3s ease',
            cursor: 'pointer',
            marginRight: '10px',
            '&:hover': {
              transform: 'scale(1.02)'
            }
          }}
          onClick={() => navigate('/request-form')}
        >
          <Typography variant="h6">New Request</Typography>
          <Typography variant="body2">Submit a new compound synthesis request</Typography>
        </Paper>
        <Paper 
          sx={{ 
            flex: 1, 
            padding: 2.5, 
            borderRadius: '10px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
            transition: 'transform 0.3s ease',
            cursor: 'pointer',
            marginRight: '10px',
            '&:hover': {
              transform: 'scale(1.02)'
            }
          }}
          onClick={() => navigate('/tracking')}
        >
          <Typography variant="h6">Track Progress</Typography>
          <Typography variant="body2">Monitor your request status and progress</Typography>
        </Paper>
        <Paper 
          sx={{ 
            flex: 1, 
            padding: 2.5, 
            borderRadius: '10px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
            transition: 'transform 0.3s ease',
            cursor: 'pointer',
            '&:hover': {
              transform: 'scale(1.02)'
            }
          }}
          onClick={() => navigate('/reports')}
        >
          <Typography variant="h6">View Reports</Typography>
          <Typography variant="body2">Access synthesis reports and analytics</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;