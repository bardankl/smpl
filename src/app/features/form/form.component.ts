import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FakeBEService } from '../../shared/services/API/fake-be.service';

@Component({
  selector: 'sompo-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscription: Subscription;

  constructor(private fb: FormBuilder, private service: FakeBEService) {
    this.form = this.fb.group({
      img: ['', Validators.required],
      url: ['', Validators.required],
      animationId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.subscription = this.service
      .getAllAnimations()
      .subscribe((re) => console.log(re));
  }
  ngOnDestroy(): void {}
}
