import { useState } from "react";

import Input from "../../../components/input";
import Dropdown from "../../../components/dropdown";

import StateSelect from "./StateSelectComponent/StateSelect";
import isEmailValid from '../../../utils/isEmailValid'

const FormOver18 = () => {
  const formOver18Initial = {
    name: "",
    phoneNumber: "",
    email: "",
    occupation: "",
    address: "",
    availability: "",
    sector: "",
    state: "",
  };

  const [formOver18, setFormOver18] = useState(formOver18Initial);
  const [formOver18Errors, setFormOver18Errors] = useState(formOver18Initial);

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

  const onClickSubmitOver18 = () => {
    const isValid = validateFormOver18();

    if (isValid) {
      alert(JSON.stringify(formOver18));
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
          <Input
            type="text"
            name="Nome"
            placeholder="Nome completo"
            value={formOver18.name}
            onChange={(e) => updateFormOver18("name", e.target.value)}
            error={formOver18Errors.name}
          />

          <Input
            type="text"
            name="E-mail"
            placeholder="E-mail"
            value={formOver18.email}
            onChange={(e) => updateFormOver18("email", e.target.value)}
            error={formOver18Errors.email}
          />

          <Input
            type="text"
            name="Endereço"
            id=""
            placeholder="Endereço completo"
            value={formOver18.address}
            onChange={(e) => updateFormOver18("address", e.target.value)}
            error={formOver18Errors.address}
          />

          <Dropdown
            defaultValue=""
            placeholder="Setor"
            onChange={(e) => updateFormOver18('sector', e.target.value)}
            error={formOver18Errors.sector}
          >
            <option value="Canil">Canil</option>
            <option value="Gatil">Gatil</option>
            <option value="Limpeza">Limpeza</option>
          </Dropdown>
        </div>
        <div className="align-form">
          <Input
            type="text"
            name="Celular"
            id=""
            placeholder="Celular"
            value={formOver18.phoneNumber}
            mask={"(00) 00000-0000"}
            onChange={(e) => updateFormOver18('phoneNumber', e.target.value)}
            error={formOver18Errors.phoneNumber}
          />
          <Input
            type="text"
            name="Profissão"
            id=""
            placeholder="Profissão"
            value={formOver18.occupation}
            onChange={(e) => updateFormOver18('occupation', e.target.value)}
            error={formOver18Errors.occupation}
          />
          <Input
            type="number"
            name="Disponibilidade"
            id=""
            placeholder="Disponibilidade de horas na semana"
            value={formOver18.availability}
            onChange={(e) => updateFormOver18('availability', e.target.value)}
            error={formOver18Errors.availability}
          />
          <StateSelect
            defaultValue=""
            placeholder="Estado"
            onChange={(e) => updateFormOver18('state', e.target.value)}
            error={formOver18Errors.state}
          />
        </div>
      </form>
      <button onClick={onClickSubmitOver18}>Enviar</button>
    </div>
  );
};

export default FormOver18;
