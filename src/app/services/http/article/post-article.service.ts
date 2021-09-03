import { Injectable } from '@angular/core';
import {PostRequest} from "../request/post-request";
import {HttpResponse} from "../response/http-response";
import {ApiResponse} from "../../../models/apiResponse";
import {EndpointService} from "../endpoint/endpoint.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PostArticleService implements PostRequest, HttpResponse{

  constructor(
      private httpClient: HttpClient,
      private endpointService: EndpointService
  ) { }

  send(resource: string, data: any): Promise<ApiResponse> {
    const endpoint = this.endpointService.getEndpoint(resource, data);
    return this.httpClient.post<ApiResponse>(endpoint, data).toPromise();
  }

  async getBody(response: Promise<ApiResponse>): Promise<any> {
    const res = await response;

    if (res.status && res.status !== 'success')
      throw new Error();

    if (res.article)
      return res.article
  }

}
