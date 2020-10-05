import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtmTagsComponent } from './utm-tags.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormModule } from 'src/app/features/form/form.module';

@NgModule({
  declarations: [UtmTagsComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [UtmTagsComponent],
})
export class UtmTagsModule {}
