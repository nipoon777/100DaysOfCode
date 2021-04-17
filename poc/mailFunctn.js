/* 
    These are all the Imports required for the code

*/

const nodemailer = require("nodemailer");
const { email, password } = require("../mailconfig.js");
const cron = require("node-cron");
const fs = require("fs");
const path = require("path");


var message;

function mailFunctn ( topicList ){
    
    let count = 0;
    cron.schedule("1-10 * * * * *", () => {

        if( count < 10 ){
            message = [];
            topicList.forEach(topicName => {
        
                let data = fs.readFileSync(path.join(__dirname,topicName, topicName +".json"));
                let dataJSON = JSON.parse(data);
                
                message.push({
                    name : dataJSON[count].questionName,
                    link : dataJSON[count].questionLink,
                    solution : dataJSON[count].solutionLink,
                    level : dataJSON[count].questionLevel
                })
            });
            let mailMessage = "";
            for(let i = 0 ; i < message.length ; i++){
                mailMessage += `
                Name of the question : ${message[i].name}
                Link to question : ${message[i].link}
                Link to Solution : ${ message[i].solution}
                Level : ${message[i].level}
                `
            }
            
            /* 
                Set Mail Options
            */
            const mailOptions = {
                from : "donta.nipoon7@gmail.com",
                to : "nipoon.donta7@gmail.com",
                subject : `Day ${count} of Code`,
                text : `Hello,
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

            const transporter = nodemailer.createTransport(
                {
                    service : "gmail",
                    auth : {
                        user : email,
                        pass : password
                    }
                }
            );
            
            transporter.sendMail(mailOptions, (err, info) => {
                if( err ){
                    console.log(err);
                }else{
                    console.log("Email Send : " + info.response);
                }
            });
            count++;
        }

     });   
}


module.exports = {
    mailFunctn : mailFunctn
}