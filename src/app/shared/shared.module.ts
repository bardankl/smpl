import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';

@NgModule({
  imports: [],
  exports: [ReactiveFormsModule, FormsModule, CommonModule, ComponentsModule],
})
export class SharedModule {}
