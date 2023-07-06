import StateMachine from "./StateMachine";
import { sharedInstance as events } from './EventManager';
import * as CreatureLogic from './CreatureLogic';

export default class FrogController {
    private scene: Phaser.Scene;
    private sprite: Phaser.Physics.Matter.Sprite;
    private stateMachine: StateMachine;

    private moveTime = 0;
    private velocityX = 0.5;
    private name: string;
    private myMoveTime = 6000;
    private garbage: boolean = false;

    constructor(
        scene: Phaser.Scene,
        sprite: Phaser.Physics.Matter.Sprite,
        name: string,
        startFrame: number,
        endFrame: number,
        fps: number,
        velocityX: number = 0.5,
    ) {
        this.scene = scene;
        this.sprite = sprite;
        this.name = name;
     //   this.velocityX = velocityX;
        this.createAnim(name, startFrame, endFrame, fps);
        this.stateMachine = new StateMachine(this);

        this.stateMachine.addState('idle', {
            onEnter: this.idleOnEnter
        })
            .addState('move-right', {
                onEnter: this.moveRightOnEnter,
                onUpdate: this.moveRightOnUpdate
            })
            .addState('move-left', {
                onEnter: this.moveLeftOnEnter,
                onUpdate: this.moveLeftOnUPdate
            })
            .setState('idle');

        this.velocityX += Phaser.Math.Between(0.0, + 0.15);
        events.on(this.name + '-stomped', this.handleStomped, this);
        events.on(this.name + '-blocked', this.handleBlocked, this);
    }

    destroy() {
        events.off(this.name + '-blocked', this.handleBlocked, this);
        events.off(this.name + '-stomped', this.handleStomped, this);

        this.sprite.destroy();
    }

    update(deltaTime: number) {
        this.stateMachine.update(deltaTime);
    }

    public getSprite() {
        return this.sprite;
    }

    public lookahead(map: Phaser.Tilemaps.Tilemap): boolean {
        if (this.sprite.active == false)
            return false;

        if (!CreatureLogic.hasTileAhead(map, this.scene.cameras.main, this.sprite, true, 0) && this.sprite.body?.velocity.y == 0) {
            if (this.sprite.flipX)
                this.stateMachine.setState("move-left");
            else
                this.stateMachine.setState("move-right");
            return true;
        }

        return false;
    }

    private moveRightOnEnter() {
        this.moveTime = 0;
    }

    private moveRightOnUpdate(deltaTime: number) {
        this.moveTime += deltaTime;
        this.sprite.flipX = true;
        this.sprite.setVelocityX(-1 * this.velocityX);

        if (this.moveTime > this.myMoveTime) {
            this.stateMachine.setState('move-left');
        }
    }

    private moveLeftOnEnter() {
        this.moveTime = 0;
    }

    private moveLeftOnUPdate(deltaTime: number) {
        this.moveTime += deltaTime;
        this.sprite.flipX = false;
        this.sprite.setVelocityX(this.velocityX);

        if (this.moveTime > this.myMoveTime) {
            this.stateMachine.setState('move-right');
        }
    }

    private idleOnEnter() {

        this.sprite.play('idle');
        this.stateMachine.setState('move-right');
    }

    private handleStomped(frog: Phaser.Physics.Matter.Sprite) {
        if (this.sprite !== frog) {
            return;
        }
        this.stateMachine.setState('dead');
        this.garbage = true;
        this.cleanup();
    }

    private handleBlocked(frog: Phaser.Physics.Matter.Sprite) {
        if (this.sprite !== frog) {
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

    public keepObject() {
        return !this.garbage;
    }


    private cleanup() {
        if(this.sprite !== undefined) {
           this.sprite.destroy();
           this.stateMachine.destroy();
        }
        this.sprite = undefined;
    }

    private createAnim(name: string, startFrame: number, endFrame: number, fps: number) { 
      this.sprite.anims.create( {
        key: 'idle',
        frames: this.sprite.anims.generateFrameNames(name, {
            start: startFrame, //0,
            end: endFrame, // 7
        }),
        frameRate: fps,
        repeat: -1,
      })   
    }
}