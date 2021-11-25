const express = require('express');
const router = express.Router();

const colombia = require('./../resources/files/colombia');
let num = 3;
let numWork;
let works = [
    {
        num: 1,
        cargo: 'DEVELOPER',
        name: 'SAMSUNG',
        salary: '2500000',
        genAux: 'No importa',
        city: 'Bogotá, D.C.-Bogotá D.C',
        email: 'samsung@gmail.com',
        phone: '3128932732',
        comments: 'Estar en últimos semestres de ingeniería de sistemas',
        candidates: [
            {
                idPerson: '1058239333',
                names: 'Ana Maria Garzón Pasachoa',
                genAux: 'Femenino',
                city: 'Cúcuta-Norte de Santander',
                address: 'calle 28 #20-31',
                email: 'Ana@gmail.com',
                phone: '3147382839',
                professionalProfile: 'Gran trabajadora'
            },
            {
                idPerson: '9364374',
                names: 'Jimmy Alejandro Zea Gutiérrez',
                genAux: 'Masculino',
                city: 'Bucaramanga-Santander',
                address: 'Carrera 21 con Calle 12a #18-23',
                email: 'jimmy@gmail.co',
                phone: '3227784752',
                professionalProfile: 'Voy en 8 semestre de ing de sistemas'
            }

        ]
    },
    {
        num: 2,
        cargo: 'Desarrollador movil',
        name: 'GOOGLE',
        salary: '3670000',
        genAux: 'No importa',
        city: 'Boyacá, - Tunja',
        email: 'samsung@gmail.com',
        phone: '3128932732',
        comments: 'Estar en últimos semestres de ingeniería de sistemas',
        candidates: [
            {
                idPerson: '97364923',
                names: 'Edwin Duarte Adame',
                genAux: 'Masculino',
                city: 'Bucaramanga-Santander',
                address: 'Carrera 50 #04-31',
                email: 'Edwin.duarte@gmail.co',
                phone: '3928384478',
                professionalProfile: 'Gran trabajador'
            }
        ]
    },
    {
        num: 3,
        cargo: 'Gerente de ventas',
        name: 'JD',
        salary: '1500000',
        genAux: 'Femenino',
        city: 'Sogamoso-Boyacá',
        email: 'yessidduarte7@gmail.com',
        phone: '3183222222',
        comments: 'Ninguno',
        candidates: []
    }
];

router.get('/', (req, res) => {
    res.render("index", { works: works, title: "Página de Inicio" });
});

router.get('/insert', (req, res) => {
    res.render('insert', {
        title: "Agregar Trabajo",
        departments: colombia.departments,
        towns: colombia.towns
    });
});

router.post('/insert', (req, res) => {
    const { cargo, name, salary, gender, dpto, town, email, phone, comments } = req.body;
    const dptoAux = colombia.departments.find(record => record.code == dpto).name;
    const townAux = colombia.towns.find(record => record.code == town).name;
    const city = townAux.concat('-', dptoAux);
    const genAux = gender == 'F' ? "Femenino" : gender == 'M' ? "Masculino" : "No importa";
    let candidates = [];
    num++;
    let newReg = { num, cargo, name, salary, genAux, city, email, phone, comments, candidates };
    works.push(newReg);
    res.redirect('/');
});

router.get('/deleteWork/:num', (req, res) => {
    const num = req.params.num;
    works = works.filter(function (work) {
        return work.num != num;
    });
    res.redirect('/');

});



// INSERTAR PERSONA A UN TRABAJO
router.get('/insertPerson/:num', (req, res) => {
    numWork = req.params.num;
    res.render('insertPerson', {
        title: "Agregar Persona",
        departments: colombia.departments,
        towns: colombia.towns
    });
});

router.post('/insertPerson/:num', (req, res) => {
    works.forEach(function (work, index, object) {
        if (work.num == numWork) {
            const { idPerson, name, lastName, gender, dpto, town, address, email, phone, professionalProfile } = req.body;
            const dptoAux = colombia.departments.find(record => record.code == dpto).name;
            const townAux = colombia.towns.find(record => record.code == town).name;
            const names = name.concat(' ', lastName);
            const city = townAux.concat('-', dptoAux);
            const genAux = gender == 'F' ? "Femenino" : gender == 'M' ? "Masculino" : "Otro";
            let newReg = { idPerson, names, genAux, city, address, email, phone, professionalProfile };
            object[index].candidates.push(newReg);
            res.redirect('/');
        }
    });


});

router.get('/deleteCandidate/:idPerson', (req, res) => {
    const idPerson = req.params.idPerson;
    works.forEach(element => {
        element.candidates = element.candidates.filter(function (candidate) {
            return candidate.idPerson != idPerson;
        });
    });
    
    res.redirect('/candidates');

});


// CANDIDATOS
router.get('/candidates', (req, res) => {
    res.render('candidates', {
        works: works,
        title: "Total Candidatos"
    });
});

// router.post('/insert', (req, res) => {
//     const { cargo, name, salary, gender, dpto, town, email, phone, comments } = req.body;
//     const dptoAux = colombia.departments.find(record => record.code == dpto).name;
//     const townAux = colombia.towns.find(record => record.code == town).name;
//     const city = townAux.concat('-', dptoAux);
//     const genAux = gender == 'F' ? "Femenino" : gender == 'M' ? "Masculino" : "No importa";
//     let candidates = [];
//     num++;
//     let newReg = { num, cargo, name, salary, genAux, city, email, phone, comments, candidates };
//     works.push(newReg);
//     res.redirect('/');
// });



router.get('/about', (req, res) => {
    res.render('about', { title: "Sobre Nosotros" });
});

module.exports = router;
