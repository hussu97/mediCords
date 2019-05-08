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
  if (hospital.id === 1) {
    res.sendFile(path.join(__dirname + '/../500.html'));
  } else {
    res.render('hospital/profile', {
      hospital: hospital,
      countryList: countryList
    });
  }
});
//update hospital profile
router.put('/:id', middlware_hasTypeHospital, async (req, res) => {
  var status = await con.updateHospital(req.params.id, req.body.hospital);
  if (status === 200) {
    req.flash('success', 'Hospital successfully updated');
  } else {
    req.flash('error', 'Hospital could not be updated');
  }
  res.redirect(`/hospital/${req.params.id}/profile`);
});
//=========================================
//                hospital doctors routes
//=========================================
router.get('/:id/doctors', middlware_hasTypeHospital, async (req, res) => {
  var hospital = await con.getHospital(req.params.id);
  if (hospital.id === 1) {
    res.sendFile(path.join(__dirname + '/../500.html'));
  } else {
    doctors = [];
    for (i = 0; i < hospital.doctorIds.length; i++) {
      var d = await con.getDoctor(hospital.doctorIds[i])
      doctors.push(d);
    }
    res.render('hospital/doctors', {
      hospital: hospital,
      doctors: doctors
    });
  }
});
// doctor details + list of patients under doctor
router.get('/:id/doctors/:doctorid', middlware_hasTypeHospital, async (req, res) => {
  var hospital = await con.getHospital(req.params.id);
  if (hospital.id === 1) {
    res.sendFile(path.join(__dirname + '/../500.html'));
  } else {
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
  }
});
// updates doctor details from hospital
router.put('/:id/doctors/:doctorid', middlware_hasTypeHospital, async (req, res) => {
  if (req.session.isVerified) {
    var status = await con.updateDoctor(req.params.doctorid, req.body.doctor);
    if (status === 200) {
      req.flash('success', 'you successfully updated the doctor details');
    } else {
      req.flash('success', 'you could not update the doctor details');
    }
  } else {
    req.flash('error', 'you need to be verified to do that');
  }
  res.redirect(`/hospital/${req.params.id}/doctors/${req.params.doctorid}`);
});
// removes doctor from hospital entity
router.delete('/:id/doctors/:doctorid', middlware_hasTypeHospital, async (req, res) => {
  if (req.session.isVerified) {
    var status = await con.removeDoctorFromHospital(req.params.id, req.params.doctorid);
    if (status === 200) {
      req.flash('success', 'you successfully removed the doctor');
    } else {
      req.flash('error', 'you could not remove the doctor');
    }
  } else {
    req.flash('error', 'you need to be verified to do that');
  }
  res.redirect(`/hospital/${req.params.id}/doctors`);
});
//=========================================
//                hospital patients routes
//=========================================
router.get('/:id/patients', middlware_hasTypeHospital, async (req, res) => {
  var hospital = await con.getHospital(req.params.id);
  if (hospital.id === 1) {
    res.sendFile(path.join(__dirname + '/../500.html'));
  } else {
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
  }
});
// more info about a patient
router.get('/:id/patients/:patientid', middlware_hasTypeHospital, async (req, res) => {
  var hospital = await con.getHospital(req.params.id);
  if (hospital.id === 1) {
    res.sendFile(path.join(__dirname + '/../500.html'));
  } else {
    req.session.isVerified = hospital.isVerified;
    var patient = await con.getPatient(req.params.patientid);
    res.render('hospital/patient-details', {
      hospital: hospital,
      patient: patient
    });
  }
});
// removes patient from hospital entity
router.delete('/:id/patients/:patientid', middlware_hasTypeHospital, async (req, res) => {
  if (req.session.isVerified) {
    var status = await con.removePatientFromHospital(req.params.id, req.params.patientid);
    if (status === 200) {
      req.flash('success', 'you successfully removed the patient');
    } else {
      req.flash('error', 'you could not remove the patient');
    }
  } else {
    req.flash('error', 'you need to be verified to do that');
  }
  res.redirect(`/hospital/${req.params.id}/patients`);
});
//=========================================
//                hospital add patient routes
//=========================================
// adds new patient using id
router.post('/:id/patient', middlware_hasTypeHospital, async (req, res) => {
  if (req.session.isVerified) {
    var status = await con.addPatientToHospital(req.params.id, req.body.patientid);
    if (status === 200) {
      var status = await con.addPatientToDoctor(req.body.doctorid, req.body.patientid);
      if (status === 200) {
        req.flash('success', 'you successfully added the patient');
      } else {
        req.flash('error', 'you could not add the patient');
      }
    } else {
      req.flash('error', 'you could not add the patient');
    }
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
  if (hospital.id === 1) {
    res.sendFile(path.join(__dirname + '/../500.html'));
  } else {
    req.session.isVerified = hospital.isVerified;
    res.render('hospital/doctor-new', {
      hospital: hospital
    })
  }
});
router.post('/:id/doctor', middlware_hasTypeHospital, async (req, res) => {
  if (req.session.isVerified) {
    var status = await con.addDoctorToHospital(req.params.id, req.body.doctor.id);
    if (status === 200) {
      req.flash('success', 'you successfully added the doctor');
    } else {
      req.flash('error', 'you could not added the doctor');
    }
  } else {
    req.flash('error', 'you need to be verified to do that');
  }
  res.redirect('back')
})
module.exports = router;