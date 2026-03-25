// src/engine/effects/FadeBWEffect.ts
import { IEffect, EffectContext } from '@/engine/types';

interface FadeBWParams {
  maxSaturation: number; // 100 (màu) -> 0 (trắng đen)
}

export class FadeBWEffect implements IEffect<FadeBWParams> {
  id = 'fade-bw';
  name = 'Fade to Black & White';
  
  constructor(
    public startTime: number,
    public duration: number,
    public params: FadeBWParams = { maxSaturation: 0 }
  ) {}

  apply(videoFrame: HTMLVideoElement | HTMLCanvasElement, { ctx, currentTime, canvasWidth, canvasHeight }: EffectContext) {
    const elapsed = currentTime - this.startTime;
    const progress = Math.min(Math.max(elapsed / this.duration, 0), 1);
    
    // Tính toán độ bão hòa: từ 100% xuống 0%
    const currentSaturation = 100 - (progress * (100 - this.params.maxSaturation));

    ctx.save();
    ctx.filter = `saturate(${currentSaturation}%)`;
    ctx.drawImage(videoFrame, 0, 0, canvasWidth, canvasHeight);
    ctx.restore();
  }
}