import React from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { Container, Typography, Paper, CssBaseline, Box } from "@mui/material";
import "./App.css"; // Import CSS file

const App = () => {
  return (
    <>
      <CssBaseline />
      <Container className="container" maxWidth={false}>
        <Box className="box">
          
        <Typography
          variant="h4"
          gutterBottom
          color="primary"
          sx={{
            fontFamily: "'Poppins', sans-serif", // Changed to Poppins font
            fontSize: { xs: "1.8rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
            textAlign: "center",
            transition: "all 0.3s ease-in-out",
            fontWeight: "700", // Made it bolder
            color: "#00A8E8",
          }}
        >
          TaskBuddy 🤝
        </Typography>
            <TaskForm />
         

         
            <TaskList />
          
        </Box>
      </Container>
    </>
  );
};

export default App;
