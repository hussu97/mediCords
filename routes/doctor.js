const express = require('express'),
  router = express.Router({
    mergeParams: true
  }),
  {
    countryList,
  } = require('../public/js/constants'),
  moment = require('moment'),
  middlewareObj = require('../middleware');
  middlware_hasTypeDoctor = middlewareObj.isLoggedIn('doctor');
//=========================================
//                doctor profile routes
//=========================================
router.get('/:id',middlware_hasTypeDoctor, (req, res) => {
  res.redirect(`/doctor/${req.params.id}/profile`);
});
router.get('/:id/profile',middlware_hasTypeDoctor, (req, res) => {
  res.render('doctor/profile', {
    doctor: {
      firstName: 'John',
      lastName: 'Doe',
      country: 'Madagascar',
      isVerified: true,
      expiry: moment().format('MMM Do YY'),
      identificationNumber: 'ii0ewi',
      id: req.params.id,
      speciality: 'Surgeon'
    }
  });
});
//update doctor profile
router.put('/:id/profile',middlware_hasTypeDoctor, (req, res) => {
  res.redirect('/doctor/' + req.params.id);
});
//=========================================
//                doctor patients routes
//=========================================
router.get('/:id/patients',middlware_hasTypeDoctor, (req, res) => {
  res.render('doctor/patients', {
    doctor: {
      firstName: 'Jossshn',
      lastName: 'Doe',
      country: 'Madagascar',
      isVerified: true,
      expiry: moment().format('MMM Do YY'),
      identificationNumber: 'ii0ewi',
      id: 1113,
      speciality: 'Surgeon'
    },
    patients: [{
        firstName: 'John',
        lastName: 'Doe',
        country: 'Madagascar',
        isVerified: true,
        address: 'xyz,abc, helo',
        identificationNumber: '2iie02i3203i0ewi',
        id: 111,
        dob: moment().format('MMM Do YY')
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        country: 'Madagascar',
        isVerified: true,
        address: 'xyz,abc, helo',
        identificationNumber: '2iie02i3203i0ewi',
        id: 2222,
        dob: moment().format('MMM Do YY')
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        country: 'Madagascar',
        isVerified: true,
        address: 'xyz,abc, helo',
        identificationNumber: '2iie02i3203i0ewi',
        id: 333,
        dob: moment().format('MMM Do YY')
      }
    ]
  });
});
// more info about a patient
router.get('/:id/patients/:patientid',middlware_hasTypeDoctor, (req, res) => {
  res.render('doctor/patient-details', {
    doctor: {
      name: 'XYZ doctor',
      expiry: moment().format('MMM Do YY'),
      isVerified: true,
      address: 'xyz,abc, helo',
      identificationNumber: '2iie02i3203i0ewi',
      country: 'India',
      city: 'Shanghai',
      id: req.params.id
    },
    patient: {
      firstName: 'John',
      lastName: 'Doe',
      country: 'Jamaica',
      isVerified: true,
      address: 'xyz,abc, helo',
      identificationNumber: '2iie02i3203i0ewi',
      id: req.params.id,
      dob: moment().format('MMM Do YY'),
      operations: [{
        date: moment().format('MMM Do YY'),
        name: 'Tonsil Surgery',
        doctor: 'Steven',
        dischargeDate: moment().subtract(10, 'days').format('MMM Do YY'),
        daysIndoctor: '23',
        comment: 'Successful operation'
      }],
      allergies: [{
          name: 'Peanut Butter',
          doctor: 'Hello',
          date: moment().format('MMM Do YY').fr,
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
      ],
      diseases: [],
      disabilities: []
    }
  });
});
//=========================================
//                doctor hospital routes (if it is)
//=========================================
router.get('/:id/doctors/hospital',middlware_hasTypeDoctor, (req, res) => {
  res.render('doctor/hospital', {
    doctor: {
      firstName: 'Jossshn',
      lastName: 'Doe',
      country: 'Madagascar',
      isVerified: true,
      expiry: moment().format('MMM Do YY'),
      identificationNumber: 'ii0ewi',
      id: 1113,
      speciality: 'Surgeon'
    },
    hospital: {}
  });
});
//=========================================
//                doctor patient add bill route
//=========================================
router.get('/:id/bill',(req,res) => {
  res.render('doctor/bill-new')
});
router.post('/:id/bill', (req, res) => {
  var patientID = req.body.patientid;
  var doctorID = req.params.id;
  req.flash('error', 'ok');
  res.redirect('back');
});
//=========================================
//                doctor add medical info routes
//=========================================
router.get('/:id/medical', (req, res) => {
  res.render('doctor/medical-new')
});
router.post('/:id/bill', (req, res) => {
  res.redirect('back');
});
router.post('/:id/allergy', (req, res) => {
  res.redirect('back');
});
router.post('/:id/disability', (req, res) => {
  res.redirect('back');
});
router.post('/:id/disease', (req, res) => {
  res.redirect('back');
});
module.exports = router;