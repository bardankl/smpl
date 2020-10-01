import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Animation } from '../../models/api/animation';

@Injectable({
  providedIn: 'root',
})
export class FakeBEService {
  animation: Animation[] = [
    {
      id: 1,
      name: 'Slider from left to right',
    },
    {
      id: 2,
      name: 'Slider from right to left',
    },
  ];

  public getAllAnimations(): Observable<Animation[]> {
    return of(this.animation);
  }
}
