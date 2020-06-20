As always start with the command, npm init -y
Initialize typescript configuration file: npx tsc --init

-   Install typescript with: npm i typescript --save-dev
-   Install nodemon with: npm i nodemon --save-dev
-   Install ts-node with: npm i ts-node --save-dev

-   This project specifically has these packages:
-   formidable: npm i formidable

Dependencies:

{
"name": "nodejs",
"version": "1.0.0",
"description": "",
"main": "index.js",
"scripts": {
"start": "nodemon --exec ts-node src/index.ts"
},
"keywords": [],
"author": "",
"license": "ISC",
"devDependencies": {
"nodemon": "^2.0.4",
"ts-node": "^8.10.2",
"typescript": "^3.9.5"
},
"dependencies": {
"@types/formidable": "^1.0.31",
"@types/node": "^14.0.13",
"formidable": "^1.2.2"
}
}
