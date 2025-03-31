import { createSlice } from "@reduxjs/toolkit";

const loadTasks = () => {
  const tasks = localStorage.getItem("tasks");
  try {
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error("Error parsing tasks from localStorage:", error);
    return [];
  }
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: loadTasks(),
  reducers: {
    addTask: (state, action) => {
      state.push({
        id: Date.now(),
        text: action.payload.text,
        completed: false,
        date: new Date().toISOString(), // Store creation date
        priority: action.payload.priority, // Priority: Low, Medium, High
      });
      localStorage.setItem("tasks", JSON.stringify(state));
    },
    updateTaskStatus: (state, action) => {
      const { taskId, completed } = action.payload;
      const task = state.find((t) => t.id === taskId);
      if (task) {
        task.completed = completed;
      }
      localStorage.setItem("tasks", JSON.stringify(state));
    },
    deleteTask: (state, action) => {
      const newState = state.filter((t) => t.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(newState));
      return newState;
    },
    editTask: (state, action) => {
      const { id, text, priority } = action.payload;
      const task = state.find(task => task.id === id);
      if (task) {
        task.text = text;
        task.priority = priority;
      }
    },
  },
});

export const { addTask, updateTaskStatus, deleteTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;