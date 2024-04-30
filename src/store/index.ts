import { createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  entities: {
    controllers: [],
    sites: [],
  },
};

// Create the slice
const myEntitySlice = createSlice({
  name: "entities",
  initialState,
  reducers: {
    // Action to add a controller
    addController(state, action) {
      state.entities.controllers.push(action.payload);
    },
    // Action to add a site
    addSite(state, action) {
      state.entities.sites.push(action.payload);
    },
    // Other actions to manipulate the entities state can be defined here
    // For example, removing or updating items in controllers or sites
  },
});

// Export actions for dispatching
export const { addController, addSite } = myEntitySlice.actions;

// Export the reducer to include in the store
export default myEntitySlice.reducer;