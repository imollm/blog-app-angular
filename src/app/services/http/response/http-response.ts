import { ApiResponse } from "../../../models/apiResponse";

export interface HttpResponse {
    getBody(promise: Promise<ApiResponse>): any;
}
