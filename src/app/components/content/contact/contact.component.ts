import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact';
import { CollectionsService } from 'src/app/services/collections.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  fields: FormGroup;

  constructor(
    private fb: FormBuilder,
    private collectionService: CollectionsService
  ) {
    this.fields = this.fb.group({
      name: this.fb.control('', [Validators.required, Validators.minLength(2)]),
      email: this.fb.control('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ]),
      contact_number: this.fb.control('', [
        Validators.maxLength(9),
        Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
      ]),
      message: this.fb.control(''),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.fields.valid) {
      const contactData: Contact = {
        id: 7,
        name: this.fields.value.name,
        email: this.fields.value.email,
        contact_number: this.fields.value.contact_number,
        message: this.fields.value.message,
      };
      this.collectionService.putContactData(contactData).subscribe();
    }
    this.fields.reset();
  }

  cleanControls() {
    this.fields.reset();
  }
}
