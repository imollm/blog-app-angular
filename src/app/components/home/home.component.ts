import { Component, OnInit } from '@angular/core';
import { GetArticleService } from "../../services/http/article/get-article.service";
import { Article } from "../../models/article";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  articles: Article[] = [];
  private readonly lastArticles = '3';
  private readonly endpoint = 'last';

  constructor(
      private getArticleService: GetArticleService
  ) { }

  ngOnInit(): void {
    this.getLastArticles();
  }

  private async getLastArticles() {
    const request = this.getArticleService.send(this.endpoint, this.lastArticles);
    this.articles = await this.getArticleService.getBody(request);
  }
}
