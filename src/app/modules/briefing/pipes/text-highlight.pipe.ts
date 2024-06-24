import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) return value;

    const regex = /\b(BKN|FEW|SCT)(\d{3})\b/g;
    const highlightedText = value.replace(regex, (match, p1, p2) => {
      const number = parseInt(p2, 10);
      const color = number <= 30 ? '#007bff' : '#ff4136';
      return `<span style="color: ${color};">${match}</span>`;
    });

    return this.sanitizer.bypassSecurityTrustHtml(highlightedText);
  }
}
