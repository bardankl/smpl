import { NgModule } from '@angular/core';

import { CustomizeImageModule } from './customize-image/customize-image.module';
import { ConfirmationDialogModule } from './confirmation-dialog/confirmation-dialog.module';
import { CreativePreviewModule } from './creative-preview/creative-preview.module';
@NgModule({
  imports: [],
  exports: [
    CustomizeImageModule,
    ConfirmationDialogModule,
    CreativePreviewModule,
  ],
  declarations: [],
})
export class ComponentsModule {}
