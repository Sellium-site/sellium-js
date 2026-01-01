export class APIError extends Error {
    public readonly status: number;
    public readonly code: string;
    public readonly raw?: unknown;

    constructor(status: number, code: string, message: string, raw?: unknown) {
        super(message);
        this.name = "APIError";
        this.status = status;
        this.code = code;
        this.raw = raw;
    }
}
