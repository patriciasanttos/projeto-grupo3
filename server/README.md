# **API Documentation**

## **Overview**
Esta é a documentação da API para o sistema de gerenciamento de uma ONG, que lida com **Animais**, **Adoções**, **Apadrinhamentos**, **Voluntários** e **Administradores**. A API segue os princípios RESTful e usa o `multer` para upload de imagens.

---

## **Endpoints**

### **Animals**

- **GET /animals/get**
  - Retorna todos os animais cadastrados.
  - **Exemplo de resposta:**
    ```json
    [
      {
        "id": 1,
        "name": "Lucky",
        "species": "cão",
        "age": 3,
        "image": "image.jpg",
        "race": "Pastor alemão",
        "size": "Médio",
        "color": "Marron",
        "vaccine": 2017,
        "castrated": true,
        "age": "Adulto",
        "gender": "m",
        "temperament": "Dócil",
        "bay": 1,
        "sector": "A",
        "status": "Disponível",
        "observation": "",
        "created_at": "2024-02-11T07:57:15.583Z",
        "updated_at": "2024-02-11T07:57:15.583Z",
        "Sponsorships": [
          {
            "id": 1,
            "animal_id": 1,
            "sponsor_id": 1,
            "created_at": "2024-02-11T07:57:15.583Z",
            "updated_at": "2024-02-11T07:57:15.583Z",
          }
        ]
      },
    ]
    ```

- **GET /animals/get/:id**
  - Retorna os detalhes de um animal específico.
  - **Parâmetros**:
    - `id`: ID do animal (route param).
  - **Exemplo de resposta:**
    ```json
    {
      "id": 1,
      "name": "Lucky",
      "species": "cão",
      "age": 3,
      "image": "image.jpg",
      "race": "Pastor alemão",
      "size": "Médio",
      "color": "Marron",
      "vaccine": 2017,
      "castrated": true,
      "age": "Adulto",
      "gender": "m",
      "temperament": "Dócil",
      "bay": 1,
      "sector": "A",
      "status": "Disponível",
      "observation": "",
      "created_at": "2024-02-11T07:57:15.583Z",
      "updated_at": "2024-02-11T07:57:15.583Z",
      "Sponsorships": [
        {
          "id": 1,
          "animal_id": 1,
          "sponsor_id": 1,
          "created_at": "2024-02-11T07:57:15.583Z",
          "updated_at": "2024-02-11T07:57:15.583Z",
        }
      ]
    },
    ```

- **POST /animals**
  - Cria um novo animal.
  - **Parâmetros**:
    - `image`: Arquivo de imagem (form-data).
    - `name`, `species`, `age`, `race`, `size`, `color`,`vaccine`, `castrated`, `age`, `gender`, `temperament`,`sector`, `status`, `observation`:
  - **Exemplo de resposta:**
    - Código de Status: `201 Created`
      - Descrição: Animal criado com sucesso.


- **PUT /animals**
  - Atualiza um animal existente.
  - **Parâmetros**:
    - `image`: Arquivo de imagem (Opicional).
    - `name`, `species`, `age`, `race`, `size`, `color`,`vaccine`, `castrated`, `age`, `gender`, `temperament`,`sector`, `status`, `observation`(Dados atualizados).

  - **Exemplo de resposta:**
    - Código de Status: `200 OK`
      - Descrição: Animal atualizado com sucesso.


- **DELETE /animals/:id**
  - Deleta um animal.
  - **Parâmetros**:
    - `id`: ID do animal (route param).
  - **Exemplo de resposta:**
      - **Exemplo de resposta**:
    - Código de Status: `200 OK`
      - Descrição: Animal deletado com sucesso.


---

### **Adoptions**

