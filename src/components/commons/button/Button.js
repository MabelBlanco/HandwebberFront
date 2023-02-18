import classNames from "classnames";
import styled from "styled-components";
import "./button.scss";

const CustomizedButton = styled.button`
  opacity: ${(styleProps) => (styleProps.disabled ? 0.5 : 1)};
  border-style: none;
`;

const Button = ({ className, classNameContainer, ...props }) => {
  // console.log(props);
  return (
    <div className={classNames("", classNameContainer)}>
      <CustomizedButton
        {...props}
        className={classNames("btn", className)}
      ></CustomizedButton>
    </div>
  );
};

export default Button;
