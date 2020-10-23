import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { UsersRoutingModule } from './profile-routing.module';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';

@NgModule({
  declarations: [LayoutComponent, ProfileDetailsComponent],
  imports: [CommonModule, UsersRoutingModule],
})
export class ProfileModule {}
