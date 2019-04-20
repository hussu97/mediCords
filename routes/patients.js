const express = require('express'),
  router = express.Router({
    mergeParams: true
  }),
  path = require('path'),
  {
    countryList
  } = require('../public/js/constants'),
  moment = require('moment');


//=========================================
//                patient profile routes
//=========================================
router.get('/:id', (req, res) => {
  res.render('patient/profile', {
    patient: {
      firstName: 'John',
      lastName: 'Doe',
      country: 'Madagascar',
      isVerified: true,
      id: req.params.id
    },
    countryList: countryList
  });
});
router.get('/:id/profile', (req, res) => {
  res.render('patient/profile', {
    patient: {
      firstName: 'John',
      lastName: 'Doe',
      country: 'Madagascar',
      isVerified: true,
      id: req.params.id
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
    patient: {
      firstName: 'John',
      lastName: 'Doe',
      country: 'Madagascar',
      isVerified: true,
      id: req.params.id
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
    patient: {
      firstName: 'John',
      lastName: 'Doe',
      country: 'Madagascar',
      isVerified: true,
      id: req.params.id
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
router.get('/:id/disease', (req, res) => {
  res.render('patient/allergy', {
    patient: {
      firstName: 'John',
      lastName: 'Doe',
      country: 'Madagascar',
      isVerified: true,
      id: req.params.id
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
router.get('/:id/disability', (req, res) => {
  res.render('patient/allergy', {
    patient: {
      firstName: 'John',
      lastName: 'Doe',
      country: 'Madagascar',
      isVerified: true,
      id: req.params.id
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
    patient: {
      firstName: 'John',
      lastName: 'Doe',
      country: 'Madagascar',
      isVerified: true,
      id: req.params.id
    },
    bills: [{
      id: '1234',
      date: moment().format('MMM Do YY'),
      hospital: 'XYZ Hospital',
      doctor: 'Mazin Raf',
      cost: 234.34,
      vat: 5.67,
      total : 245.23
    }]
  });
});
//=========================================
//                patient insurance routes
//=========================================
router.get('/:id/insurance', (req, res) => {
  res.render('patient/allergy', {
    patient: {
      firstName: 'John',
      lastName: 'Doe',
      country: 'Madagascar',
      isVerified: true,
      id: req.params.id
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
module.exports = router;