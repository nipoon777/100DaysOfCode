/*  import all the requirements
  - 1. puppeteer for Automation
 */

const puppeteer = require("puppeteer");
const { getQuestions } = require("./getQuestions");
const { mailFunctn } = require("./mailFunctn");

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

const link = "https://leetcode.com/problemset/algorithms/";

(async function() {
  try {

    /* 
      Iniatiate the Browser
    */
    const browserInstance = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"]
    });

    let newPage = await browserInstance.newPage();
    await newPage.goto(link);
    await newPage.waitForSelector(".form-control.list-search-bar", { visible: true });

    /* Loop Around the Topic Array And run the makeFiles 
    which will make excel files function 
    to get the question name, Link, Level of Difficulty */
    
    for(let i = 0 ; i < topicList.length ; i++ ){
      await getQuestions(".form-control.list-search-bar",topicList[i], newPage );
    }
    /* 
      The mail Function sends Scheduled mails to the user
      The scheduling is dependent on user preference
    
    */
    mailFunctn(topicList);
    browserInstance.close();

  } catch (err) {
    console.log(err);
  }
})();


