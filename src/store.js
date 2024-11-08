import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './features/taskSlice'; // Import du reducer des tâches

const store = configureStore({
  reducer: {
    tasks: taskReducer, // Gestion de l'état des tâches
  },
});

export default store;
