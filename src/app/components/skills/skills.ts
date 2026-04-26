import { Component, Input } from '@angular/core';

interface Skill {
  name: string;
  lvl: number;
}

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  @Input() desc?: string = '';
  @Input() skills: Skill[] = [];
}
