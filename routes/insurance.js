const express = require('express'),
  router = express.Router({
    mergeParams: true
  });


//=========================================
//                insurance patient bill routes
//=========================================
router.put('/:insuranceid/patient/:patientid/bill/:billid/send',(req,res)=> {
  var patientID = req.params.patientid;
  var insuranceID = req.params.insuranceid;
  var billID = req.params.billid;
  res.redirect(`/patient/${patientID}/bill`);
});
module.exports = router;