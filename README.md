# Backend CRUD de Usuários com Autenticação JWT

Este projeto implementa um backend básico em Node.js, TypeScript e SQLite com as operações fundamentais de CRUD (Create, Read, Update, Delete) para gerenciamento de usuários, incluindo controle de autenticação e autorização via JWT (JSON Web Token).

---

## O que é CRUD?

CRUD é o acrônimo para as operações básicas utilizadas em sistemas que manipulam dados:

- **Create (Criar):** Inserir novos dados no sistema.
- **Read (Ler):** Consultar dados existentes.
- **Update (Atualizar):** Modificar dados existentes.
- **Delete (Deletar):** Remover dados do sistema.

Estas operações são a base para a maioria das aplicações que precisam armazenar e manipular dados, seja em bancos relacionais (SQL), NoSQL ou APIs RESTful.

---

## Funcionalidades Principais do Projeto

- **Cadastro de Usuários:** Qualquer pessoa pode criar um usuário (sem precisar estar autenticada), porém não pode criar administradores diretamente.
- **Login com JWT:** Usuários fazem login com email e senha, recebendo um token JWT que deve ser enviado para autorizar operações protegidas.
- **Controle de Acesso:**
  - Apenas administradores podem listar todos os usuários e obter usuários por ID.
  - Usuários comuns podem criar suas contas, atualizar seus próprios dados e deletar sua conta.
  - O administrador pode fazer tudo que o usuário comum faz, além das listagens e consultas gerais.
- **Upload de Foto de Perfil:** O cadastro e atualização permitem enviar uma foto de perfil, armazenada no servidor.
- **Banco SQLite:** Banco leve e embutido, fácil para desenvolvimento e pequenos projetos.

---

## Como Utilizar a API

### 1. Criar usuário

- Método: `POST /api/users`
- Aberto para qualquer cliente, não precisa de token.
- Campos obrigatórios: `email`, `password`, `name`.
- Não é permitido criar usuário administrador via API pública.

### 2. Login

- Método: `POST /api/auth/login`
- Enviar `email` e `password`.
- Retorna token JWT para autenticação nas próximas requisições.

### 3. Consultar usuários (somente admin)

- Listar todos: `GET /api/users`
- Obter por ID: `GET /api/users/:id`
- Exige token JWT válido de administrador.

### 4. Atualizar usuário

- Método: `PUT /api/users/:id`
- Pode atualizar somente seu próprio usuário (ou admin pode atualizar qualquer).
- Enviar token JWT no header `Authorization: Bearer <token>`.
- Pode incluir upload de foto no formulário.

### 5. Deletar usuário

- Método: `DELETE /api/users/:id`
- Pode deletar sua própria conta (ou admin qualquer conta).
- Requer token JWT de autenticação.

---

## Importância do JWT e do Segredo (JWT_SECRET)

O token JWT permite autenticar usuários sem a necessidade de ficar consultando o banco em todas as requisições. O segredo (`JWT_SECRET`) é uma chave secreta usada para assinar e validar esses tokens, garantindo segurança para que ninguém consiga forjar tokens e acessar recursos indevidamente.

O segredo deve ser mantido seguro no ambiente (idealmente num arquivo `.env`) e jamais exposto em código fonte público.

---

## Como rodar o projeto

1. Configure o arquivo `.env` na raiz com:

2. Instale dependências:

3. Compile o TypeScript (se usar compilação):

4. Inicie o servidor (modo dev com refresh automático recomendado):

5. Use ferramentas como Postman para testar os endpoints REST.

---

## Para Desenvolvedores Novatos

- Entender operações CRUD é fundamental para manipulação de dados.
- Aprender a usar JWT ajuda a criar APIs seguras e escaláveis.
- Entender middlewares Express (como autenticação e upload) é essencial para backend moderno.
- Trabalhar com SQLite é uma boa introdução a bancos de dados relacionais leves.

Este projeto é uma base sólida para construir aplicações web completas com autenticação e controle de acesso.


Fique à vontade para contribuir, criar issues ou solicitar novas funcionalidades!
## Expectativas
Em breve, será disponibilizada uma versão com frontend com React ou Angular. O intuito, é crescer a ferramenta, inclusive agregando ferramentas de IA, e aplicações modernas como o uso de RAGs. Será discutido o uso de tensorflow para 
os próximos passos. Principalmente, o foco principal deste sistema ainda está sendo definido, mas o esqueleto para garantir um MVP de autenticação está feito.

