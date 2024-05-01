import { createEntityAdapter, SerializedError } from "@reduxjs/toolkit"

import { createAppSlice } from "../../app/createAppSlice"
import { Status, StatusType } from "../../utils/reduxUtils"

const sitesAdapter = createEntityAdapter()

type InitialState = {
  status: StatusType
  error: SerializedError | null
}

type SitesInitialState = InitialState &
  ReturnType<typeof sitesAdapter.getInitialState>

const initialState: SitesInitialState = {
  ...sitesAdapter.getInitialState(),
  status: Status.IDLE,
  error: null,
}

const isFetchAllEntities = action => {
  return action.type.startsWith("entities/fetchAllEntities")
}

export const sitesSlice = createAppSlice({
  name: "sites",
  initialState,
  reducers: ({ reducer, asyncThunk }) => {
    return {
      deleteSites: reducer(state => {
        sitesAdapter.removeAll(state)
      }),
      fetchSites: asyncThunk(
        async (_) => {
          return Promise.resolve([{ name: "Site 1" }])
        },
        {
          pending: state => {
            state.status = Status.PENDING
          },
          rejected: (state, action) => {
            state.error = action.error
          },
          fulfilled: (state, action) => {
            sitesAdapter.upsertMany(state, action.payload)
          },
          settled: (state, action) => {
            state.status = Status.IDLE
          },
        },
      ),
    }
  },
  extraReducers: builder => {
    builder.addMatcher(isFetchAllEntities, (state, action) => {
      console.log("site: fetchAllEntities")
    })
  },
})

export const { fetchSites, deleteSites } = sitesSlice.actions

export default sitesSlice.reducer
