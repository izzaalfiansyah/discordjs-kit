const terminal = require('../terminal');
const mongoose = require('mongoose');
const database = process.env.database;

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        // Database Connection
        if (!database) {
            return;
        } else {
            try {
                await mongoose.connect(database || '');
                terminal.success('✅ Database Connected');
            } catch (error) {
                terminal.error(`Error connecting to database: ${error.message}`);
            }
        }
        // End of Database Connection

        terminal.success(`✅ ${client.user.tag} is Online`);

        async function pickPresence() {
            const option = Math.floor(Math.random() * statusArray.length);

            try {
                await client.user.setPresence({
                    activities: [
                        {
                            name: statusArray[option].content,
                            type: statusArray[option].type,

                        },

                    ],

                    status: statusArray[option].status
                })
            } catch (error) {
                console.error(error);
            }
        }
    },
};