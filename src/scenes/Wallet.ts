import Phaser from "phaser";
import * as SceneFactory from '../scripts/SceneFactory';
import * as WalletHelper from '../scripts/WalletHelper';
export default class Wallet extends Phaser.Scene {
    
    private image!: Phaser.GameObjects.Image;
    private line1!: Phaser.GameObjects.BitmapText;
    private line2!: Phaser.GameObjects.BitmapText;
    private line3!: Phaser.GameObjects.BitmapText;
    private status!: Phaser.GameObjects.BitmapText;
    private delayedRun!: Phaser.Time.TimerEvent;
    private countdownActive = true;
    private txLock = false;
    private changeEvents = 0;
    private countdownText!: Phaser.GameObjects.BitmapText;
    private countdown = 0;

    constructor() {
        super('wallet');
     }

    preload() {
        this.load.image('bg', 'assets/storyx.webp');
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.destroy();
        }); 
        SceneFactory.preload(this);
    } 


    private endScene() {
        if(!this.txLock) {
            this.startGame();
        }
    }

    private updateCountdown() {
        this.countdown--;
        if (this.countdown <= 0) {
            this.endScene();
            this.countdownText.setText("");
        }
        else {
            if(this.countdownActive) {
                this.time.addEvent({ delay: 1000, callback: this.updateCountdown, callbackScope: this });
            }
            this.countdownText.setText("" + this.countdown);
        }
        
    }

    create() {
        const { width, height } = this.scale;

        this.changeEvents = globalThis.changeEvent;

        this.input.setDefaultCursor('url(assets/hand.cur), pointer');

        this.countdown = 10;
       
        this.countdownText = this.add.bitmapText(width - 64, height - 64, 'press_start', "" + this.countdown, 22).setOrigin(1, 1).setTint(0x300051);
        this.time.addEvent({ delay: 1000, callback: this.updateCountdown, callbackScope: this });

        
        if(globalThis.noWallet) {
            this.line1 =this.add.bitmapText(width * 0.5, height / 2 + 150, 'press_start', 'It seems you dont have a crypto wallet (yet)', 22)
                .setTint(0xffffff)
                .setOrigin(0.5);
        }
        else if(WalletHelper.isNotEligible() ) {
            this.line1= this.add.bitmapText(width * 0.5, height / 2 + 150, 'press_start', 'You are allowed access Level 1', 22)
                .setTint(0xffffff)
                .setOrigin(0.5);
        }

        this.line2 = this.add.bitmapText(width * 0.5, height / 2 + 190, 'press_start', 'Unlimited play only for everyone!', 22)
            .setTint(0xffffff)
            .setOrigin(0.5); 

        this.line3 =this.add.bitmapText(width * 0.5, height / 2 + 240, 'press_start', '', 22)
            .setTint(0xffffff)
            .setOrigin(0.5); 

        this.status = this.add.bitmapText(width * 0.5, 64, 'press_start', "" , 18)
            .setTint(0xf9ed11)
            .setOrigin(0.5); 

        if( globalThis.chainId != 1 && !globalThis.noWallet) {
            this.status.setText("Your wallet is not connected to the Ethereum Chain!");
        }
        else if( globalThis.chainId != 1 ) {
            this.status.setText("You are not connected to the Ethereum Chain");
        }
        else if( globalThis.noWallet ) {
            this.status.setText("Please install MetaMask or TrustWallet first");
        }

        this.image = this.add.image(width / 2, height / 2, 'bg').setOrigin(0.5, 0.5).setVisible(true);

        this.input.on('keydown', () => { if(!this.txLock) this.startGame(); });
        this.input.keyboard?.once('keydown-ESC', () => {
            this.scene.stop();
            this.scene.start('game-start');
        });

        this.delayedRun = this.time.delayedCall( this.countdown * 1000, () => {
            this.endScene();
        });
    }

    private delayedStart() {
        this.time.delayedCall( 3000, () => {
            this.startGame();
        })
    }

    destroy() {
        this.line1.destroy();
        this.line2.destroy();
        this.line3.destroy();
        this.status.destroy();
        this.image.destroy();
        this.countdownText.destroy();
    }

    update() {
        if( globalThis.changeEvent != this.changeEvents ) {
            this.scene.restart();
            this.changeEvents = globalThis.changeEvent;
        }
        else if(SceneFactory.gamePadIsButton(this,-1)) {
            this.startGame();
        }
    }

    startGame() {
        this.cameras.main.fadeOut();
        
        this.scene.stop();
        this.scene.start('game-start');
    }
}