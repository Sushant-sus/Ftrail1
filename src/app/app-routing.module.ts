import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './stepper/edit/edit.component';
import { RolesComponent } from './stepper/roles/roles.component';
import { DepartmentsComponent } from './departments/departments.component';

const routes: Routes = [
  {path: 'EditComponent', component: EditComponent},
  {path: 'RolesComponent', component: RolesComponent},
  {path: 'DepartmentsComponent', component: DepartmentsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
