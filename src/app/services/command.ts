import { Injectable } from '@angular/core';

export interface CommandResponse {
  command: string;
  output: string | string[];
}

@Injectable({
  providedIn: 'root',
})
export class CommandService {
  constructor() {}

  executeCommand(cmd: string): string[] {
    const command = cmd.toLowerCase().trim();

    switch (command) {
      case 'whoami':
        return ['Desenvolvedor focado em Backend e Cloud (Java, Quarkus, AWS).'];
      case 'ls projects':
        return ['cloud-budget-manager/', 'corporate-simulator/'];
      case 'clear':
        return ['CLEAR'];
      case '':
        return [''];
      default:
        return [`Comando não encontrado: ${command}. Digite 'help' para ver as opções.`];
    }
  }
}
