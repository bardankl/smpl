import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ConfirmationDialogservice } from '../../shared/services/UI/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'somplo-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private dialogService: ConfirmationDialogservice,
    private vcr: ViewContainerRef
  ) {}

  ngOnInit(): void {
    // this.dialogService.showDialog(this.vcr);
  }
}
