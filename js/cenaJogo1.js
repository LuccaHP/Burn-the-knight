class cenaJogo1 extends Phaser.Scene {
    constructor() {
        super({
            key: 'cenaJogo1',
        });
    }

    preload() {
        this.load.image('bg_jogo1', 'assets/bg_jogo.jpeg')
        this.load.image('platform', 'assets/platform.png')
        this.load.spritesheet('dragon_walk', 'assets/dragon_walk.png', { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('dragon_idle', 'assets/dragon_idle.png', { frameWidth: 100, frameHeight: 100 });
    }


    create() {
        //background
        this.add.image(400, 300, 'bg_jogo1').setScale(1.32);

        let platforms = this.physics.add.staticGroup();
        //chao
        platforms.create(200, 580, 'platform').setScale(0.22);
        platforms.create(600, 580, 'platform').setScale(0.22);

        //plataforma direita
        platforms.create(620, 350, 'platform').setScale(0.1);
        platforms.create(720, 350, 'platform').setScale(0.1);

        //plataforma esquerda
        platforms.create(80, 350, 'platform').setScale(0.1);
        platforms.create(170, 350, 'platform').setScale(0.1);

        //configurações do player (dragon)
        this.player = this.physics.add.sprite(100, 450, 'dragon_idle').setScale(1.42);
        this.player.setCollideWorldBounds(true); // Impede que o jogador saia da tela

        // Animações do jogador
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('dragon_walk', { start: 0, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('dragon_idle', { start: 0, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        //colisoes
        this.physics.add.collider(this.player, platforms);

        // Controles do jogador
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update () {
        // Verifica os controles de teclado e move o jogador
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160); // Movimento para a esquerda
            this.player.anims.play('walk', true); // Ativa a animação de caminhada
            this.player.setFlipX(false); // Não flipa o sprite horizontalmente
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160); // Movimento para a direita
            this.player.anims.play('walk', true); // Ativa a animação de caminhada
            this.player.setFlipX(true); // Flipa o sprite horizontalmente
        } else {
            this.player.setVelocityX(0); // Parado
            this.player.anims.play('idle', true); // Ativa a animação de idle
        }
    }
}
