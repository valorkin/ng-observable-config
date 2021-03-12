import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { ContentDensity } from '../configs/config-as-service';

@Component({
  selector: 'select-component-density',
  template: `
    <label for="density-select">{{label}}</label>

    <select name="pets" id="density-select" (change)="change($event)">
      <option value="">--Please choose an option--</option>
      <option value="cozy">cozy</option>
      <option value="condensed">condensed</option>
      <option value="compact">compact</option>
    </select>
  `
})
export class SelectComponentDensity {
  @Input() label = 'Choose a Density:';

  @Input() value?: ContentDensity;
  @Output() valueChange = new EventEmitter<ContentDensity>();

  change(event: Event): void {
    const value = (event.target as HTMLInputElement).value as ContentDensity;
    this.value = value;
    this.valueChange.emit(value);
  }
}

@NgModule({
  declarations: [SelectComponentDensity],
  exports: [SelectComponentDensity]
})
export class SelectDensityModule {

}
