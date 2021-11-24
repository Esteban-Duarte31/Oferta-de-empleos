const express= require('express');
const router = express.Router();

const colombia = require('./../resources/files/colombia');

let students = []

router.get('/',(req,res)=>{
    res.render("index",{students:students,title:"Página de Inicio"});
});

router.get('/insert',(req, res)=>{
    res.render('insert',{title:"Agregar Trabajo",
        departments:colombia.departments,
        towns:colombia.towns});
});

router.post('/insert',(req,res)=>{
    const{cargo, name, salary, gender, dpto, town, email, phone, comments } = req.body;
    const dptoAux = colombia.departments.find( record => record.code == dpto ).name;
    const townAux = colombia.towns.find( record => record.code == town ).name;
    const city = townAux.concat( '-', dptoAux );
    const genAux = gender == 'F' ? "Femenino" : gender == 'M' ? "Masculino": "No importa";
    let candidates=[];
    let newReg = {cargo, name, salary, genAux, city, email, phone, comments, candidates };
    students.push(newReg);
    res.redirect('/');
});


// INSERTAR PERSONA A UN TRABAJO
router.get('/insertPerson',(req, res)=>{
    res.render('insertPerson',{title:"Agregar Persona",
        departments:colombia.departments,
        towns:colombia.towns});
});

router.post('/insertPerson',(req,res)=>{
    const{idPerson, name, lastName, gender, dpto, town, address, email, phone, professionalProfile } = req.body;
    const dptoAux = colombia.departments.find( record => record.code == dpto ).name;
    const townAux = colombia.towns.find( record => record.code == town ).name;
    const names = name.concat(' ', lastName);
    const city = townAux.concat( '-', dptoAux );
    const genAux = gender == 'F' ? "Femenino" : gender == 'M' ? "Masculino": "Otro";
    let newReg = {idPerson, names, genAux, city, address, email, phone, professionalProfile  };
    students.push(newReg);
    res.redirect('/');
});

router.get('/about',(req,res)=>{
   res.render('about',{title:"Sobre Nosotros"});
});

module.exports = router;
