import { useState } from "react";

import { IMaskInput } from "react-imask";
import StateSelect from "./StateSelectComponent/StateSelect";

const FormOver18 = () => {
  const formUnder18Initial = {
    responsibleName: "",
    phoneNumber: "",
    minorsName: "",
    periodStudy: "",
    email: "",
    address: "",
    availability: "",
    sector: "",
    state: "",
  };

  const [formUnder18, setFormUnder18] = useState(formUnder18Initial);
  const [formUnder18Errors, setFormUnder18Errors] =
    useState(formUnder18Initial);

  const onClickSubmitUnder18 = () => {
    alert(JSON.stringify(formUnder18));
  };

  return (
    <div>
      <p>
        Pela presente Autorização e ciente da Lei n. 9.608/1998 que rege o
        trabalho voluntário, da Constituição Federal e do Estatuto da Criança e
        do Adolescente que proíbem o trabalho noturno, perigoso ou insalubre a
        menores de dezoito anos, autorizo meu filho(a) a realizar atividade
        voluntária nesta organização.
        <br />
        Declaro, ainda, que tenho conhecimento e estou de acordo com os
        objetivos e a metodologia usada nas atividades e estou ciente de que o
        projeto tem cunho educacional e social. <br />
        Declaro, por fim, que estou ciente de que o trabalho não será remunerado
        e que não configurará vínculo empregatício ou gerará qualquer obrigação
        de natureza trabalhista, previdenciária ou afim.
      </p>
      <form className="volunteers-form" action="">
        <div className="align-form">
          <input
            type="text"
            name="Nome Responsável"
            id=""
            placeholder="Nome do responsável"
            value={formUnder18.responsibleName}
            onChange={(e) =>
              setFormUnder18({
                ...formUnder18,
                responsibleName: e.target.value,
              })
            }
          />
          <input
            type="text"
            name="Nome do menor"
            id=""
            placeholder="Nome do menor"
            value={formUnder18.minorsName}
            onChange={(e) =>
              setFormUnder18({
                ...formUnder18,
                minorsName: e.target.value,
              })
            }
          />
          <input
            type="text"
            name="E-mail"
            id=""
            placeholder="E-mail"
            value={formUnder18.email}
            onChange={(e) =>
              setFormUnder18({
                ...formUnder18,
                email: e.target.value,
              })
            }
          />
          <input
            type="text"
            name="Endereço"
            id=""
            placeholder="Endereço completo"
            value={formUnder18.address}
            onChange={(e) =>
              setFormUnder18({
                ...formUnder18,
                address: e.target.value,
              })
            }
          />
          <select
            defaultValue=""
            onChange={(e) =>
              setFormUnder18({
                ...formUnder18,
                sector: e.target.value,
              })
            }
          >
            <option value="" disabled>
              Setor
            </option>
            <option value="Canil">Canil</option>
            <option value="Gatil">Gatil</option>
            <option value="Limpeza">Limpeza</option>
          </select>
        </div>
        <div className="align-form">
          <IMaskInput
            type="text"
            name="Celular"
            id=""
            placeholder="Celular"
            value={formUnder18.phoneNumber}
            onAccept={(value, maskRef, e) =>
              setFormUnder18({
                ...formUnder18,
                phoneNumber: e.target.value,
              })
            }
            mask={"(00) 00000-0000"}
          />
          <input
            type="text"
            name="Período aula"
            id=""
            placeholder="Período que estuda"
            value={formUnder18.periodStudy}
            onChange={(e) =>
              setFormUnder18({
                ...formUnder18,
                periodStudy: e.target.value,
              })
            }
          />
          <input
            type="number"
            name="Disponibilidade"
            id=""
            placeholder="Disponibilidade de horas na semana"
            value={formUnder18.availability}
            onChange={(e) =>
              setFormUnder18({
                ...formUnder18,
                availability: e.target.value,
              })
            }
          />
          <StateSelect
            onChange={(e) =>
              setFormUnder18({
                ...formUnder18,
                state: e.target.value,
              })
            }
          />
        </div>
      </form>
      <button onClick={onClickSubmitUnder18}>Enviar</button>
    </div>
  );
};

export default FormOver18;
