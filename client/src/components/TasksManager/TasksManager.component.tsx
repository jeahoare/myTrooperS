import "./style.scss";

type PropsType = {
  handleModal: () => void;
  toggleShowTasksWithFlag: () => void;
  toggleShowOwnTasks: () => void;
  handleChangeSearch: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  search: string;
  showOwnTasks: boolean;
  showTasksWithFlag: boolean;
};

export const TasksManager = ({
  handleModal,
  toggleShowTasksWithFlag,
  toggleShowOwnTasks,
  handleChangeSearch,
  search,
  showOwnTasks,
  showTasksWithFlag
}: PropsType) => {
  return (
    <div className="tasks-manager">
      <div className="raw">
        <input
          type="text"
          value={search}
          onChange={handleChangeSearch}
          placeholder="Search..."
        />
        <button onClick={handleModal}>Add task</button>
      </div>
      <div className="raw">
        <label>Following</label>
        <input
          type="checkbox"
          checked={showTasksWithFlag}
          onChange={toggleShowTasksWithFlag}
        />
        <label>My tasks</label>
        <input
          type="checkbox"
          checked={showOwnTasks}
          onChange={toggleShowOwnTasks} />
      </div>
    </div>
  );
};