import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import * as React from "react";

function SignInSide() {
  const [error, setError] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    try {
      const response = await axios.post(
        "https://blackapi.hasthiya.org/admin/login",
        {
          email: data.get("email"),
          password: data.get("password"),
        }
      );

      console.log("Response from backend:", response.data); // Log the response

      const { result } = response.data;
      if (result || result.token) {
        localStorage.setItem("token", result.token);
        console.log("Token saved to localStorage:", result.token);
        window.location.href = "/dd"; // Navigate to /dd
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const defaultTheme = createTheme();

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © B L A C K F A M I L Y "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            position: "relative", // Ensure relative positioning
            backgroundImage:
              "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{ backgroundColor: "#3c3756" }}
        >
          <Box
            sx={{
              my: 8,
              mr: "250px",
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative", // Ensure relative positioning
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <h1 style={{ color: "#fff" }}>Black Family Admin Dashboard</h1>
            <Typography
              component="h1"
              variant="h5"
              sx={{ color: "#fff", fontWeight: "bold" }}
            >
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1, color: "#fff" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                InputLabelProps={{ style: { color: "#fff" } }}
                InputProps={{
                  style: { color: "#fff", borderColor: "#fff" }, // Add borderColor property here
                  className: "input-field",
                }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                InputLabelProps={{ style: { color: "#fff" } }}
                InputProps={{
                  style: { color: "#fff" },
                  className: "input-field",
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <Typography
                variant="body2"
                color="error"
                align="center"
                sx={{
                  backgroundColor: "#3c3756",
                  color: "#fff",
                  padding: "8px",
                  borderRadius: "4px",
                  mt: 2,
                }}
              >
                {error}
              </Typography>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignInSide;
