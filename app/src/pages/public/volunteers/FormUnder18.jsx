import { useState } from "react";

import Input from "../../../components/input";
import Dropdown from "../../../components/dropdown";

import StateSelect from "./StateSelectComponent/StateSelect";
import isEmailValid from '../../../utils/isEmailValid'
import { createVolunteerForm } from "../../../services/api/volunteers";

const FormUnder18 = () => {
  const formUnder18Initial = {
    name: "",
    responsible_name: "",
    phone: "",
    study_schedule: "",
    email: "",
    address: "",
    availability: "",
    sector: "",
    state: "",
  };

  const [formUnder18, setFormUnder18] = useState(formUnder18Initial);
  const [formUnder18Errors, setFormUnder18Errors] = useState(formUnder18Initial);

  const validateFormUnder18 = () => {
    let isValid = true;

    let errors = {};
    Object.keys(formUnder18).forEach((field) => {
      if (
        formUnder18[field] === "" ||
        formUnder18[field] === null ||
        formUnder18[field] === undefined
      ) {
        errors[field] = "obrigatório";
        isValid = false;
      } else if (field === 'email' && !isEmailValid(formUnder18[field])) {
        errors[field] = "inválido";
        isValid = false;
      }
    });
    setFormUnder18Errors({ ...formUnder18Errors, ...errors });

    return isValid;
  };

  const onClickSubmitUnder18 = async () => {
    const isValid = validateFormUnder18();

    if (isValid) {
      await createVolunteerForm({
        ...formUnder18,
        phone: Number(formUnder18.phone.replace(/[()\-\s]/g, '')),
      })
        .then(() => {
          alert("Formulário enviado com sucesso!");
        })
        .catch(error => console.log(error));
    }
  };

  const updateFormUnder18 = (field, value) => {
    setFormUnder18({ ...formUnder18, [field]: value });

    if (formUnder18Errors[field]) {
      setFormUnder18Errors({ ...formUnder18Errors, [field]: null });
    }
  };

  return (
    <div>
      <p>
        <b>Autorização para Atividade Voluntária de Menor</b>
        <br />
        Pelo presente termo, concordo ciente da Lei n. 9.608/1998 que rege o trabalho voluntário, da Constituição Federal e do Estatuto da Criança e do Adolescente que proíbem o trabalho noturno, perigoso ou insalubre para menores de dezoito anos, autorizo meu filho(a) a realizar atividades voluntárias nesta organização.
        <br />
        Declaro que tenho conhecimento e estou de acordo com os objetivos e a metodologia utilizadas nas atividades e que entendo que o projeto tem cunho educacional e social.
        <br />
        Além disso, declaro que estou ciente de que o trabalho voluntário não será remunerado e que não configurará vínculo empregatício ou gerará qualquer obrigação de natureza trabalhista, previdenciária ou similar.
      </p>
      <form className="volunteers-form" action="">
        <div className="align-form">
          <Input
            type="text"
            name="Nome Responsável"
            id=""
            placeholder="Nome do responsável"
            value={formUnder18.responsible_name}
            onChange={(e) =>
              updateFormUnder18("responsible_name", e.target.value)
            }
            error={formUnder18Errors.responsible_name}
          />
          <Input
            type="text"
            name="Nome do menor"
            value={formUnder18.name}
            id=""
            placeholder="Nome do menor"
            onChange={(e) => updateFormUnder18("name", e.target.value)}
            error={formUnder18Errors.name}
          />
          <Input
            type="text"
            name="E-mail"
            id=""
            placeholder="E-mail"
            value={formUnder18.email}
            onChange={(e) => updateFormUnder18("email", e.target.value)}
            error={formUnder18Errors.email}
          />
          <Input
            type="text"
            name="Endereço"
            id=""
            placeholder="Endereço completo"
            value={formUnder18.address}
            onChange={(e) => updateFormUnder18("address", e.target.value)}
            error={formUnder18Errors.address}
          />
          <Dropdown
            defaultValue=""
            placeholder="Setor"
            onChange={(e) => updateFormUnder18("sector", e.target.value)}
            error={formUnder18Errors.sector}
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
            value={formUnder18.phone}
            mask={"(00) 00000-0000"}
            onChange={(e) => updateFormUnder18("phone", e.target.value)}
            error={formUnder18Errors.phone}
          />
          <Input
            type="text"
            name="Período aula"
            id=""
            placeholder="Período que estuda"
            value={formUnder18.study_schedule}
            onChange={(e) => updateFormUnder18("study_schedule", e.target.value)}
            error={formUnder18Errors.study_schedule}
          />
          <Input
            type="number"
            name="Disponibilidade"
            id=""
            placeholder="Disponibilidade de horas na semana"
            value={formUnder18.availability}
            onChange={(e) => updateFormUnder18("availability", e.target.value)}
            error={formUnder18Errors.availability}
          />
          <StateSelect
            defaultValue=""
            placeholder="Estado"
            onChange={(e) => updateFormUnder18("state", e.target.value)}
            error={formUnder18Errors.state}
          />
        </div>
      </form>
      <button onClick={onClickSubmitUnder18}>Enviar</button>
    </div>
  );
};

export default FormUnder18;
