import { Component, OnInit, OnDestroy, NgZone, ChangeDetectorRef } from '@angular/core';

interface TerminalLine {
  prompt: string;
  text: string;
  out: string;
}

@Component({
  selector: 'app-terminal',
  standalone: true,
  templateUrl: './terminal.html',
})
export class TerminalComponent implements OnInit, OnDestroy {
  step = 0;
  typed = '';
  private intervalId: any;
  private timeoutId: any;

  lines: TerminalLine[] = [
    { prompt: '$', text: 'whoami', out: 'gabriel_braga // fullstack_developer' },
    { prompt: '$', text: 'cat certifications.log', out: 'AWS_SAA // AWS_DVA // AWS_CCP' },
    { prompt: '$', text: 'ls ./stack', out: 'java/ spring/ react/ aws/ docker/ sql/' },
    {
      prompt: '$',
      text: 'echo $FOCUS',
      out: 'scalable systems // cloud architecture // fullstack',
    },
  ];

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.typeNextCommand();
  }

  typeNextCommand() {
    if (this.step >= this.lines.length) return;

    const cmd = this.lines[this.step].text;
    let i = 0;
    this.typed = '';

    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        i++;
        this.typed = cmd.slice(0, i);

        this.cdr.detectChanges();

        if (i >= cmd.length) {
          clearInterval(this.intervalId);

          this.timeoutId = setTimeout(() => {
            this.ngZone.run(() => {
              this.step++;
              this.typeNextCommand();
            });
          }, 700);
        }
      }, 55);
    });
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }
}
