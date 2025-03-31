import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import "./TaskForm.css"; // Import CSS file

const TaskForm = () => {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Medium"); // Default priority
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (text.trim()) {
      dispatch(addTask({ text, priority }));
      setText("");
      setPriority("Medium"); // Reset priority after adding
    }
  };

  return (
    <div className="task-form">
     <TextField
  label="New Task"
  value={text}
  onChange={(e) => setText(e.target.value)}
  variant="outlined"
/>

      <FormControl className="MuiFormControl-root">
        <InputLabel>Priority</InputLabel>
        <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" onClick={handleAddTask} className="MuiButton-root">
        Add Task
      </Button>
    </div>
  );
};

export default TaskForm;
