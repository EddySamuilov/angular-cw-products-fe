import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../types/user';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ElapsedTimePipe } from '../../shared/pipes/elapsed-time.pipe';
import { emailValidator } from '../../utils/email.validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, ElapsedTimePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  isEditMode = false;
  user = {} as User;

  editForm = new FormGroup({
    username: new FormControl(this.user.username, [Validators.required, Validators.minLength(5)]),
    firstName: new FormControl(this.user.firstName),
    lastName: new FormControl(this.user.lastName),
    email: new FormControl(this.user.email, [Validators.required, emailValidator()]),
    imageURL: new FormControl(this.user.imageURL),
    created: new FormControl(this.user.created),
    modified: new FormControl(this.user.modified),
  })

  constructor(private userService: UserService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {
        this.toastrService.error('Something went wrong', err.error);
      }
    });
  }

  triggerEditMode(event: Event) {
    event.preventDefault()
    this.editForm.setValue(this.user);
    this.isEditMode = !this.isEditMode;
  }

  onEditProfile(event: Event): void {
    this.userService.updateUserProfile(this.editForm.value as User).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (err) => {
        this.toastrService.error("Invalid request", err.error);
      },
      complete: () => {
        this.toastrService.success('Profile updated', 'Success')
        this.triggerEditMode(event);
      }
    });
  }
}
