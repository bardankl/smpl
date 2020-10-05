import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CreativeDataService } from '../../services/UI/creative/creative-data';
import { Creative } from '../../models/view/creative/creative';
import { ANIMATIONS } from '../../constants/animations/animations';

@Component({
  selector: 'somplo-creative-preview',
  templateUrl: './creative-preview.component.html',
  styleUrls: ['./creative-preview.component.scss'],
})
export class CreativePreviewComponent implements OnInit {
  @ViewChild('img') img: ElementRef;
  @ViewChild('link') link: ElementRef;
  @ViewChild('creativeEl') creativeEl: ElementRef;
  public animations = ANIMATIONS;
  public styles: SafeHtml;
  public creative: Observable<
    Creative
  > = this.creativeService.getCreativeData();

  constructor(
    private creativeService: CreativeDataService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.creative.pipe(tap(this.prepareCreativeToDowload)).subscribe();
    // .pipe(tap((cr) => this.prepareCreativeToDowload(cr)))
  }
  ngOnChange(event): void {
    console.log('eve', event);
  }
  public onLoadCreative(): void {
    const width = this.creativeEl.nativeElement.naturalWidth;
    const height = this.creativeEl.nativeElement.naturalHeight;
    this.creativeService.setCreativeDimensions(width, height);
  }
  // in this case we use arrow function to get variables in global context (as private var in constructor)
  // or we can avoid it by call this function in tap at 31 string
  private prepareCreativeToDowload = (creative: Creative): void => {
    if (creative?.img) {
    }
    if (creative?.animation) {
      const styles = `<style>${ANIMATIONS[creative.animation].code}</style>`;
      this.styles = this.sanitizer.bypassSecurityTrustHtml(styles);
    }
    if (creative?.img && creative.url && creative.animation) {
      this.link.nativeElement.setAttribute('href', creative.url);
      const url = this.createDownloadLink();
      this.creativeService.setCreativeDowloadLink(url);
    }
    // tslint:disable-next-line: semicolon
  };

  private createDownloadLink(): string {
    const element = this.img.nativeElement.outerHTML;
    const blob = new Blob([element], { type: 'text/html' });
    return URL.createObjectURL(blob);
  }
}
