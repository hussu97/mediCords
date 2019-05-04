var {patient,insurance,government,hospital,doctor} = require('../public/js/constants');
//patients
connector = {}
connector.addPatient = async patient => {
    return true;
}
connector.addOperation = async (id,operation) => {
    return true;
}
connector.addAllergy = async (id,allergy) => {
    return true;
}
connector.addDisability = async (id,disability) => {
    console.log(disability)
    return true;
}
connector.addDisease = async (id,disease) => {
    return true;
}
connector.getPatient =async id => {
    return patient
}
connector.updatePatient = async (id,patient) => {
    console.log(patient)
    return true;
}
connector.verifyPatient = async (id,isVerified) => {
    console.log(isVerified);
    return true;
}
connector.getCountryPatients = async country => {
    return [patient,patient];
}
connector.getCountryPatients = async country => {
    return [patient,patient];
}
connector.insuranceChangeBillStatus = async (patientid,billid,status) => {
    return true;
}
//hospitals
connector.addHospital = async hospital => {
    return true;
}
connector.getCountryHospitals = async country => {
    return [hospital,hospital];
}
connector.getHospital = async id => {
    return hospital;
}
connector.updateHospital = async (id,hospital) => {
    console.log(hospital)
    return true;
}
connector.verifyHospital = async (id,isVerified) => {
    return true;
}
connector.removeDoctorFromHospital = async (doctorid,hospitalid) => {
    return true;
}
connector.removePatientFromHospital = async (patientid,hospitalid) => {
    return true;
}
connector.addPatientToHospital = async (patientid,hospitalid) => {
    return true;
}
connector.addDoctorToHospital = async (doctorid,hospitalid) => {
    return true;
}
connector.addBill = async (patientid,bill) => {
    console.log(patientid);
    console.log(bill);
    return true;
}
//doctors
connector.addDoctor = async doctor => {
    return true;
}
connector.getCountryDoctors = async country => {
    return [doctor,doctor];
}
connector.getDoctor = async id => {
    return doctor;
}
connector.verifyDoctor = async (id,isVerified) => {
    return true;
}
connector.updateDoctor = async (id,doctor) => {
    console.log(doctor)
    return true;
}
connector.addPatientToDoctor = async (doctorid,patientid) => {
    return true;
}
//insurance
connector.addInsurance = async insurance => {
    return true;
}
connector.getCountryInsurances = async country => {
    return [insurance,insurance];
}
connector.verifyInsurance = async (id,isVerified) => {
    console.log(isVerified);
    return true;
}
connector.getInsurance = async id => {
    return insurance;
}
connector.updateInsurance = async (id,insurance) => {
    console.log(insurance)
    return true;
}
connector.removePatientFromInsurance = async (insuranceid,patientid) => {
    return true;
}
connector.addPatientToInsurance = async (insuranceid,patientid) => {
    return true;
}
//government
connector.getGovernment = async id => {
    return government;
}
module.exports = connector;