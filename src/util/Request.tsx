import axios from "axios";

export async function makeBackendRequest<T>(endpoint: string, request: any): Promise<T> {
    const params = new URLSearchParams(window.location.search);
    const apiUrl = params.get("apiUrl") ?? "http://127.0.0.1:8080/";
    const response = await axios.post<T>(`${apiUrl}api/v1${endpoint}`, request);
    return response.data;
}
