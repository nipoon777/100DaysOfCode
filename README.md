# 100DaysOfCode

The nodeJS scripts fetches question information from leetCode.
The user is notified over email about the 10 questions to practice daily.

#Functions 
* Main Function - 
1. leetcode.js
    -- leetcode.js

            1. Puppeteer
            2. getQuestions 
            3. mailFunctions are required

            The browerscreen is launched, a topicList array is initiated to the list of topicwise questions

            - getQuestions function is called which makes folder directories and json files

            - mailFunctn is called which will schedule and send email to the user.

2. getQuestions(link, topicName, newPage)

    -- getQuestions.js
            1.Puppeteer
            2.makeFiles

        Using puppeteer extracts the question information like
            1. questionName
            2. questionLink
            3. solutionLink (if a solution is provided by leetcode)
            4. level of difficulty of the question
        
        Further makes a call to the makeFiles function which will make Directories and Json files for a particular 
        topic.

        returns a Promise once work is done for a particular topicName.
3. mailFunctn([]topicList)

    -- mailFunctn.js
            1.nodemailer
            2.node-cron (scheduling module)

        Extract the Information for each topic, different question for a different day
        This is achieved by looping through the data

    node-cron module is used to schedule the mailing service

    # ┌────────────── second (optional)
    # │ ┌──────────── minute
    # │ │ ┌────────── hour
    # │ │ │ ┌──────── day of month
    # │ │ │ │ ┌────── month
    # │ │ │ │ │ ┌──── day of week
    # │ │ │ │ │ │
    # │ │ │ │ │ │
    # * * * * * *

4. makeFiles(fileName)
    -- makeFiles.js
            1.fs
            2.path
        Make file directories and json files on the provided filePath
