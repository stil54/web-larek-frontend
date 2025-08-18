type Handler<T = unknown> = (event: T) => void;

export class EventEmitter {
    private events: Record<string, Handler[]> = {};

    on<T>(event: string, handler: Handler<T>) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(handler);
    }

    emit<T>(event: string, data?: T) {
        this.events[event]?.forEach(handler => handler(data));
    }
}