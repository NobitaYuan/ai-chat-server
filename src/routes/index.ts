import { Router } from "express"
import healthRouter from "./health"
import chatRouter from "./chat"

const router = Router()

router.use("/api", healthRouter)
router.use("/api", chatRouter)

export default router 