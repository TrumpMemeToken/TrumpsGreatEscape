import Phaser from "phaser";
import * as SceneFactory from '../scripts/SceneFactory';
import { PlayerStats } from "./PlayerStats";
import * as WalletHelper from '../scripts/WalletHelper';
import TextDemo from '../scripts/TextDemo';

export default class GameOver extends Phaser.Scene {
    constructor() {
        super('game-over')
    }

    private introMusic?: Phaser.Sound.BaseSound;
    //private text!: Phaser.GameObjects.BitmapText;
    private textDemo!: TextDemo;
    private anyKey?: Phaser.GameObjects.BitmapText;
    
    private info?: PlayerStats;
    private offset: number = 0;
    private amplitude = 100;
    private frequency = 0.01;

    preload() {
        SceneFactory.preload(this);
    }

    init() {
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.destroy();
        });
    }

    create() {
        const { width, height } = this.scale;
        
        globalThis.musicTune = false;
        
        this.introMusic = SceneFactory.addSound(this, 'gameover', false);

       /* this.text = this.add.bitmapText(width * 0.5, height * 0.5, 'press_start', 'GAME OVER', 64)
            .setTint(0xf9ed11)
            .setOrigin(0.5);*/
        this.textDemo = new TextDemo(this,'press_start','GAME OVER', 48, width * 0.5, height * 0.5, 0xf9ed11, 0.5);
        this.textDemo.letterBounce(500,800,true,32,-1);

        this.input.on('pointerdown', () => { this.continueGame(); });
        this.input.on('keydown', () => { this.continueGame(); });

        this.cameras.main.shake(500);

        this.time.delayedCall( 5000, () => {
            this.anyKey = this.add.bitmapText(width * 0.5, height * 0.5 + 96, 'press_start', 'PRESS ANY KEY', 24 )
                .setTint(0xffffff)
                .setOrigin(0.5);
        });
    }

    continueGame() {
        this.introMusic?.stop();
        SceneFactory.resetSpawnPoint(this);
        this.scene.start('game-start')
    }

    update() {
        if(SceneFactory.gamePadIsButton(this,-1)) {
            this.continueGame();
        }
    }

    destroy() {
        this.introMusic?.destroy();
        this.anyKey?.destroy();
        this.textDemo.destroy();
    }


}