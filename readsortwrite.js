"use strict"

var fs = require("fs")
console.log("Let's do this thing!")

// Read in list of CFI's.
//var cfilist = fs.readFileSync("cfis.txt")

fs.readFile('cfis.txt', 'utf8', function(err, fileContents) {
    if(err) throw err



    // All of the regexes!
    // Remove the wrapper regex
    var rtwRegex = (/epubcfi\(([^)]+)\)/)


    // Split the input into lines
    var lineByLine = lineSplitter(fileContents)
    
    // Strip out the epubcfi() wrapper
    let stripped = ""
    lineByLine.forEach((line) => {
        stripped += (line.replace(rtwRegex, '$1')  + '\n')
    })


    // Find the part the represents the start of the range
    let startOfRange = ""
    var holderVar
    stripped = lineSplitter(stripped)
    stripped.forEach((line) => {
        // why regex when you can just split?
        holderVar = line.split(',')
        startOfRange += holderVar[0] + holderVar[1] + '\n'
    })
    //outputLineByLine(startofrange)
    
    // Extract the "nice integers" :-)
    // Back to the regEx for this one
    var eniRegex = /(\/|\:)[0-9]+/g
    let extractedNiceIntegers = ''
    holderVar = ""
    startOfRange = lineSplitter(startOfRange)
    startOfRange.forEach((line) => {
        extractedNiceIntegers += (line.match(/(\/|\:)[0-9]+/g) + '\n')
    })
    //outputLineByLine(extractedNiceIntegers)

    // Trim 'em up!
    holderVar = ""
    let trimmedIntegers = []
    extractedNiceIntegers = lineSplitter(extractedNiceIntegers)
    extractedNiceIntegers.forEach((line) => {
        var next = line.split(',')
        trimmedIntegers.push(next.map(s => Number(s.slice(1))))
    })
    
    console.log(trimmedIntegers.sort())

    // 
    // Lexigraphical sort!



})


// Various string functions

// Output a string line by line
function outputLineByLine(stringBlob) {
    var i = 0;
    stringBlob = lineSplitter(stringBlob)
    stringBlob.forEach((line) => {
        console.log(i++ + ": " + line)
    })
}

// split a string up by newlines
function lineSplitter(blobToSplit) {
    return blobToSplit.split(/\r\n|\n/)
}

/* ****
NOTES:
It's late and I'm doing this as fast as I can!  As such:
*   I tried to name variables in obvious ways that minimized the need for comments
*   Use of camelCase might not be consistent
*   No algorithms (especially the RegExs) were checked for optimization
*   Except for basic functionality little to no refactoring was done
*   There might be some white space or newline leaking here or there 
*   Tests?!  We doan need no stinkin' tests!
**** */


// Lastly, if you've found this on my Repo and have read through all of this and you're somehow
// still curious: https://tinyurl.com/yyjoo77j

