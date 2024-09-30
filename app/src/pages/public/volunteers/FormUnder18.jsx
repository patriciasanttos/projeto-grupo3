import { useState } from "react";
import { toast } from "react-toastify";
import { IMaskInput } from "react-imask";

import Dropdown from "../../../components/dropdown";

import StateSelect from "./StateSelectComponent/StateSelect";
import isEmailValid from '../../../utils/isEmailValid'
import { createVolunteerForm } from "../../../services/api/volunteers";
import Button from "../../../components/button";

const FormUnder18 = () => {
  const [loading, setLoading] = useState(false)

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
    profession: ""
  };

  const [formUnder18, setFormUnder18] = useState(formUnder18Initial);
  const [formUnder18Errors, setFormUnder18Errors] = useState(formUnder18Initial);
  const [ emptyInput, setEmptyInput ] = useState({
    name: false,
    responsible_name: false,
    phone: false,
    study_schedule: false,
    email: false,
    address: false,
    availability: false,
    sector: false,
    state: false,
    profession: false
  });

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
    setEmptyInput({
      name: false,
      responsible_name: false,
      phone: false,
      study_schedule: false,
      email: false,
      address: false,
      availability: false,
      sector: false,
      state: false,
      profession: false
    });

    let hasError = false;

    if (!formUnder18.name) {
      setEmptyInput(prev => ({ ...prev, name: true }));
      hasError = true;
    }
    if (!formUnder18.responsible_name) {
      setEmptyInput(prev => ({ ...prev, responsible_name: true }));
      hasError = true;
    }
    if (!formUnder18.email) {
      setEmptyInput(prev => ({ ...prev, email: true }));
      hasError = true;
    }
    if (!formUnder18.phone) {
      setEmptyInput(prev => ({ ...prev, phone: true }));
      hasError = true;
    }
    if (!formUnder18.address) {
      setEmptyInput(prev => ({ ...prev, address: true }));
      hasError = true;
    }
    if (!formUnder18.availability) {
      setEmptyInput(prev => ({ ...prev, availability: true }));
      hasError = true;
    }
    if (!formUnder18.study_schedule) {
      setEmptyInput(prev => ({ ...prev, study_schedule: true }));
      hasError = true;
    }
    if (!formUnder18.profession) {
      setEmptyInput(prev => ({ ...prev, profession: true }));
      hasError = true;
    }
    if (!formUnder18.sector) {
      setEmptyInput(prev => ({ ...prev, sector: true }));
      hasError = true;
    }
    if (!formUnder18.state) {
      setEmptyInput(prev => ({ ...prev, state: true }));
      hasError = true;
    }

    if (hasError) 
      return;

    const isValid = validateFormUnder18();

    if (isValid) {
      setLoading(true)
      
      await createVolunteerForm({
        ...formUnder18,
        phone: Number(formUnder18.phone.replace(/[()\-\s]/g, '')),
      })
        .then(() => {
          setLoading(false)
          toast.success("Formulário enviado com sucesso!");
          setFormUnder18(formUnder18Initial)
        })
        .catch(error => {
          setLoading(false);
          toast.error("Erro ao enviar formulário. Tente novamente.");
          console.log(error)
        });
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
          <input
            type="text"
            name="Nome Responsável"
            id=""
            placeholder="Nome do responsável"
            value={formUnder18.responsible_name}
            onChange={(e) =>
              updateFormUnder18("responsible_name", e.target.value)
            }
            error={formUnder18Errors.responsible_name}
            className={emptyInput.responsible_name ? 'input-required' : ''}
          />
          <input
            type="text"
            name="Nome do menor"
            value={formUnder18.name}
            id=""
            placeholder="Nome do menor"
            onChange={(e) => updateFormUnder18("name", e.target.value)}
            error={formUnder18Errors.name}
            className={emptyInput.name ? 'input-required' : ''}
          />

          <input
            type="text"
            name="E-mail"
            id=""
            placeholder="E-mail"
            value={formUnder18.email}
            onChange={(e) => updateFormUnder18("email", e.target.value)}
            error={formUnder18Errors.email}
            className={emptyInput.email ? 'input-required' : ''}
          />

          <input
            type="text"
            name="Endereço"
            id=""
            placeholder="Endereço completo"
            value={formUnder18.address}
            onChange={(e) => updateFormUnder18("address", e.target.value)}
            error={formUnder18Errors.address}
            className={emptyInput.address ? 'input-required' : ''}
          />

          <Dropdown
            defaultValue=""
            placeholder="Setor"
            onChange={(e) => updateFormUnder18("sector", e.target.value)}
            error={formUnder18Errors.sector}
            className={emptyInput.sector ? 'input-required' : ''}
          >
            <option value="Canil">Canil</option>
            <option value="Gatil">Gatil</option>
            <option value="Limpeza">Limpeza</option>
            <option value="Divulgação">Divulgação</option>
            <option value="Social Mídia">Social Mídia</option>
            <option value="Marketing">Marketing</option>
            <option value="Design Gráfico">Design Gráfico</option>
          </Dropdown>
         
        </div>
        <div className="align-form">
          <IMaskInput
            type="text"
            name="Celular"
            id=""
            placeholder="Celular"
            value={formUnder18.phone}
            mask={"(00) 00000-0000"}
            onChange={(e) => updateFormUnder18("phone", e.target.value)}
            error={formUnder18Errors.phone}
            className={emptyInput.phone ? 'input-required' : ''}
          />

          <input
            type="text"
            name="Período aula"
            id=""
            placeholder="Período que estuda"
            value={formUnder18.study_schedule}
            onChange={(e) => updateFormUnder18("study_schedule", e.target.value)}
            error={formUnder18Errors.study_schedule}
            className={emptyInput.study_schedule ? 'input-required' : ''}
          />

          <input
            type="number"
            name="Disponibilidade"
            id=""
            placeholder="Disponibilidade de horas na semana"
            value={formUnder18.availability}
            onChange={(e) => updateFormUnder18("availability", e.target.value)}
            error={formUnder18Errors.availability}
            className={emptyInput.availability ? 'input-required' : ''}
          />

          <StateSelect
            defaultValue=""
            placeholder="Estado"
            onChange={(e) => updateFormUnder18("state", e.target.value)}
            error={formUnder18Errors.state}
            className={emptyInput.state ? 'input-required' : ''}
          />

          <input
            type="text"
            name="Ocupação"
            id=""
            placeholder="Ocupação"
            value={formUnder18.profession}
            onChange={(e) => updateFormUnder18("profession", e.target.value)}
            error={formUnder18Errors.profession}
            className={emptyInput.profession ? 'input-required' : ''}
          />
        </div>
      </form>
      <div className="flex-row">
        <Button loading={loading} onClick={onClickSubmitUnder18}>Enviar</Button>
      </div>
    </div>
  );
};

export default FormUnder18;
