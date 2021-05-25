# 9-20210412-pokemonapp-nextjs-ssg
### Table of Contents
- [9-20210412-pokemonapp-nextjs-ssg](#9-20210412-pokemonapp-nextjs-ssg)
    + [Table of Contents](#table-of-contents)
- [17 - 8:47 Introduction To React #17 | Static Site Generation (SSG)](#17---8-47-introduction-to-react--17---static-site-generation--ssg-)
  * [17.1 Project Setup](#171-project-setup)
  * [17.2 Moving pokemon.json from public/ to src/](#172-moving-pokemonjson-from-public--to-src-)
  * [17.3 Build and Export](#173-build-and-export)
  * [17.4 Putting this on Github](#174-putting-this-on-github)
    + [17.4.1 Create a new github repo](#1741-create-a-new-github-repo)
    + [17.4.2 Create next.config.js](#1742-create-nextconfigjs)
    + [17.4.3 remove /out/ from gitignore](#1743-remove--out--from-gitignore)
    + [17.4.4 add deploy script to package.json](#1744-add-deploy-script-to-packagejson)
    + [17.4.5 push changes to github](#1745-push-changes-to-github)
    + [17.4.6 Deploy to GH Pages](#1746-deploy-to-gh-pages)
  * [Getting Started](#getting-started)
  * [Learn More](#learn-more)
  * [Deploy on Vercel](#deploy-on-vercel)
---

# 17 - 8:47 Introduction To React #17 | Static Site Generation (SSG)
> Description: We statically generate the Pokemon detail page using NextJS' Static Site Generation (SSG) functionality.

## 17.1 Project Setup

just make a copy of the ssr version and rename it accordingly with -ssg. then edit accordingly such as package.json and README nyehehe

## 17.2 Moving pokemon.json from public/ to src/

this is because ssg happens at build time. 

now we then change the route of pokemon.json to normal direct pathing not link.

[Basic Features: Data Fetching | Next.js](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation)

as seen instead of just one function getServerSideProps() from ssr, we have two: getStaticPaths() and getStaticProps()

pages/pokemon/[id].js

```jsx
import { useRouter } from "next/router";
import { observer } from "mobx-react";
import {
  CssBaseline,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import styled from "@emotion/styled";

import store from "../../src/store";

const PageContainer = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1em;
`;
const TypeHeader = styled.span`
  font-weight: bold;
`;

export async function getStaticPaths() {
  const pokemons = require('../../src/pokemon.json')
  return {
    paths: pokemons.map((pokemon) => ({
      params: {
        id: pokemon.id.toString()
      }
    })),
    fallback: false
  };
}

export async function getStaticProps(context) {
  const pokemons = require('../../src/pokemon.json')
  const pokemon = pokemons.find((p) => p.id === parseInt(context.params.id));
  return {
    props: {
      pokemon
    },
  }
}

export default ({ pokemon }) => {
  const router = useRouter();

  return (
    <PageContainer>
      <CssBaseline />

      <div>
        {pokemon && (
          <>
            <h1>{pokemon.name.english}</h1>
            <p>
              <TypeHeader>Type:</TypeHeader> {" " + pokemon.type.join(", ")}
            </p>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Attribute</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(pokemon.base).map((key) => (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{pokemon.base[key]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </div>
    </PageContainer>
  );
};
```

then at pages/index.js

```jsx
// START: IMPORTS
import styled from "@emotion/styled";
import { CssBaseline } from "@material-ui/core";

import { observer } from 'mobx-react'
import store from '../src/store'

import PokemonInfo from "../components/PokemonInfo";
import PokemonFilter from "../components/PokemonFilter";
import PokemonTable from "../components/PokemonTable";
// END: IMPORTS

// START: STYLED COMPONENTS
const Title = styled.h1`
  text-align: center;
`;
const PageContainer = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1em;
`;
const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  grid-column-gap: 1rem;
`;
// END: STYLED COMPONENTS

// START: COMPONENT ---
const Home = () => {
  // Start: Templates
  if (!store.pokemons) {
    return <div>Loading data</div>;
  }
  return (
    <PageContainer>
      <CssBaseline />
      <Title>Pokemon Search</Title>
      <TwoColumnLayout>
        <div>
          <PokemonFilter />
          <PokemonTable />
        </div>
        <PokemonInfo />
      </TwoColumnLayout>
    </PageContainer>
  );
  // End: Templates
}
// END: COMPONENT ---

export default observer(Home);
```

and store.js @states

```jsx
pokemons = require('./pokemon.json')
```

## 17.3 Build and Export

package.json @scripts

```json
"export": "next export"
```

Terminal

```bash
yarn build
yarn export
cd out
PORT=3000 npx serve
```

then check [http://localhost:3000](http://localhost:3000/)

(dont forget to close first the dev server)

you can check at your browser dev tools at lighthouse for the performance

## 17.4 Putting this on Github

Example on Vercel next.js examples Github

[vercel/next.js](https://github.com/vercel/next.js/tree/canary/examples/gh-pages)

### 17.4.1 Create a new github repo

### 17.4.2 Create next.config.js

```bash
const debug = process.env.NODE_ENV !== 'production'

module.exports = {
  basePath: !debug ? '/<name-of-the-app>' : '',
  assetPrefix: !debug ? '/<name-of-the-app>/' : '',
}
```

### 17.4.3 remove /out/ from gitignore

### 17.4.4 add deploy script to package.json

 

```bash
"deploy": "rm -rf node_modules/.cache && next build && next export && touch out/.nojekyll && git add out/ && git commit -m \"Deploy Next.js to gh-pages\" && git subtree push --prefix out origin gh-pages"
```

### 17.4.5 push changes to github

```bash
git add, git commit 
git remote
git push
```

### 17.4.6 Deploy to GH Pages

```bash
yarn deploy
```

then go to settings of github repo

---
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
