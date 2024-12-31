# 🚀 SailerAi

SailerAi é uma aplicação web desenvolvida para demonstrar habilidades em desenvolvimento utilizando a stack React + Tailwind + Zustand + Python.

## 🌟 Visão Geral

Este projeto é composto por um frontend construído com React e um backend desenvolvido com Python utilizando o framework FastAPI. O frontend permite que os usuários:

- 💬 Conversem entre si ou em grupo.
- 🎤 Enviem áudios durante as conversas.
- 🟢 Verifiquem o status dos usuários na conversa.

## 📂 Estrutura do Projeto

```bash
SailerAi:
└───── index.html
    ├── eslint.config.js # Configurações de lint
    ├── vite.config.ts # Configurações do Vite
    ├── postcss.config.js # Configurações do PostCSS
    ├── tsconfig.node.json # Configurações do TypeScript
    ├── tsconfig.app.json # Extensões das configurações do TypeScript
    ├── package.json # Pacotes instalados
    ├── tsconfig.json # Configurações gerais do TypeScript
    ├── README.md # Você está aqui
    ├── tailwind.config.js # Configurações do Tailwind
    └── src/
        ├── main.tsx # Ponto principal da aplicação
        ├── App.tsx # Componente principal
        ├── index.css # Folha de estilos inicial
        ├── data/ # Camada de dados da aplicação
        │   ├── services/ 
        │   │   └── api.ts # Consumo da API
        │   └── context/
        │       └── user.context.ts # Contexto do usuário
        ├── vite-env.d.ts
        └── presentation/ # Camada de apresentação da aplicação
            ├── components/ # Componentes
            │   ├── Header/
            │   │   └── index.tsx
            │   ├── UserData/
            │   │   └── index.tsx
            │   ├── Conversation/
            │   │   └── index.tsx
            │   ├── Input/
            │   │   └── index.tsx
            │   ├── UserModal/
            │   │   └── index.tsx
            │   ├── index.ts # Exportação padrão dos componentes
            │   ├── NewChat/
            │   │   └── index.tsx
            │   └── SideBar/
            │       └── index.tsx
            ├── hooks/ # Hooks customizados
            │   └── useWS.tsx
            ├── pages/ # Página encapsuladora do app
            │   └── Chat/
            │       ├── interface.ts
            │       └── index.tsx
            └── utils/ 
                └── constants.ts # Link do logotipo da empresa

```

## 🛠️ Configuração do Ambiente de Desenvolvimento

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- Node.js (versão 14 ou superior)
- npm ou yarn
- Python (versão 3.9 ou superior)

## 📥 Instalação

Clone este repositório:

```bash
git clone https://github.com/Ceagah2/SailerAi.git
```

Navegue até o diretório do projeto:

```bash
cd SailerAi
```

Instale as dependências:

Com npm:

```bash
npm install
```

Ou com yarn:

```bash
yarn install
```

## 🚀 Executando o Projeto

Inicie o servidor de desenvolvimento:

Com npm:

```bash
npm start
```

Ou com yarn:

```bash
yarn start
```

## 🌐 Acesse a aplicação

Abra o navegador e vá para [LocalHost](http://localhost:5173).

O backend da aplicação está disponível em [Railway](https://sailer-ai-server-production.up.railway.app/docs) ou no [GitHub](https://github.com/Ceagah2/sailer-ai-server).

### 🔧 Solução para CORS

Para resolver problemas de CORS (Cross-Origin Resource Sharing) e permitir a comunicação entre o frontend e o backend, foi necessário adicionar o seguinte middleware no backend:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Substitua pelo endereço do frontend em produção
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Essa configuração permite que o frontend se comunique com o backend sem bloqueios relacionados ao CORS. Certifique-se de substituir `http://localhost:5173` pelo endereço correto do frontend em produção.

## ⚙️ Backend

O backend corrigido pode ser acessado em [Railway](https://sailer-ai-server-production.up.railway.app/docs) ou pelo repositório no [GitHub](https://github.com/Ceagah2/sailer-ai-server).

## 💻 Frontend

O frontend da aplicação pode ser acessado pelo link: **[LINK_DA_VERCEL_AQUI](#)**. Certifique-se de substituir pelo link correto após o deploy.
