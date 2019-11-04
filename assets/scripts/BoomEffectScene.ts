import { easeBoomEffect } from "./EaseActions";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BoomeffectScene extends cc.Component {
	@property(cc.Graphics)
	graphics: cc.Graphics = null;

	@property(cc.Sprite)
	iconSprite: cc.Sprite = null;

	@property({
		tooltip: "动画持续时间"
	})
	effectDuration: number = 3;

	@property({
		tooltip: "是否显示拖尾效果"
	})
	enableMotionSteak: boolean = false;

	start() {
		let startAnim = () => {
			this.playBoomEffect();
			this.drawFunction();
		};
		startAnim();
		this.schedule(startAnim, this.effectDuration + 1);
	}

	playBoomEffect() {
		let intervalTime = 0.01;
		let curItemCount = 0;
		for (let i = 0; i < 20; i++) {
			let animNode = new cc.Node();
			animNode.color = cc.color(Math.random() * 100 + 100, Math.random() * 100 + 100, Math.random() * 100 + 100);
			let animSprite = animNode.addComponent(cc.Sprite);
			animSprite.spriteFrame = this.iconSprite.spriteFrame;
			animNode.width = this.iconSprite.node.width;
			animNode.height = this.iconSprite.node.height;
			this.iconSprite.node.addChild(animNode);

			if (this.enableMotionSteak) {
				let motionSteakNode = new cc.Node();
				let motionSteak = motionSteakNode.addComponent(cc.MotionStreak);
				motionSteak.texture = animSprite.spriteFrame.getTexture();
				motionSteak.color = animNode.color;
				animNode.addChild(motionSteakNode);
			}

			curItemCount++;
			animNode.runAction(
				cc.sequence(
					cc.delayTime(intervalTime * curItemCount),
					cc
						.bezierTo(this.effectDuration, [
							cc.v2(0, 0),
							cc.v2(
								Math.random() > 0.5 ? Math.random() * 1000 : -Math.random() * 1000,
								Math.random() > 0.5 ? Math.random() * 1000 : -Math.random() * 1000
							),
							cc.v2(0, 600)
						])
						// .easing(easeExponentialOutIn),
						// .easing(easeCircleOutIn),
						.easing(easeBoomEffect),
					cc.callFunc(() => {
						animNode.destroy();
						curItemCount--;
					}, this)
				)
			);
		}
	}

	drawFunction() {
		this.graphics.clear();
		cc.tween(this.graphics.node)
			.to(
				this.effectDuration,
				{ opacity: 255 },
				{
					progress: (start: number, end: number, current, ratio: number) => {
						let x = ratio;
						let y = easeBoomEffect.easing(x);
						this.graphics.fillRect(x * this.graphics.node.width, y * this.graphics.node.width, 5, 5);
						return y;
					}
				}
			)
			.start();
	}
}
