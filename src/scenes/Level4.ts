import Phaser from 'phaser'
import ObstaclesController from '../scripts/ObstaclesController';
import PlayerController from '../scripts/PlayerController';
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
import * as SceneFactory from '../scripts/SceneFactory';
import * as AlignmentHelper from '../scripts/AlignmentHelper';
import ZeppelinController from '~/scripts/ZeppelinController';
import TNTController from '~/scripts/TNTController';
import BearController from '~/scripts/BearController';
import HoeController from '~/scripts/HoeController';
import CrowController from '~/scripts/CrowController';
import FlyController from '~/scripts/FlyController';
import SawController from '~/scripts/SawController';
import { sharedInstance as events} from '../scripts/EventManager';
import BaseScene from './BaseScene';
import BossController from '~/scripts/BossController';
import LavaController from '~/scripts/LavaController';
import NeonController from '~/scripts/NeonController';
import { PlayerStats } from './PlayerStats';

export default class Level4 extends BaseScene {

    private info!: PlayerStats;
    private map!: Phaser.Tilemaps.Tilemap;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private player?: Phaser.Physics.Matter.Sprite;
    private playerController?: PlayerController;
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
    private tnts: TNTController[] = [];
    private bears: BearController[] = [];
    private hoes: HoeController[] = [];
    
    private flies: FlyController[] = [];
    private crows: CrowController[] = [];
    private saws: SawController[] = [];
    private boss: BossController[] = [];
    private lava: LavaController[] = [];
    private neon: NeonController[] = [];
    private objects: Phaser.Physics.Matter.Sprite[] = [];
    private ground1!: Phaser.Tilemaps.TilemapLayer;
    private layer1!: Phaser.Tilemaps.TilemapLayer;

    private playerX = -1;
    private playerY = -1;

    private sounds!: Map<string, Phaser.Sound.BaseSound>;

    constructor() {
		super('level4');
	}

    init() {

        super.init();

        this.cursors = this.input.keyboard.createCursorKeys();
        
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
        this.bears = [];
        this.hoes = [];
        this.tnts = [];
        this.flies = [];
        this.crows = [];
        this.saws = [];
        this.garys = [];
        this.sams = [];
        this.boss = [];
        this.lava = [];
        this.neon = [];
        this.objects = [];
        this.sounds = new Map<string,Phaser.Sound.BaseSound>();

        this.info = {
            'lastHealth': 100,
            'coinsCollected': 0,
            'carrotsCollected': 0,
            'currLevel': 4,
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

        const data = window.localStorage.getItem( 'trump.stats' );
        if( data != null ) {
            const obj = JSON.parse(data);
            this.info = obj as PlayerStats;
        }
        this.info.currLevel = 4;

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.destroy();
        });

    }

	preload() {

        this.load.image('back22', 'assets/back22.webp');
        this.load.image('back18', 'assets/back18.webp');
        this.load.image('back19', 'assets/back19.webp');
        this.load.image('back20', 'assets/back20.webp');
        this.load.image('back21', 'assets/back21.webp');
        this.load.image('back23', 'assets/back23.webp');
        


        SceneFactory.preload(this);

        this.load.tilemapTiledJSON('tilemap6', 'assets/map6.json');
    }

    create() {

        super.create();

        this.sounds = SceneFactory.setupSounds(this);

        this.scene.launch('ui');

        SceneFactory.playRandomMusic(this);

        this.events.on('player-jumped', this.playerJumped, this);
     
        const { width, height } = this.scale;
        const tint = 0xde1ed0;// 0x9800ff;
        const totalWidth = 336 * 64;
        const hei = 24 * 64;
        const s = 1;

        AlignmentHelper.createAligned(this, totalWidth, hei, "back22", 0.375 / s, 1 );
        AlignmentHelper.createAligned(this, totalWidth, hei,"back18", 0.385 / s,1); //mountain
        AlignmentHelper.createAligned(this, totalWidth, hei, "back19", 0.375 / s,1);
        AlignmentHelper.createAligned(this, totalWidth, hei, "back20", 0.365 / s,1);
        AlignmentHelper.createAligned(this, totalWidth, hei,"back21", 0.35 / s,1);
        AlignmentHelper.createAligned(this, totalWidth, hei,"back23", 0.375 / s,1);
        
    //    AlignmentHelper.createAlignedT(this, totalWidth, hei,"bg_5", 0.345 / s,1, tint);
    //    AlignmentHelper.createAlignedT(this, totalWidth, hei,"bg_6", 0.36 ,1, tint);

        this.map = this.make.tilemap({ key: 'tilemap6', tileWidth: 64, tileHeight: 64 });
        const groundTiles = this.map.addTilesetImage('terrainv4', 'groundTiles', 64, 64, 0, 2);
        const groundTilesv1 = this.map.addTilesetImage( 'ground', 'groundTilesv1',64,64,0, 2 );
        const propTiles = this.map.addTilesetImage('props', 'propTiles', 64, 64, 0, 2);
        this.ground1 = this.map.createLayer('ground', [ groundTiles, groundTilesv1 ]);
        this.layer1 = this.map.createLayer('layer1', [ groundTiles, groundTilesv1 ]);

      
        this.ground1.setCollisionByProperty({ collides: true,recalculateFaces: false });
        
        this.map.createLayer('obstacles', propTiles);
        this.layer1.setDepth(10);
        
        const playerCat = 2; // this.matter.world.nextCategory();
        const enemyCat = 4; //this.matter.world.nextCategory();

        const collideWith = [1, playerCat];

        this.playerX = this.scene.scene.game.registry.get( 'playerX' ) || -1;
        this.playerY = this.scene.scene.game.registry.get( 'playerY' ) || -1;
        
        const objectsLayer = this.map.getObjectLayer('objects');
        objectsLayer?.objects.forEach(objData => {
            
            const { x = 0, y = 0, name, width = 0, height = 0 } = objData;
            switch (name) {
                case 'player1-spawn':
                case 'player2-spawn':
                case 'player-spawn': {
                    this.player = SceneFactory.createPlayer(this,
                        (this.playerX == -1 ? x : this.playerX),
                        (this.playerY == -1 ? y : this.playerY),
                        width,height,playerCat);

                    this.playerController = new PlayerController(
                        this,
                        this.player, 
                        this.cursors,
                        this.obstaclesController,
                        this.sounds,
                        this.map,
                        this.info
                        );
                    this.playerController.setCollideWith(playerCat);
                        
                    this.cameras.main.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);
                    this.cameras.main.startFollow(this.player, true);

                    this.cameras.main.setAlpha(1);
                    this.cameras.main.setViewport(0,0,1280,640);
                    this.cameras.main.setZoom(1.0);
                    this.cameras.main.roundPixels = true;

                    break;
                }
                default:
                    break;
            }
        });

        objectsLayer?.objects.forEach(objData => {
            const { x = 0, y = 0, name, width = 0, height = 0, rotation = 0 } = objData;
            switch (name) {
                default:
                    SceneFactory.basicCreate(this,name,x,y,width,height,rotation,enemyCat,collideWith,this.obstaclesController, objData, this.playerController);
                    break;
            }
        });
       
        this.matter.world.convertTilemapLayer(this.ground1, {label: 'ground', friction: 0, frictionStatic: 0 });
        this.matter.world.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels, 1, true, true,false, false);

