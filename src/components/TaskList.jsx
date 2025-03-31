import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  List,
  ButtonGroup,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";
import { updateTaskStatus } from "../redux/taskSlice";
import "./TaskList.css"; // Import CSS file

const AllTasksOnly = ({ tasks }) => (
  <Paper elevation={4} className="task-section">
    <Typography variant="h5" align="center" className="task-title">
      🎯 <strong>To Do</strong>
    </Typography>
    <List>
      {tasks.map((task, index) => (
        <div key={task.id} className="task-draggable">
          <Typography variant="body1">
            <strong>{index + 1}.</strong> {task.text}
          </Typography>
        </div>
      ))}
    </List>
  </Paper>
);

const TaskSection = ({ title, tasks, droppableId }) => (
  <Droppable droppableId={droppableId} type="TASK">
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className={snapshot.isDraggingOver ? "task-droppable-active" : ""}
      >
        <Paper elevation={4} className="task-section">
          <Typography variant="h5" align="center" className="task-title">
            {title}
          </Typography>
          <List className="task-list">
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                {(providedDraggable) => (
                  <div
                    ref={providedDraggable.innerRef}
                    {...providedDraggable.draggableProps}
                    {...providedDraggable.dragHandleProps}
                    className="task-draggable"
                  >
                    <TaskItem task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </List>
        </Paper>
      </div>
    )}
  </Droppable>
);

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const [sortBy, setSortBy] = useState("date");
  const [view, setView] = useState("all");

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date || 0) - new Date(a.date || 0);
    }
    if (sortBy === "priority") {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
    }
    return 0;
  });

  const activeTasks = sortedTasks.filter((task) => !task.completed);
  const completedTasks = sortedTasks.filter((task) => task.completed);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    if (destination.droppableId === "all") return;
    if (source.droppableId !== destination.droppableId) {
      const taskId = parseInt(draggableId, 10);
      const newStatus = destination.droppableId === "completed";
      dispatch(updateTaskStatus({ taskId, completed: newStatus }));
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {/* Filter & Sort Section */}
      <div className="filter-sort-container">
        <ButtonGroup className="button-group">
        <Button
  variant={view === "all" ? "contained" : "outlined"}
  onClick={() => setView("all")}
  sx={{
    backgroundColor: view === "all" ? "white" : undefined,
    color: view === "all" ? "black" : undefined,
    "&:hover": {
      backgroundColor: view === "all" ? "#f5f5f5" : undefined,
    },
  }}
>
  All
</Button>
<Button
  variant={view === "active" ? "contained" : "outlined"}
  onClick={() => setView("active")}
  sx={{
    backgroundColor: view === "active" ? "white" : undefined,
    color: view === "active" ? "black" : undefined,
    "&:hover": {
      backgroundColor: view === "active" ? "#f5f5f5" : undefined,
    },
  }}
>
  Active
</Button>
<Button
  variant={view === "completed" ? "contained" : "outlined"}
  onClick={() => setView("completed")}
  sx={{
    backgroundColor: view === "completed" ? "white" : undefined,
    color: view === "completed" ? "black" : undefined,
    "&:hover": {
      backgroundColor: view === "completed" ? "#f5f5f5" : undefined,
    },
  }}
>
  Completed
</Button>
        </ButtonGroup>

        <FormControl className="sort-control">
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} label="Sort By">
            <MenuItem value="date">Date (Newest First)</MenuItem>
            <MenuItem value="priority">Priority (High → Low)</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Grid container spacing={2} className="task-container">
        {view === "all" && (
          <>
            <Grid item xs={4}>
              <AllTasksOnly tasks={sortedTasks} />
            </Grid>
            <Grid item xs={4}>
              <TaskSection title="⭐ Active" tasks={activeTasks} droppableId="active" />
            </Grid>
            <Grid item xs={4}>
              <TaskSection title="✅ Done " tasks={completedTasks} droppableId="completed" />
            </Grid>
          </>
        )}
        {view === "active" && (
          <Grid item xs={12}>
            <TaskSection title="⭐Active Tasks" tasks={activeTasks} droppableId="active" />
          </Grid>
        )}
        {view === "completed" && (
          <Grid item xs={12}>
            <TaskSection title=" ✅Completed Tasks" tasks={completedTasks} droppableId="completed" />
          </Grid>
        )}
      </Grid>
    </DragDropContext>
  );
};


export default TaskList;
