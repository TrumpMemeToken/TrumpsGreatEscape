import Phaser from "phaser";
import ObstaclesController from "../scripts/ObstaclesController";
import * as SceneFactory from '../scripts/SceneFactory';
import MonsterController from '../scripts/MonsterController';
import FireController from '../scripts/FireController';
import FlowerController from '../scripts/FlowerController';
import PlantController from '../scripts/PlantController';
import FireWalkerController from '~/scripts/FireWalkerController';
import CrabController from '../scripts/CrabController';
import BirdController from '../scripts/BirdController';
import BatController from '../scripts/BatController';
import DragonController from '../scripts/DragonController';
import BidenController from '../scripts/BidenController';
import ObamaController from '../scripts/ObamaController';
import SamController from '../scripts/SamController';
import GaryController from '../scripts/GaryController';
import BombController from '../scripts/BombController';
import * as AlignmentHelper from '../scripts/AlignmentHelper';
import HoeController from '~/scripts/HoeController';
import { sharedInstance as events } from '../scripts/EventManager';
import ZeppelinController from "../scripts/ZeppelinController";
import SaucerController from "~/scripts/SaucerController";
import TNTController from '../scripts/TNTController';
import BearController from '../scripts/BearController';
import CrowController from '../scripts/CrowController';
import FlyController from '../scripts/FlyController';
import SawController from "../scripts/SawController";
import * as WalletHelper from '../scripts/WalletHelper';
import BaseScene from "./BaseScene";
import BossController from "../scripts/BossController";
import LavaController from "~/scripts/LavaController";

export default class Start extends BaseScene {
    constructor() {
        super({ key: 'start' });
    }

    private obstaclesController!: ObstaclesController;
    private flowers: FlowerController[] = [];
    private monsters: MonsterController[] = [];
    private fires: FireController[] = [];
    private plants: PlantController[] = [];
    private firewalkers: FireWalkerController[] = [];
    private crabs: CrabController[] = [];
    private birds: BirdController[] = [];
    private bats: BatController[] = [];
    private bombs: BombController[] = [];
    private bidens: BidenController[] = [];
    private dragons: DragonController[] = [];
    private obamas: ObamaController[] = [];
    private garys: GaryController[] = [];
    private sams: SamController[] = [];
    private zeps: ZeppelinController[] = [];
    private saucers: SaucerController[] = [];
    private tnts: TNTController[] = [];
    private bears: BearController[] = [];
    private hoes: HoeController[] = [];
    private flies: FlyController[] = [];
    private crows: CrowController[] = [];
    private saws: SawController[] = [];
    private boss: BossController[] = [];
    private lava: LavaController[] = [];
    private index = 0;
    private hsv;
    private shoutout !: Phaser.GameObjects.BitmapText;
    private credits !: Phaser.GameObjects.BitmapText;
    private map!: Phaser.Tilemaps.Tilemap;
    private ground1!: Phaser.Tilemaps.TilemapLayer;
    private layer1!: Phaser.Tilemaps.TilemapLayer;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    
    private goFS = false;

    init() {

        super.init();

        this.cursors = this.input.keyboard?.createCursorKeys();
        
        if (this.sys.game.device.fullscreen.available) {
            this.goFS = true;
        }

        this.obstaclesController = new ObstaclesController();
        this.monsters = [];
        this.fires = [];
        this.flowers = [];
        this.plants = [];
        this.firewalkers = [];
        this.crabs = [];
        this.birds = [];
        this.bats = [];
        this.bidens = [];
        this.dragons = [];
        this.obamas = [];
        this.bombs = [];
        this.zeps = [];
        this.saucers = [];
        this.bears = [];
        this.hoes = [];
        this.tnts = [];
        this.flies = [];
        this.crows = [];
        this.bears = [];
        this.tnts = [];
        this.flies = [];
        this.crows = [];
        this.garys = [];
        this.sams = [];
        this.boss = [];
        this.saws = [];
        this.lava = [];

        const info = {
            'lastHealth': 100,
            'coinsCollected': 0,
            'carrotsCollected': 0,
            'currLevel': 1,
            'scorePoints': 0,
            'highScorePoints': 0,
            'livesRemaining': 3,
            'invincibility': false,
            'speedUp': false,
            'powerUp': false,
            'throw': false,
            'pokeBall': false,
            'voice': false,
        };
        const data = JSON.stringify(info);
        window.localStorage.setItem('trump.stats', data); 
    }

