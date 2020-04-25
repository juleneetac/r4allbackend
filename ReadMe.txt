Instalaremos el paquete typescript
npm install typescript -s


npm install ts-node-dev -s


Dentro de nuestro package.json añadiremos dos scripts más.

"scripts": {
    "tsc": "tsc",
    "dev": "ts-node-dev --respawn --transpileOnly ./app/app.ts",
    "prod": "tsc && node ./build/app.js"
},



Para iniciar el entorno de desarrollo:
npm run dev

si se quiere usar en produccion lo podemos ver en este enlace:
https://medium.com/@javifont/c%C3%B3mo-y-por-qu%C3%A9-deber%C3%ADas-usar-typescript-con-node-y-express-14fc9c1d82eb


A la hora de poner un estudiante en una asignatura, tengo que poner el id de la asignatura y el del estudiante. en tipo:
{
	"subject":"5e7b344db65a6a18cd375ba0",
	"student":"idestudiante"
}


Cuando lo suba a git, el node_modules lo tengo que meter en la carpeta gitignore. Pero si quiero hacer que funcione el programa lo saco