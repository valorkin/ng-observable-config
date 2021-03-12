import { Component, Inject, Input, NgModule, OnDestroy, OnInit, Optional } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ContentDensity } from '../configs/config-as-service';
import { ConfigAsToken } from '../configs/config-as-token';
import { SelectDensityModule } from '../select-content-density/select-component-density';

@Component({
  selector: 'component-with-default-value',
  template: `
    <h4>Service injected in ngOnInit</h4>
    'property value': "{{compact}}"
    <br>
    'service value': "{{serviceValue}}"
  `
})
export class ComponentWithDefaultValueOnInit implements OnInit, OnDestroy {
  @Input() compact?: ContentDensity;
  serviceValue?: ContentDensity;

  private subscriptions = new Subscription();

  constructor(@Optional() @Inject(ConfigAsToken) private _contentDensityService?: BehaviorSubject<ContentDensity>) {
    this._contentDensityService?.subscribe(value => this.serviceValue = value);
  }

  /** @hidden */
  ngOnInit(): void {
    if (this.compact === undefined && this._contentDensityService) {
      this.subscriptions.add(this._contentDensityService.subscribe(density => {
        // this.compact = density === 'compact';
        this.compact = density;
      }));
    }
  }

  /** @hidden */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

@Component({
  selector: 'demo-with-token',
  providers: [{provide: ConfigAsToken, useValue: new BehaviorSubject('cozy')}],
  template: `
    <h3>config as a token:</h3>
    <br>
    <select-component-density label="Choose a value for input" [(value)]="inputDensity"></select-component-density>
    <br>
    <select-component-density label="Choose a value for service" [(value)]="serviceDensity"
                              (valueChange)="change($event)"></select-component-density>
    <br>
    <component-with-default-value [compact]="inputDensity"></component-with-default-value>
    <br>
  `
})
export class DemoWithDefaultValue {
  serviceDensity?: ContentDensity;
  inputDensity?: ContentDensity;

  constructor(@Optional() @Inject(ConfigAsToken) private _contentDensityService?: BehaviorSubject<ContentDensity>) {
  }

  change(value?: ContentDensity): void {
    if (value) {
      this._contentDensityService?.next(value);
    }
  }

}

@NgModule({
  imports: [SelectDensityModule],
  declarations: [
    ComponentWithDefaultValueOnInit,
    DemoWithDefaultValue,
  ],
  exports: [DemoWithDefaultValue]
})
export class ComponentWithToken {
}
