const zod = require('zod');

const verifymessage = zod.object({
    message:zod.string
})

module.exports={
    verifymessage,
};