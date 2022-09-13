import "./style.scss";

type PropsType = {
  handleSubmit: (e: React.SyntheticEvent) => Promise<void>;
  handleChangeComment: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleChangeTitle: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleChangeFollowed: () => void;
  followed: boolean;
  title: string;
  comment: string;
  loading: boolean;
}

export const TaskForm = ({
  handleSubmit,
  handleChangeComment,
  handleChangeTitle,
  handleChangeFollowed,
  followed,
  title,
  comment,
  loading,
}: PropsType) => {
  return (
    <form onSubmit={handleSubmit} className="form-task">
      <textarea
        className="field"
        placeholder="title"
        required
        value={title}
        onChange={handleChangeTitle}
      />
      <textarea
        className="field"
        placeholder="comment"
        required
        value={comment}
        onChange={handleChangeComment}
      />
      <label>
        Followed :
        <input
          type="checkbox"
          checked={followed}
          onChange={handleChangeFollowed} />
      </label>
      <input type="submit" value="Send" disabled={loading} />
    </form>
  );
};