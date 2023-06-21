import StateMachine from "./StateMachine";
import { sharedInstance as events } from './EventManager';
import * as CreatureLogic from './CreatureLogic';
import PlayerController from "./PlayerController";

export default class SamController {
    private scene: Phaser.Scene;
    private sprite: Phaser.Physics.Matter.Sprite;
    private stateMachine: StateMachine;
    private player: PlayerController;

    private moveTime = 0;
    private velocityX = 2;
    private name;
    private garbage: boolean = false;
    private myMoveTime = 0;

    private stateTimer = 0;
    private stateDuration = 0;

    constructor(
        scene: Phaser.Scene,
        sprite: Phaser.Physics.Matter.Sprite,
        player: PlayerController,
        name: string,
        collisionCat: number,
        collideWith: number[],

    ) {
        this.scene = scene;
        this.sprite = sprite;
        this.name = name;
        this.garbage = false;
        this.player = player;

        this.createAnims();

        this.stateMachine = new StateMachine(this);

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

        this.myMoveTime = Phaser.Math.Between(5500, 7500);

        events.on(this.name + '-stomped', this.handleStomped, this);
        events.on(this.name + '-blocked', this.handleBlocked, this);
    }

    destroy() {
        events.off(this.name + '-stomped', this.handleStomped, this);
        events.off(this.name + '-blocked', this.handleBlocked, this);

        this.cleanup();
    }

    update(deltaTime: number) {
        this.stateMachine.update(deltaTime);

        this.stateTimer += deltaTime;


        this.slumber();
    }

    public getSprite() {
        return this.sprite;
    }


    private moveLeftOnEnter() {
        this.moveTime = 0;
    }

    private moveLeftOnUpdate(deltaTime: number) {
        this.moveTime += deltaTime;
        this.sprite.flipX = true;
        this.sprite.setVelocityX(-1 * this.velocityX);
        this.sprite.play('walk', true);
        if (this.moveTime > this.myMoveTime) {
            this.myMoveTime = Phaser.Math.Between(5500, 7500);
            this.stateMachine.setState('move-right');
        }
    }

    private moveRightOnEnter() {
        this.moveTime = 0;
    }

    private moveRightOnUPdate(deltaTime: number) {
        this.moveTime += deltaTime;
        this.sprite.flipX = false;
        this.sprite.setVelocityX(this.velocityX);
        this.sprite.play('walk', true);
        if (this.moveTime > this.myMoveTime) {
            this.myMoveTime = Phaser.Math.Between(5500, 7500);
            this.stateMachine.setState('move-left');
        }
    }

    public lookahead(map: Phaser.Tilemaps.Tilemap): boolean {
        if (this.sprite.active == false)
            return false;

        if (!CreatureLogic.hasTileAhead(map, this.scene.cameras.main, this.sprite, true, 0)) {
            if (!this.sprite.flipX)
                this.stateMachine.setState("move-left");
            else
                this.stateMachine.setState("move-right");
            return true;
        }

        return false;
    }

    private idleOnEnter() {
        this.sprite.play('idle');
        this.sprite.setVelocityX(0);
    }

    
    private handleBlocked(fire: Phaser.Physics.Matter.Sprite) {
        if (this.sprite !== fire) {
            return;
        }
        this.moveTime = 0;

        if (!this.sprite.flipX) {
            this.stateMachine.setState('move-left');
        }
        else {
            this.stateMachine.setState('move-right');
        }           
    }
    private handleStomped(sam: Phaser.Physics.Matter.Sprite) {
        if (this.sprite !== sam && !this.garbage) {
            return;
        }
        this.garbage = true;
        events.off(this.name + '-stomped', this.handleStomped, this);
        this.sprite.play('dead');
        this.sprite.setStatic(true);
        this.sprite.setCollisionCategory(0);
    
        this.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
          setTimeout( () => {  	
            this.cleanup();
          }, 1000 );

        });
        this.stateMachine.setState('dead');
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

  
    private slumber() {
        if (this.player === undefined)
            return;

        if( this.stateTimer > this.stateDuration ) {
            const walkOrBore = Phaser.Math.Between(0,1);
            if(walkOrBore) {
                const leftOrRight = Phaser.Math.Between(0,1);
                this.stateMachine.setState( 'move-' + (leftOrRight ? 'left': 'right'));
            }
            else {
                this.stateMachine.setState( 'idle' );
            }
            this.stateTimer = 0;
            this.stateDuration = Phaser.Math.Between(1500,3300);
        }
    }

    private createAnims() {
        this.sprite.anims.create({
            key: 'idle',
            frameRate: 2,
            repeat: -1,
            frames: this.sprite.anims.generateFrameNames('sam', {
                start: 0,
                end: 1,
                prefix: '0_Idle',
                suffix: '.webp'
            })
        });

        this.sprite.anims.create({
            key: 'dead',
            frameRate: 10,
            repeat: 0,
            frames: this.sprite.anims.generateFrameNames('sam', {
                start: 0,
                end: 2,
                prefix: '1_Dead',
                suffix: '.webp'
            })
        });

        this.sprite.anims.create({
            key: 'walk',
            frameRate: 5,
            repeat: -1,
            frames: this.sprite.anims.generateFrameNames('sam', {
                start: 0,
                end: 1,
                prefix: '2_Walk',
                suffix: '.webp'
            })
        });
    }

}