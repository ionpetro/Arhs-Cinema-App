import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { UsersRoutingModule } from './profile-routing.module';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LayoutComponent, DetailsComponent, EditComponent],
  imports: [CommonModule, UsersRoutingModule, ReactiveFormsModule],
})
export class ProfileModule {}
