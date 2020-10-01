import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FakeBEService } from '../../shared/services/API/fake-be.service';
import { Animation } from '../../shared/models/api/animation';

@Component({
  selector: 'sompo-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscription: Subscription;
  animations: Animation[];
  constructor(private fb: FormBuilder, private fakeBeService: FakeBEService) {
    this.form = this.fb.group({
      img: ['', Validators.required],
      url: ['', Validators.required],
      animationId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.subscription = this.fakeBeService
      .getAllAnimations()
      .subscribe((response) => response && (this.animations = response));
  }
  ngOnDestroy(): void {}
}
