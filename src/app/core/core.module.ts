import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { ErrorComponent } from './error/error.component';

@NgModule({
    declarations: [
      HomeComponent,
      HeaderComponent,
      ErrorComponent
    ],
    imports: [
    ],
    exports: [
      HeaderComponent // that's inside the app component 
    ]
  })
  export class CoreModule { }
  