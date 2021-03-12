import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContentDensity } from './config-as-service';

export const ConfigAsToken = new InjectionToken<BehaviorSubject<ContentDensity>>('content density config', {
  factory: () => new BehaviorSubject<ContentDensity>('cozy')
});

