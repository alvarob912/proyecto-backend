const { Router } = require('express')
const messageModel = require('../../daos/models/message.models')

const router = Router()

router.get('/', async (req,res)=>{
    const messages = await messageModel.find().lean()
    res.render('chat', {
        title: "Super Chat!",
        messages})
})

router.post('/', async (req,res)=>{
    const io = req.app.get('io')
    const newMessage = req.body
    await messageModel.create(newMessage)
    io.emit('newMessage', newMessage)
})

router.delete('/', async (req,res)=>{
    await messageModel.deleteMany()
    const io = req.app.get('io')
    io.emit('cleanChat', {})
})


module.exports = router