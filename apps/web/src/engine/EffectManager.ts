// src/engine/EffectManager.ts
import { IEffect, EffectContext } from '@/engine/types';

export class EffectManager {
  private activeEffects: IEffect[] = [];

  addEffect(effect: IEffect) {
    this.activeEffects.push(effect);
  }

  render(videoFrame: HTMLVideoElement | HTMLCanvasElement, context: EffectContext) {
    // Lọc ra các hiệu ứng đang nằm trong khoảng thời gian hiện tại
    const currentEffects = this.activeEffects.filter(
      e => context.currentTime >= e.startTime && context.currentTime <= e.startTime + e.duration
    );

    if (currentEffects.length === 0) {
      // Nếu không có hiệu ứng, vẽ frame mặc định
      context.ctx.drawImage(videoFrame, 0, 0, context.canvasWidth, context.canvasHeight);
      return;
    }

    // Vẽ lần lượt các hiệu ứng (Layering)
    currentEffects.forEach(effect => {
      effect.apply(videoFrame, context);
    });
  }
}