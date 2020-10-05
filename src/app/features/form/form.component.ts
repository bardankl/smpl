import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Observable, of, Subscription } from 'rxjs';

import { FakeBEService } from '../../shared/services/API/fake-be.service';
import { Animation } from '../../shared/models/api/animation';
import { ANIMATIONS } from '../../shared/constants/animations/animations';
import { CreativeDataService } from '../../shared/services/UI/creative/creative-data';
import { ConfirmationDialogservice } from 'src/app/shared/services/UI/confirmation-dialog/confirmation-dialog.service';
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
  loadedImgUrl: string | ArrayBuffer;
  imgName: string;
  loadedImg: File;
  imgControlTouched = false;
  showCustomize: boolean;
  private subscription: Subscription;
  constructor(
    private fb: FormBuilder,
    private fakeBeService: FakeBEService,
    private dialogService: ConfirmationDialogservice,
    private vcr: ViewContainerRef,
    private creativeService: CreativeDataService
  ) {
    this.form = this.fb.group({
      img: ['', Validators.required],
      animation: [null, Validators.required],
      url: ['', Validators.required, this.validateUrl],
    });
  }

  ngOnInit(): void {
    this.subscription = this.fakeBeService
      .getAllAnimations()
      .subscribe((res) => res && (this.animations = res));
  }
  public fileChangeEvent(img: File): void {
    if (img) {
      this.imgControlTouched = true;
      this.imgName = img.name;
      this.loadedImg = img;

      const reader = new FileReader();
      reader.readAsDataURL(img);

      reader.onload = () => {
        this.loadedImgUrl = reader.result;
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

  public onshowCrop(): void {
    this.creativeService.setCustomizeShown(
      !this.creativeService.showCustomize().value
    );
    this.showCustomize = this.creativeService.showCustomize().value;
  }
  public onSubmit(): void {
    this.link.nativeElement.href = this.creativeService.getCreativeDownloadLink();
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
  }
}
