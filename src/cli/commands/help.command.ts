import chalk from 'chalk';
import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(chalk.cyan(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            cli.js --<command> [--arguments]
        Команды:
            --version:                                                       # выводит номер версии
            --help:                                                          # печатает этот текст
            --import <path> <login> <pwd> <host> <db_name> <salt>:           # импортирует данные из TSV
            --generate <n> <filepath> <url>:                                 # генерирует n тестовых наборов данных
    `));
  }
}
