import { Router, Request, Response } from "express"
import { ChatRequest, ChatResponse, ErrorResponse } from "./type"
import { deepSeek, checkDeepSeekStatus } from "./deepSeek"

const router = Router()

// 检查DeepSeek服务状态
router.get("/status", async (_req: Request, res: Response) => {
    const status = await checkDeepSeekStatus()
    res.json(status)
})

router.get("/chat", async (req: Request, res: Response<ChatResponse | ErrorResponse>) => {
    try {
        const message = req.query.message as string // 从query参数获取消息

        const deepSeekResponse = await deepSeek()
        console.log("deepSeekResponse", deepSeekResponse)

        const response: ChatResponse = {
            message: deepSeekResponse,
            timestamp: new Date().toISOString(),
        }
        res.json(response)
    } catch (error) {
        const errorResponse: ErrorResponse = {
            error: "服务器错误",
            message: error instanceof Error ? error.message : "未知错误",
        }
        res.status(500).json(errorResponse)
    }
})

export default router
