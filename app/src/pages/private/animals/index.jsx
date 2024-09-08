import React from 'react';

import AdminNavBar from '../../../components/admin_navbar/AdminNavBar';

import './styles.scss';
import AdminList from '../../../components/admin_list/AdminList';

function Animals() {

  // Aqui serão as linhas exibidas na tabela
  const animalsList = [
    {
      name: "Hector",
      sex: "Macho",
      size: "médio",
      race: "SRD",
      local: "Setor A - Baia 01",
      sponsor: "não",
      status: "disponível",
    },
    {
      name: "Júlia",
      sex: "Fêmea",
      size: "médio",
      race: "SRD",
      local: "Setor A - Baia 01",
      sponsor: "sim",
      status: "disponível",
    },
    {
      name: "Andressa",
      sex: "Fêmea",
      size: "médio",
      race: "SRD",
      local: "Setor A - Baia 01",
      sponsor: "não",
      status: "disponível",
    },
  ];

  // Coluna: title o que será exibido e rowKey pega a propriedade que será exibida
  const columns = [
    {
      title: "Nome",
      rowKey: "name",
    },
    {
      title: "Sexo",
      rowKey: "sex",
    },
    {
      title: "Porte",
      rowKey: "size",
    },
    {
      title: "Raça",
      rowKey: "race",
    },
    {
      title: "Local",
      rowKey: "local",
    },
    {
      title: "Padrinho",
      rowKey: "sponsor",
    },
    {
      title: "Status",
      rowKey: "status",
    },
  ];

  const onClickAnimal = (animal) => {
    // Substituir o alert para exibir o modal de edição
    alert(JSON.stringify(animal));
  };

  return (
    <AdminNavBar headerTitle="Animais">
      <AdminList
        columns={columns}
        rows={animalsList}
        onClickRow={onClickAnimal}
      />
    </AdminNavBar>
  );
}

export default Animals;