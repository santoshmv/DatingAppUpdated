import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();

  // model: any = {};
  user: User;
  registerForm: FormGroup;
  bsConfig1: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService, private router: Router,
    private alertyfy: AlertifyService, private fb: FormBuilder) { }

  ngOnInit() {
    this.bsConfig1 = {
      containerClass: 'theme-red'
    },

      this.createRegisterForm();
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('',
    //     [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('', Validators.required)
    // }, this.passwordMatchValidator);
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true };

  }

  register() {
    if (this.registerForm.valid) {
      // use JS method Object.assign: First Parameter is empty object is target object
      this.user = Object.assign({}, this.registerForm.value); // clone values and then  assign empty object to user object
      this.authService.register(this.user).subscribe(() => {
        this.alertyfy.success('Registration successfull');
      }, (err) => {
        this.alertyfy.error(err);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      });
    }
    // this.authService.register(this.model).subscribe(() => {
    //   this.alertyfy.success('registration successfull');
    // }, error => {
    //   this.alertyfy.error(error);
    // });
    /* commented above trmporaroly as using ReactiveForms now */

    // console.log(this.registerForm.value);
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }

}
