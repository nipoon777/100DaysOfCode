/*  import all the requirements
  - 1. puppeteer for Automation
  - 2. cheerio and request to extract Data
  - 3. To manipulate in File System */

const puppeteer = require("puppeteer");
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const { makeFiles } = require("./makeFiles");
const { getQuestions } = require("./getQuestions");

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

  } catch (err) {
    console.log(err);
  }
})();


