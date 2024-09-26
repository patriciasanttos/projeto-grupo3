import Popup from "reactjs-popup";
import IconDots from "../../assets/icons/dots-vertical.svg";
import "./PopupMenu.scss";

const PopupMenu = ({ menuActions, row }) => {
  const MenuButton = () => <img className="popup-menu-icon" src={IconDots} />;

  return (
    <Popup trigger={MenuButton} position="left top">
      <div className="popup-menu">
        {menuActions.map((menuAction) => (
          <div className="menu-item" onClick={() => menuAction.onClick(row)}>{menuAction.text}</div>
        ))}
      </div>
    </Popup>
  );
};

export default PopupMenu;
