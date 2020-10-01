import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { FormComponent } from './form.component';

@NgModule({
  declarations: [FormComponent],
  imports: [SharedModule],
  exports: [FormComponent],
})
export class FormModule {}
