import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'somplo-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() label: string;
  @Input() disabled = false;
  @Input() showAllow = false;
  @Output() btnClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  constructor() {}
  public onButtonClick(event: MouseEvent): void {
    this.btnClick.emit(event);
  }
  ngOnInit(): void {}
}
