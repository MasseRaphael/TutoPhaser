import Phaser from '../lib/phaser.js';

export default class Game extends Phaser.Scene
{
    constructor()
    {
        super('game')
    }

    preload()
    {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude',
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 },
        );
    }

    create()
    {
        this.add.image(400, 300, 'sky');
        this.add.image(400, 568, 'ground').setScale(2);

        const platforms = this.physics.add.staticGroup();

        for(let i = 1; i < 4; ++i)
        {
            const x = Phaser.Math.Between(50, 750);
            const y = 150 * i;

            const platform = platforms.create(x, y, 'ground');
            const body = platform.body;
            body.updateFromGameObject();
        }
    }

    update()
    {

    }
}