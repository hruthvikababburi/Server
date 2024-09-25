const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const {v4:uuidv4} = require('uuid')
const db = require('./database')
const jwt = require('jsonwebtoken')


router.post('./signup',(req,res)=>{
    const {name,email,password} = req.body;
    const hashedPwd = bcrypt.hashSync(password,10)
    const userId = uuidv4()


    db.run('INSERT INTO users (id, name, email, password) VALUES (?,?,?,?)',[userId,name,email,hashedPwd],(err)=>{
        if(err){
            return res.status(500).json({message: "User registration failed"})
        }
        const token = jwt.sign({userId,email},process.env.JWT_SECRET,{expiresIn: '1h'})
        res.status(200).json({token})
    })

})

router.post('./login',(req,res)=>{
    const {email,password} = req.body;

    db.get('SELECT * FROM users WHERE email = ?',[email],(err,user)=>{
        if (err || !user || !bcrypt.compareSync(password,user.password)){
            return res.status(400).json({message: 'Invalid email or password'})
        }
        const token = jwt.sign({userId: user.id, email: user.email},process.env.JWT_SECRET,{expiresIn:'1hr'})
        res.status(200).json({token})
    })
})


module.exports = router;