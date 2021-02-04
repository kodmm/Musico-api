const express = require('express');
const router = express.Router();
const db = require('../models/index');

router.get('/', (req, res, next) => {
    const customer_id = req.query.id;
    db.Customer.findByPk(customer_id, {
        include: [
            { model: db.Playlist }
        ]
    })
    .then(response => {
        const data = response.get({
            plain: true
        })
        console.log(data);
        res.json(data);
        
    }).catch(err => console.log('errr'));
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
});

router.patch('/', async(req, res, next) => {
    const customer_id = req.body.customer_id;
    const song = req.body.song;
    const playlist_id = req.body.playlistId;

    await db.Song.findOrCreate({
        where: { trackId: song.trackId},
        defaults: song
    })
    .then(([song, created]) => {
        if(created){
             
            const favorite = favoriteCreate(song.id, track_id, customer_id)
            console.log(favorite);
            res.json({
                msg: ['Create data song',playlist]

            });
       }else{

           const favorite = favoriteCreate(song.id, customer_id)
           console.log(favorite);
           res.json({
               msg: ['Created data song', playlist]
           });
       }
    })


})


module.exports = router;