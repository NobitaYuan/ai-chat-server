import { Router, Request, Response } from "express"
import { HealthResponse } from "./type"

const router = Router()

router.get("/health", (_req: Request, res: Response<HealthResponse>) => {
    res.json({ 
        status: "ok", 
        message: "服务器运行正常" 
    })
})

export default router 