const { Client, Collection } = require("discord.js")
const fs = require("fs")
const mongoose = require("mongoose")
const cfg = require("./settings/config.js")
const values = require("./settings/values.js")
const console = require("./functions/consoleLogger")
const bot = new Client();
bot.commands = new Collection()
bot.prefix = cfg.prefix
bot.values = {
    crown: values.crown,
    gem: values.gem,
    gift: values.gift,
    key: values.key
}
bot.admins = cfg.admins
global.User = require("./data/user")
global.Shop = require("./data/shop")
global.Drop = require("./data/drop")
global.Pair = require("./data/pair")
global.dateUpdateBanner = Date.now()

fs.readdir('./events/', (err, files) => {
    if(err) throw err
    files = files.filter(f => f.endsWith('.js'))
    if(files.length == 0) return console.error("Ивентов для загрузки не найдено.")
    console.info(`Загрузка ивентов...`)
    let i = 0
    files.forEach(f => {
        i++
        const event = require(`./events/${f}`)
        bot.on(f.split('.')[0], event.bind(null, bot))
        delete require.cache[require.resolve(`./events/${f}`)]
    })
})

fs.readdir(`./commands`, (err, ff) => {
    if(err) throw err
    if(ff && ff.length > 0){
        ff.filter(f => fs.lstatSync(`./commands/${f}`).isDirectory()).forEach(dir => {
            fs.readdir(`./commands/${dir}`, (e, files) => {
                if(e) throw e
                if(files && files.length > 0){
                    console.info(`Загрузка команд из категории ${dir}...`)
                    files.filter(g => g.endsWith(".js") && fs.lstatSync(`./commands/${dir}/${g}`).isFile()).forEach(file => {
                        let props = require(`./commands/${dir}/${file}`)
                        if(props.config){
                            if(!props.config.disabled){
                                if(props.config.name) bot.commands.set(props.config.name, props)
                                else bot.commands.set(file.split(".")[0], props)
                                if(props.config.alias && props.config.alias.length > 0 && typeof props.config.alias !== 'string'){
                                    for(let i = 0;i < props.config.alias.length;i++){
                                        bot.commands.set(props.config.alias[i].replace("{filename}", file.split(".")[0]), props)
                                    }
                                } else if(typeof props.config.alias == 'string'){
                                    bot.commands.set(props.config.alias.replace("{filename}", file.split(".")[0]), props)
                                }
                            }
                        } else bot.commands.set(file.split(".")[0], props)
                    })
                }
            })
        })
    } else return console.error("Команд для загрузки не найдено.")
})

mongoose.connection.on("connected", () => {
    console.info("Связь с базой данных установлена.")
})

bot.login(cfg.token)