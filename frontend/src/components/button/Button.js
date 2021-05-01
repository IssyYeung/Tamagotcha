import style from "./Button.module.scss";

const Button = ({
  children,
  component = "button",
  to,
  onClick,
  type,
  value,
  className,
}) => {
  const Tag = component;
  return (
    <Tag
      to={to}
      className={`${style.button} ${className}`}
      onClick={onClick}
      type={type}
      value={value}
    >
      {children}
    </Tag>
  );
};

export default Button;
