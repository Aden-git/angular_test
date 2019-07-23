import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, MatTableModule, MatProgressSpinnerModule } from '@angular/material';
import { CoreModule } from '../../core';

import { UsersListRoutingModule } from './users-list-routing.module';
import { UsersListComponent } from './components/users-list/users-list.component';

@NgModule({
  declarations: [UsersListComponent],
  imports: [
    CommonModule,
    CoreModule,
    UsersListRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule
  ]
})
export class UsersListModule { }
