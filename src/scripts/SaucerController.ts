import StateMachine from "./StateMachine";
import { sharedInstance as events } from './EventManager';
import * as CreatureLogic from './CreatureLogic';

export default class SaucerController {
    private scene: Phaser.Scene;
    private sprite: Phaser.Physics.Matter.Sprite;
    private stateMachine: StateMachine;

    private moveTime = 0;
    private name: string;
    private velocityX = 4;
    private maxVelocity = 4;

    
    private elapsedTime = 0;
    private interval = 2500;

    constructor(
        scene: Phaser.Scene,
        sprite: Phaser.Physics.Matter.Sprite,
        name: string
    ) {
        this.scene = scene;
        this.sprite = sprite;
        this.name = name;

        this.stateMachine = new StateMachine(this);

        this.velocityX = 0.5 + (Math.random() * this.velocityX);
        this.createAnims();
        this.stateMachine.addState('idle', {
            onEnter: this.idleOnEnter
        })
            .addState('move-left', {
                onEnter: this.moveLeftOnEnter,
                onUpdate: this.moveLeftOnUpdate
            })
            .addState('move-right', {
                onEnter: this.moveRightOnEnter,
                onUpdate: this.moveRightOnUPdate
            })
            .addState('dead', {
            })
            .setState('idle');

        events.on(this.name + '-blocked', this.handleBlocked, this);
    }

    destroy() {
        events.off(this.name + '-blocked', this.handleBlocked, this);
        this.stateMachine.destroy();
        this.sprite.destroy();
    }

    update(deltaTime: number) {
        this.stateMachine.update(deltaTime);
        this.elapsedTime += deltaTime;

        if( this.elapsedTime >= this.interval ) {
            this.slumber();
        }
    }

    private slumber() {
        this.sprite.setVelocityX( Phaser.Math.FloatBetween(0.5, 5.5) * ( this.sprite.flipX ? 1 : -1) );
        this.interval = Phaser.Math.Between(800, 5500);
        this.elapsedTime = 0;
    }

    public getSprite() {
        return this.sprite;
    }

    private moveLeftOnEnter() {
        this.moveTime = 0;
    }

    private moveLeftOnUpdate(deltaTime: number) {
        this.moveTime += deltaTime;
        this.sprite.flipX = false;
        this.sprite.setVelocityX(-1 * this.velocityX);
    }

    private moveRightOnEnter() {
        this.moveTime = 0;
    }

    private moveRightOnUPdate(deltaTime: number) {
        this.moveTime += deltaTime;
        this.sprite.flipX = true;
        this.sprite.setVelocityX(this.velocityX);
    }

    public lookahead(map: Phaser.Tilemaps.Tilemap): boolean {
        if (this.sprite.active == false)
            return false;

        const x = this.sprite.x;
        const y = this.sprite.y;
        const sw = map.widthInPixels;
        if( x >= (sw - (2 * this.sprite.width)) ) {
            this.stateMachine.setState("move-left");
            this.elapsedTime = 0;
        }
        if( x <= this.sprite.width ) {
            this.stateMachine.setState("move-right");
            this.elapsedTime = 0;
        }
 
      
        return false;
    }

    private idleOnEnter() {
        this.sprite?.play('idle');
        this.stateMachine.setState('move-left');
    }

    private handleBlocked(fire: Phaser.Physics.Matter.Sprite) {
        if (this.sprite !== fire) {
            return;
        }

        this.moveTime = 0;

        if (this.sprite.flipX) {
            this.stateMachine.setState('move-left');
        }
        else {
            this.stateMachine.setState('move-right');
        }
    }

    private createAnims() {
        this.sprite.anims.create({
            key: 'idle',
            frameRate: 10,
            repeat: -1,
            frames: this.sprite.anims.generateFrameNames('saucer', {
                start: 1,
                end: 8,
                prefix: 'saucer_0',
                suffix: '.webp'
            })
        });
    }
}