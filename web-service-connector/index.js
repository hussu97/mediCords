var middleWareObj = require('../middleware'),
    axios = require('axios'),
    marshaler = require('dynamodb-marshaler');
//FORMAT
// P - H - D - I
const URL = 'http://cloud-python-dev.eu-west-2.elasticbeanstalk.com'
connector = {}
mItem = (item) => {
    return marshaler.marshalItem(item)
};
unMItem = (item) => {
    return marshaler.unmarshalItem(item)
};
connector.addPatient = async patient => {
    try {
        var {
            status
        } = await axios.post(`${URL}/patient`, mItem(patient));
    } catch (err) {
        console.log('error: ' + err);
        return 500;
    }
    console.log(status);
    return status;
}
connector.addHospital = async hospital => {
    try {
        var {
            status
        } = await axios.post(`${URL}/hospital`, mItem(hospital));
    } catch (err) {
        console.log(err);
        return 500;
    }
    return status;
}
connector.addDoctor = async doctor => {
    try {
        var {
            status
        } = await axios.post(`${URL}/doctor`, mItem(doctor));
    } catch (err) {
        console.log(err);
        return 500;
    }
    return status;
}
connector.addInsurance = async insurance => {
    try {
        var {
            status
        } = await axios.post(`${URL}/insurance`, mItem(insurance));
    } catch (err) {
        console.log(err);
        return 500;
    }
    return status;
}
connector.addBill = async (id, bill) => {
    try {
        var {
            status
        } = await axios.post(`${URL}/patient/${id}/bill`, bill);
    } catch (err) {
        console.log(err);
        return 500;
    }
    return status;
}
connector.addOperation = async (id, operation) => {
    try {
        var {
            status
        } = await axios.post(`${URL}/patient/${id}/operation`, operation);
    } catch (err) {
        console.log(err);
        return 500;
    }
    return status;
}
connector.addAllergy = async (id, allergy) => {
    try {
        var {
            status
        } = await axios.post(`${URL}/patient/${id}/allergy`, allergy);
    } catch (err) {
        console.log(err);
        return 500;
    }
    return status;
}
connector.addDisability = async (id, disability) => {
    try {
        var {
            status
        } = await axios.post(`${URL}/patient/${id}/disability`, disability);
    } catch (err) {
        console.log(err);
        return 500;
    }
    return status;
}
connector.addDisease = async (id, disease) => {
    try {
        var {
            status
        } = await axios.post(`${URL}/patient/${id}/disease`, disease);
    } catch (err) {
        console.log(err);
        return 500;
    }
    return status;
}
connector.updatePatient = async (id, patient) => {
    patient.isVerified = false;
    patient.expiry = String(middleWareObj.convertToTimeStamp(patient.expiry));
    try {
        var {
            status
        } = await axios.put(`${URL}/patient/${id}`, mItem(patient));
    } catch (err) {
        console.log(err);
        return 500;
    }
    return status;
}
connector.updateHospital = async (id, hospital) => {
    hospital.expiry = String(middleWareObj.convertToTimeStamp(hospital.expiry));
    console.log(mItem(hospital));
    try {
        var {
            status
        } = await axios.put(`${URL}/hospital/${id}`, mItem(hospital));
    } catch (err) {
        console.log(err);
        return 500;
    }
    return status;
}
connector.updateDoctor = async (id, doctor) => {
    console.log(doctor);
    doctor.isVerified = false;
    doctor.expiry = String(middleWareObj.convertToTimeStamp(doctor.expiry));
    try {
        var {
            status
        } = await axios.put(`${URL}/doctor/${id}`, mItem(doctor));
    } catch (err) {
        console.log(err);
        return 500;
    }
    return status;
}
connector.updateInsurance = async (id, insurance) => {
    insurance.isVerified = false;
    insurance.expiry = String(middleWareObj.convertToTimeStamp(insurance.expiry));
    try {
        var {
            status
        } = await axios.put(`${URL}/insurance/${id}`, mItem(insurance));
    } catch (err) {
        console.log(err);
        return 500;
    }
    return status;
}
connector.getPatient = async id => {
    response = await axios.get(`${URL}/patient/${id}`);
    if (response.status === 200) {
        patient = unMItem(response.data);
        patient.expiry = middleWareObj.convertToDate(Number(patient.expiry));
        patient.bills.forEach((el) => el.date = middleWareObj.convertToDate(Number(el.date)));
        patient.operations.forEach((el) => {
            el.date = middleWareObj.convertToDate(Number(el.date));
            el.dischargeDate = middleWareObj.convertToDate(Number(el.dischargeDate));
        });
        patient.allergies.forEach((el) => el.date = middleWareObj.convertToDate(Number(el.date)));
        patient.diseases.forEach((el) => el.date = middleWareObj.convertToDate(Number(el.date)));
        patient.disabilities.forEach((el) => el.date = middleWareObj.convertToDate(Number(el.date)));
        return patient;
    } else {
        return {
            id: 1
        };
    }
}
connector.getHospital = async id => {
    response = await axios.get(`${URL}/hospital/${id}`);
    if (response.status === 200) {
        hospital = unMItem(response.data);
        hospital.expiry = middleWareObj.convertToDate(Number(hospital.expiry));
        return hospital;
    } else {
        return {
            id: 1
        };
    }
}
connector.getDoctor = async id => {
    response = await axios.get(`${URL}/doctor/${id}`);
    if (response.status === 200) {
        doctor = unMItem(response.data);
        doctor.expiry = middleWareObj.convertToDate(Number(doctor.expiry));
        return doctor;
    } else {
        return {
            id: 1
        };
    }
}
connector.getInsurance = async id => {
    response = await axios.get(`${URL}/insurance/${id}`);
    if (response.status === 200) {
        insurance = unMItem(response.data);
        insurance.expiry = middleWareObj.convertToDate(Number(insurance.expiry));
        return insurance;
    } else {
        return {
            id: 1
        };
    }
}
connector.getCountryPatients = async country => {
    try {
        response = await axios.get(`${URL}/patient/country/${country}`);
        if (response.status === 200) {
            console.log(response.data);
            res = [];
            if (!response.data.length == 0) {
                response.data.forEach((el) => {
                    patient = unMItem(el);
                    patient.expiry = middleWareObj.convertToDate(Number(patient.expiry));
                    res.push(patient);
                })
            }
            return res;
        } else {
            return {
                id: 1
            };
        }
    } catch (err) {
        console.log(err);
    }
}
connector.getCountryHospitals = async country => {
    try {
        response = await axios.get(`${URL}/hospital/country/${country}`);
        if (response.status === 200) {
            console.log(response.data);
            res = [];
            if (!response.data.length == 0) {
                response.data.forEach((el) => {
                    hospital = unMItem(el);
                    hospital.expiry = middleWareObj.convertToDate(Number(hospital.expiry));
                    res.push(hospital);
                })
            }
            return res;
        } else {
            return {
                id: 1
            };
        }
    } catch (err) {
        console.log(err);
    }
}
connector.getCountryDoctors = async country => {
    try {
        response = await axios.get(`${URL}/doctor/country/${country}`);
        if (response.status === 200) {
            console.log(response.data);
            res = [];
            if (!response.data.length == 0) {
                response.data.forEach((el) => {
                    doctor = unMItem(el);
                    doctor.expiry = middleWareObj.convertToDate(Number(doctor.expiry));
                    res.push(doctor);
                })
            }
            return res;
        } else {
            return {
                id: 1
            };
        }
    } catch (err) {
        console.log(err);
    }
}
connector.getCountryInsurances = async country => {
    try {
        response = await axios.get(`${URL}/insurance/country/${country}`);
        if (response.status === 200) {
            console.log(response.data);
            res = [];
            if (!response.data.length == 0) {
                response.data.forEach((el) => {
                    insurance = unMItem(el);
                    insurance.expiry = middleWareObj.convertToDate(Number(insurance.expiry));
                    res.push(insurance);
                })
            }
            return res;
        } else {
            return {
                id: 1
            };
        }
    } catch (err) {
        console.log(err);
    }
}
connector.verifyPatient = async (id, isVerified) => {
    var ver;
    if (isVerified == "true") {
        ver = true;
    } else {
        ver = false;
    }
    try {
        var {
            status
        } = await axios.put(`${URL}/patient/${id}/verify`, mItem({
            isVerified: ver
        }));
    } catch (err) {
        console.log(err);
        return 500;
    }
    return status;
}
connector.verifyHospital = async (id, isVerified) => {
    var ver;
    if (isVerified == "true") {
        ver = true;
    } else {
        ver = false;
    }
    try {
        var {
            status
        } = await axios.put(`${URL}/hospital/${id}/verify`, mItem({
            isVerified: ver
        }));
    } catch (err) {
        console.log(err);
        return 500;
    }
    return status;
}
connector.verifyDoctor = async (id, isVerified) => {
    var ver;
    if (isVerified == "true") {
        ver = true;
    } else {
        ver = false;
    }
    try {
        var {
            status
        } = await axios.put(`${URL}/doctor/${id}/verify`, mItem({
            isVerified: ver
        }));
    } catch (err) {
        console.log(err);
        return 500;
    }
    return status;
}
connector.verifyInsurance = async (id, isVerified) => {
    var ver;
    if (isVerified == "true") {
        ver = true;
    } else {
        ver = false;
    }
    try {
        var {
            status
        } = await axios.put(`${URL}/insurance/${id}/verify`, mItem({
            isVerified: ver
        }));
    } catch (err) {
        console.log(err);
        return 500;
    }
    return status;
}
connector.insuranceChangeBillStatus = async (patientid, billid, state) => {
    try {
        response = await axios.put(`${URL}/patient/${patientid}/bill/${billid}`, mItem({
            status: state
        }));
    } catch (err) {
        console.log(err);
        return 500;
    }
    return response.status;
}
connector.addPatientToDoctor = async (doctorid, patientid) => {
    try {
        var {
            status
        } = await axios.post(`${URL}/doctor/${doctorid}/patient`, {
            patientIds: patientid
        });
    } catch (err) {
        console.log(err);
        return 500;
    }
    return status;
}
connector.addPatientToHospital = async (hospitalid, patientid) => {
    try {
        var {
            status
        } = await axios.post(`${URL}/patient/${patientid}/hospital`, mItem({
            hospitalId: hospitalid
        }));
        if (status === 200) {
            var {
                status
            } = await axios.post(`${URL}/hospital/${hospitalid}/patient`, {
                patientIds: patientid
            });
        }
    } catch (err) {
        console.log(err);
        return 500;
    }
    return status;
}
connector.addPatientToInsurance = async (insuranceid, patientid) => {
    try {
        var {
            status
        } = await axios.post(`${URL}/insurance/${insuranceid}/patient`, {
            patientIds: patientid
        });
        if (status === 200) {
            var {
                status
            } = await axios.post(`${URL}/patient/${patientid}/insurance`, mItem({
                insuranceId: insuranceid
            }));
        }
    } catch (err) {
        console.log(err);
        return 500;
    }
    return status;
}
connector.addDoctorToHospital = async (hospitalid, doctorid) => {
    try {
        var {
            status
        } = await axios.post(`${URL}/doctor/${doctorid}/hospital`, {
            hospitalId: hospitalid
        });
        if (status === 200) {
            var {
                status
            } = await axios.post(`${URL}/hospital/${hospitalid}/doctor`, {
                doctorIds: doctorid
            });
        }
    } catch (err) {
        console.log(err);
        return 500;
    }
    return status;
}
connector.removePatientFromHospital = async (patientid, hospitalid) => {
    try {
        var {
            status
        } = await axios.post(`${URL}/hospital/${hospitalid}/doctor`, {
            doctorIds: doctorid
        });
    } catch (err) {
        console.log(err);
        return 500;
    }
    return status;
}
connector.removePatientFromInsurance = async (insuranceid, patientid) => {
    try {
        var {
            status
        } = await axios.delete(`${URL}/patient/${patientid}/insurance`);
        if (status === 200) {
            var {
                status
            } = await axios.delete(`${URL}/insurance/${insuranceid}/patient`, {
                patientIds: patientid
            });
        }
    } catch (err) {
        console.log(err);
        return 500;
    }
    return status;
}
connector.removeDoctorFromHospital = async (doctorid, hospitalid) => {
    try {
        var {
            status
        } = await axios.delete(`${URL}/doctor/${doctorid}/hospital`, {
            hospitalId: hospitalid
        });
        if (status === 200) {
            var {
                status
            } = await axios.delete(`${URL}/hospital/${hospitalid}/doctor`, {
                doctorIds: doctorid
            });
        }
    } catch (err) {
        console.log(err);
        return 500;
    }
    return status;
}
connector.getGovernment = async id => {
    try {
        response = await axios.get(`${URL}/goverment/${id}`);
        if (response.status === 200) {
            government = unMItem(response.data);
            return government;
        } else {
            return {
                id: 1
            };
        }
    } catch (err) {
        console.log(err);
        return {
            id: 1
        };
    }
}
module.exports = connector;