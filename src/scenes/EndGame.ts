import Phaser from "phaser";
import * as SceneFactory from '../scripts/SceneFactory';
import CreditScene from "./CreditScene";
export default class EndGame extends CreditScene {
    
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private chapter = 1;
    private startTime = 0;
    private v?: Phaser.GameObjects.Video;
    private scroller: Phaser.GameObjects.DynamicBitmapText[] = [];
    private texts:  Phaser.GameObjects.DynamicBitmapText[] = [];
    private spacing: string[] = [
      "",
      "",
      "",
      "",      
      "",
      "",
     

    ];

    constructor() {
        super('end');
    }

    preload() {
        this.load.video( 'endgame1', 'assets/end1.mp4', 'loadeddata', false, false);
        this.load.video( 'endgame2', 'assets/end2.mp4', 'loadeddata', false, false);
        
        SceneFactory.preload(this);
    }

    create() {
        const { width, height } = this.scale;

        this.cursors = this.input.keyboard?.createCursorKeys();

        this.input.setDefaultCursor('none');
        SceneFactory.playRepeatMusic(this, 'diehard');
    
        this.v = this.add.video(width/2,height/2,'endgame1');
        this.v?.play(true);
        this.v?.setPaused(false);
        this.v?.setLoop(false);

        this.chapter = 1;
        
        this.nextStory();

        const scrollText1 = [
            "The president emerged triumphant,",
            "their lies shattered.",
            "With unwavering determination,",
            "he marched back to the White House",
        ];

        const scrollText2 = [
            "Hailed by supporters as",
            "a true champion of the people",
            "Ready to ",
            "Make Memes Great Again"
        ];

        this.texts.push( this.add.dynamicBitmapText(width/2, height - (3 * 20), 'press_start',scrollText1, 22) );
        this.texts.push( this.add.dynamicBitmapText(width/2, height - (3 * 20), 'press_start',scrollText2, 22) )

        this.scroller.push( this.texts[0] );
        this.scroller.push( this.texts[1] );
        this.scroller.forEach( s => {
            s.setCenterAlign();
            s.setOrigin(0.5,0.5);
            s.setTint(0xffffff);
            s.setVisible(false);
        });

        this.scroller[0].setVisible(true);
        
        this.input.on('pointerdown', () => { this.startGame(); });
        this.input.on('keydown', () => { this.startGame(); });
    
        this.startTime = this.time.now;
    }

    destroy() {
        this.v?.destroy();
        this.scroller.forEach( s => {
            s.setVisible(false);
            s.destroy();
        });
        this.texts.forEach( t => {
            t.destroy();
        });
        
        SceneFactory.stopSound(this);
        SceneFactory.removeAllSounds(this);

        this.scroller = [];
        this.texts = [];
        this.chapter = 1;
    }

    nextStory() {
        const { width, height } = this.scale;

        this.time.delayedCall(7000, () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);

            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.v?.destroy();
                this.cameras.main.fadeIn( 100,0,0,0 );
                this.scroller[this.chapter-1].setVisible(false);
                this.chapter ++;

                if(this.chapter < 3) {
                    this.v = this.add.video(width / 2, height / 2, 'endgame' + this.chapter).setOrigin(0.5, 0.5);
                    
                    this.cameras.main.fadeIn( 1000, 0,0,0);
                    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, () => {
                       this.nextStory();
                       this.v?.play(true);
                       this.v?.setPaused(false);
                       this.v?.setLoop(true);
                       this.scroller[this.chapter-1].setVisible(true);
                    }); 
                }
                else {
                    this.destroy();
                    this.startGame();
                } 
            });
        });

    }

    update(time,delta) {
       
        if(SceneFactory.gamePadIsButton(this,-1) || this.cursors.space.isDown ) {
            this.startGame();
        }
        const elapsedTime = time - this.startTime;
        if(  elapsedTime < 3000 && this.v?.isPaused()) {
            this.v?.setPaused(false);
        } 
    }

    startGame() {
        this.destroy();
        this.scene.stop();
        this.scene.start('endcredits');
        
    }
}