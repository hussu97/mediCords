# MediCords

Medical Records as a service - anywhere, anytime

[![HomePage1](/screenshots/homepage1.png)](http://ec2-34-248-9-135.eu-west-1.compute.amazonaws.com/)
[![HomePage2](/screenshots/homepage2.png)](http://ec2-34-248-9-135.eu-west-1.compute.amazonaws.com/)
[![HomePage3](/screenshots/homepage3.png)](http://ec2-34-248-9-135.eu-west-1.compute.amazonaws.com/)

MediCords is an online platform where patients can register and add their personal and medical information. This information can then be assessed and modified by medical institutions and professionals such as hospitals and doctors. The records are also accessed by insurance companies, who can approve bills and costs incurred by the patient, according to their health plans.

Since there is sensitive information involved, the platform also has a government profile, verifying the personal and corporate details of the entities, to ensure information is only accessible by authorized entities.

## Architecture
![Architecture Diagram](/screenshots/architecture.png)

We used various AWS Technologies and tools to setup and deploy our system, such as:
* [AWS Cognito](https://aws.amazon.com/cognito/) - Authentication
* [AWS EC2](https://aws.amazon.com/ec2/) - Deploying the frontend website of the system
* [Amazon SES](https://aws.amazon.com/ses/) - Simple Email Service provided by Amazon, for sending verification codes while registering
* [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/) - Deploying the web service to the application - **[Web service repository](https://github.com/hussu97/medicords-web-service)**
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

## Additional Screenshots

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