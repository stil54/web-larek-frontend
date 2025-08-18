type Handler = (data?: any) => void;

export class EventEmitter {
    private static events: Record<string, Handler[]> = {};

    static emit(event: string, data?: any): void {
        if (this.events[event]) {
            this.events[event].forEach(handler => handler(data));
        }
    }

    static on(event: string, handler: Handler): void {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(handler);
    }
}