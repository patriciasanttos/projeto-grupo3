import "./Button.scss";
import LoadingSpinner from "../loadingSpinner";

const Button = ({ onClick, type, children, loading }) => {
  return loading ? (
    <button type={type} className="button button-loading">
      <LoadingSpinner /> Carregando...
    </button>
  ) : (
    <button type={type} className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
