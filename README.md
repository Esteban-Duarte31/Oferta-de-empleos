# Oferta-de-empleos
Oferta de empleos con EJS
# Embedded Java Script - EJS

Proyecto de Ejemplo para uso de NodeJS con Express y EJS como motor de vistas

## Estructura de la carpeta del proyecto

```bash
├── README.md
├── index.js
├── package.json
└── routes/
| 	├── index.js
└── views/
|    ├── index.ejs
|    ├── insert.ejs
# Embedded Java Script - EJS

Proyecto de Ejemplo para uso de NodeJS con Express y EJS como motor de vistas

## Estructura de la carpeta del proyecto

```bash
├── README.md
├── index.js
├── package.json
└── routes/
| 	├── index.js
└── views/
|    ├── index.ejs
|    ├── insert.ejs
|    ├── about.ejs
|    ├── candidates.ejs
|    ├── addPerson.ejs
|    └── templates/
|    		├── header.ejs
|    		├── navbar.ejs
|    		└── footer.ejs
└── resources/
    └── files/
|    	└── colombia.js
└── public/
    └── js/
    	└── scripts.js

```
### Descripción de Carpetas
- `routes` Contiene el archivo `index.js` que establece el enrutamiento de la aplicación
- `views` Contiene las vistas de la aplicación. Se usa el motor de plantillas EJS  
- `templates` se encuentran las plantillas que se importarán en las diferentes parte de cada página o documento HTML para no repetir código
- `resources` Recursos, en el archivo `colombia.js` se encuentran arreglos de Javascript con la información de los departamentos y municipios. Se exportan como un módulo para ser usados en otros archivos
- `public` contiene los archivos estáticos que se usan en la aplicación

## Instalación y Configuración

```bash
mkdir ejs
cd ejs
touch index.js
mkdir routes
mkdir views
npm init
npm install express --save
npm install ejs --save
npm install body-parser --save
npm install nodemon --save-dev
```

##Iiciar proyecto
```bash
npm un watch
```

### Archivo index.js

El Archivo `index.js` es donde se configura la aplicación, tiene el siguiente contenido:

```javascript
'use strict';

//import modules
const express = require('express');
const path = require('path');
const routeIndex = require('./routes/index');

//Initializations
const app = express();

app.use(express.static(path.join(__dirname,'public')));

//Settings
app.set('port',process.env.PORT || 3000 );
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routes
app.use('/',routeIndex);

//start server
app.listen(app.get('port'),()=>{
    console.log(`Server Listen to port ${app.get('port')}`);
});
```
### Archivo routes/index.js

Es el archivo en donde se configuran las rutas, tiene el siguiente conrtenido

```javascript
const express= require('express');
const router = express.Router();

const colombia = require('./../resources/files/colombia');

let students = []

router.get('/',(req,res)=>{
    res.render("index",{students:students,title:"Página de Inicio"});
});

router.get('/insert',(req, res)=>{
    res.render('insert',{title:"Insertar Estudiante",
        departments:colombia.departments,
        towns:colombia.towns});
});

router.post('/insert',(req,res)=>{
    const{code, name, lastName, gender, dpto, town, email, phone } = req.body;
    const dptoAux = colombia.departments.find( record => record.code == dpto ).name;
    const townAux = colombia.towns.find( record => record.code == town ).name;
    const city = townAux.concat( '-', dptoAux );
    const genAux = gender == 'F' ? "Femenino" : "Masculino";
    let newReg = {code, lastName, name, genAux, city, email, phone  };
    students.push(newReg);
    res.redirect('/');
});

router.get('/about',(req,res)=>{
    res.render('about',{title:"Sobre Nosotros"});
});

