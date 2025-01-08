import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;

  constructor(rf: RendererFactory2) {
    this.renderer = rf.createRenderer(null, null);
  }

  getSystemTheme(): string {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    } else {
      // dark by default
      return 'dark';
    }
  }

  applyTheme(theme: string): void {
    if (theme === 'dark') {
      this.renderer.setAttribute(document.body, 'cds-theme', 'dark');
    } else {
      this.renderer.setAttribute(document.body, 'cds-theme', 'light');
    }
  }

  initTheme(): void {
    const theme = this.getSystemTheme();
    this.applyTheme(theme);

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        const newTheme = e.matches ? 'dark' : 'light';
        this.applyTheme(newTheme);
      });
  }
}
