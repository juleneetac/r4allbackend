# Rackets4All (r4all)  

## Proyecto del Grupo2 de EA (EETAC-UPC). Backend de la aplicación.  
Aplicación de Partidos, Torneos y otros eventos relacionados con el Tenis.  
Podrás encontrar eventos y personas cerca de tu ubicación o según tus preferencias, chatear y quedar con ellos para participar   
en partidos amistosos o torneos organizados por clubs y otros organizadores. 

**Las imágenes contenidas en el directorio `/uploads` son para uso exclusivamente educativo**

## INSTRUCCIONES
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


## PASOS A SEGUIR DESDE 0
npm init --> desde el cmd
aqui le pondre el nombre que quiero y el resto por defecto

crear un archivo indez.js que contendra las coas para la conexión con mongoodb

en mongo tendre que ir a:
 Equipo --> disco local --> creo una carpeta llamada "data" y dentro de esta una llamada "db".
Para usar mongo y crear bases de datos:
Equipo --> disco local --> Archivos de programas --> MongoDB --> hasta llegar a bin --> abrir "mongod" y "mongo"

para crear un base de datos hago
use nombre_que_quiero

aqui explican como crear bien las colecciones
https://www.idqweb.com/mongodb-comandos-basicos/

el save sirve para cambiar con un id o actualizar y si no hay id te lo crea. tiene el insert y el update juntos. el insert es solo para insertar

db.subjects.save({name:"IOT",students:[ObjectId("5e7206f3ffbedba70cb5f153")]})

db.usuarios.save({username:"Juan",password:"123",edad:"32", sexo:"m", ubicacion: "Barcelona"})

busca el nombre de los estudiantes de la asignatura de telematica
db.Students.find({studies:"Telematica"}, {name:1}).pretty()
db.Students.find({studies:"Sistemas"}, {name:1}).pretty()
db.Students.find({studies:"Aeros"}, {name:1}).pretty()
db.Subjects.find().pretty()
