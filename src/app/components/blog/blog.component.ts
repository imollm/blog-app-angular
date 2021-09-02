import { Component, OnInit } from '@angular/core';
import { Article } from "../../models/article";
import {GetArticleService} from "../../services/http/article/get-article.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.sass']
})
export class BlogComponent implements OnInit {

  lastArticles: Article[] = [];
  params: any;
  title: string = '';

  constructor(
      private getArticleService: GetArticleService
  ) {
    this.title = 'Last articles';
  }

  ngOnInit(): void {
    const lastArticles = async () => {
      const request = this.getArticleService.send('last', '3');
      this.lastArticles = await this.getArticleService.getBody(request);
    }
    lastArticles();
  }

}
