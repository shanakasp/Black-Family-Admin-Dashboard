import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [contactsData, setContactsData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(
          "https://blackapi.hasthiya.org/admin/getAllusersForAdmin?limit=90000000000",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data && data.success && data.users && data.users.data) {
          setContactsData(
            data.users.data.map((user) => ({
              id: user.id,
              name: `${user.firstName} ${user.lastName}`,

              email: user.email,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    if (token) {
      fetchContacts();
    }
  }, [token]);

  const handleViewClick = (id) => {
    console.log("View button clicked for row with ID:", id);
  };

  const handleEditClick = (id) => {
    console.log("Edit button clicked for row with ID:", id);
  };

  const handleDeleteClick = (id) => {
    console.log("Delete button clicked for row with ID:", id);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Full Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "email", headerName: "Email", flex: 1 },
    {
      headerName: "Actions",
      flex: 0.6,
      renderCell: (params) => (
        <Box>
          <Tooltip title="View">
            <Link to={`/contacts/view/${params.row.id}`}>
              <IconButton onClick={() => handleViewClick(params.row.id)}>
                <VisibilityIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Edit">
            <Link to={`/contacts/edit/${params.row.id}`}>
              <IconButton onClick={() => handleEditClick(params.row.id)}>
                <EditIcon />
              </IconButton>
            </Link>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDeleteClick(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="CONTACTS" subtitle="List of Contacts for All the Users" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={contactsData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          keyExtractor={(item) => item.id} // Add keyExtractor to specify the key prop
          rowHeight={36}
          pageSize={5}
          rowsPerPageOptions={[5]}
          pagination
          sx={{
            fontSize: "15px",
          }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
