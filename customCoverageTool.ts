import * as fs from 'fs';

// if there is no hit then we are at a loss, the false wont register
// automatise with json => pretest puts it in json
// posttest reads it and puts it in the coverageResults
// pretest and posstest put together

// could rename to preTestResults
export const coverageResults: Record<string, boolean> = JSON.parse(fs.readFileSync('coverageResults.json', 'utf-8'));

// only do this if the file is not empty

export function printResults()
{
    const fileContents = fs.readFileSync('coverageResults.json', 'utf-8');
    let postTestResults: Record<string, boolean> = {};

    if (fileContents.trim() !== '')
    {
        postTestResults = JSON.parse(fileContents);
    }
    else
    {
        postTestResults = coverageResults;
    }

    const fileResults: Record<string, { true: number, false: number }> = {};

    for (const key in postTestResults)
    {
        const fileName = key.split('.')[0];

        if (!fileResults[fileName])
        {
            fileResults[fileName] = { true: 0, false: 0 };
        }

        fileResults[fileName][postTestResults[key] ? 'true' : 'false']++;
    }

    for (const fileName in fileResults)
    {
        const results = fileResults[fileName];
        const percentage = (results.true / (results.true + results.false)) * 100;

        // eslint-disable-next-line
        console.log(`${fileName}: ${percentage.toFixed(2)}%`);
    }
}
