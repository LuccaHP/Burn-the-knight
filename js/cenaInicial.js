
export default class cenaInicial extends Phaser.Scene {
    constructor() {
        super({
            key: 'cenaInicial',
        });
    }

    preload() {
        this.load.image('playButton', 'assets/playbt.png');
        this.load.image('playButtonHover', 'assets/playbtHover.png');
        this.load.image('bg', 'assets/bg.png')
    }

    create() {
        this.add.image(400, 300, 'bg')

            let playButton = this.add.image(this.game.config.width / 2 - 50, this.game.config.height / 4 * 3, 'playButton').setOrigin(0, 0).setInteractive().setVisible(true);

            // Quando o ponteiro passa por cima do botão, muda para a textura de hover
            playButton.on('pointerover', () => {
                playButton.setTexture('playButtonHover');
            });
        
            // Quando o ponteiro sai de cima do botão, volta para a textura original
            playButton.on('pointerout', () => {
                playButton.setTexture('playButton');
            });
        
            // Adiciona funcionalidade de clique ao botão
            playButton.on('pointerdown', () => {

                //Começa o jogo com a escolha do personagem
                this.scene.start('cenaJogo1', this.game);
            }, this);
        }

    update () {
    }
}
