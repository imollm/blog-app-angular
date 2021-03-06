import { Component, OnInit } from '@angular/core';
import { Article } from "../../models/article";
import {GetArticleService} from "../../services/http/article/get-article.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.sass']
})
export class BlogComponent implements OnInit {

  articles: Article[] = [];
  title: string = '';

  constructor(
      private getArticleService: GetArticleService
  ) {
    this.title = 'Last articles';
  }

  ngOnInit(): void {
    const lastArticles = async () => {
      const request = this.getArticleService.send('last', '3');
      this.articles = await this.getArticleService.getBody(request);
    }
    lastArticles();
  }

  getSearchParams(param: string): void {
    this.getArticleWithSearchParams(param);
  }

  private async getArticleWithSearchParams(toSearch: string): Promise<void> {
    const request = this.getArticleService.send('search', toSearch);
    this.articles = await this.getArticleService.getBody(request);
    this.setTitle(toSearch);
  }

  private setTitle(toSearch: string): void {
    this.title = toSearch && this.articles && this.articles.length > 0 ?
        `Articles with '${toSearch}' content` :
        `No articles found`;
  }

}
