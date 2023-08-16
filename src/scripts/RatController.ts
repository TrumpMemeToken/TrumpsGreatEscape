import StateMachine from "./StateMachine";
import { sharedInstance as events } from './EventManager';
import * as CreatureLogic from './CreatureLogic';

export default class RatController {
    private scene: Phaser.Scene;
    private sprite: Phaser.Physics.Matter.Sprite;
    private stateMachine: StateMachine;

 
    private velocityX = 1.0;
    private name: string;
    private stateTimer = 0;
    private stateDuration = 0;

    private garbage: boolean = false;

    constructor(
        scene: Phaser.Scene,
        sprite: Phaser.Physics.Matter.Sprite,
        name: string,
        velocityX: number = 0.5,
    ) {
        this.scene = scene;
        this.sprite = sprite;
        this.name = name;
     //   this.velocityX = velocityX;
        this.createAnims();
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

        this.velocityX += Phaser.Math.Between(0.0, + 0.75);
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
    
        this.stateTimer += deltaTime;

        this.slumber();
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
        this.sprite.play('walk');
        this.velocityX = 1.0 + (Phaser.Math.FloatBetween(0.0, 0.5));
    }

    private moveRightOnUpdate(deltaTime: number) {
        this.sprite.flipX = true;
        this.sprite.setVelocityX(-1 * this.velocityX);
    }

    private moveLeftOnEnter() {
        this.sprite.play('walk');
        this.velocityX = 1.0 + (Phaser.Math.FloatBetween(0.0, 0.5));
    }

    private moveLeftOnUPdate(deltaTime: number) {
        this.sprite.flipX = false;
        this.sprite.setVelocityX(this.velocityX);
    }

    private idleOnEnter() {
        this.velocityX = 0.0;
        this.sprite.play('idle');
    }

    private handleStomped(frog: Phaser.Physics.Matter.Sprite) {
        if (this.sprite !== frog) {
            return;
        }

        events.off(this.name + '-stomped', this.handleStomped, this);

        this.stateMachine.setState('dead');
        this.garbage = true;
        
        this.sprite.setStatic(true);
        this.sprite.setCollisionCategory(0);

        this.cleanup(); 
    }

 

    private slumber() {
        if( this.stateTimer > this.stateDuration ) {
            const walkOrBore = Phaser.Math.Between(1,3);

            switch(walkOrBore) {
                case 1:
                    this.stateMachine.setState( 'move-left' );
                    break;
                case 2:
                    this.stateMachine.setState( 'move-right' );
                    break;
                default:
                    this.stateMachine.setState( 'idle' );
                    break;
            }

            this.stateTimer = 0;
            this.stateDuration = Phaser.Math.Between(2500,6300);   
        }
    }


    private handleBlocked(frog: Phaser.Physics.Matter.Sprite) {
        if (this.sprite !== frog) {
            return;
        }

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


    private createAnims() {
        this.sprite.anims.create({
            key: 'idle',
            frameRate: 0.5,
            repeat: -1,
            frames: this.sprite.anims.generateFrameNames('rat', {
                start: 1,
                end: 5,
                prefix: 'Rat_0032_Layer-',
                suffix: '.png'
            })
        });

        this.sprite.anims.create({
            key: 'walk',
            frameRate: 10,
            repeat: -1,
            frames: this.sprite.anims.generateFrameNames('rat', {
                start: 6,
                end: 37,
                prefix: 'Rat_0032_Layer-',
                suffix: '.png'
            })
        });
    }
}