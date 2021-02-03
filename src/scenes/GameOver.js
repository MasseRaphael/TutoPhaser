import Phaser from '../lib/phaser.js';

export default class GameOver extends Phaser.Scene
{
    constructor()
    {
        super('game-over')
    }

    init(data)
    {
        this.finalScore = data.score;
    }

    create()
    {
        const width = this.scale.width;
        const height = this.scale.height;

        this.add.text(width * 0.5, height * 0.5, 'Game Over',{
            fontSize: 48
        })
        .setOrigin(0.5, 1.5);
        this.add.text(width * 0.5, height * 0.5, `Score: ${this.finalScore}`,{
            fontSize: 48
        })
        .setOrigin(0.5);
        this.add.text(width * 0.5, height * 0.5, `Press Space to play again`,{
            fontSize: 48
        })
        .setOrigin(0.5, -0.5);

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('game');
        });
    }
}