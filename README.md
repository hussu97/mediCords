# MediCords

**Medical Records as a service - anywhere, anytime**

[![Website](/screenshots/website.gif)](http://ec2-34-248-9-135.eu-west-1.compute.amazonaws.com/)
**Project for - CMP404 - Cloud Computing**
**Project Duration - February-May 2019**
***
MediCords is an online platform where patients can register and add their personal and medical information. This information can then be assessed and modified by medical institutions and professionals such as hospitals and doctors. The records are also accessed by insurance companies, who can approve bills and costs incurred by the patient, according to their health plans.

Since there is sensitive information involved, the platform also has a government profile, verifying the personal and corporate details of the entities, to ensure information is only accessible by authorized entities.

## Architecture
![Architecture Diagram](/screenshots/architecture.png)

We used various AWS Technologies and tools to setup and deploy our system, such as:
* [AWS Cognito](https://aws.amazon.com/cognito/) - Authentication
* [AWS EC2](https://aws.amazon.com/ec2/) - Deploying the frontend website of the system
* [Amazon SES](https://aws.amazon.com/ses/) - Simple Email Service provided by Amazon, for sending verification codes while registering
* [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) - Deploying the web service to the application - **[Web service repository](https://github.com/hussu97/medicords-web-service)**
> Note: There are two web services, one used by the website, and one accessed externally through a REST Endpoint. Need to have API keys for it. Check out the repo for more info.
* [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) - NoSQL database on amazon, used to store and retrieve entity data

## Requirements
* Node.js
* An amazon AWS account
* Amazon amplify, with a Cognito IAM user role

## Installation
1. Clone the repo by using the following command
``` bash
$ git clone https://github.com/hussu97/mediCords.git
$ cd mediCords
```
2. Install all the npm packages
``` bash
$ npm install
```
3. Start the nodejs server using
``` bash
$ npm start
```
4. Go to http://localhost:3000/ to view the mainpage of the website


> Note: To use authentication in the website, you will need your own Amplify authentication credentials. Once amplify is configured in your project and Cognito is enabled for the project, move the **aws_exports.js** file that is generated into the src/ folder. For more info about Amplify go [here](https://aws-amplify.github.io/docs/js/)

## Functions
* Register and Login as a patient, doctor, hospital, or insurance company
* Get API keys to access mediCords REST endpoint (need to be verified by government)
* Access personal and medical information
* Hospitals can add/remove patients and doctors
* Doctors can add medical information (operations, allergies, diagnosis) for patients, and make bills for them
* Patients can view their medical history, and send bills to their insurance company to approve
* Insurance companies can approve/reject bills, and add/remove customers into their various health plans

## Additional Screenshots
###Homepage
[![HomePage1](/screenshots/homepage1.png)](/screenshots/homepage1.png)
[![HomePage2](/screenshots/homepage2.png)](/screenshots/homepage2.png)
[![HomePage3](/screenshots/homepage3.png)](/screenshots/homepage3.png)
***
### Patient Dashboard
![Patient Dashboard](/screenshots/patient.png)
***
### Doctor Dashboard
![Doctor Dashboard](/screenshots/doctor.png)
***
### Hospital Dashboard
![Hospital Dashboard](/screenshots/hospital.png)
***
### Insurance Dashboard
![Insurance Dashboard](/screenshots/insurance.png)
***
### Government verification Dashboard
![Government verification Dashboard](/screenshots/government.png)
***
## License
[GNUv3](https://github.com/hussu97/mediCords/blob/master/LICENSE)