/*        this.matter.world.drawDebug = false;
        this.input.keyboard.on("keydown-I", (event) => {
          this.matter.world.drawDebug = !this.matter.world.drawDebug;
          this.matter.world.debugGraphic.clear();
        });
        */

        this.matter.world.on("collisionstart", (e: { pairs: any; }, o1: any, o2: any) => {
            const pairs = e.pairs;
            for (let i = 0; i < pairs.length; i++) {
                const bodyA = pairs[i].bodyA;
                const bodyB = pairs[i].bodyB;

                if (bodyA.gameObject === undefined)
                    continue;

                const dy = ~~(bodyB.position.y - bodyA.position.y);

                if (dy <= 32) {
                    events.emit(bodyA.gameObject?.name + '-blocked', bodyA.gameObject);
                }
            }
        });

        this.playerController?.setJoystick(this, width);
    }

    preDestroy() {
        this.obstaclesController.destroy(this);
    }

    destroy() {

        super.destroy();

        this.events.off('player-jumped', this.playerJumped, this);
     
        this.playerController?.destroy();

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
        this.bears.forEach(bear => bear.destroy());
        this.hoes.forEach(hoe => hoe.destroy());
        
        this.tnts.forEach(tnt => tnt.destroy());
        this.flies.forEach(fly => fly.destroy());
        this.crows.forEach(crow => crow.destroy());
        this.saws.forEach(saw => saw.destroy());
        this.boss.forEach(boss=>boss.destroy());
        this.lava.forEach(lava=>lava.destroy());

        this.objects.forEach(obj => obj.destroy());

        this.ground1.destroy();
        this.layer1.destroy();
        this.map.destroy();

        this.sounds.clear();
    }

    update(time: number, deltaTime: number) {

        super.update(time,deltaTime);

        if(!super.doStep())
            return;

        this.bombs = this.bombs.filter(e => e.keepObject());
        this.monsters = this.monsters.filter(e => e.keepObject());
        this.crabs = this.crabs.filter(e => e.keepObject());
        this.birds = this.birds.filter(e => e.keepObject());
        this.firewalkers = this.firewalkers.filter(e => e.keepObject());
        this.bats = this.bats.filter(e => e.keepObject());
        this.bidens = this.bidens.filter(e => e.keepObject());
        this.sams = this.sams.filter(e => e.keepObject());
        this.garys = this.garys.filter(e => e.keepObject());
        
        this.obamas = this.obamas.filter(e => e.keepObject());
        
        this.bears = this.bears.filter(e => e.keepObject());
        this.hoes = this.hoes.filter(e => e.keepObject());
        
        this.crows = this.crows.filter(e => e.keepObject());
        this.boss = this.boss.filter(e=>e.keepObject());
        this.flies = this.flies.filter(e=>e.keepObject());
        
        this.lava.forEach(lava => {
            lava.update(deltaTime);
        });

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
        this.birds.forEach(bird => bird.update(deltaTime));
        this.bats.forEach(bat => bat.update(deltaTime));
        this.bombs.forEach(bomb => bomb.update(deltaTime)); 
        this.bears.forEach(bear => bear.update(deltaTime));
        this.hoes.forEach(hoe => hoe.update(deltaTime));
        this.tnts.forEach(tnt => tnt.update(deltaTime));
        this.crows.forEach(crow => crow.update(deltaTime));
        this.saws.forEach(saw => {
            saw.update(deltaTime);
            saw.lookahead(this.map);
        }); 

        this.boss.forEach(boss => boss.update(deltaTime));

        this.playerController?.update(deltaTime);
        SceneFactory.cullSprites(this);
    }

    playerJumped() {
        SceneFactory.playSound(this.sounds, 'jump');
    }

}
