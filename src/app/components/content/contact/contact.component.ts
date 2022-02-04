import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  fields: FormGroup;

  constructor(private fb:FormBuilder) { 

    this.fields = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(2)]),
      email: this.fb.control('',[Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      contact_number: this.fb.control('',[Validators.maxLength(9), Validators.pattern("^-?[0-9]\\d*(\\.\\d{1,2})?$")]),
      message: this.fb.control('')
    })

  }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.fields.valid){

    }
    this.fields.reset();
  }

  cleanControls(){
    if(this.fields.invalid || this.fields.valid){
    this.fields.reset();
    }
  }

}
