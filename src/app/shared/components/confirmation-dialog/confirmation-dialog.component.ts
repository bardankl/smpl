import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'somplo-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onOverlayClicked(evt: MouseEvent): void {
    // close the dialog
  }

  onDialogClicked(evt: MouseEvent): void {
    evt.stopPropagation();
  }
}
