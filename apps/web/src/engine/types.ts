export interface EffectContext {
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  currentTime: number; // Thời gian hiện tại trên timeline (ms hoặc s)
}

export interface IEffect<T = any> {
  id: string;
  name: string;
  startTime: number;
  duration: number;
  params: T;
  // Hàm render chính cho từng frame
  apply(videoFrame: HTMLVideoElement | HTMLCanvasElement, context: EffectContext): void;
}