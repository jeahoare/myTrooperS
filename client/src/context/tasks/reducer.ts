import { actions } from "./actions";
import { InitialStateType } from "./store";

type ActionType = {
  type: string;
  payload?: any;
};

export const reducer = (state: InitialStateType, action: ActionType) => {
  switch (action.type) {
    case actions.GET_TASKS:
      return { ...state, tasks: action.payload };
    case actions.SET_SEARCH:
      return { ...state, search: action.payload };
    case actions.SET_IS_MODAL_OPEN:
      return { ...state, isModalOpen: !state.isModalOpen };
    case actions.SET_TASK_TO_UPDATE:
      return { ...state, taskToUpdate: action.payload };
    case actions.TOGGLE_SHOW_OWN_TASKS:
      return { ...state, showOwnTasks: !state.showOwnTasks };
    case actions.TOGGLE_SHOW_FLAGGED_TASKS:
      return { ...state, showTasksWithFlag: !state.showTasksWithFlag };
    default:
      return state;
  }
};
