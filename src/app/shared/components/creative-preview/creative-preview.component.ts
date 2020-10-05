import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CreativeDataService } from '../../services/UI/creative/creative-data';
import { Creative } from '../../models/view/creative/creative';
import { ANIMATIONS } from '../../constants/animations/animations';

@Component({
  selector: 'somplo-creative-preview',
  templateUrl: './creative-preview.component.html',
  styleUrls: ['./creative-preview.component.scss'],
})
export class CreativePreviewComponent
  implements OnInit, OnDestroy, AfterContentChecked {
  @ViewChild('img') img: ElementRef;
  @ViewChild('link') link: ElementRef;
  @ViewChild('creativeEl') creativeEl: ElementRef;

  public animations = ANIMATIONS;
  public styles: SafeHtml;
  public creativeSub: Subscription;
  public creative: Creative = { img: null, animation: null, url: null };

  constructor(
    private creativeService: CreativeDataService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}
  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
    this.creativeSub = this.creativeService
      .getCreativeData()
      .pipe(tap(this.prepareCreativeToDowload))
      .subscribe();
  }
  ngOnChange(event): void {}
  public onLoadCreative(): void {
    const width = this.creativeEl.nativeElement.naturalWidth;
    const height = this.creativeEl.nativeElement.naturalHeight;
    this.creativeService.setCreativeDimensions(width, height);
  }

  private prepareCreativeToDowload = (creative: Creative): void => {
    if (creative?.url) {
      this.creative.url = creative.url;
    }
    if (creative?.img) {
      this.setCreative(creative);
    }
    if (creative?.animation) {
      const styles = `<style>${ANIMATIONS[creative.animation].code}</style>`;
      this.styles = this.sanitizer.bypassSecurityTrustHtml(styles);
    }
    if (creative?.img && creative.url && creative.animation && this.link) {
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
  private setCreative(creative: Creative): void {
    const { w, h } = {
      ...this.creativeService.getCreativeDimensions(),
    };
    const elementStyle = this.creativeEl.nativeElement.style;
    elementStyle.width = w + 'px';
    elementStyle.height = h + 'px';
    elementStyle.backgroundImage = 'url(' + creative.img + ')';
    this.creative = creative;
  }
  ngOnDestroy(): void {
    if (this.creativeSub) {
      this.creativeSub.unsubscribe();
    }
  }
}
