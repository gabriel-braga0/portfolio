import { Component } from '@angular/core';
import { TerminalComponent } from '../cyber/terminal/terminal';

@Component({
  selector: 'app-resume',
  imports: [TerminalComponent],
  templateUrl: './resume.html',
  styleUrl: './resume.css',
})
export class Resume {}
