const express = require('express');
const chirpsStore = require('../chirpstore')
let router = express.Router();

router.get('/:id?', (req, res) => {
    let id = req.params.id;
    if(id) {
        res.json(chirpsStore.GetChirp(id));
    } else {
        res.send(chirpsStore.GetChirps());
    }
}); 

router.post('/', (req, res) => {
    chirpsStore.CreateChirp(req.body);
    console.log(req.body);
    res.status(200).json({ message: 'Chirp has been added successfully.' });
})

router.delete('/:id?', (req, res) => {
    let id = req.params.id;
    if(id) {
        chirpsStore.DeleteChirp(id);
        res.sendStatus(200);
    } else {
        res.send(chirpsStore.GetChirps());
    }
})

router.put('/:id?', (req, res) => {
    let id = req.params.id;
    if(id) {
        chirpsStore.UpdateChirp(id, req.body);
        console.log(id);
        console.log(req.body);
        res.status(200).json({ message: 'Chirp has been edited successfully.' });
    } else {
        res.status(400).json({ message: 'Chirp ID must be provided' });
    }
})

module.exports = router;