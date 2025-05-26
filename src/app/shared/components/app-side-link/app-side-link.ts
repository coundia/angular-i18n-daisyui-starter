import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-side-link',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: 'app-side-link.html'
})
export class SideLinkComponent {
  @Input() link!: string;
  @Input() label!: string;
  @Input() icon?: string;
  @Output() clicked = new EventEmitter<void>();
  onClick() {
    this.clicked.emit();
  }
}
