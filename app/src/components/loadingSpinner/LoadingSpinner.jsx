import './LoadingSpinner.scss'

const LoadingSpinner = ({ style, className, secondary }) => {
  return <span style={secondary ? { color: '#64bdac' } : style} className={`loading-spinner ${className}`}></span>;
};

export default LoadingSpinner;
