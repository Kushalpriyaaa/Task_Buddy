import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTaskStatus, deleteTask, editTask } from "../redux/taskSlice";
import { ListItem, Checkbox, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditTaskModal from "./EditTaskModal";
import "./TaskItem.css";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleToggle = () => {
    dispatch(updateTaskStatus({ taskId: task.id, completed: !task.completed }));
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (editedTask) => {
    dispatch(editTask({
      id: task.id,
      text: editedTask.text,
      priority: editedTask.priority
    }));
  };

  let taskText = "";
  if (typeof task.text === "string") {
    taskText = task.text;
  } else if (task.text && typeof task.text === "object") {
    taskText = task.text.text || JSON.stringify(task.text);
  }

  return (
    <>
      <ListItem className="task-item">
        <Checkbox checked={task.completed} onChange={handleToggle} />
        <Typography className={`task-text ${task.completed ? "completed" : ""}`}>
          {taskText}
        </Typography>
        <Typography
          className={`task-priority ${
            task.priority === "High"
              ? "high"
              : task.priority === "Medium"
              ? "medium"
              : "low"
          }`}
        >
          {task.priority === "High" ? (
            <strong>High</strong>
          ) : task.priority === "Medium" ? (
            <strong>Medium</strong>
          ) : (
            <strong>Low</strong>
          )}
        </Typography>
        <Typography className="task-date">
          {new Date(task.date).toLocaleDateString()}
        </Typography>
        <Button 
          onClick={handleEdit} 
          className="task-edit-btn"
          size="small"
        >
          <EditIcon />
        </Button>
        <Button 
          onClick={() => dispatch(deleteTask(task.id))} 
          className="task-delete-btn"
          size="small"
        >
          <DeleteIcon />
        </Button>
      </ListItem>
      <EditTaskModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
        onSave={handleSaveEdit}
      />
    </>
  );
};

export default TaskItem;