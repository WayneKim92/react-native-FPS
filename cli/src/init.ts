import chalk from "chalk";
import inquirer from 'inquirer';
import { spawn } from 'child_process';
import fs from "fs";
import path from "path";
import { sqlCreateFpsTable } from "./consts";
import { getScriptRunDirectoryPath, logWithDelays } from "./utils";

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
                await logWithDelays(chalk.green('-------------- supabase project created --------------'), 1000);
                await logWithDelays(`${chalk.blue('[1]')}  Open the link to access the Supabase dashboard.`, 1000);
                await logWithDelays(`${chalk.blue('[2]')}  Go to Project Settings > API`, 3000);

                const {anonPublicKey} = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'anonPublicKey',
                        message: chalk.blue('Enter') + ' the API Key(anon public):',
                    },
                ]);
                const {apiUrl} = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'apiUrl',
                        message: chalk.blue('Enter') + ' the API URL(You\'ll probably have to wait until the project is ready.):',
                    },
                ]);

                const config = {
                    apiUrl,
                    anonPublicKey,
                };
                fs.writeFileSync(path.join(reactNativeFpsFolderPath, 'config.json'), JSON.stringify(config, null, 2));
                console.log(chalk.green('-------------- supabase project created --------------'));

                console.log(chalk.blue('-------------- table creating for fps measurement --------------'));
                await logWithDelays(`${chalk.blue('[1]')}  Open the link to access the Supabase dashboard.`, 2000);
                await logWithDelays(`${chalk.blue('[2]')}  Go to SQL Editor`, 2000);
                await logWithDelays(`${chalk.blue('[3]')}  Enter the SQL below and run it.`, 2000);
                console.log(chalk.blue('-------------- SQL --------------'));
                console.log(sqlCreateFpsTable);
                console.log(chalk.blue('-------------- SQL --------------'));
                await logWithDelays(`${chalk.blue('[4]')}  Go to Table Editor.`, 3000);

                const {done} = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'done',
                        message: 'Was the table created?:(y/n)',
                    },
                ]);

                if(done === 'y') {
                    console.log(chalk.blue('-------------- table created for fps measurement --------------'));
                    console.log('🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉');
                    console.log('🎉🎉🎉', chalk.green('[Done]'), ' The backend infrastructure for FPS collection is complete.🎉🎉🎉');
                    console.log('🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉');
                } else {
                    console.log(chalk.red('[Error]'), 'Delete the config and supabase project and try again or notify the developer.');
                }
            }
        });
    } else {
        console.log(chalk.green('[Done]'), 'The backend project required for React-native-fps is ready.')
        console.log(chalk.blue('[Info]'), 'If the react-native-fps/config.json file exists, the backend is considered ready.')
    }

}
