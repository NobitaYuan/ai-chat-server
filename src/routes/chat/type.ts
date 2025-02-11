export interface ChatRequest {
    message: string
}

export interface ChatResponse {
    message: object
    timestamp: string
}

export interface ErrorResponse {
    error: string
    message: string
} 