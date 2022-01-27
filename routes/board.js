const express = require("express");
const { read } = require("fs");
const board = require("../schemas/board")
const router = express.Router();

// GET API
// 메인페이지 글 조회
router.get('/board', async (req, res) => {
    // 날짜기준으로 내림차순 정렬
    const boards = await board.find().sort({"date": -1})
    res.json({
        boards
    })
})

// 작성글 상세조회 /:password ---> 아무값이나 받겠다는 의미
router.get('/board/:password', async (req, res) => {
    const {password} = req.params
    const [boards] = await board.find({password})
    res.json({
        boards
    })
})

// 작성
router.post('/board', async (req, res) => {
    const {title, name, password, content} = req.body
    const boards = await board.find({password})
    const date = new Date()
    if (boards.length) {
        return res.status(400).json({success: false, errorMessage: '이미 사용된 비밀번호 입니다.'})
    }
    const createboards = await board.create({title, name, password, content, date})
    res.json({
        board: createboards,
        msg: '작성완료!'
    })
})


// 수정
router.put('/board/:password', async (req, res) => {
    const {password} = req.params
    const {title, name, content} = req.body
    const existsboard = await board.find({password: password})
    if (!existsboard.length) return res
        .status(400)
        .json({success: false, errorMessage: '패스워드가 일치하지 않습니다.'})
    await board.updateOne({password: password}, {$set: {title, name, content}})
    res.json({
        success: true,
        msg : '수정완료'
    })
})

// 글 삭제하기
router.delete('/board/:password', async (req, res) => {
    const {password} = req.params
    const existsboard = await board.find({password: password})
    if (existsboard.length) {
        await board.deleteOne({password: password})
    }
    res.json({
        success: true
    })
})

module.exports = router;
