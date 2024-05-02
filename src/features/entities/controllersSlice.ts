import { createEntityAdapter, SerializedError } from "@reduxjs/toolkit"

import { createAppSlice } from "../../app/createAppSlice"
import { Status, StatusType } from "../../utils/reduxUtils"

const controllersAdapter = createEntityAdapter()

type InitialState = {
  status: StatusType
  error: SerializedError | null
}

type ControllersInitialState = InitialState &
  ReturnType<typeof controllersAdapter.getInitialState>

const initialState: ControllersInitialState = {
  ...controllersAdapter.getInitialState(),
  status: Status.IDLE,
  error: null,
}

const isFetchAllEntities = action => {
  return action.type.startsWith("entities/fetchAllEntities")
}

export const controllersSlice = createAppSlice({
  name: "controllers",
  initialState,
  reducers: ({ reducer, asyncThunk }) => {
    return {
      deleteControllers: reducer(state => {
        controllersAdapter.removeAll(state)
      }),
      fetchControllers: asyncThunk(
        async (_) => {
          return Promise.resolve([{ name: "Controller 1" }])
        },
        {
          pending: state => {
            state.status = Status.PENDING
          },
          rejected: (state, action) => {
            state.error = action.error
          },
          fulfilled: (state, action) => {
            controllersAdapter.upsertMany(state, action.payload)
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
      console.log("controller: fetchAllEntities")
    })
  },
})

export const { fetchControllers, deleteControllers } = controllersSlice.actions

export default controllersSlice.reducer
