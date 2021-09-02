import { Component, OnInit } from '@angular/core';
import { Article } from "../../models/article";
import { GetArticleService } from "../../services/http/article/get-article.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.sass']
})
export class BlogComponent implements OnInit {

  lastArticles: Article[] = [];
  form: FormGroup;
  params: any;
  title: string = '';

  constructor(
      private getArticleService: GetArticleService,
      private fb: FormBuilder
  ) {
    this.form = fb.group({
        title: new FormControl('', Validators.required),
        content: new FormControl('', Validators.required)
      }
    );
  }

  ngOnInit(): void {
    const lastArticles = async () => {
      const request = this.getArticleService.send('last', '3');
      this.lastArticles = await this.getArticleService.getBody(request);
      this.title = 'Last articles';
    }
     lastArticles();
  }

  onSubmit(): void {

  }

}
