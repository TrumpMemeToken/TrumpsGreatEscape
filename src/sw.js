var cacheName = 'game-cache-v1.9';
var cacheWhiteList = [ "game-cache-v1.9" ];

var filesToCache = [
  '/trumpsgreatescape/assets/arrow.webp',
  '/trumpsgreatescape/assets/back1.webp',
  '/trumpsgreatescape/assets/back10.webp',
  '/trumpsgreatescape/assets/back11.webp',
  '/trumpsgreatescape/assets/back12.webp',
  '/trumpsgreatescape/assets/back13.webp',
  '/trumpsgreatescape/assets/back14.webp',
  '/trumpsgreatescape/assets/back15.webp',
  '/trumpsgreatescape/assets/back16.webp',
  '/trumpsgreatescape/assets/back17.webp',
  '/trumpsgreatescape/assets/back18.webp',
  '/trumpsgreatescape/assets/back19.webp',
  '/trumpsgreatescape/assets/back2.webp',
  '/trumpsgreatescape/assets/back20.webp',
  '/trumpsgreatescape/assets/back21.webp',
  '/trumpsgreatescape/assets/back22.webp',
  '/trumpsgreatescape/assets/back23.webp',
  '/trumpsgreatescape/assets/back24.webp',
  '/trumpsgreatescape/assets/back3.webp',
  '/trumpsgreatescape/assets/back4.webp',
  '/trumpsgreatescape/assets/back5.webp',
  '/trumpsgreatescape/assets/back6.webp',
  '/trumpsgreatescape/assets/back7.webp',
  '/trumpsgreatescape/assets/back8.webp',
  '/trumpsgreatescape/assets/back9.webp',
  '/trumpsgreatescape/assets/backboss.webp',
  '/trumpsgreatescape/assets/banner1.webp',
  '/trumpsgreatescape/assets/bar.webp',
  '/trumpsgreatescape/assets/bat.webp',
  '/trumpsgreatescape/assets/bear.webp',
  '/trumpsgreatescape/assets/berry.webp',
  '/trumpsgreatescape/assets/bg-ui.webp',
  '/trumpsgreatescape/assets/biden.webp',
  '/trumpsgreatescape/assets/billboards.webp',
  '/trumpsgreatescape/assets/bird.webp',
  '/trumpsgreatescape/assets/bomb.webp',
  '/trumpsgreatescape/assets/boss.webp',
  '/trumpsgreatescape/assets/brick1-2.webp',
  '/trumpsgreatescape/assets/brick2-2.webp',
  '/trumpsgreatescape/assets/burger.webp',
  '/trumpsgreatescape/assets/carrot.webp',
  '/trumpsgreatescape/assets/changeskin.webp',
  '/trumpsgreatescape/assets/chart.webp',
  '/trumpsgreatescape/assets/clouds.webp',
  '/trumpsgreatescape/assets/clouds2.webp',
  '/trumpsgreatescape/assets/coin.webp',
  '/trumpsgreatescape/assets/crab.webp',
  '/trumpsgreatescape/assets/crate.webp',
  '/trumpsgreatescape/assets/crow.webp',
  '/trumpsgreatescape/assets/dek.webp',
  '/trumpsgreatescape/assets/desk.webp',
  '/trumpsgreatescape/assets/diamond.webp',
  '/trumpsgreatescape/assets/dragon.webp',
  '/trumpsgreatescape/assets/dropping-splash.webp',
  '/trumpsgreatescape/assets/dropping.webp',
  '/trumpsgreatescape/assets/fbiagent.webp',
  '/trumpsgreatescape/assets/fire.webp',
  '/trumpsgreatescape/assets/fireball.webp',
  '/trumpsgreatescape/assets/firewalk.webp',
  '/trumpsgreatescape/assets/flower.webp',
  '/trumpsgreatescape/assets/fly.webp',
  '/trumpsgreatescape/assets/frog.webp',
  '/trumpsgreatescape/assets/gary.webp',
  '/trumpsgreatescape/assets/golfball.webp',
  '/trumpsgreatescape/assets/gras-purple.webp',
  '/trumpsgreatescape/assets/gras.webp',
  '/trumpsgreatescape/assets/ground-extruded.webp',
  '/trumpsgreatescape/assets/health.webp',
  '/trumpsgreatescape/assets/heart.webp',
  '/trumpsgreatescape/assets/hoe.webp',
  '/trumpsgreatescape/assets/inventory.webp',
  '/trumpsgreatescape/assets/juice.webp',
  '/trumpsgreatescape/assets/key.webp',
  '/trumpsgreatescape/assets/lab.webp',
  '/trumpsgreatescape/assets/label-mushyroom.webp',
  '/trumpsgreatescape/assets/lava-center.webp',
  '/trumpsgreatescape/assets/lava-top.webp',
  '/trumpsgreatescape/assets/lightswitch.webp',
  '/trumpsgreatescape/assets/loading.webp',
  '/trumpsgreatescape/assets/logo.webp',
  '/trumpsgreatescape/assets/money.webp',
  '/trumpsgreatescape/assets/monster.webp',
  '/trumpsgreatescape/assets/mushroom.webp',
  '/trumpsgreatescape/assets/mushrooms.webp',
  '/trumpsgreatescape/assets/obama.webp',
  '/trumpsgreatescape/assets/particles.webp',
  '/trumpsgreatescape/assets/plane.webp',
  '/trumpsgreatescape/assets/plant.webp',
  '/trumpsgreatescape/assets/platform.webp',
  '/trumpsgreatescape/assets/plof.webp',
  '/trumpsgreatescape/assets/pokeball.webp',
  '/trumpsgreatescape/assets/pow.webp',
  '/trumpsgreatescape/assets/powershotball.webp',
  '/trumpsgreatescape/assets/powershotsplash.webp',
  '/trumpsgreatescape/assets/press_start_2p.webp',
  '/trumpsgreatescape/assets/redsquare.webp',
  '/trumpsgreatescape/assets/rocks.webp',
  '/trumpsgreatescape/assets/rubber_1.webp',
  '/trumpsgreatescape/assets/rubber_2.webp',
  '/trumpsgreatescape/assets/rubber_3.webp',
  '/trumpsgreatescape/assets/sam.webp',
  '/trumpsgreatescape/assets/saw.webp',
  '/trumpsgreatescape/assets/secretbox.webp',
  '/trumpsgreatescape/assets/sky.webp',
  '/trumpsgreatescape/assets/spikes.webp',
  '/trumpsgreatescape/assets/spritesheet_ground.webp',
  '/trumpsgreatescape/assets/spritesheet_ground_extruded.webp',
  '/trumpsgreatescape/assets/spritesheet_props.webp',
  '/trumpsgreatescape/assets/spritesheet_props_extruded.webp',
  '/trumpsgreatescape/assets/star.webp',
  '/trumpsgreatescape/assets/start1.webp',
  '/trumpsgreatescape/assets/stones.webp',
  '/trumpsgreatescape/assets/storyx.webp',
  '/trumpsgreatescape/assets/terrainv3.webp',
  '/trumpsgreatescape/assets/terrainv4-extruded.webp',
  '/trumpsgreatescape/assets/terrainv4.webp',
  '/trumpsgreatescape/assets/terrainv5.webp',
  '/trumpsgreatescape/assets/tnt.webp',
  '/trumpsgreatescape/assets/toad.webp',
  '/trumpsgreatescape/assets/trap.webp',
  '/trumpsgreatescape/assets/trashcan.webp',
  '/trumpsgreatescape/assets/trees.webp',
  '/trumpsgreatescape/assets/trump.webp',
  '/trumpsgreatescape/assets/trumpscreen.webp',
  '/trumpsgreatescape/assets/trumpsymbol.webp',
  '/trumpsgreatescape/assets/ufo.webp',
  '/trumpsgreatescape/assets/valve.webp',
  '/trumpsgreatescape/assets/warpbg.webp',
  '/trumpsgreatescape/assets/weed.webp',
  '/trumpsgreatescape/assets/zeppelin1.webp',
  '/trumpsgreatescape/assets/zeppelin2.webp',
  '/trumpsgreatescape/assets/bat.json',
  '/trumpsgreatescape/assets/bear.json',
  '/trumpsgreatescape/assets/biden.json',
  '/trumpsgreatescape/assets/billboards.json',
  '/trumpsgreatescape/assets/bird.json',
  '/trumpsgreatescape/assets/bomb.json',
  '/trumpsgreatescape/assets/bonus-map1.json',
  '/trumpsgreatescape/assets/boss.json',
  '/trumpsgreatescape/assets/crab.json',
  '/trumpsgreatescape/assets/crow.json',
  '/trumpsgreatescape/assets/desk.json',
  '/trumpsgreatescape/assets/dragon.json',
  '/trumpsgreatescape/assets/dropping-splash.json',
  '/trumpsgreatescape/assets/fbiagent.json',
  '/trumpsgreatescape/assets/fire.json',
  '/trumpsgreatescape/assets/fireball.json',
  '/trumpsgreatescape/assets/firewalk.json',
  '/trumpsgreatescape/assets/flower.json',
  '/trumpsgreatescape/assets/fly.json',
  '/trumpsgreatescape/assets/frog.json',
  '/trumpsgreatescape/assets/gary.json',
  '/trumpsgreatescape/assets/hoe.json',
  '/trumpsgreatescape/assets/lava-center.json',
  '/trumpsgreatescape/assets/lava-top.json',
  '/trumpsgreatescape/assets/lightswitch.json',
  '/trumpsgreatescape/assets/map1.json',
  '/trumpsgreatescape/assets/map2.json',
  '/trumpsgreatescape/assets/map3.json',
  '/trumpsgreatescape/assets/map4.json',
  '/trumpsgreatescape/assets/map5.json',
  '/trumpsgreatescape/assets/map6.json',
  '/trumpsgreatescape/assets/map7.json',
  '/trumpsgreatescape/assets/map8.json',
  '/trumpsgreatescape/assets/map9.json',
  '/trumpsgreatescape/assets/money-emitter.json',
  '/trumpsgreatescape/assets/money.json',
  '/trumpsgreatescape/assets/monster.json',
  '/trumpsgreatescape/assets/mushrooms.json',
  '/trumpsgreatescape/assets/obama.json',
  '/trumpsgreatescape/assets/package.json',
  '/trumpsgreatescape/assets/particles.json',
  '/trumpsgreatescape/assets/plant.json',
  '/trumpsgreatescape/assets/plof.json',
  '/trumpsgreatescape/assets/powershotsplash.json',
  '/trumpsgreatescape/assets/rocks.json',
  '/trumpsgreatescape/assets/sam.json',
  '/trumpsgreatescape/assets/saw.json',
  '/trumpsgreatescape/assets/start.json',
  '/trumpsgreatescape/assets/stones.json',
  '/trumpsgreatescape/assets/terrainv3.json',
  '/trumpsgreatescape/assets/terrainv4.json',
  '/trumpsgreatescape/assets/terrainv5.json',
  '/trumpsgreatescape/assets/tnt.json',
  '/trumpsgreatescape/assets/trees.json',
  '/trumpsgreatescape/assets/trump.json',
  '/trumpsgreatescape/assets/trumpsymbol.json',
  '/trumpsgreatescape/assets/ufo.json',
  '/trumpsgreatescape/assets/01_main_screen_trailer.m4a',
  '/trumpsgreatescape/assets/01_main_screen_trailer.mp3',
  '/trumpsgreatescape/assets/02_level_grass.m4a',
  '/trumpsgreatescape/assets/02_level_grass.mp3',
  '/trumpsgreatescape/assets/03_level_forest.m4a',
  '/trumpsgreatescape/assets/03_level_forest.mp3',
  '/trumpsgreatescape/assets/04_level_rain.m4a',
  '/trumpsgreatescape/assets/04_level_rain.mp3',
  '/trumpsgreatescape/assets/05_level_desert.m4a',
  '/trumpsgreatescape/assets/05_level_desert.mp3',
  '/trumpsgreatescape/assets/100coins.m4a',
  '/trumpsgreatescape/assets/100coins.mp3',
  '/trumpsgreatescape/assets/8bitmetal.m4a',
  '/trumpsgreatescape/assets/8bitmetal.mp3',
  '/trumpsgreatescape/assets/angel-eyes.m4a',
  '/trumpsgreatescape/assets/angel-eyes.mp3',
  '/trumpsgreatescape/assets/beginatthebeginning-cs.m4a',
  '/trumpsgreatescape/assets/beginatthebeginning-cs.mp3',
  '/trumpsgreatescape/assets/beginatthebeginning.m4a',
  '/trumpsgreatescape/assets/beginatthebeginning.mp3',
  '/trumpsgreatescape/assets/berry.m4a',
  '/trumpsgreatescape/assets/berry.mp3',
  '/trumpsgreatescape/assets/bgm_alpha.m4a',
  '/trumpsgreatescape/assets/bgm_alpha.mp3',
  '/trumpsgreatescape/assets/bgm_beta.m4a',
  '/trumpsgreatescape/assets/bgm_beta.mp3',
  '/trumpsgreatescape/assets/bgm_delta.m4a',
  '/trumpsgreatescape/assets/bgm_delta.mp3',
  '/trumpsgreatescape/assets/bgm_epsilon.m4a',
  '/trumpsgreatescape/assets/bgm_epsilon.mp3',
  '/trumpsgreatescape/assets/bgm_gamma.m4a',
  '/trumpsgreatescape/assets/bgm_gamma.mp3',
  '/trumpsgreatescape/assets/bgm_menu.m4a',
  '/trumpsgreatescape/assets/bgm_menu.mp3',
  '/trumpsgreatescape/assets/bgm_omega.m4a',
  '/trumpsgreatescape/assets/bgm_omega.mp3',
  '/trumpsgreatescape/assets/blip.m4a',
  '/trumpsgreatescape/assets/blip.mp3',
  '/trumpsgreatescape/assets/blowitoutofyourass.m4a',
  '/trumpsgreatescape/assets/blowitoutofyourass.mp3',
  '/trumpsgreatescape/assets/bonustile.m4a',
  '/trumpsgreatescape/assets/bonustile.mp3',
  '/trumpsgreatescape/assets/boss.m4a',
  '/trumpsgreatescape/assets/boss.mp3',
  '/trumpsgreatescape/assets/boss4.m4a',
  '/trumpsgreatescape/assets/boss4.mp3',
  '/trumpsgreatescape/assets/boss6.m4a',
  '/trumpsgreatescape/assets/boss6.mp3',
  '/trumpsgreatescape/assets/bottomlesspitman.m4a',
  '/trumpsgreatescape/assets/bottomlesspitman.mp3',
  '/trumpsgreatescape/assets/breakingtile.m4a',
  '/trumpsgreatescape/assets/breakingtile.mp3',
  '/trumpsgreatescape/assets/breakmybed-cs.m4a',
  '/trumpsgreatescape/assets/breakmybed-cs.mp3',
  '/trumpsgreatescape/assets/breakmybed.m4a',
  '/trumpsgreatescape/assets/breakmybed.mp3',
  '/trumpsgreatescape/assets/catchy.m4a',
  '/trumpsgreatescape/assets/catchy.mp3',
  '/trumpsgreatescape/assets/ch-ay-na.m4a',
  '/trumpsgreatescape/assets/ch-ay-na.mp3',
  '/trumpsgreatescape/assets/changeskin.m4a',
  '/trumpsgreatescape/assets/changeskin.mp3',
  '/trumpsgreatescape/assets/chiptune-stage1.m4a',
  '/trumpsgreatescape/assets/chiptune-stage1.mp3',
  '/trumpsgreatescape/assets/chiptune-stage2.m4a',
  '/trumpsgreatescape/assets/chiptune-stage2.mp3',
  '/trumpsgreatescape/assets/click2.m4a',
  '/trumpsgreatescape/assets/click2.mp3',
  '/trumpsgreatescape/assets/coinpickup.m4a',
  '/trumpsgreatescape/assets/coinpickup.mp3',
  '/trumpsgreatescape/assets/dawn_of_hope_low.m4a',
  '/trumpsgreatescape/assets/dawn_of_hope_low.mp3',
  '/trumpsgreatescape/assets/demon_1.m4a',
  '/trumpsgreatescape/assets/demon_1.mp3',
  '/trumpsgreatescape/assets/demon_2.m4a',
  '/trumpsgreatescape/assets/demon_2.mp3',
  '/trumpsgreatescape/assets/demon_3.m4a',
  '/trumpsgreatescape/assets/demon_3.mp3',
  '/trumpsgreatescape/assets/demon_4.m4a',
  '/trumpsgreatescape/assets/demon_4.mp3',
  '/trumpsgreatescape/assets/diehardv1.m4a',
  '/trumpsgreatescape/assets/diehardv1.mp3',
  '/trumpsgreatescape/assets/donttellmewhattodo-cs.m4a',
  '/trumpsgreatescape/assets/donttellmewhattodo-cs.mp3',
  '/trumpsgreatescape/assets/donttellmewhattodo.m4a',
  '/trumpsgreatescape/assets/donttellmewhattodo.mp3',
  '/trumpsgreatescape/assets/droppingbounces.m4a',
  '/trumpsgreatescape/assets/droppingbounces.mp3',
  '/trumpsgreatescape/assets/droppinghits.m4a',
  '/trumpsgreatescape/assets/droppinghits.mp3',
  '/trumpsgreatescape/assets/drunktoomuch-cs.m4a',
  '/trumpsgreatescape/assets/drunktoomuch-cs.mp3',
  '/trumpsgreatescape/assets/drunktoomuch.m4a',
  '/trumpsgreatescape/assets/drunktoomuch.mp3',
  '/trumpsgreatescape/assets/enchantedwoods.m4a',
  '/trumpsgreatescape/assets/enchantedwoods.mp3',
  '/trumpsgreatescape/assets/equalopportunity-cs.m4a',
  '/trumpsgreatescape/assets/equalopportunity-cs.mp3',
  '/trumpsgreatescape/assets/equalopportunity.m4a',
  '/trumpsgreatescape/assets/equalopportunity.mp3',
  '/trumpsgreatescape/assets/explosion1.m4a',
  '/trumpsgreatescape/assets/explosion1.mp3',
  '/trumpsgreatescape/assets/explosion2.m4a',
  '/trumpsgreatescape/assets/explosion2.mp3',
  '/trumpsgreatescape/assets/explosion3.m4a',
  '/trumpsgreatescape/assets/explosion3.mp3',
  '/trumpsgreatescape/assets/explosion4.m4a',
  '/trumpsgreatescape/assets/explosion4.mp3',
  '/trumpsgreatescape/assets/explosion5.m4a',
  '/trumpsgreatescape/assets/explosion5.mp3',
  '/trumpsgreatescape/assets/explosion6.m4a',
  '/trumpsgreatescape/assets/explosion6.mp3',
  '/trumpsgreatescape/assets/finalbossbattle.m4a',
  '/trumpsgreatescape/assets/finalbossbattle.mp3',
  '/trumpsgreatescape/assets/freejump.m4a',
  '/trumpsgreatescape/assets/freejump.mp3',
  '/trumpsgreatescape/assets/galaticfunk.m4a',
  '/trumpsgreatescape/assets/galaticfunk.mp3',
  '/trumpsgreatescape/assets/gameover.m4a',
  '/trumpsgreatescape/assets/gameover.mp3',
  '/trumpsgreatescape/assets/greengray.m4a',
  '/trumpsgreatescape/assets/greengray.mp3',
  '/trumpsgreatescape/assets/hailtotheking-cs.m4a',
  '/trumpsgreatescape/assets/hailtotheking-cs.mp3',
  '/trumpsgreatescape/assets/hailtotheking.m4a',
  '/trumpsgreatescape/assets/hailtotheking.mp3',
  '/trumpsgreatescape/assets/happylevel.m4a',
  '/trumpsgreatescape/assets/happylevel.mp3',
  '/trumpsgreatescape/assets/heroimmortal.m4a',
  '/trumpsgreatescape/assets/heroimmortal.mp3',
  '/trumpsgreatescape/assets/hiscore.m4a',
  '/trumpsgreatescape/assets/hiscore.mp3',
  '/trumpsgreatescape/assets/hit.m4a',
  '/trumpsgreatescape/assets/hit.mp3',
  '/trumpsgreatescape/assets/hit1.m4a',
  '/trumpsgreatescape/assets/hit1.mp3',
  '/trumpsgreatescape/assets/hit2.m4a',
  '/trumpsgreatescape/assets/hit2.mp3',
  '/trumpsgreatescape/assets/idontseehow-cs.m4a',
  '/trumpsgreatescape/assets/idontseehow-cs.mp3',
  '/trumpsgreatescape/assets/idontseehow.m4a',
  '/trumpsgreatescape/assets/idontseehow.mp3',
  '/trumpsgreatescape/assets/imsothirsty-cs.m4a',
  '/trumpsgreatescape/assets/imsothirsty-cs.mp3',
  '/trumpsgreatescape/assets/imsothirsty.m4a',
  '/trumpsgreatescape/assets/imsothirsty.mp3',
  '/trumpsgreatescape/assets/juhanijunkala.m4a',
  '/trumpsgreatescape/assets/juhanijunkala.mp3',
  '/trumpsgreatescape/assets/juhanjunkala2.m4a',
  '/trumpsgreatescape/assets/juhanjunkala2.mp3',
  '/trumpsgreatescape/assets/jump.m4a',
  '/trumpsgreatescape/assets/jump.mp3',
  '/trumpsgreatescape/assets/junglegroove.m4a',
  '/trumpsgreatescape/assets/junglegroove.mp3',
  '/trumpsgreatescape/assets/lava.m4a',
  '/trumpsgreatescape/assets/lava.mp3',
  '/trumpsgreatescape/assets/lightswitch.m4a',
  '/trumpsgreatescape/assets/lightswitch.mp3',
  '/trumpsgreatescape/assets/longawayhome.m4a',
  '/trumpsgreatescape/assets/longawayhome.mp3',
  '/trumpsgreatescape/assets/mymomcandothattoo-cs.m4a',
  '/trumpsgreatescape/assets/mymomcandothattoo-cs.mp3',
  '/trumpsgreatescape/assets/mymomcandothattoo.m4a',
  '/trumpsgreatescape/assets/mymomcandothattoo.mp3',
  '/trumpsgreatescape/assets/nothrow.m4a',
  '/trumpsgreatescape/assets/nothrow.mp3',
  '/trumpsgreatescape/assets/offtoday-cs.m4a',
  '/trumpsgreatescape/assets/offtoday-cs.mp3',
  '/trumpsgreatescape/assets/offtoday.m4a',
  '/trumpsgreatescape/assets/offtoday.mp3',
  '/trumpsgreatescape/assets/onmyway.m4a',
  '/trumpsgreatescape/assets/onmyway.mp3',
  '/trumpsgreatescape/assets/pickupcarrot.m4a',
  '/trumpsgreatescape/assets/pickupcarrot.mp3',
  '/trumpsgreatescape/assets/pickupdropping.m4a',
  '/trumpsgreatescape/assets/pickupdropping.mp3',
  '/trumpsgreatescape/assets/pickuphealth.m4a',
  '/trumpsgreatescape/assets/pickuphealth.mp3',
  '/trumpsgreatescape/assets/pow.m4a',
  '/trumpsgreatescape/assets/pow.mp3',
  '/trumpsgreatescape/assets/proper_summer.m4a',
  '/trumpsgreatescape/assets/proper_summer.mp3',
  '/trumpsgreatescape/assets/redheels.m4a',
  '/trumpsgreatescape/assets/redheels.mp3',
  '/trumpsgreatescape/assets/rubber1.m4a',
  '/trumpsgreatescape/assets/rubber1.mp3',
  '/trumpsgreatescape/assets/spectacle.m4a',
  '/trumpsgreatescape/assets/spectacle.mp3',
  '/trumpsgreatescape/assets/spectacle2.mp3',
  '/trumpsgreatescape/assets/splash.m4a',
  '/trumpsgreatescape/assets/splash.mp3',
  '/trumpsgreatescape/assets/spy.m4a',
  '/trumpsgreatescape/assets/spy.mp3',
  '/trumpsgreatescape/assets/star.m4a',
  '/trumpsgreatescape/assets/star.mp3',
  '/trumpsgreatescape/assets/start.m4a',
  '/trumpsgreatescape/assets/start.mp3',
  '/trumpsgreatescape/assets/stomped.m4a',
  '/trumpsgreatescape/assets/stomped.mp3',
  '/trumpsgreatescape/assets/stomped2.m4a',
  '/trumpsgreatescape/assets/stomped2.mp3',
  '/trumpsgreatescape/assets/strongboysnevergiveup-cs.m4a',
  '/trumpsgreatescape/assets/strongboysnevergiveup-cs.mp3',
  '/trumpsgreatescape/assets/strongboysnevergiveup.m4a',
  '/trumpsgreatescape/assets/strongboysnevergiveup.mp3',
  '/trumpsgreatescape/assets/swinginglevel.m4a',
  '/trumpsgreatescape/assets/swinginglevel.mp3',
  '/trumpsgreatescape/assets/takeitslow-cs.m4a',
  '/trumpsgreatescape/assets/takeitslow-cs.mp3',
  '/trumpsgreatescape/assets/takeitslow.m4a',
  '/trumpsgreatescape/assets/takeitslow.mp3',
  '/trumpsgreatescape/assets/thecreeper.m4a',
  '/trumpsgreatescape/assets/thecreeper.mp3',
  '/trumpsgreatescape/assets/therightmaninthewrong-cs.m4a',
  '/trumpsgreatescape/assets/therightmaninthewrong-cs.mp3',
  '/trumpsgreatescape/assets/therightmaninthewrong.m4a',
  '/trumpsgreatescape/assets/therightmaninthewrong.mp3',
  '/trumpsgreatescape/assets/thevillage.m4a',
  '/trumpsgreatescape/assets/thevillage.mp3',
  '/trumpsgreatescape/assets/timetokickass.m4a',
  '/trumpsgreatescape/assets/timetokickass.mp3',
  '/trumpsgreatescape/assets/titanic-cs.m4a',
  '/trumpsgreatescape/assets/titanic-cs.mp3',
  '/trumpsgreatescape/assets/titanic.m4a',
  '/trumpsgreatescape/assets/titanic.mp3',
  '/trumpsgreatescape/assets/todo-cs.m4a',
  '/trumpsgreatescape/assets/todo-cs.mp3',
  '/trumpsgreatescape/assets/todo.m4a',
  '/trumpsgreatescape/assets/todo.mp3',
  '/trumpsgreatescape/assets/trampoline-cs.m4a',
  '/trumpsgreatescape/assets/trampoline-cs.mp3',
  '/trumpsgreatescape/assets/uber-cs.m4a',
  '/trumpsgreatescape/assets/uber-cs.mp3',
  '/trumpsgreatescape/assets/uber.m4a',
  '/trumpsgreatescape/assets/uber.mp3',
  '/trumpsgreatescape/assets/underneath-cs.m4a',
  '/trumpsgreatescape/assets/underneath-cs.mp3',
  '/trumpsgreatescape/assets/underneath.m4a',
  '/trumpsgreatescape/assets/underneath.mp3',
  '/trumpsgreatescape/assets/weareallmadhere-cs.m4a',
  '/trumpsgreatescape/assets/weareallmadhere-cs.mp3',
  '/trumpsgreatescape/assets/weareallmadhere.m4a',
  '/trumpsgreatescape/assets/weareallmadhere.mp3',
  '/trumpsgreatescape/assets/whatareyou-cs.m4a',
  '/trumpsgreatescape/assets/whatareyou-cs.mp3',
  '/trumpsgreatescape/assets/whatareyou.m4a',
  '/trumpsgreatescape/assets/whatareyou.mp3',
  '/trumpsgreatescape/assets/winneris.m4a',
  '/trumpsgreatescape/assets/winneris.mp3',
  '/trumpsgreatescape/assets/wishtogoanywhere-cs.m4a',
  '/trumpsgreatescape/assets/wishtogoanywhere-cs.mp3',
  '/trumpsgreatescape/assets/wishtogoanywhere.m4a',
  '/trumpsgreatescape/assets/wishtogoanywhere.mp3',
  '/trumpsgreatescape/assets/wrongbutton-cs.m4a',
  '/trumpsgreatescape/assets/wrongbutton-cs.mp3',
  '/trumpsgreatescape/assets/wrongbutton.m4a',
  '/trumpsgreatescape/assets/wrongbutton.mp3',
  '/trumpsgreatescape/assets/x-pixeladventures.m4a',
  '/trumpsgreatescape/assets/x-pixeladventures.mp3',
  '/trumpsgreatescape/assets/youcametooquick-cs.m4a',
  '/trumpsgreatescape/assets/youcametooquick-cs.mp3',
  '/trumpsgreatescape/assets/youcametooquick.m4a',
  '/trumpsgreatescape/assets/youcametooquick.mp3',
  '/trumpsgreatescape/assets/youcanstaybut-cs.m4a',
  '/trumpsgreatescape/assets/youcanstaybut-cs.mp3',
  '/trumpsgreatescape/assets/youcanstaybut.m4a',
  '/trumpsgreatescape/assets/youcanstaybut.mp3',
  '/trumpsgreatescape/assets/yourfaceyourass-cs.m4a',
  '/trumpsgreatescape/assets/yourfaceyourass-cs.mp3',
  '/trumpsgreatescape/assets/yourfaceyourass.m4a',
  '/trumpsgreatescape/assets/yourfaceyourass.mp3',
  '/trumpsgreatescape/assets/press_start_2p.fnt',  
];

self.addEventListener('install', function(e) {
e.waitUntil(
    caches.open(cacheName).then(function(cache) {
    return cache.addAll(filesToCache);
    })
);
self.skipWaiting();
});

self.addEventListener('fetch', event => {
    event.respondWith(
       caches.match(event.request, { ignoreSearch: true })
      .then(function(response) {
        if (response) {
          return response;
        }
        var requestToCache = event.request.clone();
  
        return fetch(requestToCache).then(
          function(response) {
            if(!response || response.status !== 200) {
              return response;
            }
  
            var responseToCache = response.clone();
            caches.open(cacheName)
            .then(function(cache) {
              cache.put(requestToCache, responseToCache);
            });
            return response;
          });
      })
    );
  });

  self.addEventListener("activate", (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhiteList.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
