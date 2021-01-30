const express = require('express');
const router = express.Router();
const db = require('../models/index');

router.get('/', (req, res, next) => {
    // const data = {
    //     name: 'test',
    //     isPublic: true,
    //     customerId: 2
    // }
    // const playlist = db.Playlist.build(data)
    // console.log(playlist)
});

router.post('/', (req, res, next) => {
    const data = {
        name: req.body.name,
        isPublic: req.body.isPublic,
        customerId: 2
    }
    // data 保存
    const playlist = db.Playlist.build(data);
    playlist.save()
    .then(response => {
        res.json({
            msg: `Successfuly <b>${response.name}</b> Playlist`,
            isCreate: true
        })
    })
    .catch(err => {
        res.json({
            msg: `Faillied create`,
            isCreate: false
        })
    })
    console.log(playlist);
})


module.exports = router;