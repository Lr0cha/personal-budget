# Personal Budget FullStack

Este é um projeto desenvolvido com o objetivo de gerenciar despesas pessoais. A aplicação foi construída utilizando **React** e **TypeScript** no front-end e **Java com Spring Boot** no back-end, O projeto também abrange o processo de deploy de uma aplicação fullstack utilizando plataformas como **Vercel** e **Render**.

## 🚀 Tecnologias Utilizadas

- **Java + Spring Boot**
- **TypeScript**
- **React**
- **Tailwind CSS**
- **Docker**
- **Spring Data JPA**
- **Swagger ...**

## ⚙️ Funcionalidades Principais

- **Autenticação do usuário** – Implementado com **Spring Security** + **JWT** 🔒
- **Gerenciamento de Despesas** – Permite criar, listar, atualizar valor e excluir despesas.
- **Gerenciamento de Clientes** – Gerenciamento de clientes vinculados às despesas.
- **Relatório Mensal** – Exibe informações sobre as despesas por mês.
- **Tratamento de Exceções Personalizadas** – Para melhor controle e feedback ao usuário.
- **DTOs com ModelMapper** – Transformação eficiente de entidades para DTOs.

## 🌐 Link do Projeto

O site está disponível no seguinte link: [BudgetEase](https://lr0cha-personal-budget.vercel.app/)

## 💡 Observação sobre a Render

Se a API ficar inativa por algum tempo, a primeira requisição pode demorar um pouco mais para ser processada. Isso ocorre porque, no plano gratuito da **Render**, a API entra em "modo dormência" após 15 minutos de inatividade. Após a primeira requisição, o tempo de resposta volta ao normal.

## 🚧 Funcionalidades para Futuro

- **Gerenciamento de Contas pelo Administrador**: Esta funcionalidade permitirá ao administrador gerenciar as contas dos usuários, como excluir ou editar informações de contas.


## Como executar

1. Clone o repositório

### **Back-end**
**Pré-requisitos:** 
- **Java 21**
- **PostgreSQL**

#### Passos:

1. Instale as dependências do **Maven**

2. Crie o banco de dados no **PostgreSQL** utilizando as configurações definidas no arquivo `application.properties`.

3. Execute a classe `PersonalBudgetApplication` na sua IDE.

4. Para testar os endpoints, você pode usar o **Postman** ou acessar a documentação Swagger através da URL:
   - [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

---

### **Front-end**
**Pré-requisito:** 
- **Node.js**

#### Passos:

1. Instale as dependências do projeto:
   - Utilize o **npm** ou **yarn** para instalar as dependências.
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Altere a constante `BASE_URL` para o seu localhost:
   - Navegue até o arquivo `types/index.ts` e altere a variável `BASE_URL` para o seu localhost:
   ```typescript
   export const BASE_URL = 'http://localhost:8080';  // Ajuste conforme necessário
   ```

4. Inicie o servidor de desenvolvimento com **Vite**:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. Acesse a aplicação no navegador na porta configurada.
