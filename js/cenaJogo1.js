class cenaJogo1 extends Phaser.Scene {
    constructor() {
        super({
            key: 'cenaJogo1',
        });
    }

    preload() {
        this.load.image('bg_jogo1', 'assets/bg_jogo.jpeg')
        this.load.image('platform', 'assets/platform.png')
    }

    create() {
        //background
        this.add.image(400, 300, 'bg_jogo1').setScale(1.32)
        //chao
        this.add.image(200, 580, 'platform').setScale(0.22)
        this.add.image(600, 580, 'platform').setScale(0.22)

        //plataforma direita
        this.add.image(620, 350, 'platform').setScale(0.1)
        this.add.image(720, 350, 'platform').setScale(0.1)

         //plataforma esquerda
        this.add.image(80, 350, 'platform').setScale(0.1)
        this.add.image(170, 350, 'platform').setScale(0.1)

        //plataforma acima da direita 
        }

        // plataforma = this.physics.add.staticImage(larguraJogo/2, alturaJogo/2, 'plataforma_tijolo');

    update () {
    }
}
