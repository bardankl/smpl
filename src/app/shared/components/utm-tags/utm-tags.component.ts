import {
  Component,
  EventEmitter,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription, zip } from 'rxjs';
import { debounceTime, toArray } from 'rxjs/operators';
import { UTM_TAGS } from '../../constants/utm-tags/utm-tags';
import { CreativeDataService } from '../../services/UI/creative/creative-data';
import { Creative } from '../../models/view/creative/creative';

@Component({
  selector: 'somplo-utm-tags',
  templateUrl: './utm-tags.component.html',
  styleUrls: ['./utm-tags.component.scss'],
})
export class UtmTagsComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private subscription: Subscription;
  @Output() closeTag: EventEmitter<any> = new EventEmitter();
  constructor(
    private fb: FormBuilder,
    private creativeService: CreativeDataService
  ) {
    this.form = this.fb.group({
      source: [''],
      medium: [''],
      campaign: [''],
      content: [''],
      term: [''],
    });
  }

  ngOnInit(): void {
    this.subscription = this.form.valueChanges
      .pipe(debounceTime(300))
      .subscribe((val) => {
        this.updateLink(val);
      });
  }

  public onCloseTags(): void {
    this.closeTag.emit();
  }
  private updateLink(val: object): void {
    let link = this.creativeService.getCreativeData().value.url;
    link = link.includes('?utm_')
      ? link.split('?utm')[0] + this.createLink(val)
      : link + this.createLink(val);

    const creative: Creative = {
      img: this.creativeService.getCreativeData().value.img,
      animation: this.creativeService.getCreativeData().value.animation,
      url: link,
    };
    this.creativeService.setCreativeData(creative);
  }

  private createLink(value: object): string {
    return Object.keys(value).reduce((acc, val, i) => {
      if (value[val]?.length) {
        if (i === 0) {
          return acc + `?${UTM_TAGS[val]}=${value[val]}`;
        }
        return acc + `&${UTM_TAGS[val]}=${value[val]}`;
      }

      return acc;
    }, '');
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
