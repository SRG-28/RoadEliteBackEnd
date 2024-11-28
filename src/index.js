const fs = require('fs');
const express = require('express');
const cors = require('cors'); 
const app = express();

app.use(cors()); 
app.use(express.json());
const port = process.env.PORT || 1337;

let supercars = [];
let manufacturers = [];
let designers = [];

// JSON
const saveSupercars = () => {
    let data = JSON.stringify(supercars, null, 2);
    fs.writeFileSync(__dirname + '/supercars.json', data);
};

const saveManufacturers = () => {
    let data = JSON.stringify(manufacturers, null, 2);
    fs.writeFileSync(__dirname + '/manufacturers.json', data);
};

const saveDesigners = () => {
    let data = JSON.stringify(designers, null, 2);
    fs.writeFileSync(__dirname + '/designers.json', data);
};

const loadSupercars = () => {
    fs.readFile(__dirname + '/supercars.json', 'utf8', (err, data) => {
        if (!err) {
            supercars = JSON.parse(data);
        }
    });
};

const loadManufacturers = () => {
    fs.readFile(__dirname + '/manufacturers.json', 'utf8', (err, data) => {
        if (!err) {
            manufacturers = JSON.parse(data);
        }
    });
};

const loadDesigners = () => {
    fs.readFile(__dirname + '/designers.json', 'utf8', (err, data) => {
        if (!err) {
            designers = JSON.parse(data);
        }
    });
};

loadSupercars();
loadManufacturers();
loadDesigners();

//Supercars
app.get('/supercars', (req, res) => {
    res.json(supercars);
});

app.get('/supercars/:id', (req, res) => {
    const supercarId = parseInt(req.params.id);
    const supercar = supercars.find(sc => sc.id === supercarId);
    if (!supercar) {
        return res.status(404).send('Supercar not found');
    }
    res.json(supercar);
});

app.post('/supercars', (req, res) => {
    const newSupercar = req.body;

    if (supercars.some(supercar => supercar.id === newSupercar.id)) {
        return res.status(400).json({ error: 'Supercar already exists' });
    }

    supercars.push(newSupercar);
    saveSupercars();

    res.status(201).json({ message: 'Supercar was added', supercar: newSupercar });
});

app.put('/supercars/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedSupercar = req.body;

    const index = supercars.findIndex(supercar => supercar.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Supercar not found' });
    }

    supercars[index] = updatedSupercar;
    saveSupercars();

    res.status(200).json({ message: 'Supercar was updated', supercar: updatedSupercar });
});

app.delete('/supercars/:id', (req, res) => {
    const id = parseInt(req.params.id);
    supercars = supercars.filter(supercar => supercar.id !== id);
    saveSupercars();
    res.send('Supercar was deleted');
});

//Manufacturers
app.get('/manufacturers', (req, res) => {
    res.json(manufacturers);
});

app.get('/manufacturers/:id', (req, res) => {
    const manufacturerId = parseInt(req.params.id);
    const manufacturer = manufacturers.find(m => m.id === manufacturerId);
    if (!manufacturer) {
        return res.status(404).send('Manufacturer not found');
    }
    res.json(manufacturer);
});

app.post('/manufacturers', (req, res) => {
    const newManufacturer = req.body;

    if (manufacturers.some(manufacturer => manufacturer.id === newManufacturer.id)) {
        return res.status(400).send('Manufacturer already exists');
    }
    
    manufacturers.push(newManufacturer);
    saveManufacturers();
    res.send('Manufacturer was added');
});

app.put('/manufacturers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedManufacturer = req.body;

    const index = manufacturers.findIndex(manufacturer => manufacturer.id === id);
    if (index === -1) {
        return res.status(404).send('Manufacturer not found');
    }

    manufacturers[index] = { ...manufacturers[index], ...updatedManufacturer };
    saveManufacturers();
    res.send('Manufacturer was updated');
});

app.delete('/manufacturers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    manufacturers = manufacturers.filter(manufacturer => manufacturer.id !== id);
    saveManufacturers();
    res.send('Manufacturer was deleted');
});

//Designers
app.get('/designers', (req, res) => {
    res.json(designers);
});

app.get('/designers/:id', (req, res) => {
    const designerId = parseInt(req.params.id);
    const designer = designers.find(d => d.id === designerId);
    if (!designer) {
        return res.status(404).send('Designer not found');
    }
    res.json(designer);
});

app.post('/designers', (req, res) => {
    const newDesigner = req.body;

    if (designers.some(designer => designer.id === newDesigner.id)) {
        return res.status(400).send('Designer already exists');
    }
    
    designers.push(newDesigner);
    saveDesigners();
    res.send('Designer was added');
});

app.put('/designers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedDesigner = req.body;

    const index = designers.findIndex(designer => designer.id === id);
    if (index === -1) {
        return res.status(404).send('Designer not found');
    }

    designers[index] = updatedDesigner;
    saveDesigners();
    res.send('Designer was updated');
});

app.delete('/designers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    designers = designers.filter(designer => designer.id !== id);
    saveDesigners();
    res.send('Designer was deleted');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
