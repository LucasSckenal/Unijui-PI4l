# Unijui-PI4l

<!-- Banner ou imagem destacada do projeto (opcional) -->

<p align="center">
  <img src="https://cdn.discordapp.com/attachments/1285007720176549969/1318392496580984883/Logo_4L.png?ex=67622831&is=6760d6b1&hm=f5121eab99d82480a76bdae3b6c6454583a3d92e60df5ee3b89cbbfd9f744d4d&" alt="Banner">
</p>

---

## 📝 Descrição do Projeto

O **Unijui-PI4l** é um dashboard interativo desenvolvido no contexto da disciplina de Projeto Integrador II, permitindo a visualização de dados analíticos em gráficos dinâmicos. O sistema suporta:

- Visualização de dados históricos de até 1 mês atrás.
- Configuração de intervalos de 1 hora até 24 horas.

O projeto utiliza:

- **Frontend**: React
- **Backend**: Nest.js
- **Banco de Dados**: PostgreSQL
- **Python**: Para sincronização automática das tabelas no banco.

---

## 🚀 Tecnologias Utilizadas

### Principais Ferramentas

- ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white&style=flat) : Criação do frontend interativo.
- ![NestJS](https://img.shields.io/badge/-Nest.js-E0234E?logo=nestjs&logoColor=white&style=flat) : Gerenciamento do backend e APIs RESTful.
- ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?logo=postgresql&logoColor=white&style=flat) : Banco de dados relacional local.
- ![Python](https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white&style=flat) : Script para sincronização de tabelas no banco de dados.

---

## 📂 Estrutura do Projeto

```plaintext
Unijui-PI4l/
├── backend/          # Código-fonte do backend
├── frontend/         # Código-fonte do frontend
├── .env.example      # Exemplo de configuração de variáveis de ambiente
├── README.md         # Documentação principal do projeto
```

---

## 🛠️ Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas antes de rodar o projeto:

- **Node.js** (versão 18 ou superior)
- **npm** (ou gerenciador de pacotes compatível)
- **PostgreSQL** (instância local ou remota configurada)

---

## 🏃‍♂️ Como Rodar o Projeto

### 1️⃣ Clonar o Repositório

```bash
# Clone o repositório
$ git clone https://github.com/LucasSckenal/Unijui-PI4l.git

# Acesse o diretório do projeto
$ cd Unijui-PI4l
```

### 2️⃣ Configurar o Ambiente

#### Backend

1. Acesse o diretório:

```bash
$ cd backend
```

2. Instale as dependências:

```bash
$ npm install
```

3. Configure o arquivo `.env` com base em `.env.example`.

4. Execute o servidor backend:

```bash
$ npm start
```

#### Frontend

1. Acesse o diretório:

```bash
$ cd frontend
```

2. Instale as dependências:

```bash
$ npm install
```

3. Execute o servidor frontend:

```bash
$ npm start
```

O frontend estará disponível em `http://localhost:5173` e o backend em `http://localhost:3000` (ou portas configuradas).

---

## ✨ Funcionalidades

1. **Dashboard Interativo**: Exibição de gráficos dinâmicos e responsivos.
2. **Histórico de Dados**: Visualização de até 1 mês de dados passados.
3. **Intervalos Personalizáveis**: Configuração de intervalos de tempo entre 1 hora e 24 horas.
4. **Sincronização de Dados**: Script em Python para manter os dados consistentes no banco de dados.

---

## 👥 Autores

O projeto foi desenvolvido por:

- **Lucas Sckenal**
  - **E-mail**: [lucaspsckenal@gmail.com](mailto:lucaspsckenal@gmail.com)
  - **LinkedIn**: [Lucas Sckenal](https://www.linkedin.com/in/lucassckenal/)
- **Lucas Hack**
  - **E-mail**: [lucas.beber@sou.unijui.edu.br](mailto:lucas.beber@sou.unijui.edu.br)
  - **LinkedIn**: [Lucas Hack](https://www.linkedin.com/in/lucas-hack-costa-beber-248672289/)
- **Luan Henrique**
  - **E-mail**: [luanvitorcd@gmail.com](mailto:luanvitorcd@gmail.com)
  - **LinkedIn**: [Luan Henrique](https://www.linkedin.com/in/luan-vitor-casali-dallabrida-20a60a342/)
- **Henrique Luan**
  - **E-mail**: [Henrique.fritz@sou.unijui.edu.br](mailto:Henrique.fritz@sou.unijui.edu.br)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga estas etapas para contribuir:

1. Faça um fork do repositório.
2. Crie uma branch para sua funcionalidade ou correção:

```bash
$ git checkout -b minha-nova-funcionalidade
```

3. Faça commit das suas alterações:

```bash
$ git commit -m "Minha nova funcionalidade"
```

4. Envie para o repositório remoto:

```bash
$ git push origin minha-nova-funcionalidade
```

5. Abra um Pull Request no repositório original.

---

## 📜 Licença

Este projeto está licenciado sob a licença **MIT**. Para mais informações, consulte o arquivo [LICENSE](LICENSE).

---

## 📬 Contato

Para dúvidas ou sugestões, entre em contato através dos e-mails ou LinkedIn listados na seção de autores.
