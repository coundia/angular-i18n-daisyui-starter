import { Injectable, signal } from '@angular/core';
import {SortState} from './sort-state.model';

@Injectable({ providedIn: 'root' })
export class SortService {
  readonly state = signal<SortState>({ active: '', direction: '' });

  toggle(field: string) {
    this.state.update(current => {
      if (current.active !== field) return { active: field, direction: 'asc' };
      if (current.direction === 'asc') return { active: field, direction: 'desc' };
      return { active: '', direction: '' };
    });
  }

  isSortedBy(field: string, direction: 'asc' | 'desc') {
    const state = this.state();
    return state.active === field && state.direction === direction;
  }
}
