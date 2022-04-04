import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import any = jasmine.any;
import {User} from '../../models/model/User';
import {DataService} from '../../service/data.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-change-password-finish',
  templateUrl: './change-password-finish.component.html',
  styleUrls: ['./change-password-finish.component.scss'],
})
export class ChangePasswordFinishComponent implements OnInit {
  cpf: FormGroup;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
                ) { }

  ngOnInit() {
    this.cpf = this.fb.group({
      // eslint-disable-next-line max-len
      password: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(16),Validators.pattern('^(?=[^A-Z\\n]*[A-Z])(?=[^a-z\\n]*[a-z])(?=[^0-9\\n]*[0-9])(?=[^#?!@$%^&*\\n-]*[#?!@$%^&*-]).{8,}$')]],
      // eslint-disable-next-line max-len
      newPassword: ['', [Validators.required, Validators.minLength(8),Validators.maxLength(16),Validators.pattern('^(?=[^A-Z\\n]*[A-Z])(?=[^a-z\\n]*[a-z])(?=[^0-9\\n]*[0-9])(?=[^#?!@$%^&*\\n-]*[#?!@$%^&*-]).{8,}$')]],
      otp: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(5),Validators.pattern('^[0-9]*$')]],

    });
  }
  public sendOtp(){
    console.log(window.sessionStorage.getItem('email'));
    this.authService.changePassword(this.cpf.value,window.sessionStorage.getItem('email')).subscribe(
      (data: any) => {
        alert(data.message);
},
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    );
  }
  onSubmit() {
    this.sendOtp();
    sessionStorage.removeItem('email');
    this.router.navigate(['/auth/login']);
  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface



}
