// src/engine/effects/ZoomLensEffect.ts
import { IEffect, EffectContext } from '@/engine/types';

interface ZoomParams {
  startScale: number;
  endScale: number;
}

export class ZoomLensEffect implements IEffect<ZoomParams> {
  id = 'zoom-lens';
  name = 'Zoom Lens';

  constructor(
    public startTime: number,
    public duration: number,
    public params: ZoomParams = { startScale: 1, endScale: 1.5 }
  ) {}

  private easeOutQuart(x: number): number {
    return 1 - Math.pow(1 - x, 4);
  }

  apply(videoFrame: HTMLVideoElement | HTMLCanvasElement, { ctx, currentTime, canvasWidth, canvasHeight }: EffectContext) {
    const elapsed = currentTime - this.startTime;
    const progress = Math.min(Math.max(elapsed / this.duration, 0), 1);
    const easedProgress = this.easeOutQuart(progress);

    const scale = this.params.startScale + (this.params.endScale - this.params.startScale) * easedProgress;

    ctx.save();
    // Zoom vào tâm canvas
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    ctx.translate(centerX, centerY);
    ctx.scale(scale, scale);
    ctx.translate(-centerX, -centerY);
    
    ctx.drawImage(videoFrame, 0, 0, canvasWidth, canvasHeight);
    ctx.restore();
  }
}