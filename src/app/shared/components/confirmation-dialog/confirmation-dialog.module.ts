import { NgModule } from '@angular/core';
import { CustomizeImageComponent } from '../customize-image/customize-image.component';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { CustomizeImageModule } from '../customize-image/customize-image.module';
@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [CustomizeImageModule],
  exports: [ConfirmationDialogComponent],
})
export class ConfirmationDialogModule {}
