
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Récupération des tâches
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await api.get('/tasks');
  return response.data;
});

// Suppression d'une tâche
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  await api.delete(`/tasks/${id}`);
  return id;
});

// Mise à jour du statut d'une tâche
export const toggleTaskStatus = createAsyncThunk('tasks/toggleTaskStatus', async ({ id, status }) => {
  const response = await api.put(`/tasks/${id}`, { status });
  return response.data;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(toggleTaskStatus.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      });
  },
});

export default taskSlice.reducer;
