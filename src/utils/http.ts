import axios, { AxiosError, AxiosInstance } from "axios";
import { AuthResponse } from "$types/auth.type";
import { ACCESS_TOKEN_KEY, HTTP_STATUS } from "./constant";
import { getValue, removeValue, saveValue } from "./secure-store";
import configs from "$configs/index";

const baseURL = "http://10.0.2.2:8123";

class Http {
    private accessToken: string | null = null;
    instance: AxiosInstance;

    constructor() {
        this.initialize();

        this.instance = axios.create({
            baseURL: baseURL,
            timeout: 10000,
            headers: {
                "Content-Type": "application/json",
            },
        });

        this.instance.interceptors.request.use(
            async (config) => {
                if (!this.accessToken) {
                    this.accessToken = await getValue(ACCESS_TOKEN_KEY);
                }
                if (this.accessToken && config.headers) {
                    config.headers.Authorization = `${this.accessToken}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.instance.interceptors.response.use(
            async (response) => {
                const { url, method } = response.config;
                if (method === "post" && url === configs.routes.login) {
                    this.accessToken = (
                        response.data as AuthResponse
                    ).data.access_token;
                    await saveValue(ACCESS_TOKEN_KEY, this.accessToken);
                } else if (url === configs.routes.logout) {
                    this.accessToken = null;
                    await removeValue(ACCESS_TOKEN_KEY);
                }
                return response;
            },
            (error: AxiosError) => {
                if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
                    this.accessToken = null;
                    removeValue(ACCESS_TOKEN_KEY);
                }
                return Promise.reject(error);
            }
        );
    }

    private async initialize() {
        this.accessToken = await getValue(ACCESS_TOKEN_KEY);
    }
}

const http = new Http().instance;

export default http;
