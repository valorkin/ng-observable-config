import { Component, Input, NgModule, OnChanges, OnDestroy, OnInit, Optional, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
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
export class ComponentWithDefaultValueOnInit implements OnInit, OnDestroy {
  @Input() compact?: ContentDensity;
  serviceValue?: ContentDensity;

  private subscriptions = new Subscription();

  constructor(@Optional() private _contentDensityService?: ConfigWithPropertyService ) {
    this._contentDensityService?.contentDensity.subscribe(value => this.serviceValue = value);
  }

  /** @hidden */
  ngOnInit(): void {
    if (this.compact === undefined && this._contentDensityService) {
      this.subscriptions.add(this._contentDensityService.contentDensity.subscribe(density => {
        // this.compact = density === 'compact';
        this.compact = density ?? 'compact';
      }));
    }
  }

  /** @hidden */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

@Component({
  selector: 'demo-with-no-default-value',
  providers: [ConfigWithPropertyService],
  template: `
    <h3>component-with-NO-default-value on init:</h3>
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

  constructor(@Optional() private _contentDensityService?: ConfigWithPropertyService ) {

  }

  change(value?: ContentDensity): void {
    if (value) {
      this._contentDensityService?.contentDensity.next(value);
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
export class ComponentWithNoDefaultModule {}
