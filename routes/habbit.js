
const router = require("express").Router();
const habbitSchema = require("../models/Habbit")
const mongoose = require("mongoose")
const schema = require("mongoose").Schema

router.post('/:path',async (req, res) => {

    const pathName = req.params.path
    //declared my dynamic schema with pathName
        console.log(req.body);
    const dynamicModel = mongoose.model(pathName, habbitSchema);
   
    try {
        const habbit = new dynamicModel({
            name:req.body.name,
            startDate:req.body.startDate,
            endDate:req.body.endDate,
            reminderTime:req.body.reminderTime
        })

        await habbit.save()
        
        res.status(201).json(habbit);

    } catch (error) {
      console.error('Error creating habit:', error);
      res.status(500).json({ error: 'Error creating habit' });
    }

    console.log(req.params.id);

});

router.get('/:path', async(req, res) => {

    const pathName = req.params.path
    const dynamicModel = mongoose.model(pathName, habbitSchema);
    
    try {
        const habbits = await dynamicModel.find()
        res.status(200).json(habbits);
    } catch (error) {
        res.status(500).json(error);
    }
    

});




module.exports = router;
