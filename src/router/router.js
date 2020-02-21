const express = require('express');
const router = express.Router();

const People = require('../model/people');

router.get('/', async (req, res) => {
   const peoples = await People.find();
   res.json(peoples)
})

// GET People
router.get('/:id', async (req, res) => {
   const people = await People.findById(req.params.id);
   res.json(people);
});

router.post('/', async (req, res) => {
   const { name, lastName, email, phone, age } = req.body;
   const people = new People({ name, lastName, email, phone, age });
   await people.save();
   res.json({ status: '200 - People Saved' });
})

router.put('/:id', async (req, res) => {
   const { name, lastName, email, phone, age } = req.body;
   const newTask = { name, lastName, email, phone, age };
   await People.findByIdAndUpdate(req.params.id, newTask);
   res.json({ status: '200 - People Updated' });
})

router.delete('/:id', async (req, res) => {
   await People.findByIdAndRemove(req.params.id);
   res.json({ status: '200 - People Deleted' });
})
module.exports = router