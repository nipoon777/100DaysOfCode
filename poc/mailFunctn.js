/* 
    These are all the Imports required for the code
    1. Node mailer - node module to work on mail system
    2. node-cron - Used for scheduling emails
*/

const nodemailer = require("nodemailer");
const { email, password } = require("../mailconfig.js");
const cron = require("node-cron");
const fs = require("fs");
const path = require("path");

var message;

/*
    Schedules emails and sends them
 */
function mailFunctn(topicList) {

    let count = 0;
    /*
        This is the scheduling module to run over time interval
        For now 1 - 10 Seconds
    */
    cron.schedule("1-10 * * * * *", () => {

        if (count < 10) {
            /* 
                Get JSON info of the particular File
             */
            message = [];
            topicList.forEach(topicName => {
                let data = fs.readFileSync(path.join(__dirname, topicName, topicName + ".json"));
                let dataJSON = JSON.parse(data);
                message.push({
                    name: dataJSON[count].questionName,
                    link: dataJSON[count].questionLink,
                    solution: dataJSON[count].solutionLink,
                    level: dataJSON[count].questionLevel
                })
            });
            /* 
                Make the mailMessage object which goes inside text section
            */
            let mailMessage = "";
            for (let i = 0; i < message.length; i++) {
                mailMessage += `
                Name of the question : ${message[i].name}
                Link to question : ${message[i].link}
                Link to Solution : ${message[i].solution}
                Level : ${message[i].level}
                `
            }

            /* 
                Set Mail Options
            */
            const mailOptions = {
                from: "donta.nipoon7@gmail.com",
                to: "siaananyasaxena16@gmail.com",
                subject: `Day ${count} of Code`,
                text: `Hello,
        Good Morning! Let's Code 
                                `+
                    mailMessage +
                    `

        Thanks & Regards,
        Code Buddy
                `
            };
            /* 
                Set Transport configuartion
            */
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: email,
                    pass: password
                }
            });
            /* 
                Send the mail
            */
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Email Send : " + info.response);
                }
            });
            count++;
        }
    });
}
module.exports = {
    mailFunctn: mailFunctn
}