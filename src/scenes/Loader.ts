import Phaser from "phaser";
import * as SceneFactory from '../scripts/SceneFactory';

export default class Loader extends Phaser.Scene {
    constructor(name: string) {
        super(name)
    }



    init() {
        localStorage.clear();
    }

    preload() {
        const width = this.game.canvas.width;
        const height = this.game.canvas.height;
        
        const d = ~~(width / 12);

        this.cameras.main.setBackgroundColor(0x000000);
        this.add.rectangle(d, d, width - d - d, height - d - d, 0x000000).setOrigin(0);

        const boot = this.make.text({
            x: d + d,
            y: d,
            text: 'LOADING',
            style: {
                font: "48px 'Comic Sans'",
                color: "#ffffff",
            }
        });
        boot.setOrigin(0, 0);


        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        
        const percentText = this.make.text({
            x: 4 + d + 128,
            y: d + 256,
            text: '0%',
            style: {
                font: "48px 'Press Start 2P'",
            }
        });

        
        this.load.on('progress', function (value: string) {
            const p1 = parseFloat(value);
            const p = ~~(p1 * 100);
            percentText.setText(p + '%');
            percentText.setColor('#ffffff');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBox.fillRect(4 + d, d + 256, 128 * p1, 48);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            percentText.destroy();
        }, this);

        SceneFactory.preload(this);
    }

    create() {
        this.time.delayedCall(1000, () => { this.cameras.main.shake(500, 0.02); }, undefined, this);

        this.time.delayedCall(1500, this.nextScene, undefined, this);
    }

    nextScene() {
        this.scene.start('intro');
    }

}