import { NgModule } from '@angular/core';

import { CustomizeImageModule } from './customize-image/customize-image.module';
import { ConfirmationDialogModule } from './confirmation-dialog/confirmation-dialog.module';
import { CreativePreviewModule } from './creative-preview/creative-preview.module';
import { ButtonModule } from './button/button.module';
import { UtmTagsModule } from './utm-tags/utm-tags.module';
@NgModule({
  imports: [],
  exports: [
    CustomizeImageModule,
    ConfirmationDialogModule,
    CreativePreviewModule,
    ButtonModule,
    UtmTagsModule,
  ],
  declarations: [],
})
export class ComponentsModule {}