module.exports = router;
```
> Se define un arreglo de trabajos que se comparte entre los archivos o vistas de la aplicación, para gestionar sus datos.

### Rutas

- `/`. Renderiza el archivo `index.ejs`, envía el título de la página y el arreglo de estudiantes para desplegar su contenido en una tabla
- `/insert`. Ruta de tipo `GET`, visualiza el formulario  para capturas los datos del trabajoás envía los módulos requeridos de departamentos y municipios para usarlos en SELECTS dependientes
- `/insert`. Ruta de tipo `POST`, recibe los datos del formulario, a partir de los códigos de departamento y municipio, obtiene la descripción correspondiente de los arreglos, crea un nuevo objeto work o almacena en el arreglo, redirecciona a la raíz del sitio
- `/about`. Ruta para visualizar información de la App

|    └── templates/
|    		├── header.ejs
|    		├── navbar.ejs
|    		└── footer.ejs
└── resources/
    └── files/
|    	└── colombia.js
└── public/
    └── js/
    	└── scripts.js

```
### Descripción de Carpetas
- `routes` Contiene el archivo `index.js` que establece el enrutamiento de la aplicación
- `views` Contiene las vistas de la aplicación. Se usa el motor de plantillas EJS  
- `templates` se encuentran las plantillas que se importarán en las diferentes parte de cada página o documento HTML para no repetir código
- `resources` Recursos, en el archivo `colombia.js` se encuentran arreglos de Javascript con la información de los departamentos y municipios. Se exportan como un módulo para ser usados en otros archivos
- `public` contiene los archivos estáticos que se usan en la aplicación

## Instalación y Configuración

```bash
mkdir ejs
cd ejs
touch index.js
mkdir routes
mkdir views
npm init
npm install express --save
npm install ejs --save
npm install body-parser --save
npm install nodemon --save-dev
```

### Archivo index.js

El Archivo `index.js` es donde se configura la aplicación, tiene el siguiente contenido:

```javascript
'use strict';

//import modules
const express = require('express');
const path = require('path');
const routeIndex = require('./routes/index');

//Initializations
const app = express();

app.use(express.static(path.join(__dirname,'public')));

//Settings
app.set('port',process.env.PORT || 3000 );
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routes
app.use('/',routeIndex);

//start server
app.listen(app.get('port'),()=>{
    console.log(`Server Listen to port ${app.get('port')}`);
});
```
### Archivo routes/index.js

Es el archivo en donde se configuran las rutas, tiene el siguiente conrtenido

```javascript
const express= require('express');
const router = express.Router();

const colombia = require('./../resources/files/colombia');

let students = []

router.get('/',(req,res)=>{
    res.render("index",{students:students,title:"Página de Inicio"});
});

router.get('/insert',(req, res)=>{
    res.render('insert',{title:"Insertar Estudiante",
        departments:colombia.departments,
        towns:colombia.towns});
});

router.post('/insert',(req,res)=>{
    const{code, name, lastName, gender, dpto, town, email, phone } = req.body;
    const dptoAux = colombia.departments.find( record => record.code == dpto ).name;
    const townAux = colombia.towns.find( record => record.code == town ).name;
    const city = townAux.concat( '-', dptoAux );
    const genAux = gender == 'F' ? "Femenino" : "Masculino";
    let newReg = {code, lastName, name, genAux, city, email, phone  };
    students.push(newReg);
    res.redirect('/');
});

router.get('/about',(req,res)=>{
    res.render('about',{title:"Sobre Nosotros"});
});

module.exports = router;
```
> Se define un arreglo de estudiantes que comparte entre los archivos o vistas de la aplicación, para gestionar sus datos.

### Rutas

- `/`. Renderiza el archivo `index.ejs`, envía el título de la página y el arreglo de estudiantes para desplegar su contenido en una tabla
- `/insert`. Ruta de tipo `GET`, visualiza el formulario  para capturas los datos del estudiante. Además envía los módulos requeridos de departamentos y municipios para usarlos en SELECTS dependientes
- `/insert`. Ruta de tipo `POST`, recibe los datos del formulario, a partir de los códigos de departamento y municipio, obtiene la descripción correspondiente de los arreglos, crea un nuevo objeto estudiante y lo almacena en el arreglo, redirecciona a la rzíz del sitio
- `/about`. Ruta para visualizar información de la App
