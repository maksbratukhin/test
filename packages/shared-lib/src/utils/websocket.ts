import { WebSocketMessage } from '@product-portal/types';
import { WEBSOCKET_RECONNECT_DELAY } from '@product-portal/constants';

type MessageHandler = (message: WebSocketMessage) => void;

class WebSocketManager {
  private ws: WebSocket | null = null;
  private handlers: Set<MessageHandler> = new Set();
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private shouldReconnect = true;
  private url = '';

  connect(url: string = 'wss://echo.websocket.org'): void {
    if (typeof window === 'undefined') return;

    this.url = url;
    this.shouldReconnect = true;

    try {
      this.ws = new WebSocket(url);

      this.ws.onopen = () => {
        console.log('[WebSocket] Connected');
        this.sendMessage({
          type: 'notification',
          payload: { message: 'Client connected' },
          timestamp: Date.now(),
        });
      };

      this.ws.onmessage = (event) => {
        try {
          if (typeof event.data === 'string' && event.data.startsWith('{')) {
            const message: WebSocketMessage = JSON.parse(event.data);
            this.handlers.forEach((handler) => handler(message));
          }
        } catch (error) {
          console.debug('[WebSocket] Received non-JSON message, ignoring');
        }
      };

      this.ws.onerror = (error) => {
        console.error('[WebSocket] Error:', error);
      };

      this.ws.onclose = () => {
        console.log('[WebSocket] Disconnected');
        if (this.shouldReconnect) {
          this.reconnectTimeout = setTimeout(() => {
            console.log('[WebSocket] Reconnecting...');
            this.connect(this.url);
          }, WEBSOCKET_RECONNECT_DELAY);
        }
      };
    } catch (error) {
      console.error('[WebSocket] Connection failed:', error);
    }
  }

  disconnect(): void {
    this.shouldReconnect = false;
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  sendMessage(message: WebSocketMessage): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  subscribe(handler: MessageHandler): () => void {
    this.handlers.add(handler);
    return () => this.handlers.delete(handler);
  }

  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }
}

export const websocketManager = new WebSocketManager();
