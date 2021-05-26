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
    res.sendStatus(200);
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
        res.sendStatus(200);
    } else {
        res.send(chirpsStore.GetChirps());
    }
})

module.exports = router;