import Phaser from "phaser";
import * as SceneFactory from '../scripts/SceneFactory';
export default class LogoScreen extends Phaser.Scene {
    constructor() {
        super('intro')
    }

    preload() {
        SceneFactory.preload(this);
        this.load.image('intro', 'assets/trumpscreen.webp');

        globalThis.adReturn = 'game-intro';
    }

    create() {

        const { width, height } = this.scale;

        this.input.setDefaultCursor('none');

        this.add.image(width / 2, height / 2, 'intro').setOrigin(0.5, 0.5);

        this.add.bitmapText(width * 0.5, height / 2 + 96, 'press_start', '', 22)
            .setTint(0xffffff)
            .setOrigin(0.5);

        this.time.delayedCall(3000, () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (c, e) => {
                this.scene.stop();
                this.scene.start('game-banner');
            });
        });
    }
}