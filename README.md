# Biblioteca Digital 📚

Sistema Integrado de Gestão de Livros para uma Biblioteca Municipal. Este projeto permite realizar operações de CRUD (Cadastrar, Consultar, Atualizar e Excluir livros), com um back-end robusto, front-end amigável e banco de dados relacional.

---

## 🎯 Funcionalidades

- 📖 **Cadastrar Livros:** Adicione novos livros ao sistema.
- 🔍 **Consultar Livros:** Visualize uma lista de todos os livros cadastrados.
- ✏️ **Atualizar Livros:** Edite as informações de um livro existente.
- 🗑️ **Excluir Livros:** Remova livros do sistema.

---

## 🛠️ Tecnologias Utilizadas

### Back-end:
- **Java 17** com **Spring Boot**
- **MySQL** como banco de dados relacional

### Front-end:
- **React** com **Bootstrap** para estilização

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Java 17** ou superior
- **Node.js 18** ou superior
- **MySQL** configurado

### Passos

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/gguidiniz/gestao_biblioteca.git

2. **Configurar o Back-end:**
- Acesse a pasta do back-end:
    '''bash
    cd backend

- Execute o comando para iniciar a aplicação:
    '''bash
    mvn spring-boot:run

3. **Configurar o Front-end:**
- Acesse a pasta do front-end:
    '''bash
    cd frontend

- Instale as dependências:
    '''bash
    npm install

- Inicie o servidor do front-end:
    '''bash
    npm start

Configurar o Banco de Dados:

4. **Certifique-se de que o MySQL esteja rodando.**
- Crie o banco de dados chamado biblioteca:
    '''sql
    CREATE DATABASE biblioteca;

As configurações de conexão do banco estão no arquivo application.properties do back-end.

5. **Acessar o Sistema:**
- Abra o navegador e acesse:
http://localhost:3000