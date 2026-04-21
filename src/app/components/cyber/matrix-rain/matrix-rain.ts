import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  HostListener,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-matrix-rain',
  standalone: true,
  template: `
    <canvas
      #canvasRef
      class="fixed inset-0 pointer-events-none opacity-25"
      style="z-index: 0;"
    ></canvas>
  `,
})
export class MatrixRainComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasRef') canvasRef!: ElementRef<HTMLCanvasElement>;

  private rafId = 0;
  private chars = 'アァカサタナハマヤラワ0123456789ABCDEF<>/{}[]=+*#$%'.split('');
  private fontSize = 14;
  private columns = 0;
  private drops: number[] = [];
  private ctx!: CanvasRenderingContext2D | null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const canvas = this.canvasRef.nativeElement;
      this.ctx = canvas.getContext('2d');

      this.resize();
      this.draw();
    }
  }

  @HostListener('window:resize')
  resize() {
    if (isPlatformBrowser(this.platformId) && this.canvasRef) {
      const canvas = this.canvasRef.nativeElement;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      this.columns = Math.floor(canvas.width / this.fontSize);
      this.drops = Array(this.columns).fill(1);
    }
  }

  draw = () => {
    if (!this.ctx || !this.canvasRef) return;
    const canvas = this.canvasRef.nativeElement;

    this.ctx.fillStyle = 'rgba(13, 10, 30, 0.08)';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.ctx.font = `${this.fontSize}px monospace`;

    for (let i = 0; i < this.drops.length; i++) {
      const text = this.chars[Math.floor(Math.random() * this.chars.length)];
      const x = i * this.fontSize;
      const y = this.drops[i] * this.fontSize;

      this.ctx.fillStyle = Math.random() > 0.97 ? '#ff2bd6' : 'rgba(0, 230, 255, 0.55)';
      this.ctx.fillText(text, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }
      this.drops[i]++;
    }

    this.rafId = requestAnimationFrame(this.draw);
  };

  ngOnDestroy() {
    if (this.rafId && isPlatformBrowser(this.platformId)) {
      cancelAnimationFrame(this.rafId);
    }
  }
}
