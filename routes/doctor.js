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
//=========================================
//                doctor profile routes
//=========================================
router.get('/:id', middlware_hasTypeDoctor, (req, res) => {
  res.redirect(`/doctor/${req.params.id}/profile`);
});
router.get('/:id/profile', middlware_hasTypeDoctor, async (req, res) => {
  var doctor = await con.getDoctor(req.params.id);
  if (doctor.id === 1) {
    res.sendFile(path.join(__dirname + '/../500.html'));
  } else {
    req.session.isVerified = doctor.isVerified;
    res.render('doctor/profile', {
      doctor: doctor,
      countryList: countryList
    });
  }
});
//update doctor profile
router.put('/:id/profile', middlware_hasTypeDoctor, async (req, res) => {
  if (req.body.doctor.hospitalId || req.body.doctor.hospitalId == '') {
    req.body.doctor.hospitalId = ' ';
  }
  var status = await con.updateDoctor(req.params.id, req.body.doctor);
  if (status === 200) {
    req.flash('success', 'Doctor successfully updated');
  } else {
    req.flash('error', 'Doctor could not be updated');
  }
  res.redirect(`/doctor/${req.params.id}/profile`);
});
//=========================================
//                doctor patients routes
//=========================================
router.get('/:id/patients', middlware_hasTypeDoctor, async (req, res) => {
  var doctor = await con.getDoctor(req.params.id);
  if (doctor.id === 1) {
    res.sendFile(path.join(__dirname + '/../500.html'));
  } else {
    req.session.isVerified = doctor.isVerified;
    patients = [];
    console.log(doctor.patientIds);
    for (i = 0; i < doctor.patientIds.length; i++) {
      var p = await con.getPatient(doctor.patientIds[i])
      patients.push(p);
    }
    res.render('doctor/patients', {
      doctor: doctor,
      patients: patients
    });
  }
});
// more info about a patient
router.get('/:id/patients/:patientid', middlware_hasTypeDoctor, async (req, res) => {
  var doctor = await con.getDoctor(req.params.id);
  if (doctor.id === 1) {
    res.sendFile(path.join(__dirname + '/../500.html'));
  } else {
    req.session.isVerified = doctor.isVerified;
    var patient = await con.getPatient(req.params.patientid);
    res.render('doctor/patient-details', {
      doctor: doctor,
      patient: patient
    });
  }
});
//=========================================
//                doctor patient add bill route
//=========================================
router.get('/:id/bill/new', middlware_hasTypeDoctor, async (req, res) => {
  var doctor = await con.getDoctor(req.params.id);
  if (doctor.id === 1) {
    res.sendFile(path.join(__dirname + '/../500.html'));
  } else {
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
  }
});
router.post('/:id/bill', middlware_hasTypeDoctor, async (req, res) => {
  if (req.session.isVerified) {
    bill = req.body.bill;
    bill.date = String(middlewareObj.getCurrentTS());
    bill.billId = String(Math.floor(Math.random() * 1000000));
    var status = await con.addBill(req.body.patientid, bill);
    if (status === 200) {
      req.flash('success', 'you successfully added the bill for the patient');
    } else {
      req.flash('error', 'could not add item');
    }
  } else {
    req.flash('error', 'you need to be verified to do that');
  }
  res.redirect('back');
});
//=========================================
//                doctor add medical info routes
//=========================================
router.get('/:id/medical/new', middlware_hasTypeDoctor, async (req, res) => {
  var doctor = await con.getDoctor(req.params.id);
  if (doctor.id === 1) {
    res.sendFile(path.join(__dirname + '/../500.html'));
  } else {
    req.session.isVerified = doctor.isVerified;
    patients = [];
    if (doctor.patientIds) {
      for (i = 0; i < doctor.patientIds.length; i++) {
        var p = await con.getPatient(doctor.patientIds[i])
        patients.push(p);
      }
    }
    res.render('doctor/medical-new', {
      doctor: doctor,
      patients: patients
    })
  }
});
router.post('/:id/operation', middlware_hasTypeDoctor, async (req, res) => {
  if (req.session.isVerified) {
    operation = req.body.operation;
    operation.daysInHospital = moment(operation.dischargeDate).diff(moment(operation.date), 'days')
    operation.date = String(middlewareObj.convertToTimeStamp(operation.date));
    operation.dischargeDate = String(middlewareObj.convertToTimeStamp(operation.dischargeDate));
    var status = await con.addOperation(req.body.patientid, operation);
    if (status === 200) {
      req.flash('success', 'you successfully added the operation for the patient');
    } else {
      req.flash('error', 'could not add item');
    }
  } else {
    req.flash('error', 'you need to be verified to do that');
  }
  res.redirect('back');
});
router.post('/:id/allergy', middlware_hasTypeDoctor, async (req, res) => {
  if (req.session.isVerified) {
    allergy = req.body.allergy;
    allergy.date = String(middlewareObj.getCurrentTS());
    var status = await con.addAllergy(req.body.patientid, allergy);
    if (status === 200) {
      req.flash('success', 'you successfully added the allergy for the patient');
    } else {
      req.flash('error', 'could not add item');
    }
  } else {
    req.flash('error', 'you need to be verified to do that');
  }
  res.redirect('back');
});
router.post('/:id/disability', middlware_hasTypeDoctor, async (req, res) => {
  if (req.session.isVerified) {
    disability = req.body.disability;
    disability.date = String(middlewareObj.getCurrentTS());
    var status = await con.addDisability(req.body.patientid, disability);
    if (status === 200) {
      req.flash('success', 'you successfully added the disability for the patient');
    } else {
      req.flash('error', 'could not add item');
    }
  } else {
    req.flash('error', 'you need to be verified to do that');
  }
  res.redirect('back');
});
router.post('/:id/disease', middlware_hasTypeDoctor, async (req, res) => {
  if (req.session.isVerified) {
    disease = req.body.disease;
    disease.date = String(middlewareObj.getCurrentTS());
    var status = await con.addDisease(req.body.patientid, disease);
    if (status === 200) {
      req.flash('success', 'you successfully added the disease for the patient');
    } else {
      req.flash('error', 'could not add item');
    }
  } else {
    req.flash('error', 'you need to be verified to do that');
  }
  res.redirect('back');
});
module.exports = router;