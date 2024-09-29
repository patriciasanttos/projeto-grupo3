import { useState } from "react";

import Dropdown from "../../../components/dropdown";

import StateSelect from "./StateSelectComponent/StateSelect";
import isEmailValid from '../../../utils/isEmailValid'
import { createVolunteerForm } from '../../../services/api/volunteers';

const FormOver18 = () => {
  const formOver18Initial = {
    name: "",
    phone: "",
    email: "",
    profession: "",
    address: "",
    availability: "",
    sector: "",
    state: "",
  };

  const [formOver18, setFormOver18] = useState(formOver18Initial);
  const [formOver18Errors, setFormOver18Errors] = useState(formOver18Initial);
  const [ emptyInput, setEmptyInput ] = useState({
    name: false,
    phone: false,
    email: false,
    profession: false,
    address: false,
    availability: false,
    sector: false,
    state: false,
  });

  const validateFormOver18 = () => {
    let isValid = true;

    let errors = {};
    Object.keys(formOver18).forEach((field) => {
      if (
        formOver18[field] === "" ||
        formOver18[field] === null ||
        formOver18[field] === undefined
      ) {
        errors[field] = "obrigatório";
        isValid = false;
      } else if (field === 'email' && !isEmailValid(formOver18[field])) {
        errors[field] = "inválido";
        isValid = false;
      }
    });
    setFormOver18Errors({ ...formOver18Errors, ...errors });

    return isValid;
  };

  const onClickSubmitOver18 = async() => {
    setEmptyInput({
      name: false,
      phone: false,
      email: false,
      profession: false,
      address: false,
      availability: false,
      sector: false,
      state: false,
    });

    let hasError = false;

    if (!formOver18.name) {
      setEmptyInput(prev => ({ ...prev, name: true }));
      hasError = true;
    }
    if (!formOver18.email) {
      setEmptyInput(prev => ({ ...prev, email: true }));
      hasError = true;
    }
    if (!formOver18.phone) {
      setEmptyInput(prev => ({ ...prev, phone: true }));
      hasError = true;
    }
    if (!formOver18.address) {
      setEmptyInput(prev => ({ ...prev, address: true }));
      hasError = true;
    }
    if (!formOver18.availability) {
      setEmptyInput(prev => ({ ...prev, availability: true }));
      hasError = true;
    }
    if (!formOver18.profession) {
      setEmptyInput(prev => ({ ...prev, profession: true }));
      hasError = true;
    }
    if (!formOver18.sector) {
      setEmptyInput(prev => ({ ...prev, sector: true }));
      hasError = true;
    }
    if (!formOver18.state) {
      setEmptyInput(prev => ({ ...prev, state: true }));
      hasError = true;
    }

    if (hasError) 
      return;

    const isValid = validateFormOver18();

    if (isValid) {
      await createVolunteerForm({
        ...formOver18,
        phone: Number(formOver18.phone.replace(/[()\-\s]/g, '')),
      })
        .then(() => {
          alert("Formulário enviado com sucesso!");
        })
        .catch(error => console.log(error));
    }
  };

  const updateFormOver18 = (field, value) => {
    setFormOver18({ ...formOver18, [field]: value });

    if (formOver18Errors[field]) {
      setFormOver18Errors({ ...formOver18Errors, [field]: null });
    }
  };

  return (
    <div>
      <p>
        <b>Termo de Adesão ao Trabalho Voluntário</b>
        <br />
        Pelo presente termo, concordo estar ciente da Lei n. 9.608/1998 que rege o trabalho voluntário e decido espontaneamente realizar atividades voluntárias nesta organização.
        <br />
        Declaro estar ciente de que o trabalho voluntário não será remunerado e que não configurará vínculo empregatício ou gerará qualquer obrigação de natureza trabalhista, previdenciária ou similar.
        <br />
        Além disso, declaro que estou ciente de que eventuais danos pessoais ou materiais causados no exercício do trabalho voluntário serão de total e integral responsabilidade minha e não serão imputados à organização.
      </p>

      <form className="volunteers-form" action="">
        <div className="align-form">
        <input
          type="text"
          name="Nome"
          placeholder="Nome completo"
          value={formOver18.name}
          onChange={(e) => updateFormOver18("name", e.target.value)}
          className={emptyInput.name ? 'input-required' : ''}
        />

        <input
          type="text"
          name="E-mail"
          placeholder="E-mail"
          value={formOver18.email}
          onChange={(e) => updateFormOver18("email", e.target.value)}
          className={emptyInput.email ? 'input-required' : ''}
        />

        <input
          type="text"
          name="Endereço"
          id=""
          placeholder="Endereço completo"
          value={formOver18.address}
          onChange={(e) => updateFormOver18("address", e.target.value)}
          className={emptyInput.address ? 'input-required' : ''}
        />

        <Dropdown
          defaultValue=""
          placeholder="Setor"
          onChange={(e) => updateFormOver18('sector', e.target.value)}
          className={emptyInput.sector ? 'input-required' : ''}
        >
          <option value="Canil">Canil</option>
          <option value="Gatil">Gatil</option>
          <option value="Limpeza">Limpeza</option>
        </Dropdown>
        </div>
        <div className="align-form">
          <input
            type="text"
            name="Celular"
            id=""
            placeholder="Celular"
            value={formOver18.phone}
            mask={"(00) 00000-0000"}
            onChange={(e) => updateFormOver18('phone', e.target.value)}
            className={emptyInput.phone ? 'input-required' : ''}
          />

          <input
            type="text"
            name="Profissão"
            id=""
            placeholder="Profissão"
            value={formOver18.profession}
            onChange={(e) => updateFormOver18('profession', e.target.value)}
            className={emptyInput.profession ? 'input-required' : ''}
          />

          <input
            type="number"
            name="Disponibilidade"
            id=""
            placeholder="Disponibilidade de horas na semana"
            value={formOver18.availability}
            onChange={(e) => updateFormOver18('availability', e.target.value)}
            className={emptyInput.availability ? 'input-required' : ''}
          />

          <StateSelect
            defaultValue=""
            placeholder="Estado"
            onChange={(e) => updateFormOver18('state', e.target.value)}
            className={emptyInput.state ? 'input-required' : ''}
          />
        </div>
      </form>

      <button onClick={onClickSubmitOver18}>Enviar</button>
    </div>
  );
};

export default FormOver18;
