import { program } from 'commander';
import { init } from './init';
import { report } from "./report";
import { showLogo } from "./showLogo";

showLogo();

program
    .name('react-native-fps-cli')
    .description('FPS-based RN app performance measurement tool')
    .version('0.1.0')

program.command('init')
    .description('Initialize monitor-backend for react-native-fps')
    .action(async () => init());

program.command('report')
    .description('Generate fps report by period')
    .action(async () => report());

program.parse();

