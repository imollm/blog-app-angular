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
      content: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      const newArticle = this.sendArticleData();
      if (this.form.get('image')) await this.sendArticleImage(newArticle);
    }
  }

  previewImage(evt: any): void {
    if (evt.target.files && evt.target.files[0]) {
      const file = evt.target.files[0];
      const reader = new FileReader();
      this.form.addControl('image', new FormControl(''));
      reader.onload = () => {
        this.imgPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
      // @ts-ignore
      this.form.get('image').setValue(file);
    }
  }

  get image(): AbstractControl { return <AbstractControl>this.form.get('image'); }

  private async sendArticleData(): Promise<ApiResponse> {
    const request = this.postArticleService.send('save', this.form.value);
    return await this.postArticleService.getBody(request);
  }

  private async sendArticleImage(article: any): Promise<void> {
    // TODO : When upload image is called returns error 500
    let formData = new FormData();
    formData.append('id', article.id);
    formData.append('file0', this.image.value);
    await this.postArticleService.send('upload-image', formData);
  }

}
