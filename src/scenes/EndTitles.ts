import Phaser from "phaser";
import * as SceneFactory from '../scripts/SceneFactory';
import CreditScene from "./CreditScene";
export default class EndTitles extends CreditScene {
    
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private chapter = 1;
    private image!: Phaser.GameObjects.Image;
    private scroller!: Phaser.GameObjects.DynamicBitmapText;
    private scrollText: string[] = [];
    private spacing: string[] = [
      "",
      "",
      "",
      "",      
      "",
      "",
     

    ];

    constructor() {
        super('endcredits');
    }

    preload() {
    
        SceneFactory.preload(this);
    }

    create() {
        const { width, height } = this.scale;

        this.cursors = this.input.keyboard?.createCursorKeys();

        this.input.setDefaultCursor('none');

        this.scrollText = this.spacing.concat( this.content );

        this.scroller = this.add.dynamicBitmapText(width/2, 0, 'press_start',this.scrollText, 22);
        this.scroller.setCenterAlign();
        this.scroller.setOrigin(0.5,0.5);
        this.scroller.setTint(0xffffff);
        this.scroller.setVisible(true);
        this.scroller.scrollY = -1600;

        this.input.on('pointerdown', () => { this.startGame(); });
        this.input.on('keydown', () => { this.startGame(); });

        
        SceneFactory.playRepeatMusic(this, 'diehard');
        
    }

    destroy() {
        this.scroller.destroy();
        SceneFactory.stopSound(this);
        SceneFactory.removeAllSounds(this);
    }

   
    update(time,delta) {
        if(this.scroller.visible) {
            this.scroller.scrollY += 0.05 * delta;
            if (this.scroller.scrollY > 2100) { 
                this.startGame();
            }
        }
        if(SceneFactory.gamePadIsButton(this,-1) || this.cursors.space.isDown ) {
            this.startGame();
        }
    }

    startGame() {
        SceneFactory.stopSound(this);
        this.scene.stop();
        this.scene.start('game-start');
    }
}