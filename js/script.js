let score = 0;
let scored = false;

const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const cloud = document.querySelector('.clouds');
const gameover = document.querySelector('.gameover');
const scoreDisplay = document.querySelector('.score');
//Essaslinhas usam o método document.querySelector para encontrar elementos HTML com as classes .mario e .pipe, respectivamente, e armazená-los nas variáveis mario e pipe.

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {

        mario.classList.remove('jump');

    }, 500);
}
//Essa função jump adiciona a classe .jump ao elemento mario, fazendo-o saltar. Em seguida, um temporizador é iniciado usando a função setTimeout, que remove a classe .jump depois de 500 milissegundos, fazendo com que o Mario volte ao chão.

const loop = setInterval(() => {
    console.log('loop')

    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');//o + converte string para number
    const cloudPosition = +window.getComputedStyle(cloud).right.replace('px', '');


    if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

        cloud.style.animation = 'none';
        cloud.style.right = `${cloudPosition}px`;

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;
        
        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px'
    
        clearInterval(loop);

        const restartButton = document.createElement('button');
        restartButton.textContent = 'Reiniciar';
        restartButton.addEventListener('click', () => {
            location.reload();
        });

        gameover.style.display = 'block';
        gameover.appendChild(restartButton);

    }else if (marioPosition > pipePosition && !scored) {
        score++;
        scored = true; // atualiza a pontuação
        scoreDisplay.textContent = `Score: ${score}`;
      }else if (scored && marioPosition <= pipePosition) {
        scored = false;}

},10);
//Esta é uma função de loop que é executada a cada 10 milissegundos usando o método setInterval. Dentro do loop, a posição do cano e do Mario é verificada usando pipe.offsetLeft e window.getComputedStyle(mario).bottom, respectivamente. Se a posição do cano estiver dentro de uma certa faixa e a posição do Mario for menor que 80 pixels (indicando que ele está em cima do cano), então o jogo termina e os elementos do jogo são atualizados para mostrar a tela de "game over". O loop é interrompido usando clearInterval.

document.addEventListener('keydown', jump);
//Essa linha adiciona um ouvinte de evento ao documento para escutar quando o usuário pressionar uma tecla. Quando uma tecla é pressionada, a função jump é chamada, fazendo com que o Mario pule.
