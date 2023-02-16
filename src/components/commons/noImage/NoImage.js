import classNames from "classnames";
import "./noImage.scss";
const NoImage = ({ className, ...props }) => {
  return (
    <div className={classNames("noImage", className)} {...props}>
      No image
    </div>
  );
};
export default NoImage;
