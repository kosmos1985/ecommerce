import { Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AuthService } from '../auth.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  isLoginMode = true;
  isLoading = false;
  error: string = '';
  

  constructor(private fb:FormBuilder, private authService: AuthService){
   
  }
      
    form_fields = {
      emailFormControl: this.fb.control('', [Validators.required, Validators.email]),
      passwordFormControl: this.fb.control('', [Validators.required, Validators.minLength(6)])
    };

    matcher = new MyErrorStateMatcher();

    switchLoginMode(){
      this.isLoginMode = !this.isLoginMode;
    };

    onSubmit(form: NgForm){
      if(!form.valid){
        return;
      }
      const email = this.form_fields.emailFormControl.value;
      const password = this.form_fields.passwordFormControl.value;

      this.isLoading = true;
      if(this.isLoginMode){
        // ...
      }else{
      this.authService.singUp(email, password).subscribe(resData=>{
          console.log(resData); 
          this.isLoading = false;
        },
        error=>{
          console.log(error);
          this.error = 'An error occurrend!'
          this,this.isLoading = false;
        });
      }
      
      form.reset();
    }

}
