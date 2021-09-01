import { Injectable } from "@angular/core";
import apiConfig from "../../../api/endpoints.json";
import { sprintf } from "sprintf-js";

@Injectable({
    providedIn: 'root'
})

export class EndpointService {

    private readonly apiUrl: string = '';
    private readonly endpoints: any = {};

    constructor() {
        this.apiUrl = apiConfig.apiUrl + apiConfig.apiVersion;
        this.endpoints = apiConfig.endpoints;
    }

    public getEndpoint(resource: any, param: string = ''): string {
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
