const express = require('express'),
    router = express.Router({
        mergeParams: true
    }),
    con = require('../web-service-connector'),
    middleWareObj = require('../middleware');
middlware_hasTypeGovernment = middleWareObj.isLoggedIn('government');

//=========================================
//                government profile routes
//=========================================
router.get('/:id',middlware_hasTypeGovernment, (req, res) => {
    res.redirect(`/government/${req.params.id}/patients`);
});
//=========================================
//                government patients routes
//=========================================
router.get('/:id/patients',middlware_hasTypeGovernment, async (req, res) => {
    var government = await con.getGovernment(req.params.id);
    console.log(government);
    var patients = await con.getCountryPatients(government.country);
    res.render('government/patients', {
        government : government,
        patients : patients
    });
});
router.put('/:id/patient/:patientid/verify',middlware_hasTypeGovernment,async (req,res)=> {
    var status = await con.verifyPatient(req.params.patientid,req.body.isVerified);
    if(status===200){
        req.flash('success','Record verification change status successful');
    }
    else{
        req.flash('error','Record verification change status unsuccessful');
    }
    res.redirect(`/government/${req.params.id}/patients`)
});
//=========================================
//                government doctors routes
//=========================================
router.get('/:id/doctors', async (req, res) => {
    var government = await con.getGovernment(req.params.id);
    var doctors = await con.getCountryDoctors(government.country);
    res.render('government/doctors', {
        government : government,
        doctors : doctors
    });
});
router.put('/:id/doctor/:doctorid/verify',middlware_hasTypeGovernment,async (req,res)=> {
    var status = await con.verifyDoctor(req.params.doctorid,req.body.isVerified);
    if(status===200){
        req.flash('success','Record verification change status successful');
    }
    else{
        req.flash('error','Record verification change status unsuccessful');
    }
    res.redirect(`/government/${req.params.id}/doctors`)
});

//=========================================
//                government hospitals routes
//=========================================
router.get('/:id/hospitals',middlware_hasTypeGovernment, async (req, res) => {
    var government = await con.getGovernment(req.params.id);
    var hospitals = await con.getCountryHospitals(government.country);
    res.render('government/hospitals', {
        government : government,
        hospitals : hospitals
    });
});
router.put('/:id/hospital/:hospitalid/verify',middlware_hasTypeGovernment,async (req,res)=> {
    var status = await con.verifyHospital(req.params.hospitalid,req.body.isVerified);
    if(status===200){
        req.flash('success','Record verification change status successful');
    }
    else{
        req.flash('error','Record verification change status unsuccessful');
    }
    res.redirect(`/government/${req.params.id}/hospitals`)
});
//=========================================
//                government hospitals routes
//=========================================
router.get('/:id/insurances',middlware_hasTypeGovernment, async (req, res) => {
    var government = await con.getGovernment(req.params.id);
    var insurances = await con.getCountryInsurances(government.country);
    res.render('government/insurances', {
        government : government,
        insurances : insurances
    });
});
router.put('/:id/insurance/:insuranceid/verify',middlware_hasTypeGovernment,async (req,res)=> {
    var status = await con.verifyInsurance(req.params.insuranceid,req.body.isVerified);
    if(status===200){
        req.flash('success','Record verification change status successful');
    }
    else{
        req.flash('error','Record verification change status unsuccessful');
    }
    res.redirect(`/government/${req.params.id}/insurances`)
});
module.exports = router;