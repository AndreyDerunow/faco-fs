const express = require('express')
const Comment = require('../models/Comment')
const auth = require('../middleware/auth.middleware')

const router = express.Router({ mergeParams: true})

router.get('/',auth,async (req,res)=>{
    try{
        const {orderBy,equalTo} = req.query
        const list = await Comment.find({[orderBy]: equalTo})
        res.status(200).send(list)
    }catch(e){
        res.status(500).send({message:"На сервере произошла ошибка. Попробуйте позже"})
    }
})
router.post('/',auth, async(req,res)=>{
    try{
        const newComment = await Comment.create({
            ...req.body,
            userId:req.user._id
        })
        res.status(201).send(newComment)
    }catch(e){
        res.status(500).send({message:"На сервере произошла ошибка. Попробуйте позже"})
    }
})
router.delete('/:commentId',auth, async(req,res)=>{
    try{
    const {commentId} = req.params
        const removedComment = await Comment.findById(commentId)
        if(removedComment.userId.toString() === req.user._id){
            await removedComment.deleteOne()
            res.status(200).send(null)
        }else{
            return res.status(401).json({message:"Unauthorized"})
        }

    }catch(e){
        res.status(500).send({message:"На сервере произошла ошибка. Попробуйте позже"})
    }
})


module.exports = router