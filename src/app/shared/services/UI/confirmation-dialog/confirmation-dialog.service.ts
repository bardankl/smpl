import {
  ComponentFactoryResolver,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { ConfirmationDialogComponent as DialogComponent } from '../../../components/confirmation-dialog/confirmation-dialog.component';

@Injectable({ providedIn: 'root' })
export class ConfirmationDialogservice {
  constructor(private cfr: ComponentFactoryResolver) {}

  showDialog(parent: ViewContainerRef): void {
    const myDynamicComponentFactory = this.cfr.resolveComponentFactory(
      DialogComponent
    );
    parent.createComponent(myDynamicComponentFactory);
  }
}
