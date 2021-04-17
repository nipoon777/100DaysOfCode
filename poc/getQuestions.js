/* Each time the function is called 
I have to collected the topic Information and Make Json files for each Topic */


/*  Also Remember to return a promise */

const { makeFiles } = require("./makeFiles");


async function getQuestions(selector, topicName, newPage) {
    await newPage.type(selector, topicName, { delay: 50 });
    await newPage.waitForNavigation({ waitUntil: "networkidle2" });
    await newPage.waitForSelector("td[label='Title']", { visible: true });
    await newPage.waitForSelector("td[label='Title'] a", { visible: true });
    await newPage.waitForSelector("td[label='Difficulty']", { visible: true });
    await newPage.waitForSelector("span.row-selector", { visible: true });

    /* Extract the Code Information and Make Folders */

    function consoleFn(questionSelector, linkSelector, solutionLink, levelDifficulty){
        let queNames = document.querySelectorAll(questionSelector);
        let queLinks = document.querySelectorAll(linkSelector);
        let solLinks = document.querySelectorAll(solutionLink);
        let level = document.querySelectorAll(levelDifficulty);

        let result = [];

        for( let i = 0 ; i < queNames.length ; i++ ){
            let questionName = queNames[i].innerText.trim();
            let questionLink = queLinks[i].href;
            let solutionLink;

            if( solLinks[i].hasChildNodes()){
                solutionLink = solLinks[i].childNodes[0].href
            }else{
                solutionLink = "No Solution Found";
            }
            let questionLevel = level[i].innerText;

            result.push({
                questionName : questionName,
                questionLink : questionLink,
                questionLevel : questionLevel,
                solutionLink : solutionLink
            });
        }

        return result;
    }

    let topicResult = await newPage.evaluate(consoleFn,"td[label = 'Title']", "td[label = 'Title'] a", "td[label='Solution'] ", "td[label='Difficulty']" );

    makeFiles(topicName, topicResult);

    await newPage.keyboard.down("Control");
    await newPage.keyboard.press("Enter");
    await newPage.keyboard.press("a");
    await newPage.keyboard.press("x");

    return newPage.keyboard.up("Control");
}
module.exports = {
    getQuestions: getQuestions
};

