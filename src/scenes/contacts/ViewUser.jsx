import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, useTheme } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Viewclient = () => {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://blackapi.hasthiya.org/user/getUser/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data && data.success && data.user) {
          setUserData(data.user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [id, token]);

  return (
    <Box m="20px" height="80vh" overflow="auto" paddingRight="20px">
      <Header title={`VIEW USER ID ${id}`} subtitle="View Each User Details" />

      {userData && (
        <>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[500]} variant="h5">
                First Name
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>User Name: {userData.firstName}</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[500]} variant="h5">
                Last Name
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>User Name: {userData.lastName}</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[500]} variant="h5">
                User Email
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>User Email: {userData.email}</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color={colors.greenAccent[500]} variant="h5">
                User Image
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {userData.imageURL ? (
                  <img
                    src={userData.imageURL}
                    alt="User"
                    style={{ width: 400, height: 300 }}
                  />
                ) : (
                  "No image available"
                )}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </Box>
  );
};

export default Viewclient;
