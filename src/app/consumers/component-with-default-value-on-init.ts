import { Component, Input, NgModule, OnChanges, OnDestroy, OnInit, Optional, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ConfigWithPropertyService, ContentDensity } from '../configs/config-as-service';
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
export class ComponentWithDefaultValueOnInit implements OnDestroy {
  // 1. Implicit
  @Input() compact?: ContentDensity = 'compact';

  serviceValue?: ContentDensity;

  private subscriptions = new Subscription();

  constructor(@Optional() private _contentDensityService?: ConfigWithPropertyService ) {
    // 2. Default service value has a precedence
    this.compact = this._contentDensityService?.contentDensity.value ?? this.compact;

    // 3. Disable a subscription if developer set inline density
    // except if set to undefined
    // except if set to default value
    this.subscriptions.add(this._contentDensityService?.contentDensity.subscribe(density => {
      if (density) {
        this.compact = density;
      }
    }));

    this._contentDensityService?.contentDensity.subscribe(value => this.serviceValue = value);
  }

  /** @hidden */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

@Component({
  selector: 'demo-with-default-value',
  providers: [ConfigWithPropertyService],
  template: `
    <h3>component-with-default-value on init:</h3>
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
  serviceDensity?: ContentDensity = 'compact';
  inputDensity?: ContentDensity = 'compact';

  constructor(@Optional() private _contentDensityService: ConfigWithPropertyService ) {

  }

  change(value?: ContentDensity): void {
    if (value) {
      this?._contentDensityService?.contentDensity.next(value);
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
export class ComponentWithDefaultModule {}
