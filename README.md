# CryptoPepe Reborn Client

This repo was forked from CryptoPepes/pepe-client.

(See Trello & Telegram for dev status)

This is the client-side code; a React-Babel6-Webpack powered codebase, outputting HTML/JS/CSS.

## Get started

1. Create a node 10 environment  
Only required on the first run  
Node environment manager installation instructions are available at https://pypi.org/project/nodeenv/
```lang:bash
nodeenv --node=10.23.0 --prebuilt env-10.23.0
```

2. Activate the environment
```lang:bash
. env-10.23.0/bin/activate
```

3. Download a ton of deps (React/Webpack/Babel6/more)  
A lot of warnings will be shown - this is normal
```lang:bash
npm install
```

4. Some of the node packages are broken and need manual repair
```lang:bash
cp node_modules_fixes/stream-browserify_index.js node_modules/stream-browserify/index.js
cp node_modules_fixes/web3-providers-ws.js node_modules/web3-providers-ws/src/index.js
```

## Development

1. Run `npm run start:dev`, this starts a watcher and compiles automatically.
2. Open browser, `localhost:8080`
3. There is a known bug with hot reload not properly reloading css. If you suspect something isn't right, refresh the page

## Deployment

1. Build a production version
```lang:bash
npm run build:prod
```

2. Verify it works locally
```lang:bash
serve dist-prod
```

3. The build files are located in `dist-prod`. Serve these according to your production environment.

## Structure

`src` is were code is written; React components (`src/js/components`) (container/presentationals).

`dist-*` is were webpack outputs its build, `dist-prod/build` for production. `dist-dev/build` for development.

`package.json` is were dependencies are added, PLEASE DO NOT BLOAT IT,
 picking dependencies should be done carefully; ask the others on Telegram.

`webpack.development.config.js` is the dev build config, this does rarely change, but can affect a lot.
 Again, discuss before changing. Dev config provides source-maps etc.

`webpack.production.config.js` is the prod build config, this does rarely change, but can affect a lot.
 Again, discuss before changing. Production config optimizes things.

`contracts` is data used by the `src/api/infra.js` file, which loads the web3 bindings.
Generate abi files with: `solc --abi -o contracts/abi my/path/to/contract.sol`.
