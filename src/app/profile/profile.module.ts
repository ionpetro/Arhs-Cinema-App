import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { UsersRoutingModule } from './profile-routing.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, UsersRoutingModule],
})
export class ProfileModule {}
