import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddClothes } from '../../model/AddClothes';

@Component({
  selector: 'app-add-clothes',
  templateUrl: './add-clothes.component.html',
  styleUrls: ['./add-clothes.component.css']
})
export class AddClothesComponent implements OnInit {
  fielesToUpload: File[];

  constructor(private http: HttpClient) { }

  type = ['Góra', 'Dół', 'Buty'];
  addclothesForm: FormGroup;

  ngOnInit() {
    this.addclothesForm = new FormGroup({
      'type': new FormControl('Góra'),
      'formGroupData': new FormGroup({
        'tags': new FormControl(null, Validators.required),
        'description': new FormControl(null, Validators.required)
      })
    });
  }

  onSubmit() {
    var formGroupData = this.addclothesForm.value.formGroupData;

    var addclothesFormData = {
      tags: formGroupData.tags,
      description: formGroupData.description,
      type: this.addclothesForm.value.type,
      image: this.fielesToUpload[0]
    } as AddClothes;
    
    this.http.post('http://127.0.0.1:8000/collection/items', addclothesFormData).subscribe(result => {
      console.log(result);
    });
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  // From drag and drop
  onDropSuccess(event: any) {
      event.preventDefault();
      this.onFileChange(event.dataTransfer.files);    // notice the "dataTransfer" used instead of "target"
  }

  // From attachment link
  onChange(event: any) {
    this.onFileChange(event.target.files);    // "target" is correct here
  }

  private onFileChange(files: File[]) {
    this.fielesToUpload = files;
  }
}
