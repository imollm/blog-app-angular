import { Component, OnInit } from '@angular/core';
import { GetArticleService } from "../../services/get-article.service";
import { Article } from "../../models/article";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  articles: Article[] = [];
  lastArticles = '3';

  constructor(
      private getArticleService: GetArticleService
  ) { }

  ngOnInit(): void {
    this.getLastArticles();
  }

  private async getLastArticles(): Promise<void> {
    const response = await this.getArticleService.send('last', this.lastArticles);
    if (response.status === 'success') {
      this.articles = response.articles;
    }
  }
}
