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
  /** Emits the measurement unit selected by the user. */
  @Output() unitSelected = new EventEmitter<string>();

  /** Measurement units available in the dropdown. */
  units = [
    'gram',
    'piece',
    'ml'
  ];

  /** Currently selected measurement unit. */
  selectedUnit: string = 'gram';

  /** Indicates whether the dropdown menu is open. */
  active: boolean = false;

  /** Path to the icon representing the current dropdown state. */
  path: string = 'assets/img/arrow_drop_down.png';

  /** Toggles the dropdown menu and updates its arrow icon. */
  toggleDropdown(): void {
    if (this.active === true) {
      this.active = false;
      this.path = 'assets/img/arrow_drop_down.png';
    } else {
      this.active = true;
      this.path = 'assets/img/arrow_drop_up.png';
    }
  }

  /**
   * Selects and emits a measurement unit, then closes the dropdown.
   *
   * @param unit Measurement unit selected by the user.
   */
  selectUnit(unit: string): void {
    this.selectedUnit = unit;
    this.unitSelected.emit(unit);
    this.active = false;
    this.path = 'assets/img/arrow_drop_down.png';
  }
}
