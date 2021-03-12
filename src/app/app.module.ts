import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentWithDefaultConstructorModule } from './consumers/component-with-default-value-in-constructor';
import { ComponentWithDefaultModule } from './consumers/component-with-default-value-on-init';
import { ComponentWithNoDefaultConstructorModule } from './consumers/component-with-no-default-value-in-constructor';
import { ComponentWithNoDefaultModule } from './consumers/component-with-no-default-value-on-init';
import { ComponentWithToken } from './consumers/component-with-token';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentWithDefaultModule,
    ComponentWithDefaultConstructorModule,
    ComponentWithNoDefaultModule,
    ComponentWithNoDefaultConstructorModule,
    ComponentWithToken
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
