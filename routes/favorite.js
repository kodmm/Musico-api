const express = require('express');
const router = express.Router();
const db = require('../models/index');



router.post('/', async(req, res, next) => {
    
    const customer_id = req.body.customer_id;
    const song = req.body.song;
     await db.Song.findOrCreate({
        where: { trackId: song.trackId},
        defaults: song
    })
    .then(([song, created]) => {
        
        if(created){
             
             const favorite = favoriteCreate(song.id, customer_id)
             console.log(favorite);
             res.json({
                 msg: ['Create data song',favorite]

             });
        }else{

            const favorite = favoriteCreate(song.id, customer_id)
            console.log(favorite);
            res.json({
                msg: ['Created data song', favorite]
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.json({
            msg: ['Failid Create data', null ]
        })
    })
})


const favoriteCreate = async(song_id, customer_id) => {
     await db.Favorite.findOrCreate({
        where: { songId: song_id, customerId: customer_id},
        defaults: {
            songId: song_id,
            customerId: customer_id
        }
    })
    .then(([favorite, created]) => {
        if(created){
            console.log(`favorite ${created}`);
            // return "Create favorite"
        }else {
            console.log(`favorite ${created}`);
            // return "Created favorite"
        } 
        
    })
    .catch(err => {
        console.log(`ERROR : ${err}`)
        return `ERROR : ${err}`
    });
}




module.exports = router;
