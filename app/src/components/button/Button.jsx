import './Button.scss'

const Button = ({ onClick, type, children }) => {
  return (
    <button type={type} className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
