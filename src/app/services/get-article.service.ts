import { Injectable } from '@angular/core';
import apiConfig from '../api/endpoints.json';
import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "../models/apiResponse";
import { sprintf } from "sprintf-js";

@Injectable({
  providedIn: 'root'
})
export class GetArticleService {

  private readonly apiUrl: string = '';
  private readonly endpoints: any = {};

  constructor(
      private httpClient: HttpClient
  ) {
    this.apiUrl = apiConfig.apiUrl + apiConfig.apiVersion;
    this.endpoints = apiConfig.endpoints;
  }

  public send(resource: string, param: string): Promise<ApiResponse> {
    const url = this.buildUrl(resource, param)
    return this.httpClient.get<ApiResponse>(url).toPromise();
  }

  private buildUrl(resource: any, param: string = ''): string {
    let url = '';

    if (!resource || !this.endpoints.hasOwnProperty(resource)) {
      throw Error('Invalid endpoint');
    }
    url = this.apiUrl + `${this.endpoints[resource].uri}`

    if (param && this.endpoints[resource].hasOwnProperty('param') && this.endpoints[resource].param) {
      url = sprintf(url, param);
    }

    return url;
  }
}
