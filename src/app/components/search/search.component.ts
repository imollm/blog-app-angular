import { Component, OnInit } from '@angular/core';
import {Article} from "../../models/article";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  lastArticles: Article[] = [];
  form: FormGroup;
  title: string = '';

  constructor(
      private fb: FormBuilder
  ) {
    this.form = fb.group({
          toSearch: new FormControl('', Validators.required)
        }
    );
  }

  ngOnInit(): void {

  }

  onSubmit(): void {

  }

}
