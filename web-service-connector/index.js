var {
    patient,
    insurance,
    government,
    hospital,
    doctor
} = require('../public/js/constants'),
    middleWareObj = require('../middleware'),
    axios = require('axios');
//FORMAT
// P - H - D - I
const URL = ''
connector = {}
connector.addPatient = async patient => {
    return {status} = await axios.post(`${URL}`,patient);
}
connector.addHospital = async hospital => {
    return {status} = await axios.post(`${URL}`,hospital);
}
connector.addDoctor = async doctor => {
    return {status} = await axios.post(`${URL}`,doctor);
}
connector.addInsurance = async insurance => {
    return {status} = await axios.post(`${URL}`,insurance);
}

connector.addBill = async (id, bill) => {
    return {status} = await axios.post(`${URL}/${id}`,bill);
}

connector.addOperation = async (id, operation) => {
    return {status} = await axios.post(`${URL}/${id}`,operation);
}
connector.addAllergy = async (id, allergy) => {
    return {status} = await axios.post(`${URL}/${id}`,allergy);
}
connector.addDisability = async (id, disability) => {
    return {status} = await axios.post(`${URL}/${id}`,disability);
}
connector.addDisease = async (id, disease) => {
    return {status} = await axios.post(`${URL}/${id}`,disease);
}

connector.updatePatient = async (id, patient) => {
    patient.isVerified = false;
    patient.expiry = middleWareObj.convertToDate(Number(patient.expiry));
    return true;
}
connector.updateHospital = async (id, hospital) => {
    hospital.isVerified = false;
    hospital.expiry = middleWareObj.convertToDate(Number(hospital.expiry));
    return true;
}
connector.updateDoctor = async (id, doctor) => {
    doctor.isVerified = false;
    doctor.expiry = middleWareObj.convertToDate(Number(doctor.expiry));
    return true;
}
connector.updateInsurance = async (id, insurance) => {
    insurance.isVerified = false;
    insurance.expiry = middleWareObj.convertToDate(Number(insurance.expiry));
    return true;
}

connector.getPatient = async id => {
    response = axios.get(`${URL}/${id}`);
    if(response.statuscode===200){
        patient = response.item;
        patient.expiry = middleWareObj.convertToDate(Number(patient.expiry));
        return patient;
    }else{
        return -1;
    }
}
connector.getHospital = async id => {
    hospital.expiry = middleWareObj.convertToDate(Number(patient.expiry));
    return hospital;
}
connector.getDoctor = async id => {
    doctor.expiry = middleWareObj.convertToDate(Number(doctor.expiry));
    return doctor;
}
connector.getInsurance = async id => {
    insurance.expiry = middleWareObj.convertToDate(Number(insurance.expiry));
    return insurance;
}

connector.getCountryPatients = async country => {
    res = [];
    res.forEach(patient => {
        patient.expiry = middleWareObj.convertToDate(Number(patient.expiry));
    })
    return [patient, patient];
}
connector.getCountryHospitals = async country => {
    res = [];
    res.forEach(hospital => {
        hospital.expiry = middleWareObj.convertToDate(Number(hospital.expiry));
    })
    return [hospital, hospital];
}
connector.getCountryDoctors = async country => {
    res = [];
    res.forEach(doctor => {
        doctor.expiry = middleWareObj.convertToDate(Number(doctor.expiry));
    })
    return [doctor, doctor];
}
connector.getCountryInsurances = async country => {
    res = [];
    res.forEach(insurance => {
        insurance.expiry = middleWareObj.convertToDate(Number(insurance.expiry));
    })
    return [insurance, insurance];
}

connector.verifyPatient = async (id, isVerified) => {
    console.log(isVerified);
    return true;
}
connector.verifyHospital = async (id, isVerified) => {
    return true;
}
connector.verifyDoctor = async (id, isVerified) => {
    return true;
}
connector.verifyInsurance = async (id, isVerified) => {
    console.log(isVerified);
    return true;
}

connector.insuranceChangeBillStatus = async (patientid, billid, status) => {
    return true;
}

connector.addPatientToDoctor = async (doctorid, patientid) => {
    return true;
}
connector.addPatientToHospital = async (patientid, hospitalid) => {
    return true;
}
connector.addPatientToInsurance = async (insuranceid, patientid) => {
    return true;
}
connector.addDoctorToHospital = async (doctorid, hospitalid) => {
    return true;
}

connector.removePatientFromHospital = async (patientid, hospitalid) => {
    return true;
}
connector.removePatientFromInsurance = async (insuranceid, patientid) => {
    return true;
}
connector.removeDoctorFromHospital = async (doctorid, hospitalid) => {
    return true;
}

//government
connector.getGovernment = async id => {
    return government;
}
module.exports = connector;