import {ApiResponse} from "../../../models/apiResponse";

export interface PostRequest {
    send(resource: string, data: any): Promise<ApiResponse>;
}
