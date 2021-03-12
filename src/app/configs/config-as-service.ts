import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

export type ContentDensity = 'cozy' | 'condensed' | 'compact';

/**
 * This conversation was marked as resolved by valorkin
 * Service taking care of ContentDensity
 */
@Injectable()
export class ConfigWithPropertyService {
  contentDensity = new BehaviorSubject<ContentDensity>('cozy');
}


@Injectable()
export class ConfigWithoutPropertyService {
  private readonly contentDensity = new BehaviorSubject<ContentDensity>('cozy');

  subscribe = this.contentDensity.subscribe;
  next = this.contentDensity.next;
}
