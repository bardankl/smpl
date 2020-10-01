import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page.component';
import { HomePageRoutingModule } from './home-page.routing.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [HomePageRoutingModule],
  exports: [HomePageComponent],
})
export class HomePageModule {}
