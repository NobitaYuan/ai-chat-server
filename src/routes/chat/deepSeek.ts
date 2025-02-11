// Please install OpenAI SDK first: `npm install openai`

import OpenAI from "openai"

export const deepSeek = async () => {
    const openai = new OpenAI({
        apiKey: process.env.DEEPSEEK_API_KEY,
        baseURL: process.env.DEEPSEEK_BASE_URL,
    })
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "你是一个聊天机器人，请根据用户的问题给出回答" },
            { role: "user", content: "你是什么样的ai？" },
        ],
        model: "deepseek-chat",
    })

    console.log("completion", completion)
    // 用量统计
    const usage = {
        提问消耗: completion.usage?.prompt_tokens,
        回答消耗: completion.usage?.completion_tokens,
        总消耗: completion.usage?.total_tokens,
    }

    // 聊天内容
    const chatContent = completion.choices[0].message.content

    return {
        usage,
        chatContent,
    }
}

export const checkDeepSeekStatus = async (): Promise<{
    status: "ok" | "error"
    message: string
    models?: string[]
}> => {
    try {
        // 使用 models 接口检查服务状态
        const response = await fetch("https://api.deepseek.com/v1/models", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${openai.apiKey}`,
            },
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = (await response.json()) as any
        return {
            status: "ok",
            message: "DeepSeek服务正常",
            models: data.data, // 可选：返回可用的模型列表
        }
    } catch (error) {
        return {
            status: "error",
            message: error instanceof Error ? error.message : "未知错误",
        }
    }
}
