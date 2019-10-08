# SETTING UP

In order to start developing on this app, you need to have multiple things installed on your machine.

1. Node v12.11.1
2. NPM v6.11.3
3. MongoDB v4.2.0
4. NoSQLBooster 5.2.3
5. Git Bash

After installing all of the above, open up Git Bash and change the directory to the root of this project.

In the command line, run

```bash
npm install
```

When it is finished, change directories into the client folder and also run

```bash
npm install
```

All the node modules files should be ready to go.

## MongoDB - Launching Server

In order to launch MongoDB, in the C: drive, create a folder named "data" and inside of that folder, make another folder named "db".

Head to C:/Program Files/MongoDB/bin.

Run mongod.exe. This is how the server is launched on your local machine. MongoDB uses port 27017.

## Launching the app

Head to the root directory of the project and in bash, run

```bash
npm run dev
```

This will launch the server and the client in two different ports. The client uses port 3000 and the server uses port 5000.
