class cenaJogo1 extends Phaser.Scene {
    constructor() {
        super({
            key: 'cenaJogo1',
        });
        this.score = 0
    }

    preload() {
        this.load.image('bg_jogo1', 'assets/bg_jogo.jpeg');
        this.load.image('platform', 'assets/platform.png');
        this.load.spritesheet('dragon_walk', 'assets/dragon_walk.png', { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('dragon_idle', 'assets/dragon_idle.png', { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('fireball', 'assets/fireballSpritesheet.png', { frameWidth: 22, frameHeight: 32 });
        this.load.spritesheet('knight_idle', 'assets/knight_idle.png', { frameWidth: 150, frameHeight: 150 });
        this.load.spritesheet('knight_walk', 'assets/knight_walk.png', { frameWidth: 150, frameHeight: 150 });
    }

    create() {
        // Background
        this.add.image(400, 300, 'bg_jogo1').setScale(1.32);
        //score
        this.scoreText = this.add.text(16, 16, 'Pontos: 0', { fontSize: '32px', fill: '#000' });

        
        // Plataformas
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(200, 580, 'platform').setScale(0.22).refreshBody().setSize(800, 90, true);
        this.platforms.create(600, 580, 'platform').setScale(0.22).refreshBody().setSize(800, 90, true);
        this.platforms.create(620, 350, 'platform').setScale(0.1).refreshBody();
        this.platforms.create(720, 350, 'platform').setScale(0.1).refreshBody();
        this.platforms.create(80, 350, 'platform').setScale(0.1).refreshBody();
        this.platforms.create(170, 350, 'platform').setScale(0.1).refreshBody();
        this.platforms.create(170, 170, 'platform').setScale(0.1).refreshBody();
        this.platforms.create(80, 170, 'platform').setScale(0.1).refreshBody();
        this.platforms.create(620, 170, 'platform').setScale(0.1).refreshBody();
        this.platforms.create(720, 170, 'platform').setScale(0.1).refreshBody();



        // Player (dragon)
        this.player = this.physics.add.sprite(100, 100, 'dragon_idle').setSize(50, 50).setScale(1.42);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms);

        // Knight (NPC)
        this.knightSpawnPoints = [
            { x: 300, y: 320 },
            { x: 700, y: 250 },
            { x: 300, y: 540 },
            { x: 700, y: 540 },
            { x: 700, y: 150 },
            
        ];

        const randomSpawnPoint = Phaser.Math.RND.pick(this.knightSpawnPoints);
        this.knight = this.physics.add.sprite(700, 250, 'knight_idle').setSize(70, 70).setScale(1);
        this.knight.setOrigin(0.5, 0.5);
        this.knight.setOffset(20, 70);
        this.knight.setCollideWorldBounds(true);
        this.physics.add.collider(this.knight, this.platforms);

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

        // Animações do Knight
        this.anims.create({
            key: 'knight_walk',
            frames: this.anims.generateFrameNumbers('knight_walk', { start: 0, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'knight_idle',
            frames: this.anims.generateFrameNumbers('knight_idle', { start: 0, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        // Controles do jogador
        this.cursors = this.input.keyboard.createCursorKeys();

        // Adicione um evento para detectar quando a tecla de espaço é pressionada
        this.input.keyboard.on('keydown-SPACE', this.shootFireball, this);

        // Define a distância percorrida pelo Knight e a direção do movimento
        this.knightDistance = 0;
        this.knightDirection = 1; // 1 para a direita, -1 para a esquerda
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
        });

        // Adicione colisão entre a bola de fogo e o Knight
        this.physics.add.overlap(fireball, this.knight, () => {
            // Destrua a bola de fogo quando atingir o Knight
            fireball.destroy(); 
            // Destrua o Knight
            this.knight.destroy();
            //aumentar o score
            this.score++;
            //atualiza o contador
            this.scoreText.setText('Pontos: ' + this.score);
            // Crie um novo Knight em um dos quatro pontos
            const randomSpawnPoint = Phaser.Math.RND.pick(this.knightSpawnPoints);
            this.knight = this.physics.add.sprite(randomSpawnPoint.x, randomSpawnPoint.y, 'knight_idle').setSize(70, 70).setScale(1);
            this.knight.setOrigin(0.5, 0.5);
            this.knight.setOffset(20, 70);
            this.knight.setCollideWorldBounds(true);
            this.physics.add.collider(this.knight, this.platforms);
        });


    }



    update () {
        // Movimento do jogador
        this.playerMovement();

        // Movimento do Knight
        this.knightMovement();
    }

    playerMovement() {
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

    knightMovement() {
        // Verifica a direção do movimento do Knight e atualiza sua posição
        if (this.knightDistance >= 10000 && this.knightDirection === 1) {
            // Se o Knight andou 100 pixels para a direita, muda a direção para esquerda
            this.knightDistance = 0;
            this.knightDirection = -1;
            this.knight.setFlipX(true); // Inverte o sprite do Knight
        } else if (this.knightDistance <= -10000 && this.knightDirection === -1) {
            // Se o Knight andou 100 pixels para a esquerda, muda a direção para direita
            this.knightDistance = 0;
            this.knightDirection = 1;
            this.knight.setFlipX(false); // Reverte o sprite do Knight
        }

        // Move o Knight na direção e velocidade definidas
        this.knight.setVelocityX(50 * this.knightDirection); // 50 pixels por quadro
        this.knight.anims.play('knight_walk', true); // Ativa a animação de caminhada do Knight

        // Atualiza a distância percorrida pelo Knight
        this.knightDistance += 50 * this.knightDirection;
    }
}

