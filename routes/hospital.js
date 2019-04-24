const express = require('express'),
  router = express.Router({
    mergeParams: true
  }),
  {
    countryList
  } = require('../public/js/constants'),
  moment = require('moment');



//=========================================
//                hospital profile routes
//=========================================
router.get('/:id', (req, res) => {
  res.redirect(`/hospital/${req.params.id}/profile`);
});
router.get('/:id/profile', (req, res) => {
  res.render('hospital/profile', {
    hospital: {
      name: 'XYZ Hospital',
      expiry: moment().format('MMM Do YY'),
      isVerified: true,
      address: 'xyz,abc, helo',
      identificationNumber: '2iie02i3203i0ewi',
      country: 'Hong Kong',
      city: 'Shanghai',
      id: req.params.id
    }
  });
});
//update hospital profile
router.put('/:id/profile', (req, res) => {
  res.redirect('/hospital/' + req.params.id);
});
//=========================================
//                hospital doctors routes
//=========================================
router.get('/:id/doctors', (req, res) => {
  res.render('hospital/doctors', {
    hospital: {
      name: 'XYZ Hospital',
      expiry: moment().format('MMM Do YY'),
      isVerified: true,
      address: 'xyz,abc, helo',
      identificationNumber: '2iie02i3203i0ewi',
      country: 'Hong Kong',
      city: 'Shanghai',
      id: req.params.id
    },
    doctors: [{
        firstName: 'John',
        lastName: 'Doe',
        country: 'Madagascar',
        isVerified: true,
        expiry: moment().format('MMM Do YY'),
        identificationNumber: 'ii0ewi',
        id: 1113,
        speciality: 'Surgeon'
      },
      {
        firstName: 'John',
        lastName: 'Carlos',
        country: 'Madagascar',
        isVerified: false,
        expiry: moment().format('MMM Do YY'),
        identificationNumber: 'ii0ewi',
        id: 111,
        speciality: 'Home Therapist'
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        country: 'Madagascar',
        isVerified: true,
        expiry: moment().format('MMM Do YY'),
        identificationNumber: 'ii0ewi',
        id: 111,
        speciality: 'Surgeon'
      }
    ]
  });
});
// doctor details + list of patients under doctor
router.get('/:id/doctors/:doctorid', (req, res) => {
  res.render('hospital/doctor-details', {
    hospital: {
      name: 'XYZ Hospital',
      expiry: moment().format('MMM Do YY'),
      isVerified: true,
      address: 'xyz,abc, helo',
      identificationNumber: '2iie02i3203i0ewi',
      country: 'Hong Kong',
      city: 'Shanghai',
      id: req.params.id
    },
    doctor: {
      firstName: 'John',
      lastName: 'Doe',
      country: 'Madagascar',
      isVerified: true,
      expiry: moment().format('MMM Do YY'),
      identificationNumber: 'ii0ewi',
      id: req.params.doctorid,
      speciality: 'Surgeon',
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
        },
      ]
    }
  });
});
// updates doctor details from hospital
router.put('/:id/doctors/:doctorid', (req, res) => {
  var hospitalID = req.params.id;
  var doctorID = req.params.doctorid;
  var doctor = req.body.doctor;
  res.redirect(`/hospital/${hospitalID}/doctors/${doctorID}`);
});
// removes doctor from hospital entity
router.delete('/:id/doctors/:doctorid', (req, res) => {
  console.log('hi')
  var hospitalID = req.params.id;
  var doctorID = req.params.doctorid;
  res.redirect(`/hospital/${hospitalID}/doctors`);
});
//=========================================
//                hospital patients routes
//=========================================
router.get('/:id/patients', (req, res) => {
  res.render('hospital/patients', {
    hospital: {
      name: 'XYZ Hospital',
      expiry: moment().format('MMM Do YY'),
      isVerified: true,
      address: 'xyz,abc, helo',
      identificationNumber: '2iie02i3203i0ewi',
      country: 'India',
      city: 'Shanghai',
      id: req.params.id
    },
    patients: [{
        firstName: 'John',
        lastName: 'Doe',
        country: 'Jamaica',
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
      },
    ]
  });
});
// more info about a patient
router.get('/:id/patients/:patientid', (req, res) => {
  res.render('hospital/patient-details', {
    hospital: {
      name: 'XYZ Hospital',
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
      operations : [
        {
          date: moment().format('MMM Do YY'),
          name: 'Tonsil Surgery',
          doctor: 'Steven',
          dischargeDate: moment().subtract(10, 'days').format('MMM Do YY'),
          daysInHospital: '23',
          comment: 'Successful operation'
        }
      ],
      allergies: [
        {
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
      diseases : [

      ],
      disabilities: [

      ]
    }
  });
});
// removes patient from hospital entity
router.delete('/:id/patients/:patientid', (req, res) => {
  var hospitalID = req.params.id;
  var patientID = req.params.patientid;
  res.redirect(`/hospital/${hospitalID}/patients`);
});
//=========================================
//                hospital add patient routes
//=========================================
// adds new patient using id
router.post('/:id/patient',(req,res)=> {
  var patientID = req.body.patientid;
  var hospitalID = req.params.id;
  req.flash('error','ok');
  res.redirect('back');
});
//=========================================
//                hospital add doctor routes
//=========================================
router.get('/:id/doctor/new', (req,res) => {
  res.render('hospital/doctor-new',{
    hospital: {
      name: 'XYZ Hospital',
      expiry: moment().format('MMM Do YY'),
      isVerified: true,
      address: 'xyz,abc, helo',
      identificationNumber: '2iie02i3203i0ewi',
      country: 'Hong Kong',
      city: 'Shanghai',
      id: req.params.id
    }
  })
});
router.post('/:id/doctor',(req,res) => {
  console.log(req.body.id);
  console.log(req.body.doctor);
  res.redirect('back')
})
module.exports = router;