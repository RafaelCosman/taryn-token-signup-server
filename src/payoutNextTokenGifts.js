// const dotenv = require('dotenv').config();
import { vars } from "./getEnv";
import { resolvers } from "./resolvers/index.js";

async function runner(){
    return await resolvers.Mutation.payoutNextTokenGifts();
}

runner().then(() => {
    process.exit(0);
})