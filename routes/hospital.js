const express = require('express'),
  router = express.Router({
    mergeParams: true
  }),
  {
    countryList
  } = require('../public/js/constants'),
  con = require('../web-service-connector'),
  middleWareObj = require('../middleware');
middlware_hasTypeHospital = middleWareObj.isLoggedIn('hospital');

//=========================================
//                hospital profile routes
//=========================================
router.get('/:id', middlware_hasTypeHospital, (req, res) => {
  res.redirect(`/hospital/${req.params.id}/profile`);
});
router.get('/:id/profile', middlware_hasTypeHospital, async (req, res) => {
  var hospital = await con.getHospital(req.params.id);
  req.session.isVerified = hospital.isVerified;
  res.render('hospital/profile', {
    hospital: hospital,
    countryList: countryList
  });
});
//update hospital profile
router.put('/:id', middlware_hasTypeHospital, async (req, res) => {
  req.body.hospital.isVerified = false;
  var status = await con.updateHospital(req.params.id, req.body.hospital);
  req.session.isVerified = false;
  res.redirect('/hospital/' + req.params.id);
});
//=========================================
//                hospital doctors routes
//=========================================
router.get('/:id/doctors', middlware_hasTypeHospital, async (req, res) => {
  var hospital = await con.getHospital(req.params.id);
  req.session.isVerified = hospital.isVerified;
  doctors = [];
  for (i = 0; i < hospital.doctorIds.length; i++) {
    var d = await con.getDoctor(hospital.doctorIds[i])
    doctors.push(d);
  }
  res.render('hospital/doctors', {
    hospital: hospital,
    doctors: doctors
  });
});
// doctor details + list of patients under doctor
router.get('/:id/doctors/:doctorid', middlware_hasTypeHospital, async (req, res) => {
  var hospital = await con.getHospital(req.params.id);
  req.session.isVerified = hospital.isVerified;
  var doctor = await con.getDoctor(req.params.doctorid);
  patients = [];
  for (i = 0; i < doctor.patientIds.length; i++) {
    var p = await con.getPatient(doctor.patientIds[i])
    patients.push(p);
  }
  res.render('hospital/doctor-details', {
    hospital: hospital,
    doctor: doctor,
    patients: patients
  });
});
// updates doctor details from hospital
router.put('/:id/doctors/:doctorid', middlware_hasTypeHospital, async (req, res) => {
  if (req.session.isVerified) {
    var status = await con.updateDoctor(req.params.doctorid, req.body.doctor);
    req.flash('success', 'you successfully updated the doctor details');
  } else {
    req.flash('error', 'you need to be verified to do that');
  }
  var hospitalID = req.params.id;
  var doctorID = req.params.doctorid;
  res.redirect(`/hospital/${hospitalID}/doctors/${doctorID}`);
});
// removes doctor from hospital entity
router.delete('/:id/doctors/:doctorid', middlware_hasTypeHospital, async (req, res) => {
  if (req.session.isVerified) {
    var status = await con.removeDoctorFromHospital(req.params.id, req.params.doctorid);
    req.flash('success', 'you successfully removed the doctor');
  } else {
    req.flash('error', 'you need to be verified to do that');
  }
  var hospitalID = req.params.id;
  res.redirect(`/hospital/${hospitalID}/doctors`);
});
//=========================================
//                hospital patients routes
//=========================================
router.get('/:id/patients', middlware_hasTypeHospital, async (req, res) => {
  var hospital = await con.getHospital(req.params.id);
  req.session.isVerified = hospital.isVerified;
  patients = [];
  for (i = 0; i < hospital.patientIds.length; i++) {
    var p = await con.getPatient(hospital.patientIds[i])
    patients.push(p);
  }
  res.render('hospital/patients', {
    hospital: hospital,
    patients: patients
  });
});
// more info about a patient
router.get('/:id/patients/:patientid', middlware_hasTypeHospital, async (req, res) => {
  var hospital = await con.getHospital(req.params.id);
  req.session.isVerified = hospital.isVerified;
  var patient = await con.getPatient(req.params.patientid);
  res.render('hospital/patient-details', {
    hospital: hospital,
    patient: patient
  });
});
// removes patient from hospital entity
router.delete('/:id/patients/:patientid', middlware_hasTypeHospital, async (req, res) => {
  if (req.session.isVerified) {
    var status = await con.removePatientFromHospital(req.params.id, req.params.patientid);
    req.flash('success', 'you successfully removed the patient');
  } else {
    req.flash('error', 'you need to be verified to do that');
  }
  var hospitalID = req.params.id;
  res.redirect(`/hospital/${hospitalID}/patients`);
});
//=========================================
//                hospital add patient routes
//=========================================
// adds new patient using id
router.post('/:id/patient', middlware_hasTypeHospital, async (req, res) => {
  if (req.session.isVerified) {
    var status = await con.addPatientToHospital(req.params.id, req.body.patientid);
    var status = await con.addPatientToDoctor(req.body.doctorid, req.body.patientid);
    req.flash('success', 'you successfully added the patient');
  } else {
    req.flash('error', 'you need to be verified to do that');
  }
  res.redirect('back');
});
//=========================================
//                hospital add doctor routes
//=========================================
router.get('/:id/doctor/new', middlware_hasTypeHospital, async (req, res) => {
  var hospital = await con.getHospital(req.params.id);
  req.session.isVerified = hospital.isVerified;
  res.render('hospital/doctor-new', {
    hospital: hospital
  })
});
router.post('/:id/doctor', middlware_hasTypeHospital, async (req, res) => {
  if (req.session.isVerified) {
    var status = await con.addDoctorToHospital(req.params.id, req.body.doctor.id);
    req.flash('success', 'you successfully added the doctor');
  } else {
    req.flash('error', 'you need to be verified to do that');
  }
  res.redirect('back')
})
module.exports = router;