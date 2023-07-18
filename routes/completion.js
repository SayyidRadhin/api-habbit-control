const router = require("express").Router();
const Completion =require("../models/Completions")


router.post('/:habbit/completion',async (req, res) => {

  const pathName = req.params.habbit
  console.log(pathName);
  console.log(req.body);

  const complete =await Completion.findOne({habit:req.body.habbitId,date:req.body.currentDate})
    console.log(complete);
  try {

    if(!complete){
    const completionData = new Completion({
      path:pathName,
      habit: req.body.habbitId,
      date:req.body.currentDate,
      completed:req.body.completed, 
    });

    await completionData.save();

    console.log(completionData);
    res.status(201).json(completionData);
  }else{

  const check =await Completion.findOneAndUpdate({habit:req.body.habbitId,date:req.body.currentDate},
    {
      $set: {completed:req.body.completed},
    },
    { new: true }
  )

    console.log(check);
    res.status(201).json(check);
  }
  } catch (error) {
    

  }

});

router.get('/:habbit/completion',async (req, res) => {

  const {habbitId,currentDate} = req.query
  console.log(currentDate);

  let completedValue;
  const complete =await Completion.findOne({habit:habbitId,date:currentDate})
  try {

    if(complete){
      console.log(complete);
      res.status(201).json(complete);
    }

  } catch (error) {
    res.status(201).json(error);

  }

	
});

router.get('/:habbit/completion/true',async (req, res) => {
  const {currentDate,completed} = req.query
  const pathName = req.params.habbit

  completedValue =await Completion.find({path:pathName,completed:true,date:currentDate})
  console.log(completedValue);
  res.status(201).json(completedValue);
});

router.get('/:habbit/calender/:habbitId',async (req, res) => {
  const {habbitId} = req.params
  const pathName = req.params.habbit
  console.log(habbitId,pathName);

  const completedValue =await Completion.find({path:pathName,habit:habbitId})
  console.log(completedValue);
  res.status(201).json(completedValue);
});


module.exports = router;
