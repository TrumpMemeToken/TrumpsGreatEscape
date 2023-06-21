import Phaser from "phaser";
import * as SceneFactory from '../scripts/SceneFactory';
import CreditScene from "./CreditScene";
export default class Story extends CreditScene {
    
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private chapter = 1;
    private v?: Phaser.GameObjects.Video;
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
        super('story');
    }

    preload() {
        this.load.video( 'ad', 'assets/story1.mp4', 'loadeddata', false, false);
        SceneFactory.preload(this);
    }

    create() {
        const { width, height } = this.scale;

        this.cursors = this.input.keyboard?.createCursorKeys();

        this.input.setDefaultCursor('none');

        this.v = this.add.video(width/2,height/2,'ad');
        this.v?.play(true);
        this.v?.setPaused(false);

        this.chapter = 1;
        
        this.nextStory();

        this.scrollText = [
          "In a besieged land, a phony goverment launched a relentless assault,",
          "spreading fake news and deceitful lies.",
          "Accusing the president of mishandling secret boxes,",
          "they underestimated his tenacity. ",
          "Escape the clutches of the enemy and secure the most secret box"

        ]

        this.scroller = this.add.dynamicBitmapText(width/2, height - (3 * 22), 'press_start',this.scrollText, 18);
        this.scroller.setCenterAlign();
        this.scroller.setOrigin(0.5,0.5);
        this.scroller.setTint(0xffffff);
       
        this.input.on('pointerdown', () => { this.startGame(); });
        this.input.on('keydown', () => { this.startGame(); });
    }

    destroy() {
        this.v?.destroy();
        this.scroller.destroy();
        SceneFactory.stopSound(this);
        SceneFactory.removeAllSounds(this);
    }

    nextStory() {
        const { width, height } = this.scale;

       
        this.time.delayedCall(10000, () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0);

            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.v?.destroy();
                this.startGame();
            });
        });

    }

    update(time,delta) {
        if(this.scroller.visible) {
     
        }
        if(SceneFactory.gamePadIsButton(this,-1) || this.cursors.space.isDown ) {
            this.startGame();
        }
    }

    startGame() {
        this.scene.stop();
        this.scene.start('player-select');
    }
}