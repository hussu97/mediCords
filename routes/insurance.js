const express = require('express'),
  router = express.Router({
    mergeParams: true
  }),
  moment = require('moment');
//=========================================
//                insurance profile routes
//=========================================
router.get('/:id', (req, res) => {
  res.redirect(`/insurance/${req.params.id}/profile`);
});
router.get('/:id/profile', (req, res) => {
  res.render('insurance/profile', {
    insurance: {
      name: 'XYZ Insurance',
      expiry: moment().format('MMM Do YY'),
      isVerified: false,
      address: 'insurance,helo',
      identificationNumber: '2ii03i0ewi',
      country: 'China',
      city: 'Beijing',
      id: req.params.id
    }
  });
});
//=========================================
//                insurance patients routes
//=========================================
router.get('/:id/patients', (req, res) => {
  res.render('insurance/patients', {
    insurance: {
      name: 'XYZ Insurance',
      expiry: moment().format('MMM Do YY'),
      isVerified: false,
      address: 'insurance,helo',
      identificationNumber: '2ii03i0ewi',
      country: 'China',
      city: 'Beijing',
      id: req.params.id
    },
    patients: [{
        firstName: 'Jqqohn',
        lastName: 'Doe',
        country: 'Jamaica',
        isVerified: true,
        address: 'xyz,abc, hwwelo',
        identificationNumber: '2iie02i3203i0ewi',
        id: 111,
        dob: moment().format('MMM Do YY')
      },
      {
        firstName: 'Joddhn',
        lastName: 'Dwoe',
        country: 'Madagascar',
        isVerified: true,
        address: 'xyz,abc, helo',
        identificationNumber: '2iie02i3203i0ewi',
        id: 2222,
        dob: moment().format('MMM Do YY')
      },
      {
        firstName: 'John',
        lastName: 'Doqqe',
        country: 'Madaqqqgascar',
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
  res.render('insurance/patient-details', {
    insurance: {
      name: 'XYZ insurance',
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
      // show only bills that are sent
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
    }
  });
});
// approve a patient bill
router.put('/:id/patient/:patientid /approve',(req,res) => {
  res.redirect('back');
});
// removes patient from insurance entity
router.delete('/:id/patients/:patientid', (req, res) => {
  var insuranceID = req.params.id;
  var patientID = req.params.patientid;
  res.redirect(`/insurance/${insuranceID}/patients`);
});
//=========================================
//                insurance add patient routes
//=========================================
// adds new patient using id
router.post('/:id/patient',(req,res)=> {
  var patientID = req.body.patientid;
  var insuranceID = req.params.id;
  req.flash('error','ok');
  res.redirect('back');
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