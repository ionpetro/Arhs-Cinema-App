import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { UsersRoutingModule } from './profile-routing.module';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [LayoutComponent, DetailsComponent],
  imports: [CommonModule, UsersRoutingModule],
})
export class ProfileModule {}
