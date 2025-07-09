import { createEvent } from "seyfert";

export default createEvent({
    data: { name: 'ready', once: true },
    run: (user) => {
        console.log(`Logged in as ${user.tag}`);
    }
})
