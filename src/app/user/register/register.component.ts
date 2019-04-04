import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user';
import { AuthenticationService } from 'src/app/shared/services/auth.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  returnUrl: string;
  error = '';

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
    this.registerForm = this.createFormGroup();
  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }

  createFormGroup() {
    return new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    const result: User = Object.assign({}, this.registerForm.value);

    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.register(result.username, result.email, result.password)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate(['/']);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
  }

}
