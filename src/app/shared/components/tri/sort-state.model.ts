export type SortDirection = 'asc' | 'desc' | '';

export interface SortState {
  active: string;
  direction: SortDirection;
}
