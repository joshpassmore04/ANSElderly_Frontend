import axios from "axios";

const instance = axios.create({
    withCredentials: true,
});

export async function makeBackendRequest<T>(
    endpoint: string,
    request?: any,
    post: boolean = true
): Promise<T> {
    const params = new URLSearchParams(window.location.search);
    let apiUrl = params.get("apiUrl") ?? "http://127.0.0.1:5000/";

    let response;
    if (post) {
        response = await instance.post<T>(`${apiUrl}api/v1${endpoint}`, request);
    } else {
        response = await instance.get<T>(`${apiUrl}api/v1${endpoint}`);
    }

    return response.data;
}
