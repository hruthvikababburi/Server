const express = require('express')
const {v4:uuidv4} = require('uuid')
const db = require('./database')
const authMiddleware = require('./authMiddleware')

const router= express.Router()

router.post('/tasks',authMiddleware,(req,res)=>{
    const {description,status} = req.body;
    const taskId = uuidv4()
    const userId = req.user.userId

    const taskStatus = status || 'pending'

    db.run('INSERT INTO tasks (id,userId, description, status) VALUES (?,?,?,?)',[taskId,userId,description,taskStatus],(err)=>{
        if(err){
            return res.status(500).json({message: 'Task creation failed'})
        }
        res.status(200).json({taskId})
    })
})

router.get('/tasks', authMiddleware, (req, res) => {
    const userId = req.user.userId;
  
    db.all('SELECT * FROM tasks WHERE userId = ?', [userId], (err, tasks) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to fetch tasks' });
      }
      res.status(200).json(tasks);
    });
  });


  router.put('/tasks/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }
  
    db.run('UPDATE tasks SET status = ? WHERE id = ?', [status, id], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Task update failed' });
      }
      res.status(200).json({ message: 'Task updated' });
    });
  });
  

  router.delete('/tasks/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
  
    db.run('DELETE FROM tasks WHERE id = ?', [id], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Task deletion failed' });
      }
      res.status(200).json({ message: 'Task deleted' });
    });
  });
  
  module.exports = router;