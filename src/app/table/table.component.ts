import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ELEMENT_DATA } from '../core/constants/elements-data';
import { PeriodicElement } from '../core/models/elements-model';
import { ROLE_DATA } from '../core/constants/roles-data';
import { RolesComponent } from '../stepper/roles/roles.component';
import { StepperComponent } from '../stepper/stepper.component';
import { TableService } from './table.service';
import { PeriodicRole } from '../core/models/roles-model';
import { StepperService } from '../stepper/stepper.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'action',
  ];
  dataSource = ELEMENT_DATA;
  roleData = ROLE_DATA;

  constructor(private dialog: MatDialog, private tableService: TableService, private stepperService: StepperService) {  }

  ngOnInit(): void {
    this.tableService.getEditedTableData().subscribe((editedTableData: PeriodicElement[]) => {
      if (editedTableData) {
        this.dataSource = editedTableData;
        this.dataSource = [...this.dataSource];
        console.log('datasource',this.dataSource);
      }
      else{
        console.log('no data received');
      }
    });
  }

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

  // add(id: number) {
  //   console.log('roles dialog clicked for:', id);
  //   const dialogRef = this.dialog.open(RolesComponent, {
  //     width: '600px',
  //     data: { roleData: ROLE_DATA },
  //   });
  // }

  edit(id: number) {
    console.log('Edit clicked for ID:', id);

    const elementToEdit = ELEMENT_DATA.find(
      (element) => element.position === id
    );

    if (elementToEdit) {
      const dialogRef = this.dialog.open(StepperComponent, {
        width: '600px',
        data: elementToEdit,
      });
      // this.stepperService.getSelectedDepartmentsMapObservable().subscribe((selectedDepartments: any) => {
      //   // dialogRef.afterClosed().subscribe((selectedDepartments: any) => {
      //     if (selectedDepartments) {
      //       console.log('Selected Departments hell:', selectedDepartments);
      //     } else {
      //       console.log('Edit dialog closed without selecting roles');
      //     }
      //   });
      }
      // dialogRef.componentInstance.editedData.subscribe(
      //   (editedData: PeriodicElement) => {
      //     console.log('Edited data:', editedData);
      //     if (editedData) {
      //       // Update the ELEMENT_DATA array with the edited data
      //       const index = ELEMENT_DATA.findIndex(
      //         (element) => element.position === editedData.position
      //       );
      //       if (index !== -1) {
      //         ELEMENT_DATA[index] = editedData;
      //         // Update the dataSource for the table to reflect changes
      //         this.dataSource = [...ELEMENT_DATA];
      //       } else {
      //         console.error('Row position:', editedData.position, 'not found');
      //       }
      //     }
      //   }
      // );

    }
  
}





// import { AfterViewInit, Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { EditComponent } from '../edit/edit.component';
// import { ELEMENT_DATA } from '../core/constants/elements-data';
// import { PeriodicElement } from '../core/models/elements-model';
// import { ROLE_DATA } from '../core/constants/roles-data';
// import { RolesComponent } from '../roles/roles.component';
// import { EditService } from '../edit.service';

// @Component({
//   selector: 'app-table',
//   templateUrl: './table.component.html',
//   styleUrls: ['./table.component.css'],
// })
// export class TableComponent  {
//   displayedColumns: string[] = [
//     'position',
//     'name',
//     'weight',
//     'symbol',
//     'action',
//   ];
//   dataSource = ELEMENT_DATA;
//   roleData = ROLE_DATA;

//   constructor(private dialog: MatDialog, private editService: EditService) {}


  
//   // ngAfterViewInit() {
//   //   // Subscribe to updateDataEvent to update data when shared data is updated
//   //   this.editService.updateElementData.subscribe(() => {
//   //     this.updateData();
//   //   });
//   //   console.log('so', this.dataSource);

//   // }

// updateData() {
//   this.editService.getData().subscribe((sharedData: PeriodicElement[]) => {
//     console.log('what',sharedData);
//     if (sharedData && sharedData.length > 0) {
//       const updatedDataSource = [...this.dataSource]; // Create a copy
//       sharedData.forEach((updatedElement) => {
//         const index = updatedDataSource.findIndex((element) => element.position === updatedElement.position);
//         if (index !== -1) {
//           updatedDataSource[index] = updatedElement;
//         } else {
//           console.error('Row position:', updatedElement.position, 'not found');
//         }
//       });
//       this.dataSource = updatedDataSource; // Assign the updated array
//     }
//   });
// }


//   // delete(id: number) {
//   //   console.log('Deleted ID:', id);

//   //   const index = ELEMENT_DATA.findIndex((element) => element.position === id);
//   //   if (index !== -1) {
//   //     // Remove the element at the found index
//   //     this.dataSource.splice(index, 1);
//   //     this.editService.setData(this.dataSource); // Update shared data
//   //   } else {
//   //     console.error('Row ID:', id, 'not found');
//   //   }
//   // }
//     delete(id: number) {
//     console.log('Deleted ID:', id);

//     const index = ELEMENT_DATA.findIndex((element) => element.position === id);
//     if (index !== -1) {
//       // Remove the element at the found index
//       ELEMENT_DATA.splice(index, 1);
//       this.dataSource = [...ELEMENT_DATA];
//     } else {
//       console.error('Row ID:', id, 'not found');
//     }
//   }

//   add(id: number) {
//     console.log('roles dialog clicked for:', id);
//     const dialogRef = this.dialog.open(RolesComponent, {
//       width: '600px',
//       data: { roleData: ROLE_DATA },
//     });
//   }

//   edit(id: number) {
//     console.log('Edit clicked for ID:', id);

//     const elementToEdit = this.dataSource.find(
//       (element) => element.position === id
//     );

//     if (elementToEdit) {
//       const dialogRef = this.dialog.open(EditComponent, {
//         width: '600px',
//         data: elementToEdit,
//       });

//       dialogRef.componentInstance.editedData.subscribe(
//         (editedData: PeriodicElement) => {
//           console.log('Edited data:', editedData);
//           if (editedData) {
//             // Update data through EditService
//             this.editService.updateElementData(editedData).subscribe(() => {
//               console.log('Element data updated successfully');
//             });
//           } else {
//             console.error('Error: Edited data is null or undefined');
//           }
//         }
//       );
//     } else {
//       console.error('Row ID:', id, 'not found');
//     }
//   }
// }




