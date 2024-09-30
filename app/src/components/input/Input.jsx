import "./Input.scss";
import { IMaskInput } from "react-imask";

const Input = ({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
  mask,
}) => {
  const getClass = () => {
    if (error) return "input input-error";

    return "input";
  };

  const message = error ? `${placeholder} (${error})` : placeholder;

  const onAccept = (value, maskRef, e) => onChange(e)

  return mask ? (
    <IMaskInput
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      onAccept={onAccept}
      mask={mask}
      className={getClass()}
    />
  ) : (
    <input
      id={id}
      name={name}
      className={getClass()}
      type={type}
      placeholder={message}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
