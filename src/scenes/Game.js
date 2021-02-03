import Phaser from '../lib/phaser.js';

export default class Game extends Phaser.Scene
{
    player
    platforms
    cursors

    constructor()
    {
        super('game')
    }

    preload()
    {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/ground.png');
        this.load.image('platform', 'assets/platform.png')
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude',
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 },
        );

        //toujours à la fin
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create()
    {
        this.add.image(400, 300, 'sky');
        const ground = this.physics.add.staticImage(400, 575, 'ground');

        this.platforms = this.physics.add.staticGroup();

        for(let i = 1; i < 4; ++i)
        {
            const x = Phaser.Math.Between(50, 750);
            const y = 150 * i;

            const platform = this.platforms.create(x, y, 'platform');
            const body = platform.body;
            body.updateFromGameObject();
        };

        this.player = this.physics.add.sprite(100, 450, 'dude');

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(this.player, ground);
        this.physics.add.collider(this.player, this.platforms);
    }

    update()
    {
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330);
        }
    }
}