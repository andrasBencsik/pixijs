import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { printResults } from './customCoverageTool';

exec('npx jest --silent --json --outputFile=jestFinished.json', (error, stderr) =>
{
    if (error)
    {
        console.error(`Error: ${error.message}`);
    }
    if (stderr)
    {
        console.error(`stderr: ${stderr}`);
    }

    if (fs.existsSync(path.join(__dirname, 'jestFinished.json')))
    {
        printResults();
        fs.unlinkSync(path.join(__dirname, 'jestFinished.json'));
    }
});
