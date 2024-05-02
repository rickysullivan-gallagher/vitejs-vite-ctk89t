import { combineReducers, combineSlices } from "@reduxjs/toolkit"
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
          dispatch(fetchControllers("1")),
          dispatch(fetchSites("2")),
        ]).then(() => {
          console.log("entities: fetchAllEntities")
        })
      }),
    }
  },
})

export const { fetchAllEntities } = entitiesSlice.actions