    preload() {
        this.load.image('start_1', 'assets/start1.webp'); //whitehouse
         

        SceneFactory.preload(this);
        this.load.tilemapTiledJSON('start', 'assets/start.json');
    }

    create() {

        super.create();

        this.hsv = Phaser.Display.Color.HSVColorWheel(0.16,1);
        
        const { width, height } = this.scale;

        const totalWidth = 106 * 64;
        const hei = 12 * 64;
        const s = 1;
        this.add.image(0,0,'start_1').setOrigin(0);

        this.map = this.make.tilemap({ key: 'start', tileWidth: 64, tileHeight: 64 });
        const groundTiles = this.map.addTilesetImage('terrainv4', 'groundTiles', 64, 64, 0, 2);
        this.ground1 = this.map.createLayer('ground', [groundTiles]);
        this.layer1 = this.map.createLayer('layer1', [groundTiles]);

        this.ground1.setCollisionByProperty({ collides: true, recalculateFaces: false });

        const objectsLayer = this.map.getObjectLayer('objects');
        objectsLayer?.objects.forEach(objData => {
            const { x = 0, y = 0, name, width = 0, height = 0, rotation = 0 } = objData;
            switch (name) {

                default:
                    SceneFactory.basicCreate(this, name, x, y, width, height, rotation, 4, [1], this.obstaclesController, objData, undefined);
                    break;
            }
        })
        this.matter.world.convertTilemapLayer(this.ground1, { label: 'groundTiles', friction: 0, frictionStatic: 0 });

        this.matter.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setBounds(0, -308, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setAlpha(1);
        this.cameras.main.setZoom(0.5);
        this.cameras.main.roundPixels = true;

        this.matter.world.on("collisionstart", (e: { pairs: any; }, o1: any, o2: any) => {
            const pairs = e.pairs;
            for (let i = 0; i < pairs.length; i++) {
                const bodyA = pairs[i].bodyA;
                const bodyB = pairs[i].bodyB;

                const dx = ~~(bodyB.position.x - bodyA.position.x);
                const dy = ~~(bodyB.position.y - bodyA.position.y);

                if (dy <= 32) {
                    events.emit(bodyA.gameObject?.name + '-blocked', bodyA.gameObject);
                }
            }
        });

        SceneFactory.playRepeatMusic(this, 'theme');
    
        this.tweens.chain({
            targets: this.cameras.main,
            tweens: [
                {
                scrollX: 80 * 64,
                delay: 0,
                ease: 'Sine.easeInOut',
                duration: 5000,
                yoyo: true,
                repeat: -1,
                loop: -1,
                repeatDelay: 0,
                hold: 500,
                }

            ],
            loop: -1
        });

        this.input.on('pointerdown', () => { this.continueGame(); });
        this.input.on('keydown', () => { this.continueGame(); });

        const cam = this.cameras.add(0, 0, width, 128);

        this.shoutout = this.add.bitmapText(width / 2, -400, 'press_start',
            'PRESS SPACE TO PLAY', 24).setTint(0xf9ed11).setOrigin(0.5, 0.5);

        this.credits = this.add.bitmapText(320 + 640, -350, 'press_start',
            'Written by @TrumpMemeToken, Artwork by Han Ball, Storyline by Dandybanger, Copyleft 2023', 12).setTint(0xf9ed11).setOrigin(0.5, 0.5);
        this.credits.setDropShadow(0, 2, 0xff0000, 0.5);

        cam.startFollow(this.shoutout);
    //    cam.setFollowOffset(0, -216);
    //    cam.setViewport(320, 0, 640, 512);

        cam.roundPixels = true;

        this.tweens.chain({
            targets: this.credits,
            tweens: [
                {
                    x: 320,
                    delay: 0,
                    ease: 'Sine.easeInOut',
                    duration: 3000,
                    repeat: -1,
                    yoyo: true,
                    offset: 0
                }

            ],
            loop: -1
        });


        localStorage.removeItem('player-position');
    }

    private continueGame() {
        this.game.sound.stopAll();     
        this.scene.start('story');
    }
    preDestroy() {
        this.obstaclesController.destroy(this);
    }
    destroy() {

        super.destroy();

        this.input.off('pointerdown', () => { this.continueGame(); });
        this.input.off('keydown', () => { this.continueGame(); });

        this.monsters.forEach(monster => monster.destroy());
        this.fires.forEach(fire => fire.destroy());
        this.plants.forEach(plant => plant.destroy());
        this.flowers.forEach(flower => flower.destroy());
        this.crabs.forEach(crab => crab.destroy());
        this.birds.forEach(bird => bird.destroy());
        this.firewalkers.forEach(firewalker => firewalker.destroy());
        this.bats.forEach(bat => bat.destroy());
        this.bidens.forEach(biden => biden.destroy());
        this.dragons.forEach(dragon => dragon.destroy());
        this.obamas.forEach(obama => obama.destroy());
        this.sams.forEach(sam => sam.destroy());
        this.garys.forEach(gary => gary.destroy());
        this.bombs.forEach(bomb => bomb.destroy());
        this.zeps.forEach(zep => zep.destroy());
        this.saucers.forEach(saucer => saucer.destroy());
        this.bears.forEach(bear => bear.destroy());
        this.hoes.forEach(hoe => hoe.destroy());
        this.tnts.forEach(tnt => tnt.destroy());
        this.flies.forEach(fly => fly.destroy());
        this.crows.forEach(crow => crow.destroy());
        this.saws.forEach(saw => saw.destroy());
        this.lava.forEach(lava=>lava.destroy());

        this.shoutout.destroy();
        this.credits.destroy();

        this.tweens.destroy();
        this.ground1.destroy();
        this.map.destroy();
        
    }

    update(time: number, deltaTime: number) {

        super.update(time,deltaTime);

        if(!super.doStep())
            return;
        
        this.monsters.forEach(monster => {
            monster.update(deltaTime);
            monster.lookahead(this.map);
        });
        this.fires.forEach(fire => {
            fire.update(deltaTime);
            fire.lookahead(this.map)
        });
        this.firewalkers.forEach(firewalker => {
            firewalker.update(deltaTime);
            firewalker.lookahead(this.map);
        });
        this.zeps.forEach(zep => { 
            zep.update(deltaTime); 
            zep.lookahead(this.map);
        });
        this.saucers.forEach(saucer => { 
            saucer.update(deltaTime); 
            saucer.lookahead(this.map);
        });
        this.flies.forEach(fly => {
            fly.update(deltaTime); 
            fly.lookahead(this.map);
        });
        this.crabs.forEach(crab => {
            crab.update(deltaTime);
            crab.lookahead(this.map);
        });
        this.bidens.forEach(biden => {
            biden.update(deltaTime);
            biden.lookahead(this.map);
        });
        this.sams.forEach(sam => {
            sam.update(deltaTime);
            sam.lookahead(this.map);
        });
        this.garys.forEach(gary => {
            gary.update(deltaTime);
            gary.lookahead(this.map);
        });
        this.dragons.forEach(dragon => {
            dragon.update(deltaTime);
            dragon.lookahead(this.map);
        });
        this.obamas.forEach(obama => {
            obama.update(deltaTime);
            obama.lookahead(this.map);
        });
        this.crows.forEach(crow => {
            crow.update(deltaTime);
            crow.lookahead(this.map);
        });

        this.flowers.forEach(flower => flower.update(deltaTime));
        this.plants.forEach(plant => plant.update(deltaTime));
        this.birds.forEach(bird => {
            bird.update(deltaTime); 
            bird.lookahead(this.map);
        });
        this.bats.forEach(bat => bat.update(deltaTime));
        this.bombs.forEach(bomb => bomb.update(deltaTime));
        this.bears.forEach(bear => bear.update(deltaTime));
        this.hoes.forEach(hoe => hoe.update(deltaTime));
        this.tnts.forEach(tnt => tnt.update(deltaTime));
        
        this.saws.forEach(saw => saw.update(deltaTime));
        this.lava.forEach(lava => {
            lava.update(deltaTime);
        });

        const top = this.hsv[this.index].color;
        const bottom = this.hsv[(this.index + 180) % 360].color;

        this.shoutout.setTint(top, bottom, top, bottom);

        this.index++;
        if (this.index >= 360)
            this.index = 0;

        //SceneFactory.cullSprites(this);

        if(SceneFactory.gamePadIsButton(this,-1) || this.cursors?.space.isDown ) {
            this.continueGame();
        }

    }
}
