# Ignite Lab 02

### Libs

- [svg2jsx](https://svg2jsx.com/)
- [graphcms](https://app.graphcms.com/)
- [vimejs](https://vimejs.com/)
- [videojs](https://videojs.com/)
- [React Router Dom](https://v5.reactrouter.com/web/guides/quick-start)
- [React Hook Form](https://react-hook-form.com/)
- [classnames](https://github.com/JedWatson/classnames)

### Tema tailwind

- ```ts
    colors: {
      green: {
        300: '#00B37E',
        500: '#00875F',
        700: '#015F43',
      },
      blue: {
        500: '#81D8F7',
      },
      orange: {
        500: '#FBA94C',
      },
      red: {
        500: '#F75A68',
      },
      gray: {
        100: '#E1E1E6',
        200: '#C4C4CC',
        300: '#8D8D99',
        500: '#323238',
        600: '#29292E',
        700: '#121214',
        900: '#09090A'
      }
    },
  ```

### Create project

- [projeto figma](https://evento.rocketseat.com.br/ignite-lab/episodios/react/aula-1/edicao/1)

- yarn create vite

### tailwindcss

- yarn add tailwindcss postcss autoprefixer -D
- yarn tailwindcss init -p
- update file `tailwind.config.js`

  ```ts
  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: ['./src/**/*.tsx'],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  ```

- create file `src/styles/global.css`
  ```ts
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

### Extensões

- Name: GraphQL
  Id: mquandalle.graphql
  Description: Syntax highlighting for GraphQL queries and schemas
  Version: 0.1.2
  Publisher: Maxime Quandalle
  VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=mquandalle.graphql

- Name: Tailwind CSS IntelliSense
  Id: bradlc.vscode-tailwindcss
  Description: Intelligent Tailwind CSS tooling for VS Code
  Version: 0.8.6
  Publisher: Tailwind Labs
  VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss

- Name: PostCSS Language Support
  Id: csstools.postcss
  Description: Syntax highlighting for modern and experimental CSS in VSCode
  Version: 1.0.9
  Publisher: csstools
  VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=csstools.postcss

### CMS - Content Manager System

- Headless CMS | GraphCMS
  - [Graphcms](https://app.graphcms.com/)
  - [Clone Project](https://rseat.in/lab-graphcms)

### Configurando React with Graphcms

-

- yarn add @apollo/client graphql
- instanciando o apollo `src/lib/apollo.ts`
- Abra o link e copie Content API e configure a uri conforme abaixo

  ```ts
  import { ApolloClient, InMemoryCache } from '@apollo/client';

  export const client = new ApolloClient({
    uri: 'https://api-sa-east-1.graphcms.com/v2/cl4tz4s3k0ffi01uk4mxwbdrg/master',
    cache: new InMemoryCache(),
  });
  ```

- Abra o arquivo `src/main.tsx` e configure conforme abaixo

  ```ts
  import { ApolloProvider } from '@apollo/client';
  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import { App } from './App';
  import { client } from './lib/apollo';

  import './styles/global.css';

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  );
  ```

- Para testar a usabilidade abra o arquivo `src/App.tsx` e configure conforme abaixo

  ```ts
  import { gql, useQuery } from '@apollo/client';
  import { useEffect } from 'react';

  const GET_LESSONS_QUERY = gql`
    query {
      lessons {
        id
        slug
        title
        teacher {
          name
        }
      }
    }
  `;

  interface Lesson {
    id: string;
    title: string;
  }

  export function App() {
    const { data } = useQuery<{ lessons: Lesson[] }>(GET_LESSONS_QUERY);

    return (
      <>
        <h1 className="text-5xl font-bold text-violet-500">Lessons</h1>
        <ul>
          {data?.lessons.map((lesson) => (
            <li key={lesson.id}>{lesson.title}</li>
          ))}
        </ul>
      </>
    );
  }
  ```

- Install dependencies

yarn add @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo -D
