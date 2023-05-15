let score = 0; // Variável que armazena a pontuação inicial
let scored = false; // Variável que verifica se a pontuação já foi adicionada na passagem

const mario = document.querySelector('.mario'); // Seleciona o elemento HTML do Mario
const pipe = document.querySelector('.pipe'); // Seleciona o elemento HTML do cano
const cloud = document.querySelector('.clouds'); // Seleciona o elemento HTML da nuvem
const gameover = document.querySelector('.gameover'); // Seleciona o elemento HTML da mensagem de Game Over
const scoreDisplay = document.querySelector('.score'); // Seleciona o elemento HTML da pontuação

const jump = () => { // Função que faz o Mario pular
    mario.classList.add('jump');

    setTimeout(() => {

        mario.classList.remove('jump');

    }, 500);
}

const loop = setInterval(() => { // Loop principal do jogo
    console.log('loop')

    const pipePosition = pipe.offsetLeft; // Posição horizontal do cano
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', ''); // Posição vertical do Mario
    const cloudPosition = +window.getComputedStyle(cloud).right.replace('px', ''); // Posição horizontal da nuvem

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) { // Verifica se houve colisão entre o Mario e o cano
        cloud.style.animation = 'none';
        cloud.style.right = `${cloudPosition}px`;

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = './images/game-over.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';

        clearInterval(loop);

        const restartButton = document.createElement('button'); // Cria um novo elemento de botão
        restartButton.textContent = 'Reiniciar'; // Define o texto do botão
        restartButton.addEventListener('click', () => {
            location.reload(); // Recarrega a página quando o botão de reiniciar é clicado
        });

        gameover.style.display = 'block'; // Exibe a mensagem de Game Over
        gameover.appendChild(restartButton); // Adiciona o botão de reiniciar ao elemento de Game Over

    } else if (marioPosition > pipePosition && !scored) { // Verifica se o Mario passou pela abertura do cano e ainda não pontuou
        score++; // Incrementa a pontuação
        scored = true; // Atualiza a pontuação para não pontuar novamente na mesma passagem
        scoreDisplay.textContent = `Score: ${score}`; // Atualiza o elemento da pontuação com o novo valor
    } else if (scored && marioPosition <= pipePosition) {
        scored = false; // Permite que a pontuação seja atualizada novamente na próxima passagem
    }

}, 10);

document.addEventListener('keydown', jump); // Adiciona o evento de escuta do teclado para o salto do Mario

