import { NgModule } from '@angular/core';
import { ApiService } from './services';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    ApiService
  ]
})
export class CoreModule { }
