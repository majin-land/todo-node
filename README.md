# todo-node

copy `.env.sample` to `.env`
update the `PORT` to the value your local node server you prefer
if PORT is 3020, your node server will be in http://localhost:3020

install nodeJS, at least version 8
or (recommended) install using NVM https://github.com/creationix/nvm

download and install postgres

create a new database 'todo' in your postgres database
```
CREATE DATABASE todo;
```

make sure you install all packages first:
```
npm install
```

once all packages installed,
start the node server in development mode:
```
npm run dev
```
