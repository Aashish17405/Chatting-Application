const zod = require('zod');

const verifymessage = zod.object({
    message:zod.string
})

const emailSchema=zod.string().email();
const passwordSchema=zod.string().min(6);

module.exports={
    verifymessage,
    emailSchema,
    passwordSchema
};