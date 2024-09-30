const Tooltip = ({ children, text }) => {
  return (
    <div data-tooltip-id="tooltip" data-tooltip-place="bottom" data-tooltip-content={text}>
      {children}
    </div>
  );
};
export default Tooltip;
