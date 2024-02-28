//Importa cenas e classes de outros arquivos (Modulos)
import cenaInicial from "./js/cenaInicial.js";
import cenaJogo2 from "./js/cenaJogo2.js";
import cenaJogo1 from "./js/cenaJogo1.js";

//Configuracoes globais do phaser que serao usadas no jogo
const config = {
    type: Phaser.AUTO, //Define automaticamente o Phaser a ser usado
    width: 800, //Largura da tela do jogo
    height: 600, //Altura da tela do jogo
    physics: { //Cria fisica
        default: 'arcade', //Fisica 'arcade' do Phaser
        arcade: {
            gravity: { y: 0}, //Gravidade 0
            debug: false 
        }
    },
    scene: [cenaInicial, cenaJogo1, cenaJogo2] //Define ordem das cenas
};

let game = new Phaser.Game(config) //Cria jogo a partir das configuracoes definidas