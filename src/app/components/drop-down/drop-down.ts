import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-drop-down',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drop-down.html',
  styleUrl: './drop-down.scss',
})
export class DropDown {
  @Output() unitSelected = new EventEmitter<string>();

  units = [
    'gram',
    'piece',
    'ml'
  ];

  selectedUnit: string = 'gram';
  active: boolean = false;

  path: string = 'assets/img/arrow_drop_down.png';

  toggleDropdown() {
    if (this.active === true) {
      this.active = false;
      this.path = 'assets/img/arrow_drop_down.png';
    } else {
      this.active = true;
      this.path = 'assets/img/arrow_drop_up.png';
    }
  }

  selectUnit(unit: string) {
    this.selectedUnit = unit;
    this.unitSelected.emit(unit);
    this.active = false;
    this.path = 'assets/img/arrow_drop_down.png';
  }
}
