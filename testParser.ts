import * as fs from 'fs';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';

import type { File } from '@babel/types';

const filePaths: string[] = [
    'src/maths/shapes/RoundedRectangle.ts',
    'src/scene/container/Container.ts',
];

const coverageResults: Record<string, boolean> = {};

filePaths.forEach((filePath) =>
{
    const code: string = fs.readFileSync(filePath, 'utf-8');

    const ast: File = parser.parse(code, {
        sourceType: 'module',
        plugins: ['typescript'],
    });

    traverse(ast, {
        enter(path)
        {
            if (path.isExpressionStatement())
            {
                const code: string = path.toString();
                const match: RegExpMatchArray | null = code.match(/coverageResults\['(.*?)'\]/);

                if (match)
                {
                    coverageResults[match[1]] = false;
                }
            }
        },
    });
});

fs.writeFileSync('coverageResults.json', `${JSON.stringify(coverageResults, null, 2)}`);
