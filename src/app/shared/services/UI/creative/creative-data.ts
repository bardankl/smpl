import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Creative } from '../../../models/view/creative/creative';
import { CreativeDimensions } from '../../../models/view/creative/dimensions';

@Injectable({
  providedIn: 'root',
})
export class CreativeDataService {
  private creativeData: BehaviorSubject<Creative> = new BehaviorSubject({
    img: null,
    animation: null,
    url: null,
  });
  private creativeDowloadLink: string;
  private isCustomizeShown: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  private creativeDimensions: CreativeDimensions;
  public setCreativeData(creative: Creative): void {
    this.creativeData.next(creative);
  }

  public getCreativeData(): BehaviorSubject<Creative> {
    return this.creativeData;
  }

  public setCreativeDowloadLink(link: string): void {
    this.creativeDowloadLink = link;
  }

  public getCreativeDownloadLink(): string {
    return this.creativeDowloadLink;
  }
  public setCustomizeShown(isShowen: boolean): void {
    this.isCustomizeShown.next(isShowen);
  }
  public showCustomize(): BehaviorSubject<boolean> {
    return this.isCustomizeShown;
  }
  public setCreativeDimensions(w: number, h: number): void {
    this.creativeDimensions = { w, h };
  }
  public getCreativeDimensions(): CreativeDimensions {
    return this.creativeDimensions;
  }
  public defineImageDimension(url): void {
    const Img = new Image();
    Img.src = url;

    Img.onload = (e: any) => {
      const height = e.path[0].naturalHeight;
      const width = e.path[0].naturalWidth;
      this.setCreativeDimensions(width, height);
    };
  }
}
