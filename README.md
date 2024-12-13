
# Cliente React para Gerenciamento de Itens

Este projeto é um cliente React que consome a API de gerenciamento de itens. Ele permite que os usuários façam login, se registrem, gerenciem itens (criar, editar, excluir) e façam logout.

## Funcionalidades

- Autenticação de usuários com persistência de token.
- CRUD de itens pertencentes ao usuário autenticado.
- Rotas protegidas e navegação dinâmica com React Router.

## Tecnologias Utilizadas

- **React**
- **React Router**
- **Context API** para autenticação
- **CSS modular** para estilização

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/Desenvolvimento-WEB-I-2024-2-Ensi-Medio/react-gerenciamento-itens.git
   ```
2. Acesse o diretório do projeto:
   ```bash
   cd react-gerenciamento-itens
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Configure a URL da API no arquivo `src/services/api.js`:
   ```javascript
   const API_URL = 'http://localhost:3000'; // URL da API
   ```
5. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```

## Estrutura do Projeto

```
/src
  /components
    Home.js       # Tela principal para gerenciamento de itens
    Login.js      # Tela de login
    Register.js   # Tela de registro de usuários
  /context
    AuthContext.js # Contexto para autenticação do usuário
  /services
    api.js        # Funções para consumir a API
  /themes
    App.css       # Estilo principal
    AuthForm.css  # Estilo para formulários de login e registro
    Home.css      # Estilo para a tela principal
  App.js          # Configuração de rotas
  index.js        # Entrada do aplicativo
```

## Como Usar

1. **Registro de Usuário**:
   - Acesse `/register` para criar uma nova conta.
2. **Login**:
   - Faça login em `/login` com as credenciais cadastradas.
3. **Gerenciamento de Itens**:
   - Após o login, gerencie itens na página principal:
     - Adicione novos itens.
     - Edite itens existentes.
     - Exclua itens que não sejam mais necessários.

## Rotas Principais

- `/login` - Página de login.
- `/register` - Página de cadastro de usuários.
- `/` - Página principal (após autenticação).

## Como Contribuir

1. Faça um fork do projeto.
2. Crie um branch para sua feature:
   ```bash
   git checkout -b feature/nova-feature
   ```
3. Commit suas mudanças:
   ```bash
   git commit -m "Descrição clara da feature"
   ```
4. Envie para o seu fork:
   ```bash
   git push origin feature/nova-feature
   ```
5. Abra um Pull Request.

---

**Desenvolvido por [Prof. Karan Luciano](https://github.com/Prof-Karan-Luciano).**
