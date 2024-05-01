import { useAppDispatch } from "../../app/hooks"
import { fetchAllEntities } from "./entitiesSlice";
import { deleteControllers, fetchControllers } from "./controllersSlice"
import { deleteSites, fetchSites } from "./sitesSlice";

export const Entities = () => {
  const dispatch = useAppDispatch()

  return (
    <div>
      <h1>Entities</h1>
      <button onClick={() => dispatch(fetchControllers('1'))}>
        Load Controllers
      </button>
      <button onClick={() => dispatch(fetchSites())}>
        Load Sites
      </button>
      <button onClick={() => dispatch(fetchAllEntities())}>Load Entities</button><br />
      <button onClick={() => dispatch(deleteControllers())}>
        Delete Controllers
      </button>
      <button onClick={() => dispatch(deleteSites())}>
        Delete Sites
      </button>
    </div>
  )
}
