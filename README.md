# Pokédex

Uma aplicação web desenvolvida com Next.js, TypeScript e Tailwind CSS que consome dados da PokéAPI para oferecer uma experiência completa de exploração do universo Pokémon.

A aplicação permite pesquisar Pokémon, navegar entre páginas de resultados e visualizar informações detalhadas, como tipos, habilidades, estatísticas base, fraquezas, evoluções, espécie e descrição oficial da Pokédex, por meio de uma interface responsiva e otimizada.

🔗 [Acessar aplicação](https://pokedex-gamma-ten-40.vercel.app/)

## 🎯 Objetivos do projeto

Este projeto foi desenvolvido para consolidar conhecimentos em desenvolvimento Front-end com Next.js por meio da construção de uma aplicação que consome dados da PokéAPI, simulando um cenário real de integração com APIs externas, gerenciamento de estado e organização de aplicações escaláveis.

Durante o desenvolvimento, foram praticados conceitos como:

- Consumo de APIs REST
- Organização da aplicação em camadas (services e hooks)
- Gerenciamento de estado global com Context API
- Criação de hooks customizados
- Paginação client-side
- Tratamento de estados de carregamento e erros
- Otimização de renderizações com useCallback e useMemo
- Desenvolvimento de interfaces responsivas utilizando Tailwind CSS
- Componentização e reutilização de componentes
- Tipagem estática com TypeScript


## 📑 Índice

- [Demonstração](#-demonstração)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#%EF%B8%8F-tecnologias)
- [Desafios encontrados](#-desafios-encontrados)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Instalação](#-instalação)


## 📷 Demonstração

### Home
 ![tela home](https://kevenshtk.github.io/Projetos/img/telaPokedex.png)

## ✨ Funcionalidades

- 🔍 Busca de Pokémon por nome
- 🏷️ Filtro por tipo
- 📄 Paginação de cards
- 📊 Exibição de estatísticas base
- ⚔️ Exibição de fraquezas
- 🔄 Cadeia evolutiva com imagens
- 📘 Espécie e descrição da Pokédex
- 🎯 Seleção de Pokémon para exibir detalhes no sidebar
- 📱 Layout responsivo

## 🛠️ Tecnologias

<img align="center" src="https://skillicons.dev/icons?i=nextjs,typescript,tailwind" alt="tecnologias usadas no projeto"/>

## 🚧 Desafios encontrados

Um dos principais desafios deste projeto foi identificar e corrigir um problema de performance que surgiu após uma alteração no layout da aplicação.

Durante a investigação, foi observado que funções responsáveis pelo consumo da PokéAPI eram recriadas a cada renderização do React, ocasionando novas requisições de forma contínua. Esse comportamento resultava em milhares de chamadas desnecessárias à API, alto consumo de CPU e memória, além de impedir a execução de ferramentas de análise de desempenho.

Após analisar o comportamento da aplicação utilizando o DevTools do navegador, a causa foi corrigida com a memoização dessas funções por meio do useCallback, eliminando os refetches desnecessários e restaurando a estabilidade da aplicação.

Além de resolver o problema, essa experiência reforçou a importância de investigar métricas reais de desempenho antes de aplicar otimizações.

## 📁 Estrutura do projeto
```
app/
├── components/   → Componentes reutilizáveis.
├── context/      → Gerenciamento de estado global.
├── hooks/        → Hooks customizados.
├── services/     → Integração com API.
└── types/        → Tipos e interfaces TypeScript.
```

### 🏛️ Arquitetura

O projeto foi organizado seguindo uma estrutura baseada em responsabilidades, separando componentes de interface, lógica de negócio, gerenciamento de estado e comunicação com a API.

Essa organização facilita a manutenção, reutilização de código e escalabilidade da aplicação.


## 🚀 Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/Kevenshtk/Pokedex.git
   ```
2. Navegue até o diretório do projeto:

   ```bash
   cd Pokedex
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Execute o projeto:

   ```bash
   npm run dev
   ```

5. Acesse a aplicação:

   ```bash
   http://localhost:3000
   ```
