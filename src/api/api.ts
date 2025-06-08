const BASE_URL = "http://localhost:8080";

export type ApiResponse<T> = {
    data: T;
    status: number;
};

type Options = Omit<RequestInit, "body" | "method"> & {
    headers?: Record<string, string>;
};

// Helper to build headers and handle JSON content
function getHeaders(headers?: Record<string, string>) {
    return {
        "Content-Type": "application/json",
        ...(headers || {}),
    };
}

// General fetch wrapper
async function request<T>(url: string, options: RequestInit): Promise<T> {
    const res = await fetch(BASE_URL + url, options);
    if (!res.ok) {
        throw new Error((await res.text()) || `Request failed: ${res.status}`);
    }
    if (res.status === 204) return null as unknown as T;
    return res.json();
}

// GET: always expects an ApiResponse<T> from backend, returns just .data
export async function apiGet<T>(url: string, options?: Options): Promise<T> {
    const result = await request<ApiResponse<T>>(url, {
        method: "GET",
        headers: getHeaders(options?.headers),
        ...options,
    });
    return result.data;
}

// POST: expects ApiResponse<T> from backend, returns just .data
export async function apiPost<T, U = unknown>(
    url: string,
    data?: U,
    options?: Options
): Promise<T> {
    const result = await request<ApiResponse<T>>(url, {
        method: "POST",
        headers: getHeaders(options?.headers),
        body: data ? JSON.stringify(data) : undefined,
        ...options,
    });
    return result.data;
}

// PUT: expects ApiResponse<T> from backend, returns just .data
export async function apiPut<T, U = unknown>(
    url: string,
    data?: U,
    options?: Options
): Promise<T> {
    const result = await request<ApiResponse<T>>(url, {
        method: "PUT",
        headers: getHeaders(options?.headers),
        body: data ? JSON.stringify(data) : undefined,
        ...options,
    });
    return result.data;
}

// PATCH: expects ApiResponse<T> from backend, returns just .data
export async function apiPatch<T, U = unknown>(
    url: string,
    data?: U,
    options?: Options
): Promise<T> {
    const result = await request<ApiResponse<T>>(url, {
        method: "PATCH",
        headers: getHeaders(options?.headers),
        body: data ? JSON.stringify(data) : undefined,
        ...options,
    });
    return result.data;
}

// DELETE: expects ApiResponse<T> from backend, returns just .data
export async function apiDelete<T>(
    url: string,
    options?: Options
): Promise<T> {
    const result = await request<ApiResponse<T>>(url, {
        method: "DELETE",
        headers: getHeaders(options?.headers),
        ...options,
    });
    return result.data;
}
