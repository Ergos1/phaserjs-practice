import 'phaser';

export default class Demo extends Phaser.Scene
{
    private platforms: Phaser.Physics.Arcade.StaticGroup;
    private player: Phaser.Physics.Arcade.Sprite;
    private canJump: boolean;

    constructor ()
    {
        super('demo');
    }

    preload ()
    {
        this.load.image('background', 'assets/background_sky.png');
        this.load.image('grass', 'assets/platform_grass.png');
        this.load.image('dude', 'assets/dude.png');
    }

    create ()
    {        
        this.add.image(400, 300, 'background');
        this.player = this.physics.add.sprite(400, 200, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400,300,'grass').setScale(2).refreshBody();

        this.physics.add.collider(this.player, this.platforms);

        this.canJump = true;
        this.input.keyboard.on('keydown', (event)=> {
            if(event.code == "KeyD") {
                this.player.setVelocityX(50);
            } 
            if(event.code == "KeyA") {
                this.player.setVelocityX(-50);
            }
            if(event.code == "KeyW" && this.canJump) {
                this.canJump = false;
                this.player.setVelocityY(-330);
                setTimeout(() => {
                    this.canJump = true;
                    this.player.setVelocityY(0);
                }, 1000);
            }
        })
    }

    update(time: number, delta: number): void {
    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    scene: Demo,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y:300 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);
