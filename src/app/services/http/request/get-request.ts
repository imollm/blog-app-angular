import { ApiResponse } from "../../../models/apiResponse";

export interface GetRequest {
    send(resource: string, param: string): Promise<ApiResponse>;
}
