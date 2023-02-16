import classNames from "classnames";
import styled from "styled-components";
import "./button.scss";

const CustomizedButton = styled.button`
  border-radius: ${(styleProps) => styleProps.radius};
  margin: ${(styleProps) => styleProps.margin};
  opacity: ${(styleProps) => (styleProps.disabled ? 0.5 : 1)};
  border: ${(styleProps) => (styleProps.outline ? "1px" : "0px")};
  border-style: none;
`;

const Button = ({ className, ...props }) => {
  // console.log(props);
  return (
    <CustomizedButton
      {...props}
      className={classNames("btn", className)}
    ></CustomizedButton>
  );
};

export default Button;