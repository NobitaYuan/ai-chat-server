import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import routes from "./routes"
import { startWechaty } from "./routes/chat/wechaty"

// 初始化配置
const envFile = `.env.${process.env.NODE_ENV}`
require("dotenv").config({ path: envFile })

const app = express()
const port = process.env.PORT || 3000

// 中间件
app.use(cors())
app.use(bodyParser.json())

// 路由
app.use(routes)

app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`)
    console.log("当前环境：", process.env.NODE_ENV)
})

startWechaty()