export const updateTaskStatus = (taskId, isCompleted) => ({
    type: "UPDATE_TASK_STATUS",
    payload: { taskId, isCompleted },
  });
  