import styled from 'styled-components';

const primaryColor = 'rgb(17, 14, 14)';
const secondaryColor = 'rgb(242, 245, 232)';

const Button = styled.button`
  align-items: center;
  background-color: ${(props) =>
    props.variant === 'primary' ? primaryColor : secondaryColor};
  border-radius: 9999px;
  border-style: solid;
  border-width: 1px;
  border-color: ${primaryColor};
  color: ${(props) =>
    props.variant === 'primary' ? secondaryColor : primaryColor};
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-weight: bold;
  min-height: 36px;
  max-height: 50px;
  justify-content: center;
  min-width: 72px;
  max-width: 150px;
  outline-style: none;
  opacity: ${(props) => (props.disabled ? 0.9 : 1)};
  padding: 0 20px;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  text-decoration: none;
  transition: background-color 0.2s;
  &:hover {
    background-color: ${(props) =>
      props.variant === 'primary'
        ? 'rgba(37, 34, 34, 0.9)'
        : 'rgb(222, 225, 212)'};
  }
`;

export default Button;
