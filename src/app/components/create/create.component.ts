import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {PostArticleService} from "../../services/http/article/post-article.service";
import {ApiResponse} from "../../models/apiResponse";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent implements OnInit {

  imgPreview: string | undefined;
  form: FormGroup;

  constructor(
      private fb: FormBuilder,
      private postArticleService: PostArticleService
  ) {
    this.form = this.fb.group({
      title: new FormControl(''),
      content: new FormControl(''),
      image: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  previewImage(evt: any): void {
    if (evt.target.files && evt.target.files[0]) {
      const file = evt.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imgPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
      // @ts-ignore
      this.form.get('image').setValue(file);
    }
  }

  get image(): AbstractControl { return <AbstractControl>this.form.get('image'); }

}
