const express    = require('express'),
      router     = express.Router({
        mergeParams: true
      }),
      app=express(),
      path = require('path'),
      {countryList} = require('../public/js/constants');


router.get('/:id', (req, res) => {
  res.render('profile',{
    patient : {
      firstName : 'John',
      lastName : 'Doe',
      country : 'Madagascar',
      isVerified : true,
      id : req.params.id
    },
    countryList : countryList
  });
});
router.get('/:id/profile',(req,res) => {
    res.render('patient/profile',{
        patient : {
          firstName : 'John',
          lastName : 'Doe',
          country : 'Madagascar',
          isVerified : true,
          id : req.params.id
        },
        countryList : countryList
      });
});
router.put('/:id/profile', (req,res)=> {
    res.redirect('/patient/'+req.params.id);
});
router.get('/:id/operation',(req,res) => {
    res.render('patient/operation',{
        patient : {
            firstName : 'John',
            lastName : 'Doe',
            country : 'Madagascar',
            isVerified : true,
            id : req.params.id
          },
        operation : {

        }
    });
});

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../404.html'));
  });
module.exports = router;