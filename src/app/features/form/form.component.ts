import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Observable, of, Subscription } from 'rxjs';

import { FakeBEService } from '../../shared/services/API/fake-be.service';
import { Animation } from '../../shared/models/api/animation';
import { AnimationsTypes } from '../../shared/constants/animations/animation_types';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ANIMATIONS } from '../../shared/constants/animations/animations';
@Component({
  selector: 'somplo-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  @ViewChild('test') test: ElementRef;
  @ViewChild('link') link: ElementRef;
  @ViewChild('preview') preview: ElementRef;

  myStyle: SafeHtml;

  form: FormGroup;
  subscription: Subscription;
  animations: Animation[];
  loadedImgUrl: string | ArrayBuffer;
  imgName: string;
  loadedImg: File;
  imgControlTouched = false;
  pickedAnimationType = AnimationsTypes;
  constructor(
    private fb: FormBuilder,
    private fakeBeService: FakeBEService,
    private el: ElementRef,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer
  ) {
    this.form = this.fb.group({
      img: ['', Validators.required],
      animationId: [null, Validators.required],
      url: ['', Validators.required, this.validateUrl],
    });
  }
  // TODO add animation to preview
  ngOnInit(): void {
    this.subscription = this.fakeBeService
      .getAllAnimations()
      .subscribe((res) => res && (this.animations = res));

    this.myStyle = this.sanitizer.bypassSecurityTrustHtml(
      ANIMATIONS.SLIDE_LEFT.code
    );
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
        this.renderer.addClass(this.preview.nativeElement, 'slideRight');
        console.log(this.preview);
      };
      setTimeout(() => {
        const f = this.el.nativeElement.outerHTML;
        const blob = new Blob([f], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        this.link.nativeElement.href = url;
      }, 200);
    }
  }
  public onAnimationPick(event): void {
    console.log(event.target);
  }
  get formControls(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  get formStatus(): boolean {
    return this.form.status === 'INVALID';
  }
  public onSubmit(): void {
    console.log('SUBmiT');
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
