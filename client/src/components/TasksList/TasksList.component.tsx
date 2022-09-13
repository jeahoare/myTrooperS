import { memo } from "react";

import { Task } from "..";
import { TASK } from "../../api/tasks";

import "./style.scss";

type PropsType = {
  tasks: TASK[];
}

const TasksList = ({ tasks }: PropsType) => {
  return (
    <ul className="tasks-list">
      {tasks.map((task: TASK) => <Task
        key={task._id}
        task={task}
      />)}
    </ul>
  )
};

export const MemoizedTasksList = memo(TasksList);
