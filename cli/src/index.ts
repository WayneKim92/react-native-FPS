import { program } from 'commander';
import { init } from './init';
import { report } from "./report";
import { showLogo } from "./showLogo";

showLogo();

program
    .name('react-native-fps-cli')
    .description('FPS-based RN app performance measurement tool')
    .version('0.0.1')

program.command('init')
    .description('Initialize monitor-backend for react-native-fps')
    .action(init);

program.command('report')
    .description('Generate fps report by period')
    .action(report);

program.parse();

export const cli = program;
