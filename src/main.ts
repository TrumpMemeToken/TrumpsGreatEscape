import Phaser from 'phaser'
import Start from './scenes/Start'
import Level1 from './scenes/Level1'
import Level2 from './scenes/Level2'
import Level3 from './scenes/Level3'
import Level4 from './scenes/Level4'
import Level5 from './scenes/Level5'
import Level6 from './scenes/Level6'
import Level7 from './scenes/Level7'
import Level8 from './scenes/Level8'
import Level9 from './scenes/Level9'
import SelectPlayer from './scenes/SelectPlayer'
import LogoScreen from './scenes/LogoScreen'
import HoppaScreen from './scenes/HoppaScreen'
import UI from './scenes/UI'
import GameOver from './scenes/GameOver'
import Loader from './scenes/Loader'
import Bonus from './scenes/Bonus'
import Pause from './scenes/Pause'
import GameSettingsMenu from './scenes/GameSettingsMenu'
import Help from './scenes/Help'
import Wallet from './scenes/Wallet'
import AdScene from './scenes/AdScene'
import Story from './scenes/Story'
import EndGame from './scenes/EndGame'
import HoppaSelect from './scenes/HoppaSelect'
import WarpLevel from './scenes/WarpLevel'
import EndTitles from './scenes/EndTitles'
import BannerScreen from './scenes/Banner'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.WEBGL,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	width: 1280,
	height: 720,
	render: {
		pixelArt: true,
		antialias: false,
		antialiasGL: false,
	},
	physics: {
		default: 'matter',
		matter: {
			gravity: { y: 2 },
			debug: false,
			runner: {
				isFixed: true,
				fps: 60
			}
		},	
	},
	fps: {
		target: 30,
		forceSetTimeOut: false
	},
	input: {
		activePointers: 4,
		gamepad: true,
	},
	scene: [Loader,LogoScreen,BannerScreen, AdScene, HoppaScreen,HoppaSelect, Wallet,GameSettingsMenu,Help,EndTitles,EndGame,Start,SelectPlayer,Story,WarpLevel,Level1,Level2,Level3,Level4,Level5,Level6,Level7,Level8,Level9,Bonus,UI,Pause,GameOver],	
}

window.addEventListener('load', () => {
	window.setTimeout(() => { 
		new Phaser.Game(config);
	}, 3000)
});
