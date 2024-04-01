import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, useTheme } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Viewclient = () => {
  const { id } = useParams();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px" height="80vh" overflow="auto" paddingRight="20px">
      <Header title={`VIEW USER ID ${id}`} subtitle="View Each User Details" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            First Name
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>User Name: Sample User Name goes here.</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Last Name
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>User Name: Sample User Name goes here.</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            User Email
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>User Email: Sample User email goes here.</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            User Image
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Image: Sample image details goes here.</Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Viewclient;
