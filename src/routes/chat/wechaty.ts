/**
 * Wechaty - Conversational RPA SDK for Chatbot Makers.
 *  - https://github.com/wechaty/wechaty
 */
import { WechatyBuilder, ScanStatus } from "wechaty"
import qrTerm from "qrcode-terminal"

function onScan(qrcode, status) {
    if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
        qrTerm.generate(qrcode, { small: true }) // show qrcode on console

        const qrcodeImageUrl = ["https://wechaty.js.org/qrcode/", encodeURIComponent(qrcode)].join("")

        console.info("StarterBot", "onScan: %s(%s) - %s", ScanStatus[status], status, qrcodeImageUrl)
    } else {
        console.info("StarterBot", "onScan: %s(%s)", ScanStatus[status], status)
    }
}

function onLogin(user) {
    console.info("StarterBot", "%s login", user)
}

function onLogout(user) {
    console.info("StarterBot", "%s logout", user)
}

async function onMessage(msg) {
    console.info("StarterBot", msg.toString())

    if (msg.text() === "ding") {
        await msg.say("dong")
    }
}

const bot = WechatyBuilder.build({
    name: "wechaty-puppet-wechat",
    /**
     * How to set Wechaty Puppet Provider:
     *
     *  1. Specify a `puppet` option when instantiating Wechaty. (like `{ puppet: 'wechaty-puppet-padlocal' }`, see below)
     *  1. Set the `WECHATY_PUPPET` environment variable to the puppet NPM module name. (like `wechaty-puppet-padlocal`)
     *
     * You can use the following providers:
     *  - wechaty-puppet-wechat (no token required)
     *  - wechaty-puppet-padlocal (token required)
     *  - wechaty-puppet-service (token required, see: <https://wechaty.js.org/docs/puppet-services>)
     *  - etc. see: <https://github.com/wechaty/wechaty-puppet/wiki/Directory>
     */
    // puppet: 'wechaty-puppet-wechat',
})

bot.on("scan", onScan)
bot.on("login", onLogin)
bot.on("logout", onLogout)
bot.on("message", onMessage)

const startWechaty = () => {
    bot.start()
        .then(() => console.info("StarterBot", "Starter Bot Started."))
        .catch((e) => console.error("StarterBot", e))
}
export { startWechaty }
