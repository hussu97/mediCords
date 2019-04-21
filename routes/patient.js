const express = require('express'),
  router = express.Router({
    mergeParams: true
  }),
  {
    countryList,
    patient
  } = require('../public/js/constants'),
  moment = require('moment');


//=========================================
//                patient profile routes
//=========================================
router.get('/:id', (req, res) => {
  res.render('patient/profile', {
    patient :{
        firstName: 'John',
        lastName: 'Doe',
        country: 'Madagascar',
        isVerified: true,
        address : 'xyz,abc, helo',
        identificationNumber: '2iie02i3203i0ewi',
        id: req.params.id,
        dob : moment().format('MMM Do YY')
      },
    countryList: countryList
  });
});
router.get('/:id/profile', (req, res) => {
  res.render('patient/profile', {
    patient :{
        firstName: 'John',
        lastName: 'Doe',
        country: 'Madagascar',
        isVerified: true,
        address : 'xyz,abc, helo',
        identificationNumber: '2iie02i3203i0ewi',
        id: req.params.id,
        dob : moment().format('MMM Do YY')
      },
    countryList: countryList
  });
});
//update patient profile
router.put('/:id/profile', (req, res) => {
  res.redirect('/patient/' + req.params.id);
});
//=========================================
//                patient medical info routes
//=========================================
router.get('/:id/operation', (req, res) => {
  res.render('patient/operation', {
    patient :{
      firstName: 'John',
      lastName: 'Doe',
      country: 'Madagascar',
      isVerified: true,
      address : 'xyz,abc, helo',
      identificationNumber: '2iie02i3203i0ewi',
      id: req.params.id,
      dob : moment().format('MMM Do YY')
    },
    operations: [{
      date: moment().format('MMM Do YY'),
      name: 'Tonsil Surgery',
      doctor: 'Steven',
      dischargeDate: moment().subtract(10, 'days').format('MMM Do YY'),
      daysInHospital: '23',
      comment: 'Successful operation'
    }]
  });
});
router.get('/:id/allergy', (req, res) => {
  res.render('patient/allergy', {
    patient :{
      firstName: 'John',
      lastName: 'Doe',
      country: 'Madagascar',
      isVerified: true,
      address : 'xyz,abc, helo',
      identificationNumber: '2iie02i3203i0ewi',
      id: req.params.id,
      dob : moment().format('MMM Do YY')
    },
    allergies: [{
        name: 'Peanut Butter',
        doctor: 'Hello',
        date: moment().format('MMM Do YY'),
        severity: 'low',
        medication: 'N/A'
      },
      {
        name: 'Peanut Butter',
        doctor: 'Hello',
        date: moment().format('MMM Do YY'),
        severity: 'med',
        medication: 'N/A'
      },
      {
        name: 'Peanut Butter',
        doctor: 'Hello',
        date: moment().format('MMM Do YY'),
        severity: 'high',
        medication: 'Water'
      }
    ]
  });
});

//UI not made yet
router.get('/:id/disease', (req, res) => {
  res.render('patient/allergy', {
    patient :{
        firstName: 'John',
        lastName: 'Doe',
        country: 'Madagascar',
        isVerified: true,
        address : 'xyz,abc, helo',
        identificationNumber: '2iie02i3203i0ewi',
        id: req.params.id,
        dob : moment().format('MMM Do YY')
      },
    allergies: [{
        name: 'Peanut Butter',
        doctor: 'Hello',
        date: moment().format('MMM Do YY'),
        severity: 'low',
        medication: 'N/A'
      },
      {
        name: 'Peanut Butter',
        doctor: 'Hello',
        date: moment().format('MMM Do YY'),
        severity: 'med',
        medication: 'N/A'
      },
      {
        name: 'Peanut Butter',
        doctor: 'Hello',
        date: moment().format('MMM Do YY'),
        severity: 'high',
        medication: 'Water'
      }
    ]
  });
});

//UI not made yet
router.get('/:id/disability', (req, res) => {
  res.render('patient/allergy', {
    patient :{
        firstName: 'John',
        lastName: 'Doe',
        country: 'Madagascar',
        isVerified: true,
        address : 'xyz,abc, helo',
        identificationNumber: '2iie02i3203i0ewi',
        id: req.params.id,
        dob : moment().format('MMM Do YY')
      },
    allergies: [{
        name: 'Peanut Butter',
        doctor: 'Hello',
        date: moment().format('MMM Do YY'),
        severity: 'low',
        medication: 'N/A'
      },
      {
        name: 'Peanut Butter',
        doctor: 'Hello',
        date: moment().format('MMM Do YY'),
        severity: 'med',
        medication: 'N/A'
      },
      {
        name: 'Peanut Butter',
        doctor: 'Hello',
        date: moment().format('MMM Do YY'),
        severity: 'high',
        medication: 'Water'
      }
    ]
  });
});
//=========================================
//                patient bills routes
//=========================================
router.get('/:id/bill', (req, res) => {
  res.render('patient/bill', {
    patient :{
        firstName: 'John',
        lastName: 'Doe',
        country: 'Madagascar',
        isVerified: true,
        address : 'xyz,abc, helo',
        identificationNumber: '2iie02i3203i0ewi',
        id: req.params.id,
        dob : moment().format('MMM Do YY')
      },
    bills: [{
      id: '1234',
      date: moment().format('MMM Do YY'),
      hospital: 'XYZ Hospital',
      doctor: 'Mazin Raf',
      cost: 234.34,
      vat: 5.67,
      total : 245.23,
      status : 'not sent'
    },
    {
      id: '1234',
      date: moment().format('MMM Do YY'),
      hospital: 'XYZ Hospital',
      doctor: 'Mazin Raf',
      cost: 234.34,
      vat: 5.67,
      total : 245.23,
      status : 'pending'
    },
    {
      id: '1234',
      date: moment().format('MMM Do YY'),
      hospital: 'XYZ Hospital',
      doctor: 'Mazin Raf',
      cost: 234.34,
      vat: 5.67,
      total : 245.23,
      status : 'approved'
    }],
    insurance: {
      id: 12
    }
  });
});
//=========================================
//                patient insurance routes
//=========================================

router.get('/:id/insurance', (req, res) => {
  res.render('patient/insurance', {
    patient :{
        firstName: 'John',
        lastName: 'Doe',
        country: 'Madagascar',
        isVerified: true,
        address : 'xyz,abc, helo',
        identificationNumber: '2iie02i3203i0ewi',
        id: req.params.id,
        dob : moment().format('MMM Do YY')
      },
    countryList : countryList,
    patientInsurance : {
      id: 1234,
      name: 'XYZ Insurance',
      country : 'USA',
      city:'Cali',
      address : '123,223,yellow st',
      expiry : moment().format('MMM Do YY'),
      isVerified : false
    },
    billsCount : {
      approved : 5,
      pending : 6
    }
  },
  );
});
// Update insurance details using insurance name
router.put('/:id/insurance', (req, res) => {
  var insuranceName = req.body.name;
  console.log(`${req.body.name}`);
  res.redirect(`/patient/${req.params.id}/insurance`);
});
module.exports = router;