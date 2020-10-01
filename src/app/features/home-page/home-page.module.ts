import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page.component';
import { HomePageRoutingModule } from './home-page.routing.module';
import { FormModule } from '../form/form.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [HomePageRoutingModule, FormModule],
  exports: [HomePageComponent],
})
export class HomePageModule {}
