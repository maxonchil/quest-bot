const { Bot, Keyboard, KeyboardColor } = require('node-vk-bot');
const util = require('util');
const steps = require('./steps');

const bot = new Bot({
    token: 'a604aabbb4edc1baa3c630a3d40846e83371d89f8ad02039d42a5675961c8d8745aeb9637d26e5ec31a0a',
    group_id: 138035984,
}).start();

console.log('Bot started!');

bot.get(/./i, (message, exec, reply) => {
    const keyboard = new Keyboard(true);
    const info = message.payload && steps[JSON.parse(message.payload)] || steps['']; //!!!


    for (var i = 0; i < info.btns.length; ++i) {
        if (i) keyboard.addRow();
        keyboard.addButton(info.btns[i].msg, KeyboardColor.PRIMARY, JSON.stringify(info.btns[i].next));
    }
    reply(info.question, { keyboard }).catch(e => console.error(e));
})


bot.on('poll-error', error => {
    console.error('error occurred on a working with the Long Poll server ' +
        `(${util.inspect(error, false, 8, true)})`)
})
