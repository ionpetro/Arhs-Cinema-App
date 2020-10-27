import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  user: Observable<User>;
  currentUser: User;

  constructor(private userService: UserService, public dialog: MatDialog) {
    this.user = this.userService.getUser();
    this.user.subscribe((user) => (this.currentUser = user));
  }

  openDialog(): void {
    this.dialog.open(DeleteDialog, {
      width: '400px',
    });
  }

  ngOnInit(): void {}
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './deleteDialog.html',
})
export class DeleteDialog {
  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<DetailsComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteUser() {
    this.userService.deleteUser().subscribe((_) => this.dialogRef.close());
  }
}
