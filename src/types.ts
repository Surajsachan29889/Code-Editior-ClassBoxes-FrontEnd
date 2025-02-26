export type Theme = 'light' | 'dark';

export interface ApiError {
    data: {
        message: string;
    };
    status: number;
    message: string;
}

export interface SignupResponse {
    token: string;
    data: {
        email: string;
        name: string;
        token: string;
    };
    message: string;
}

export interface LoginResponse {
    token: string;
    message: string;
}

export type GetUserResponse = {
    data: {
        email: string;
        name: string;
    };
    message: string;
}