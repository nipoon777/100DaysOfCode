const nodemailer = require("nodemailer");
const { email, password } = require("../mailconfig.js");

const cron = require("node-cron");

const fs = require("fs");
const path = require("path");

let topicList = ["Arrays",
  "Strings",
  "LinkedList",
  "Doubly Linked List",
  "Dynamic Programming",
  "Recursion",
  "HashMap",
  "HashSet",
  "Graph",
  "Trees"];
mailFunctn(topicList);
var message;

function mailFunctn ( topicList ){
    message = [];
    topicList.forEach(topicName => {
        
        let data = fs.readFileSync(path.join(__dirname,topicName, topicName +".json"));

        let dataJSON = JSON.parse(data);
        
        message.push({
            name : dataJSON[0].questionName,
            link : dataJSON[0].questionLink,
            solution : dataJSON[0].solutionLink,
            level : dataJSON[0].questionLevel
        })
        // console.log("Topic Name" + topicName);
    });
    // console.log(message);

}

let mailMessage = "";

for(let i = 0 ; i < message.length ; i++){
    mailMessage += `
    Name of the question : ${message[i].name}
    Link to question : ${message[i].link}
    Link to Solution : ${ message[i].solution}
    Level : ${message[i].level}
    `
}
let count = 1;
let task = cron.schedule("1-10 * * * * * ", () => {
    console.log(count);
    count++;
});

// console.log(mailMessage);

/* 
    Set Mail Options
 */
const mailOptions = {
    from : "donta.nipoon7@gmail.com",
    to : "nipoon.donta7@gmail.com",
    subject : "Day 1 of Code",
    text : `Hello,
    Good Morning! Let's Code `+ 
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


/* Send email */

/* transporter.sendMail(mailOptions, (err, info) => {
    if( err ){
        console.log(err);
    }else{
        console.log("Email Send : " + info.response);
    }
}); */

module.exports = {
    mailFunctn : mailFunctn
}