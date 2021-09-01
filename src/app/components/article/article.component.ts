import { Component, Input, OnInit } from '@angular/core';
import { Article } from "../../models/article";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.sass']
})
export class ArticleComponent implements OnInit {

  @Input('article') article: Article | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
