import { Injectable } from '@angular/core';
import { ApiResponse } from "../../../models/apiResponse";
import { GetRequest } from "../request/get-request";
import { HttpClient } from "@angular/common/http";
import { EndpointService } from "../endpoint/endpoint.service";
import { HttpResponse } from "../response/http-response";

@Injectable({
  providedIn: 'root'
})
export class GetArticleService implements GetRequest, HttpResponse {

  constructor(
      private httpClient: HttpClient,
      private endpointService: EndpointService
  ) {}

  public send(resource: string, param: string): Promise<ApiResponse> {
    const endpoint = this.endpointService.getEndpoint(resource, param);
    return this.httpClient.get<ApiResponse>(endpoint).toPromise();
  }

  public async getBody(response: Promise<ApiResponse>): Promise<any> {
    const body = await response;

    if (body.status !== 'success')
      throw new Error('');

    if (body.articles.length > 0)
      return body.articles;

    if (body.article)
      return [body.article];

  }
}


