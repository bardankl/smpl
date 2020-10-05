import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { CreativeDataService } from '../../shared/services/UI/creative/creative-data';

@Component({
  selector: 'somplo-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  isCustomizeShown: BehaviorSubject<
    boolean
  > = this.creativeService.showCustomize();

  constructor(private creativeService: CreativeDataService) {}
  ngOnInit(): void {}
}
