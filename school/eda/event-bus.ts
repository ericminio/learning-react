export class Bus {
    map = {}
    
    register(event, callback) {
        if (! this.map[event]) {
            this.map[event] = [];
        }
        this.map[event].push(callback);
    }
    broadcast(event, data) {
        this.map[event].forEach(callback => {
            callback(data);    
        });
    }
}
