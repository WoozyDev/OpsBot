const cooldowns = {
    beg: 1000 * 60 * 5,
    daily: 1000 * 60 * 60 * 24,
    weekly: 1000 * 60 * 60 * 24 * 7,
    monthly: 1000 * 60 * 60 * 24 * 30
}

export default {
    canUse: (name: string, millis: number) => {
        if(millis == 0) return true;
        let currentTime = Date.now();
        let cooldown = cooldowns[name];
        if(!cooldown) return true;
        // if current time + cooldown is less than the cooldown the user has, can use.
        return (currentTime + cooldown) < millis;
    },
    getNextTimeCanUse: (name: string) => {
        return Date.now() + cooldowns[name];
    }
}
