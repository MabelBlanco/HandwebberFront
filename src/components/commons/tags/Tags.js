import classNames from "classnames";
import "./tags.scss";
const Tags = ({ className, tagsArray }) => {
  return (
    <div className={classNames("tags", className)}>
      {tagsArray &&
        tagsArray.length > 0 &&
        tagsArray.map((tag, idx) => (
          <p className="tag" key={idx}>
            {tag}
          </p>
        ))}
    </div>
  );
};
export default Tags;
