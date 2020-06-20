As always start with the command, npm init -y

-   Install typescript with: npm i typescript --save-dev
-   Install nodemon with: npm i nodemon --save-dev
-   Install ts-node with: npm i ts-node --save-dev

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
"@types/node": "^14.0.13"
}
}
