const express = require('express'),
  router = express.Router({
    mergeParams: true
  }),
  {
    countryList,
  } = require('../public/js/constants'),
  moment = require('moment'),
  con = require('../web-service-connector'),
  middlewareObj = require('../middleware');
middlware_hasTypeDoctor = middlewareObj.isLoggedIn('doctor');
var doctor = {
  firstName: 'ssJohn',
  lastName: 'Doe',
  country: 'Madagascar',
  isVerified: true,
  expiry: moment().format('YYYY-MM-DD'),
  identificationNumber: 'ii0ewi',
  id: 'werrr',
  username: 'docA',
  speciality: 'Surgeon',
  city: 'Sharjah',
  address: 'this is address',
  hospitalName: '212s3',
  patientIds: [
    'wksosw', 'swwwdwd', 'swwswsw'
  ]
}
//=========================================
//                doctor profile routes
//=========================================
router.get('/:id', (req, res) => {
  res.redirect(`/doctor/${req.params.id}/profile`);
});
router.get('/:id/profile', async (req, res) => {
  var doctor = await con.getDoctor(req.params.id);
  req.session.isVerified = doctor.isVerified;
  res.render('doctor/profile', {
    doctor: doctor,
    countryList: countryList
  });
});
//update doctor profile
router.put('/:id/profile', async (req, res) => {
  console.log(req.body);
  res.redirect('/doctor/' + req.params.id);
});
//=========================================
//                doctor patients routes
//=========================================
router.get('/:id/patients', async (req, res) => {
  var doctor = await con.getDoctor(req.params.id);
  req.session.isVerified = doctor.isVerified;
  patients = [];
  for (i = 0; i < doctor.patientIds.length; i++) {
    var p = await con.getPatient(doctor.patientIds[i])
    patients.push(p);
  }
  res.render('doctor/patients', {
    doctor: doctor,
    patients: patients
  });
});
// more info about a patient
router.get('/:id/patients/:patientid', async (req, res) => {
  var doctor = await con.getDoctor(req.params.id);
  req.session.isVerified = doctor.isVerified;
  var patient = await con.getPatient(req.params.patientid);
  res.render('doctor/patient-details', {
    doctor: doctor,
    patient: patient
  });
});
//=========================================
//                doctor patient add bill route
//=========================================
router.get('/:id/bill/new', async (req, res) => {
  var doctor = await con.getDoctor(req.params.id);
  req.session.isVerified = doctor.isVerified;
  patients = [];
  for (i = 0; i < doctor.patientIds.length; i++) {
    var p = await con.getPatient(doctor.patientIds[i])
    patients.push(p);
  }
  res.render('doctor/bill-new', {
    doctor: doctor,
    patients: patients
  })
});
router.post('/:id/bill', async (req, res) => {
  if (req.session.isVerified) {
    req.flash('success', 'you successfully added the bill');
    bill = req.body.bill;
    bill.date = middlewareObj.getCurrentTS();
    bill.id = String(Math.floor(Math.random() * 1000000));
    var status = await con.addBill(req.body.patientid, bill);
  } else {
    req.flash('error', 'you need to be verified to do that');
  }
  res.redirect('back');
});
//=========================================
//                doctor add medical info routes
//=========================================
router.get('/:id/medical/new', async (req, res) => {
  var doctor = await con.getDoctor(req.params.id);
  req.session.isVerified = doctor.isVerified;
  patients = [];
  for (i = 0; i < doctor.patientIds.length; i++) {
    var p = await con.getPatient(doctor.patientIds[i])
    patients.push(p);
  }
  res.render('doctor/medical-new', {
    doctor: doctor,
    patients: patients
  })
});
router.post('/:id/operation', async (req, res) => {
  if (req.session.isVerified) {
    req.flash('success', 'you successfully added the operation for the patient');
    operation = req.body.operation;
    operation.daysInHospital = moment(operation.dischargeDate).diff(moment(operation.date), 'days')
    operation.date = middlewareObj.convertToTimeStamp(operation.date);
    operation.dischargeDate = middlewareObj.convertToTimeStamp(operation.dischargeDate);
    var status = await con.addOperation(req.body.patientid, operation);
  } else {
    req.flash('error', 'you need to be verified to do that');
  }
  res.redirect('back');
});
router.post('/:id/allergy', async (req, res) => {
  if (req.session.isVerified) {
    req.flash('success', 'you successfully added the allergy for the patient');
    allergy = req.body.allergy;
    allergy.date = middlewareObj.getCurrentTS();
    var status = await con.addAllergy(req.body.patientid, allergy);
  } else {
    req.flash('error', 'you need to be verified to do that');
  }
  res.redirect('back');
});
router.post('/:id/disability', async (req, res) => {
  if (req.session.isVerified) {
    req.flash('success', 'you successfully added the disability for the patient');
    disability = req.body.disability;
    disability.date = middlewareObj.getCurrentTS();
    var status = await con.addDisability(req.body.patientid, disability);
  } else {
    req.flash('error', 'you need to be verified to do that');
  }
  res.redirect('back');
});
router.post('/:id/disease', async (req, res) => {
  if (req.session.isVerified) {
    req.flash('success', 'you successfully added the disease for the patient');
    disease = req.body.disease;
    disease.date = middlewareObj.getCurrentTS();
    var status = await con.addDisease(req.body.patientid, disease);
  } else {
    req.flash('error', 'you need to be verified to do that');
  }
  res.redirect('back');
});
module.exports = router;