- **GET /adoptions/get**
  - Retorna todas as adoções.
  - **Exemplo de resposta:**
    ```json
    [
      {
        "id": 1,
        "name": "Lucky",
        "species": "cão",
        "age": 3,
        "image": "image.jpg",
        "race": "Pastor alemão",
        "size": "Médio",
        "color": "Marron",
        "vaccine": 2017,
        "castrated": true,
        "age": "Adulto",
        "gender": "m",
        "temperament": "Dócil",
        "bay": 1,
        "sector": "A",
        "status": "Disponível",
        "animal_observation": "",
        "observation": "",
        "animal_created_at": "2024-02-11T07:57:15.583Z",
        "tutors_name": "John",
        "email": "john1@gmail.com",
        "phone": 11984567289,
        "address": "Rua 1 numero 15",
        "cpf": 32465881291,
        "created_at": "2024-02-11T07:57:15.583Z",
        "updated_at": "2024-02-11T07:57:15.583Z",
      },
    ]
    ```

- **GET /adoptions/get/:id**
  - Retorna os detalhes de uma adoção específica.
  - **Parâmetros**:
    - `id`: ID da adoção (route param).
  - **Exemplo de respostas:**
    ```json
    {
      "id": 1,
      "name": "Lucky",
      "species": "cão",
      "age": 3,
      "image": "image.jpg",
      "race": "Pastor alemão",
      "size": "Médio",
      "color": "Marron",
      "vaccine": 2017,
      "castrated": true,
      "age": "Adulto",
      "gender": "m",
      "temperament": "Dócil",
      "bay": 1,
      "sector": "A",
      "status": "Disponível",
      "animal_observation": "",
      "observation": "",
      "animal_created_at": "2024-02-11T07:57:15.583Z",
      "tutors_name": "John",
      "email": "john1@gmail.com",
      "phone": 11984567289,
      "address": "Rua 1 numero 15",
      "cpf": 32465881291,
      "created_at": "2024-02-11T07:57:15.583Z",
      "updated_at": "2024-02-11T07:57:15.583Z",
    },
    ```

- **POST /adoptions**
  - Cria uma nova adoção.
  - **Parâmetros**:  
    - `totors_name`, `email`, `phone`, `adderss`, `cpf`, `animal_id` (body params).
  - **Exemplo de resposta:**
    - Código de Status: `200 OK`
      - Descrição: Adoção criada com sucesso.

- **PUT /adoptions**
  - Atualiza uma adoção existente.
  - **Parâmetros**: 
    - `totors_name`, `email`, `phone`, `adderss`, `cpf` (body params).
  - **Exemplo de resposta:**
    - Código de Status: `200 OK`
      - Descrição: Adoção atualizada com sucesso.

- **DELETE /adoptions/:id**
  - Deleta uma adoção.
  - **Parâmetros**:
    - `id`: ID da adoção (route param).
  - **Exemplo de resposta:**
    - Código de Status: `200 OK`
      - Descrição: Adoção deletada com sucesso.
---

### **Sponsorships**

- **GET /sponsorships/get**
  - Retorna todos os apadrinhamentos.
  - **Exemplo de respostas:**
    ```json
    [
      {
        "id": 1,
        "name": "John",
        "email": "john1@gmail.com",
        "phone": 11984567289,
        "observation": "",
        "created_at": "2024-02-11T07:57:15.583Z",
        "updated_at": "2024-02-11T07:57:15.583Z",
        "Animal": []
      }
    ]
    ```

- **GET /sponsorships/get/:id**
  - Retorna os detalhes de um apadrinhamento específico.
  - **Parâmetros**:
    - `id`: ID do apadrinhamento (route param).
  - **Exemplo de respostas:**
    ```json
    {
      "id": 1,
      "name": "John",
      "email": "john1@gmail.com",
      "phone": 11984567289,
      "observation": "",
      "created_at": "2024-02-11T07:57:15.583Z",
      "updated_at": "2024-02-11T07:57:15.583Z",
      "Animal": []
    }
    ```

- **POST /sponsorships**
  - Cria um novo apadrinhamento.
  - **Parâmetros**:
    - `name`, `email`, `phone`, `animal_id`, `observation` (body params).
  - **Exemplo de respostas:**
    - Código de Status: `200 OK`
      - Descrição: Apadrinhamento criado com sucesso.

