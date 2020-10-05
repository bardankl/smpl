import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';

import { Observable, of, Subscription } from 'rxjs';

import { FakeBEService } from '../../shared/services/API/fake-be.service';
import { Animation } from '../../shared/models/api/animation';
import { ANIMATIONS } from '../../shared/constants/animations/animations';
import { CreativeDataService } from '../../shared/services/UI/creative/creative-data';
import { Creative } from '../../shared/models/view/creative/creative';
@Component({
  selector: 'somplo-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  @ViewChild('test') test: ElementRef;
  @ViewChild('link') link: ElementRef;

  public styles: SafeHtml;
  public form: FormGroup;
  public animations: Animation[];
  public animationClass = ANIMATIONS;
  public imgControlTouched = false;
  public showCustomize: boolean;
  public showTagsError = false;
  public isTagsAddShown = false;
  public loadedImgUrl: string | ArrayBuffer;
  public loadedImg: File;
  private imgName: string;
  private subscription: Subscription;
  private creativeSubscription: Subscription;
  constructor(
    private fb: FormBuilder,
    private fakeBeService: FakeBEService,
    private creativeService: CreativeDataService
  ) {}

  ngOnInit(): void {
    this.creativeSubscription = this.creativeService
      .getCreativeData()
      .subscribe((creative) => {
        this.initForm(creative);
      });

    this.subscription = this.fakeBeService
      .getAllAnimations()
      .subscribe((res) => res && (this.animations = res));
  }
  public fileChangeEvent(img: File): void {
    if (img) {
      this.imgControlTouched = true;
      const imgName = img.name.includes('.jpg') // TODO add enum
        ? img.name.replace('.jpg', '.html')
        : img.name.replace('.png', '.html');
      this.imgName = imgName;
      this.loadedImg = img;

      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => {
        this.loadedImgUrl = reader.result;
        this.creativeService.defineImageDimension(reader.result);

        this.form.controls.img.patchValue(reader.result, { emitEvent: false });
        this.creativeService.setCreativeData(this.form.value);
      };
    }
  }

  public onAnimationPick(event): void {
    this.form.controls.animation.patchValue(event.target.value, {
      emitEvent: false,
    });
    this.creativeService.setCreativeData(this.form.value);
  }

  public onUrlChange(event): void {
    this.creativeService.setCreativeData(this.form.value);
  }

  get formControls(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get formStatus(): boolean {
    return this.form.status === 'INVALID';
  }

  public onshowCrop(e): void {
    this.creativeService.setCustomizeShown(
      !this.creativeService.showCustomize().value
    );
    this.showCustomize = this.creativeService.showCustomize().value;
    this.initForm(this.creativeService.getCreativeData().value);
  }

  public onSubmit(): void {
    const url = this.creativeService.getCreativeDownloadLink();
    this.link.nativeElement.href = url;
    this.link.nativeElement.setAttribute('download', this.imgName);
    this.link.nativeElement.click();
  }

  public onTagsShow(): void {
    if (!this.formControls.url.value && !this.isTagsAddShown) {
      this.showTagsError = true;
    } else {
      this.showTagsError = false;
      this.isTagsAddShown = !this.isTagsAddShown;
    }
  }
  private initForm(creative: Creative): void {
    this.form = this.fb.group({
      img: [creative.img, Validators.required],
      animation: [creative.animation, Validators.required],
      url: [creative.url, Validators.required, this.validateUrl],
    });
  }

  private validateUrl(
    control: AbstractControl
  ): Observable<{ [key: string]: boolean }> | Observable<null> {
    if (!control.value.startsWith('http')) {
      return of({ validUrl: true });
    }
    return of(null);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.creativeSubscription) {
      this.creativeSubscription.unsubscribe();
    }
  }
}
