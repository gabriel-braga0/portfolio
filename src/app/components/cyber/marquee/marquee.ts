import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-marquee',
  standalone: true,
  templateUrl: './marquee.html',
})
export class MarqueeComponent implements OnInit {
  @Input({ required: true }) items: string[] = [];
  list: string[] = [];

  ngOnInit() {
    this.list = [...this.items, ...this.items];
  }
}
