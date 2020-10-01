import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [],
  exports: [ReactiveFormsModule, FormsModule, CommonModule],
})
export class SharedModule {}
