import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page.component';
import { HomePageRoutingModule } from './home-page.routing.module';
import { FormModule } from '../form/form.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [HomePageRoutingModule, FormModule, SharedModule],
  exports: [HomePageComponent],
})
export class HomePageModule {}
