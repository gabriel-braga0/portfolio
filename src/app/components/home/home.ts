import {
  Component,
  HostListener,
  OnInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';
import { MatrixRainComponent } from '../cyber/matrix-rain/matrix-rain';
import { TerminalComponent } from '../cyber/terminal/terminal';
import { MarqueeComponent } from '../cyber/marquee/marquee';
import { isPlatformBrowser } from '@angular/common';
import { Projects } from '../projects/projects';
import { Skills } from '../skills/skills';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatrixRainComponent, TerminalComponent, MarqueeComponent, Projects, Skills],
  templateUrl: './home.html',
})
export class Home implements OnInit, OnDestroy {
  coords = { x: 0, y: 0 };
  time = '--:--:--';
  private timer: any;

  items = [
    'NEURAL_LINK',
    'GHOST_IN_THE_SHELL',
    'BLADE_RUNNER',
    'CHROME_DREAMS',
    'WIRED_SOULS',
    'ZERO_DAY',
  ];

  skills_desc = `Infraestrutura calibrada. Integração completa com serviços de nuvem modernos,
        desenvolvimento de APIs robustas e arquiteturas resilientes prontas para produção.`;

  skills = [
    { name: 'Java / Spring Boot', lvl: 85 },
    { name: 'React / Angular', lvl: 75 },
    { name: 'AWS / Cloud', lvl: 80 },
    { name: 'APIs & Microsservices', lvl: 85 },
    { name: 'SQL / NoSQL', lvl: 75 },
    { name: 'Docker / DevOps', lvl: 65 },
  ];
  aboutTags = [
    'fullstack',
    'java',
    'spring boot',
    'react/angular',
    'architecture',
    'aws',
    'quarkus',
  ];

  projects = [
    {
      id: '01',
      name: 'CLOUD_BUDGET_MANAGER',
      tag: 'SERVERLESS / AWS',
      desc: 'Plataforma financeira serverless baseada em arquitetura orientada a eventos, utilizando AWS Lambda, DynamoDB e mensageria para alta escalabilidade e baixo acoplamento.',
      color: 'cyan',
    },
    {
      id: '02',
      name: 'SIMULADOR_CORPORATIVO',
      tag: 'FULLSTACK / WEB',
      desc: 'Aplicação fullstack para simulação de cenários empresariais, com regras de negócio complexas, APIs REST e persistência relacional.',
      color: 'magenta',
    },
    {
      id: '03',
      name: 'REDE_SOCIAL',
      tag: 'MICROSERVICES / REALTIME',
      desc: 'Rede social baseada em microsserviços com comunicação assíncrona e eventos, incluindo suporte a interações em tempo real.',
      color: 'yellow',
    },
    {
      id: '04',
      name: 'EGRESS_SYSTEM',
      tag: 'WEB / CLOUD',
      desc: 'Sistema web para gestão de egressos com integração backend e frontend, deploy em nuvem e foco em usabilidade e manutenção.',
      color: 'cyan',
    },
    {
      id: '05',
      name: 'AWS_INFRASTRUCTURE',
      tag: 'CLOUD / DEVOPS',
      desc: 'Provisionamento de infraestrutura na AWS com configuração de VPC, EC2, RDS e boas práticas de arquitetura escalável.',
      color: 'magenta',
    },
    {
      id: '06',
      name: 'QA_AUTOMATION',
      tag: 'TESTING / AUTOMATION',
      desc: 'Automação de testes end-to-end com execução de cenários e validação de fluxos críticos utilizando ferramentas de QA.',
      color: 'yellow',
    },
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
  ) {}

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.coords = { x: event.clientX, y: event.clientY };
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.time = new Date().toLocaleTimeString('pt-BR');
          this.cdr.detectChanges();
        }, 0);

        this.timer = setInterval(() => {
          this.time = new Date().toLocaleTimeString('pt-BR');
          this.cdr.detectChanges();
        }, 1000);
      });
    }
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}
