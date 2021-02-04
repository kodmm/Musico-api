const express = require('express');
const router = express.Router();
const db = require('../models/index');

router.get('/', (req, res, next) => {
    const customer_id = req.query.id;
    db.Customer.findByPk(customer_id, {
        include: [
            { model: db.Playlist, include: [db.Song] }
        ]
    })
    .then(response => {
        const data = response.get({
            plain: true
        })
        res.json(data);
        
    }).catch(err => console.log(err));
    // const data = {
    //     name: 'test',
    //     isPublic: true,
    //     customerId: 2
    // }
    // const playlist = db.Playlist.build(data)
    // console.log(playlist)
});

router.get('/:name', (req, res, next) => {
    const customer_id = req.query.id;
    const name = req.params.name;

    console.log(customer_id, name);

    db.Playlist.findOne({
        where: {
            customerId: customer_id,
            name: name
        },
        include: [
            { model: db.Song}
        ]
    })
    .then(response => {
        const data = response.get({
            plain: true 
        })
        console.log(data);
        res.json(data);
    }).catch(err => console.log(err));

    
})

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

router.post('/relation', async(req, res, next) => {
    const customer_id = req.body.customer_id;
    const song = req.body.song;
    const playlist_id = req.body.playlistId;
    await db.Song.findOrCreate({
        where: { trackId: song.trackId},
        defaults: song
    })
    .then(async ([song, created]) => {
        await db.Relation.findOrCreate({
            where: {songId: song.id, playlistId: playlist_id},
            defaults: {songId: song.id, playlistId: playlist_id}
        }).then(([relation, crated]) => {
            console.log(`Successfully: ${song}`);
            if(created){
                res.json({
                    msg: ['Create data song',relation]

                });
        }else{
            res.json({
                msg: ['Created data song', relation]
            });
        }
    });
    })

})

router.delete('/relation/:song_id/:playlist_id', async(req, res, next) => {
    const song_id = req.params.song_id;
    const playlist_id = req.params.playlist_id
    db.Relation.findOne({
        where: { songId: song_id, playlistId: playlist_id}
    }).then(relation => {

        relation.destroy();

        db.Playlist.findByPk(playlist_id,{
            include: [
                { model: db.Song}
            ]
        })
        .then(response => {
            const data = [response.get({
                            plain: true 
                        }), {msg: `Successfully Destroy`}]
            console.log(data);
            res.json(data);
        }).catch(err => console.log(err));

    }).catch(err => console.log(err));
});

router.patch('/', (req, res, next) => {
    const is_public = req.body.isPublic;
    const id = req.body.id;
    const customer_id = req.body.customer_id
    db.Playlist.update(
        {isPublic: is_public},
        {where: {id: id} }
    ).then(() => {
       
        db.Customer.findByPk(Number(customer_id), {
            include: [
                { model: db.Playlist, include: [db.Song] }
            ]
        })
        .then(response => {
            
            const data = [response.get({
                plain: true
            }), {msg: 'Successfully Update'}]

            res.json(data);
            
        }).catch(err => console.log(`ERRRRORORORORO:     ${err}`));
    }).catch(err => console.log(`KIMUSTAJFIE:     ${err}`));
    
})

const RelationCreate = (playlist_id, song_id, track_id) => {
   let rel;
   db.Relation.findOrCreate({
       where: { playlistId: playlist_id, songId: song_id},
       defaults: {
           songId: song_id,
           playlistId: playlist_id
       }
   })
   .then(([relation, created]) => {
    rel = relation;
    console.log(rel)
   }).catch(err => console.log(err));
   return rel
}

module.exports = router;