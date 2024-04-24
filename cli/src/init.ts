import chalk from "chalk";
import inquirer from 'inquirer';
import { spawn } from 'child_process';
import fs from "fs";
import path from "path";
import { getScriptRunDirectoryPath } from "./utils";

export const init = async () => {
    const rootPath = getScriptRunDirectoryPath();
    const reactNativeFpsFolderPath = path.resolve(rootPath, 'react-native-fps');

    if (!fs.existsSync(reactNativeFpsFolderPath)) {
        fs.mkdirSync(reactNativeFpsFolderPath);
    }

    if (!fs.existsSync(path.join(reactNativeFpsFolderPath, 'config.json'))) {
        const {projectName} = await inquirer.prompt([
            {
                type: 'input',
                name: 'projectName',
                message: chalk.blue('Enter') + ' the name of the Supabase project (without spaces):',
            },
        ]);

        const command = `npx supabase projects create ${projectName}`;
        const child = spawn(command, { shell: true, stdio: 'inherit' });

        child.on('error', (error) => {
            console.error(`Error: ${error.message}`);
        });

        child.on('close', async (code) => {
            if (code !== 0) {
                console.log(`Process exited with code: ${code}`);
            } else {
                console.log(chalk.blue('[1]'), 'Open the link to access the Supabase dashboard.');
                console.log(chalk.blue('[2]'), 'Wait until the project is ready');
                console.log(chalk.blue('[3]'), 'Go to Project Settings > API');

                const {apiUrl} = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'apiUrl',
                        message: chalk.blue('Enter') + ' the API URL(You\'ll probably have to wait until the project is ready.):',
                    },
                ]);
                const {anonPublicKey} = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'anonPublicKey',
                        message: chalk.blue('Enter') + ' the API Key(anon public):',
                    },
                ]);

                const config = {
                    apiUrl,
                    anonPublicKey,
                };
                fs.writeFileSync(path.join(reactNativeFpsFolderPath, 'config.json'), JSON.stringify(config, null, 2));

                console.log(chalk.green('[Done]'), 'The backend project required for React-native-fps is ready.')
            }
        });
    } else {
        console.log(chalk.green('[Done]'), 'The backend project required for React-native-fps is ready.')
        console.log(chalk.blue('[Info]'), 'If the react-native-fps/config.json file exists, the backend is considered ready.')
    }

}