- **PUT /sponsorships**
  - Atualiza um apadrinhamento existente.
  - **Parâmetros**:
    - `name`, `email`, `phone`, `observation` 
  - **Exemplo de respostas:**
    - Código de Status: `200 OK`
      - Descrição: Apadrinhamento atualizado com sucesso.

- **DELETE /sponsorships/:id**
  - Deleta um apadrinhamento.
  - **Parâmetros**:
    - `id`: ID do apadrinhamento (route param).
  - **Exemplo de respostas:**
    - Código de Status: `200 OK`
      - Descrição: Apadrinhamento deletado com sucesso.

---

### **Volunteers**

- **GET /volunteers/get**
  - Retorna todos os voluntários.
  - **Exemplo de respostas:**
    ```json
    [
      {
        "id": 1,
        "name": "Jonh",
        "responsible_name": "Alex",
        "email": "john1@gmail.com",
        "phone": 11984567289,
        "address": "Rua 1 numero 15",
        "availability": 8,
        "study_schedule": "Manhã",
        "profession": "Advogado",
        "sector": "Caníl",
        "state": "AC",
        "observation": "",
        "created_at": "2024-02-11T07:57:15.583Z",
        "updated_at": "2024-02-11T07:57:15.583Z",
      }
    ]
    ```

- **GET /volunteers/get/:id**
  - Retorna os detalhes de um voluntário específico.
  - **Parâmetros**:
    - `id`: ID do voluntário (route param).
  - **Exemplo de respostas:**
    ```json
    {
      "id": 1,
      "name": "Jonh",
      "responsible_name": "Alex",
      "email": "john1@gmail.com",
      "phone": 11984567289,
      "address": "Rua 1 numero 15",
      "availability": 8,
      "study_schedule": "Manhã",
      "profession": "Advogado",
      "sector": "Caníl",
      "state": "AC",
      "observation": "",
      "created_at": "2024-02-11T07:57:15.583Z",
      "updated_at": "2024-02-11T07:57:15.583Z",
    }
    ```

- **POST /volunteers**
  - Cria um novo voluntário.
  - **Parâmetros**:
    - `name`, `email`, `phone`, `address`, `availability`, `study_schedule`, `profession`, `sector`, `state`, `observation` (body params).
  - **Exemplo de respostas:**
    - Código de Status: `200 OK`
      - Descrição: Voluntário criado com sucesso.

- **PUT /volunteers**
  - Atualiza um voluntário existente.
  - **Parâmetros**:
    - `image`: Arquivo de imagem (opcional).
    - Dados atualizados (body params).
  - **Exemplo de respostas:**
    - Código de Status: `200 OK`
      - Descrição: Voluntário atualizado com sucesso.

- **DELETE /volunteers/:id**
  - Deleta um voluntário.
  - **Parâmetros**:
    - `id`: ID do voluntário (route param).
  - **Exemplo de respostas:**
    - Código de Status: `200 OK`
      - Descrição: Voluntário deletado com sucesso.

#### **Formulários de Voluntários**
- **GET /volunteers/forms**
  - Retorna todos os formulários de voluntários.
  - **Exemplo de respostas:**
    ```json
    [
      {
        "id": 1,
        "name": "Jonh",
        "responsible_name": "Alex",
        "email": "john1@gmail.com",
        "phone": 11984567289,
        "address": "Rua 1 numero 15",
        "availability": 8,
        "study_schedule": "Manhã",
        "profession": "Advogado",
        "sector": "Caníl",
        "state": "AC",
        "observation": "",
        "created_at": "2024-02-11T07:57:15.583Z",
        "updated_at": "2024-02-11T07:57:15.583Z",
      }
    ]
    ```

- **POST /volunteers/forms**
  - Cria um novo formulário de voluntário.
  - **Parâmetros**:
  - `name`, `email`, `phone`, `address`, `availability`, `study_schedule`, `profession`, `sector`, `state`, `observation` (body params).
  - **Exemplo de respostas:**
    - Código de Status: `200 OK`
      - Descrição: Formulário criado com sucesso.


