# Seleciona Filial Gestão Logística

## Descrição  

Aplicação desktop auxiliar desenvolvida em Electron para facilitar a alteração do arquivo XML de configuração do sistema Gestão Logística (Linx Itec).
A aplicação permite selecionar uma filial a partir de dados consultados em um banco de dados externo e aplicar automaticamente essas informações no arquivo de configuração do sistema, eliminando a necessidade de edição manual.

## Próposito  

O propósito desta aplicação é automatizar e padronizar o processo de troca de filial no sistema Gestão Logística, reduzindo erros humanos, retrabalho e tempo gasto em configurações manuais de arquivos XML.

## Objetivo  

- Permitir que o usuário selecione uma filial de forma simples e segura

- Atualizar automaticamente as tags específicas do arquivo XML de configuração

- Garantir que o sistema Gestão Logística seja iniciado já com a filial correta configurada

- Oferecer uma interface simples, rápida e de fácil uso

## Público alvo 

- Usuários operacionais do sistema Gestão Logística

- Analistas de suporte e TI

- Equipes administrativas que utilizam múltiplas filiais no mesmo ambiente


## Requisitos Funcionais 

- Exibir uma tela desktop com formulário de seleção de filial

- Carregar dinamicamente as opções de filial a partir de um banco de dados SQL Server

- Permitir selecionar uma filial e confirmar a ação

- Editar automaticamente as seguintes tags do arquivo XML:
```bash
<cdFilial>
<cnpj>
<rzFilial>
```
- Salvar o arquivo XML após a edição

- Executar automaticamente o sistema Gestão Logística após a alteração

- Exibir mensagens de erro amigáveis em caso de falha (ex: erro de conexão com banco)

## Requisitos Não Funcionais

- Aplicação desktop multiplataforma (foco em Windows)

- Interface simples e objetiva

- Execução rápida e com baixo consumo de recursos

- Não exigir conhecimento técnico do usuário final

- Tratamento de erros de forma clara e controlada

- Não depender de caminhos fixos de instalação do Java

## Tecnologias Utilizadas

- Electron – Aplicação desktop

- Node.js – Backend da aplicação

- Electron IPC – Comunicação entre Renderer e Main

- JavaScript (ES6+) – Lógica da aplicação

- MSSQL – Conexão com banco de dados SQL Server externo

- xml2js – Leitura e edição do arquivo XML

- dotenv – Gerenciamento de variáveis de ambiente

- Electron Forge – Build e empacotamento da aplicação

- NSIS (maker-nsis) – Geração do instalador para Windows

## 📂 Estrutura do Projeto

```bash
📁 seleciona-filial-gestao-logistica
├──  📁 assets
│       ├── icon.ico            # Ícone da aplicação
│       └── icon.png  
|
├── 📁 src
│   ├── 📁 services
│   │   ├── db.service.js       # Conexão com o banco de dados
│   │   ├── xml.service.js      # Leitura e edição do XML
│   │   ├── java.service.js     # Detecção dinâmica do Java
│   │   └── shortcut.service.js # Execução do sistema Gestão Logística
|   │
│   └── 📁 renderer
│       ├── index.html          # Interface da aplicação
│       ├── renderer.js         # Lógica do frontend
│       └── style.css           # Arquivo de estilos css             
│
├── 📄 forge.config.js          # Configuração do Electron Forge
├── 📄 main.js                  # Processo principal do Electron
├── 📄 preload.js               # Exposição segura do IPC
├── 📄 .env.example             # Variáveis de ambiente necessárias (renomear para .env)
├── 📄 package.json
└── 📄 README.md
```

### 📦 Como Executar o Projeto

#### Pré-requisitos

- Node.js instalado

- Java Runtime Environment (Java 8 ou compatível) instalado

- Acesso ao banco de dados SQL Server configurado

#### Passos para execução em desenvolvimento

- Clone o repositório:
  ```bash
  git clone <url-do-repositorio>
  ```

- Acesse a pasta do projeto:
  ```bash
  cd seleciona-filial-gestao-logistica
  ```

- Instale as dependências:
  ```bash
  npm install
  ```

- Configure o arquivo .env com as variáveis necessárias (ex: conexão com o banco)

- Execute a aplicação:
  ```bash
  npm start
  ```

#### Gerar instalador para Windows
  ```bash
  npm run make
  ```

### 📖 Uso

1. Execute o instalador gerado
2. Selecione a filial no formulário
3. Clique no botão de salvar

## Principais aprendizados

- Construção de janelas desktop com Electron
- Uso do IPC (Inter-Process Communication) para lidar com comunicação frontend ~ backend
- Geração de instaladores para Windows com NSIS


Por Otávio Cardoso
 