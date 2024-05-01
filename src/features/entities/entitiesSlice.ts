import { combineReducers } from "@reduxjs/toolkit"
import sitesReducer, { sitesSlice, fetchSites } from "./sitesSlice"
import controllersReducer, {
  controllersSlice,
  fetchControllers,
} from "./controllersSlice"
import { createAppSlice } from "../../app/createAppSlice"

const entitiesReducer = combineReducers({
  [sitesSlice.name]: sitesReducer,
  [controllersSlice.name]: controllersReducer,
})

export const entitiesSlice = createAppSlice({
  name: "entities",
  initialState: entitiesReducer(undefined, { type: "@@INIT" }),
  reducers: ({ asyncThunk }) => {
    return {
      fetchAllEntities: asyncThunk(async (_, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        return Promise.all([
          dispatch(fetchControllers()),
          dispatch(fetchSites()),
        ]).then(() => {
          console.log("entities: loadAllEntities")
        })
      }),
    }
  },
})

export const { fetchAllEntities } = entitiesSlice.actions
