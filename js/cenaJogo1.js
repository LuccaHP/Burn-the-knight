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
        this.load.spritesheet('fireball', 'assets/fireball.png', { frameWidth: 22, frameHeight: 32 });
        this.load.spritesheet('knight', 'assets/knight_idle.png', { frameWidth: 150, frameHeight: 150 });
    }

    create() {
        //background
        this.add.image(400, 300, 'bg_jogo1').setScale(1.32);

        this.platforms = this.physics.add.staticGroup(); // Definindo platforms como uma variável de instância

        //chao
        this.platforms.create(200, 580, 'platform').setScale(0.22).refreshBody().setSize(800, 90, true);
        this.platforms.create(600, 580, 'platform').setScale(0.22).refreshBody().setSize(800, 90, true);

        //plataforma direita
        this.platforms.create(620, 350, 'platform').setScale(0.1).refreshBody();
        this.platforms.create(720, 350, 'platform').setScale(0.1).refreshBody();

        //plataforma esquerda
        this.platforms.create(80, 350, 'platform').setScale(0.1).refreshBody();
        this.platforms.create(170, 350, 'platform').setScale(0.1).refreshBody();

        //configurações do player (dragon)
        this.player = this.physics.add.sprite(100, 100, 'dragon_idle').setSize(50,50).setScale(1.42);
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
        this.physics.add.collider(this.player, this.platforms);

        // Controles do jogador
        this.cursors = this.input.keyboard.createCursorKeys();

        // Adicione um evento para detectar quando a tecla de espaço é pressionada
        this.input.keyboard.on('keydown-SPACE', this.shootFireball, this);
    }

        shootFireball() {
            // Crie uma bola de fogo no local do jogador
            let fireball = this.physics.add.sprite(this.player.x, this.player.y, 'fireball').setScale(1.42);

            // Configure a velocidade da bola de fogo de acordo com a direção do jogador
            if (this.player.flipX) {
                // Se o jogador estiver olhando para a esquerda, a bola de fogo vai para a esquerda
                fireball.setVelocityX(300);
                fireball.setAngle(-90); // Ajuste o ângulo da bola de fogo (vertical)
            } else {
                // Caso contrário, a bola de fogo vai para a direita
                fireball.setVelocityX(-300);
                fireball.setAngle(90); // Ajuste o ângulo da bola de fogo (vertical)
            }
            fireball.setGravityY(-100)

            // Destrua a bola de fogo quando sair da tela para economizar recursos
            fireball.setCollideWorldBounds(false);
            

            // Adicione colisão entre a bola de fogo e as plataformas
            this.physics.add.collider(fireball, this.platforms, function() {
                fireball.destroy(); // Destrua a bola de fogo quando colidir com as plataformas
            }, null, this);

            
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
            this.player.setVelocityX(0); // Parado horizontalmente
            this.player.anims.play('idle', true); // Ativa a animação de idle
        }

        // Verifica se a seta para cima está pressionada para voar para cima
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160); // Movimento para cima
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160); // Movimento para baixo
        } else {
            // Se nenhuma tecla estiver pressionada, aplica a gravidade
            this.player.setGravityY(300); // Ajuste conforme necessário
        }
    }
}