- **GET /volunteers/forms/accept/:id**
  - Aceita um formulário de voluntário.
  - **Parâmetros**:
    - `id`: ID do formulário (route param).
  - **Exemplo de respostas:**
    - Código de Status: `200 OK`
      - Descrição: Formulário aceito com sucesso.

- **DELETE /volunteers/forms/deny/:id**
  - Rejeita um formulário de voluntário.
  - **Parâmetros**:
    - `id`: ID do formulário (route param).
  - **Exemplo de respostas:**
    - Código de Status: `200 OK`
      - Descrição: Formulário rejeitado com sucesso.

---

### **Admins**

- **GET /admins/get**
  - Retorna todos os administradores.
  - **Exemplo de respostas:**
    ```json
    [
      {
        "id": 1,
        "name": "Jonh",
        "email": "john1@gmail.com",
        "phone": 11984567289,
        "observation": "",
        "created_at": "2024-02-11T07:57:15.583Z",
        "updated_at": "2024-02-11T07:57:15.583Z",
        "permissions": [
          {
            "id": 6,
            "name": "All"
          }
        ]
      }
    ]
    ```

- **GET /admins/get/:id**
  - Retorna os detalhes de um administrador específico.
  - **Parâmetros**:
    - `id`: ID do administrador (route param).
  - **Exemplo de respostas:**
    ```json
    {
      "id": 1,
      "name": "Jonh",
      "email": "john1@gmail.com",
      "phone": 11984567289,
      "observation": "",
      "created_at": "2024-02-11T07:57:15.583Z",
      "updated_at": "2024-02-11T07:57:15.583Z",
      "permissions": [
        {
          "id": 6,
          "name": "All"
        }
      ]
    }
    ```

- **GET /admins/verify/:id**
  - Verifica um administrador para autenticar.
  - **Exemplo de respostas:**
    - Código de Status: `200 OK`
      - Descrição: Administrador verificado com sucesso.

- **GET /admins/login**
  - Realiza o login de um administrador.
  - **Cabeçalhos**:
    - `Authorization`: Credenciais no formato `email:senha` (exemplo: `Authorization: admin@example.com:password123`).
  - **Exemplo de respostas:**
    - Código de Status: `200 OK`

      ```json
      {
        "token": "eyJhbGciOiJIUzI1NiJ9.eyJ0ZXN0IjoidGVzdCJ9.zWkKBq8-FMQgiatPN8uWmpMUMC7eal91ebjYvtzB89g"
      }
      ```

- **POST /admins**
  - Registra um novo administrador.
  - **Parâmetros**:
    - `name`, `email`, `phone`, `password`, `observation` (body params).
  - **Exemplo de respostas:**
    - Código de Status: `200 OK`
      - Descrição: Administrador criado com sucesso.


- **PUT /admins**
  - Atualiza um administrador existente.
  - **Parâmetros**:
    - `name`, `email`, `phone`, `password`, `observation` (body params).
  - **Exemplo de respostas:**
    - Código de Status: `200 OK`
      - Descrição: Administrador atualizado com sucesso.

- **DELETE /admins/:id**
  - Deleta um administrador.
  - **Parâmetros**:
    - `id`: ID do administrador (route param).
  - **Exemplo de respostas:**
    - Código de Status: `200 OK`
      - Descrição: Administrador deletado com sucesso.
---

## **Configuração de Upload de Imagens**
A API utiliza o middleware `multer` para o upload de imagens, armazenando-as em memória. Em rotas que requerem upload de imagens, os dados devem ser enviados no formato `form-data`.

---

## **Como Executar a API**
1. Clone o repositório.
2. Instale as dependências:
  ```
  npm install
  yarn start
  ```
3. Execute as migration:
  ```
  npx sequelize db:migrate
  ```
4. Execute as seeds:
  ```
  npx sequelize db:seed:all
  ```
5. Inicie a API:
  ```
    npm start
    yarn start
  ```


