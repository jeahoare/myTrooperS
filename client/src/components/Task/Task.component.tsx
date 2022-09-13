import { ImFlag } from "react-icons/im";
import { FiEdit } from "react-icons/fi";
import { IoTrashOutline } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";


import { TASK } from "../../api/tasks";
import "./style.scss";

type PropsType = {
  task: TASK;
  deleteTask: (id: number) => {};
  canUpdate: boolean;
  updateTask: (task: TASK) => Promise<void>;
  loading: boolean;
  isFollowed: boolean;
  handleFollow: (task: TASK) => void;
};

export const Task = ({ task, updateTask, deleteTask, canUpdate, loading, isFollowed, handleFollow }: PropsType) => {
  return (
    <li className="task-item">
      {isFollowed && <ImFlag className="flag" />}
      <div>
        <span>{task.title}</span>
      </div>
      <span className="comment">
        {task.comment}
        <div>
          {
            canUpdate &&
            <>
              <button
                onClick={() => updateTask(task)}
                disabled={loading}
              >
                <FiEdit />
              </button>
              <button
                onClick={() => deleteTask(task._id)}
                disabled={loading}
              >
                {loading ? <BiLoaderAlt className="loader" /> : <IoTrashOutline className="trash" />}
              </button>
            </>
          }
          <button onClick={() => handleFollow(task)} className="follow-btn" disabled={loading}>
            {isFollowed ? "UNFOLLOW" : "FOLLOW"}
          </button>
        </div>
      </span>
    </li>
  );
};