const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {v1} = require('uuid');

const app = express();

app.use(cors());
app.use(bodyParser.json());

let grocery = [];

app.get('/', (req, res)=>{
    return res.send(grocery);
});

app.get('/:id', (req, res)=>{
    const {id} = grocery.params
    const item = grocery.find(row => row.id === id);
    if (!item)  return res.sendStatus(404);
    return res.send(item);
});

app.post('/', (req, res)=>{
    const item = {...req.body, id: v1()};
    if (!item.name || !item.quantity || isNaN(item.quantity)) return res.sendStatus(500)
    grocery.push(item);
    return res.send(item);
    
});

app.put('/:id', (req, res)=>{
    const {id} = req.params;
    const item = req.body;

    if (!item.id || !item.name || !item.quantity || isNaN(item.quantity)) return res.sendStatus(404)
    if (!grocery.find(row => row.id === id)) return res.sendStatus(404)

    grocery = grocery.map(row=>{
        if (row.id === id)
            return {...row, ...item, id};
        else
            return row
    });

    return res.sendStatus(200);
    
});

app.delete('/:id', (req, res)=>{
    const {id} = req.params;    
    if (!grocery.find(row => row.id === id)) return res.sendStatus(404)
    grocery = [...grocery.filter(row => row.id !== id)];

    return res.sendStatus(200);
});

app.listen(5000, ()=>{
    console.log('server started')
});