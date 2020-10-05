import { NgModule } from '@angular/core';
import { CustomizeImageComponent } from './customize-image.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [CustomizeImageComponent],
  imports: [ButtonModule],
  exports: [CustomizeImageComponent],
})
export class CustomizeImageModule {}
