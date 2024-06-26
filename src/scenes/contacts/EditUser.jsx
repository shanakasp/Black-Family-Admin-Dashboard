import ImageIcon from "@mui/icons-material/Image";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import { useState } from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import Header from "../../components/Header";

import { tokens } from "../../theme";
const EditClient = () => {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("image", file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };
  const handleFormSubmit = (values) => {
    console.log(values);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("country", values.country);
    formData.append("description", values.description);
    formData.append("add_date", values.add_date);
    formData.append("other", values.other);
    formData.append("image", values.image);

    fetch("http://hitprojback.hasthiya.org/api/HIT/client", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <Box m="20px" height="80vh" overflow="auto" paddingRight="20px">
      <Header title={`EDIT USER ID ${id}`} subtitle="Edit User Details" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <Typography variant="h6">First Name of the User</Typography>
              <TextField
                fullWidth
                variant="filled"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 4", mt: "-20px" }}
              />
              <Typography variant="h6">Last Name of the User </Typography>
              <TextField
                fullWidth
                multiline
                variant="filled"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4", mt: "-20px" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Other"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.other}
                name="other"
                sx={{ gridColumn: "span 4" }}
              />
              <Box sx={{ gridColumn: "span 2" }}>
                <label htmlFor="image-upload">
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      handleImageChange(event, setFieldValue)
                    }
                    style={{ display: "none" }}
                  />
                  <Button
                    variant="contained"
                    component="span"
                    color="secondary"
                    startIcon={<ImageIcon />}
                  >
                    update User Image
                  </Button>{" "}
                  <br></br>
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Preview"
                      style={{ width: 200, height: 200 }}
                    />
                  )}
                </label>
              </Box>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update Client Details
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Name of the client is required"),
  country: yup.string().required("Country is required"),
  description: yup.string().required("Description is required"),
  add_date: yup.date().required("Add Date is required"),
  other: yup.string().required("Other is required"),
  image: yup.mixed().required("Image is required"),
});

const initialValues = {
  name: "",
  country: "",
  description: "",
  add_date: "",
  other: "",
  image: null,
};

export default EditClient;
