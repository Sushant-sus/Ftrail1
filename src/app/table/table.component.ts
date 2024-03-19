import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';
import { ELEMENT_DATA } from '../core/constants/elements-data';
import { PeriodicElement } from '../core/models/elements-model';
import { ROLE_DATA } from '../core/constants/roles-data';
import { RolesComponent } from '../roles/roles.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'action',
  ];
  dataSource = ELEMENT_DATA;
  roleData = ROLE_DATA;

  constructor(private dialog: MatDialog) {}

  delete(id: number) {
    console.log('Deleted ID:', id);

    const index = ELEMENT_DATA.findIndex((element) => element.position === id);
    if (index !== -1) {
      // Remove the element at the found index
      ELEMENT_DATA.splice(index, 1);
      this.dataSource = [...ELEMENT_DATA];
    } else {
      console.error('Row ID:', id, 'not found');
    }
  }

  add(id: number) {
    console.log('roles dialog clicked for:', id);
    const dialogRef = this.dialog.open(RolesComponent, {
      width: '600px',
      data: { roleData: ROLE_DATA },
    });
  }

  edit(id: number) {
    console.log('Edit clicked for ID:', id);

    const elementToEdit = ELEMENT_DATA.find(
      (element) => element.position === id
    );

    if (elementToEdit) {
      const dialogRef = this.dialog.open(EditComponent, {
        width: '600px',
        data: elementToEdit,
      });

      dialogRef.componentInstance.editedData.subscribe(
        (editedData: PeriodicElement) => {
          console.log('Edited data:', editedData);
          if (editedData) {
            // Update the ELEMENT_DATA array with the edited data
            const index = ELEMENT_DATA.findIndex(
              (element) => element.position === editedData.position
            );
            if (index !== -1) {
              ELEMENT_DATA[index] = editedData;
              // Update the dataSource for the table to reflect changes
              this.dataSource = [...ELEMENT_DATA];
            } else {
              console.error('Row position:', editedData.position, 'not found');
            }
          }
        }
      );
    } else {
      console.error('Row ID:', id, 'not found');
    }
  }
}
