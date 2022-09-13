import { createContext, useReducer, useMemo } from "react";

import { reducer } from "./reducer";
import { actions } from "./actions";
import { TASK } from "../../api/tasks";

export type InitialStateType = {
  tasks: TASK[];
  taskToUpdate: number | null;
  search: string;
  showOwnTasks: boolean;
  showTasksWithFlag: boolean;
  isModalOpen: boolean;
  setTasks: (tasks: TASK[]) => void;
  setSearch: (search: string) => void;
  toggleShowOwnTasks: () => void;
  toggleShowTasksWithFlag: () => void;
  setIsModalOpen: () => void;
  setTaskToUpdate: (task: TASK | null) => void;
};

const initialTasksState: InitialStateType = {
  tasks: [],
  taskToUpdate: null,
  search: "",
  showOwnTasks: false,
  showTasksWithFlag: false,
  isModalOpen: false,
  setTasks: (tasks: TASK[]) => { },
  setSearch: (search: string) => { },
  toggleShowOwnTasks: () => { },
  toggleShowTasksWithFlag: () => { },
  setIsModalOpen: () => { },
  setTaskToUpdate: (task: TASK | null) => { },
};

export const TasksContext = createContext(initialTasksState);

type PropsType = {
  children: JSX.Element;
};

export const TasksProvider = ({ children }: PropsType) => {
  const [state, dispatch] = useReducer(reducer, initialTasksState);

  const func = useMemo(() => {
    return {
      setTasks: (tasks: TASK[]) =>
        dispatch({ type: actions.GET_TASKS, payload: tasks }),
      setSearch: (search: string) =>
        dispatch({ type: actions.SET_SEARCH, payload: search }),
      toggleShowOwnTasks: () =>
        dispatch({ type: actions.TOGGLE_SHOW_OWN_TASKS }),
      toggleShowTasksWithFlag: () =>
        dispatch({ type: actions.TOGGLE_SHOW_FLAGGED_TASKS }),
      setIsModalOpen: () =>
        dispatch({ type: actions.SET_IS_MODAL_OPEN }),
      setTaskToUpdate: (task: TASK | null) =>
        dispatch({ type: actions.SET_TASK_TO_UPDATE, payload: task }),
    };
  }, []);

  const value: typeof initialTasksState = useMemo(() => {
    return {
      tasks: state.tasks,
      search: state.search,
      taskToUpdate: state.taskToUpdate,
      isModalOpen: state.isModalOpen,
      showOwnTasks: state.showOwnTasks,
      showTasksWithFlag: state.showTasksWithFlag,
      ...func,
    };
  }, [
    state.tasks,
    state.search,
    state.isModalOpen,
    state.taskToUpdate,
    state.showOwnTasks,
    state.showTasksWithFlag,
    func
  ]);

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
