# Pokédex

Uma Pokédex interativa desenvolvida com Next.js, Tailwind CSS e TypeScript, consumindo dados da PokéAPI.

A aplicação permite explorar informações detalhadas sobre os Pokémon, incluindo tipos, habilidades, estatísticas, fraquezas, evoluções, espécie e descrição da Pokédex.

🔗 Demo: [Acessar aplicação online](https://pokedex-gamma-ten-40.vercel.app/)

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Instalação](#instalação)
- [Deploy](#deploy)

## Sobre o Projeto

Este projeto foi desenvolvido com o objetivo de praticar:

Consumo de APIs REST
Gerenciamento de estado com Context API
Criação de hooks customizados
Paginação client-side
Organização de código em services
Tratamento de erros
Otimização com useCallback e useMemo
Interface responsiva com Tailwind CSS

A aplicação consome a PokéAPI para exibir informações completas sobre cada Pokémon.

## Funcionalidades

- 🔍 Busca de Pokémon por nome
- 🏷️ Filtro por tipo
- 📄 Paginação de cards
- 📊 Exibição de estatísticas base
- ⚔️ Exibição de fraquezas
- 🔄 Cadeia evolutiva com imagens
- 📘 Espécie e descrição da Pokédex
- 🎯 Seleção de Pokémon para exibir detalhes no sidebar
- 📱 Layout responsivo

## Tecnologias Utilizadas
<img align="center" src="https://skillicons.dev/icons?i=nextjs,tailwind,typescript" alt="icons"/>

## Arquitetura do Projeto
```
src/
├── app/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── services/
│   ├── constants/
│   └── page.tsx
```

### Organização
- components/ → Componentes reutilizáveis
- context/ → Context API global
- hooks/ → Hooks customizados
- services/ → Integração com API
- constants/ → Constantes da aplicação

## Instalação

1. Clone o repositório:
   ```terminal
   git clone https://github.com/Kevenshtk/Pokedex.git

2. Navegue até o diretório do projeto:
   ```terminal
   cd Pokedex

3. Instale as dependências:
   ```terminal
   npm install

4. Execute o projeto:
   ```terminal
   npm run dev

5. Acesse a aplicação:
   ```
   http://localhost:3000


## Deploy

🔗 [Acessar aplicação online](https://pokedex-gamma-ten-40.vercel.app/)