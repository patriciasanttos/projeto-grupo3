import Accept from "../../assets/icons/accept-icon.svg";
import Deny from "../../assets/icons/deny-icon.svg";
import { acceptVolunteerForm, denyVolunteerForm } from "../../services/api/volunteers";

import './ActionsForm.scss'

const ActionsForm = (selectedVolunteer) => {
  const acceptForm = async () => {
      await acceptVolunteerForm(selectedVolunteer.id, localStorage.getItem('login'))
          .then(() => {

          })
          .catch(error => console.log(error));
  
  };
  
  const denyForm = async () => {
      await denyVolunteerForm(selectedVolunteer.id, localStorage.getItem('login'))
          .then(() => {

          })
          .catch(error => console.log(error));
  
  };


  return (
    <section className="actions-form-container">
      <div>
        <button className="btn-actions-form" onClick={acceptForm}>
          <img src={Accept} alt="" />
        </button>
      </div>
      <div>
        <button className="btn-actions-form" onClick={denyForm}>
          <img src={Deny} alt="" />
        </button>
      </div>
    </section>
  );
};

export default ActionsForm
