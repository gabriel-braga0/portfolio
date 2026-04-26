import { Component, Input } from '@angular/core';

interface Project {
  id: string;
  name: string;
  tag: string;
  desc: string;
  color: string;
}

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  @Input() projects: Project[] = [];
}
