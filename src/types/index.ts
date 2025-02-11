export interface ChatRequest {
    message: string
}

export interface ChatResponse {
    message: string
    timestamp: string
}

export interface ErrorResponse {
    error: string
    message: string
} 