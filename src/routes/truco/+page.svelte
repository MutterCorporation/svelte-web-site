<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    
    interface Card {
        suit: string;
        value: string;
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        strength?: number;
        targetX?: number;
        targetY?: number;
        isAnimating?: boolean;
    }

    interface Player {
        id: number;
        name: string;
        cards: Card[];
        position: 'bottom' | 'right' | 'top' | 'left';
        playedCard?: Card;
        team: 1 | 2;
        points: number;
    }

    interface GameState {
        players: Player[];
        currentPlayer: number;
        round: number;
        gameStarted: boolean;
        selectedCard?: Card;
        playedCards: Card[];
        currentTruco: number;
        trucoAsked: boolean;
        trucoAccepted: boolean;
        roundWinner?: number;
        gameWinner?: number;
    }

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    let canvasWidth = 800;
    let canvasHeight = 600;
    
    // Estado do jogo
    let gameState: GameState = {
        players: [
            { id: 1, name: 'Jogador 1', cards: [], position: 'bottom', team: 1, points: 0 },
            { id: 2, name: 'Jogador 2', cards: [], position: 'right', team: 2, points: 0 },
            { id: 3, name: 'Jogador 3', cards: [], position: 'top', team: 1, points: 0 },
            { id: 4, name: 'Jogador 4', cards: [], position: 'left', team: 2, points: 0 }
        ],
        currentPlayer: 1,
        round: 1,
        gameStarted: false,
        playedCards: [],
        currentTruco: 1,
        trucoAsked: false,
        trucoAccepted: false
    };

    // Baralho de cartas
    const suits = ['♠', '♥', '♦', '♣'];
    const values = ['4', '5', '6', '7', 'Q', 'J', 'K', 'A', '2', '3'];
    let deck: Card[] = [];

    // Força das cartas
    const cardStrength: { [key: string]: number } = {
        '4': 1, '5': 2, '6': 3, '7': 4, 'Q': 5, 'J': 6, 'K': 7, 'A': 8, '2': 9, '3': 10
    };

    let animationFrameId: number;
    let lastTime: number = 0;
    const ANIMATION_DURATION = 500; // 500ms para cada animação
    const EASING_FUNCTION = (t: number) => t * (2 - t); // Função de easing suave

    // Função de animação
    function animate(currentTime: number) {
        if (!lastTime) lastTime = currentTime;
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;

        let needsAnimation = false;
        gameState.players.forEach(player => {
            player.cards.forEach(card => {
                if (card.isAnimating && card.targetX !== undefined && card.targetY !== undefined) {
                    needsAnimation = true;
                    const progress = Math.min(deltaTime / ANIMATION_DURATION, 1);
                    const easedProgress = EASING_FUNCTION(progress);

                    if (card.x !== undefined && card.y !== undefined) {
                        card.x += (card.targetX - card.x) * easedProgress;
                        card.y += (card.targetY - card.y) * easedProgress;
                    }

                    if (progress >= 1) {
                        card.isAnimating = false;
                        card.x = card.targetX;
                        card.y = card.targetY;
                    }
                }
            });
        });

        if (needsAnimation) {
            animationFrameId = requestAnimationFrame(animate);
        }

        drawGame();
    }

    // Função para iniciar animação de uma carta
    function animateCard(card: Card, targetX: number, targetY: number) {
        card.targetX = targetX;
        card.targetY = targetY;
        card.isAnimating = true;
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(animate);
        }
    }

    // Inicializar o baralho
    function initializeDeck() {
        deck = [];
        for (const suit of suits) {
            for (const value of values) {
                deck.push({ suit, value });
            }
        }
        shuffleDeck();
    }

    // Embaralhar o baralho
    function shuffleDeck() {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }

    // Distribuir cartas
    function dealCards() {
        gameState.players.forEach(player => {
            const cards = deck.splice(0, 3);
            player.cards = cards;
            
            // Animar cada carta para sua posição inicial
            cards.forEach((card, index) => {
                let targetX = 0, targetY = 0;
                switch(player.position) {
                    case 'bottom':
                        targetX = 300 + (index * 80);
                        targetY = 450;
                        break;
                    case 'right':
                        targetX = 700;
                        targetY = 200 + (index * 80);
                        break;
                    case 'top':
                        targetX = 300 + (index * 80);
                        targetY = 50;
                        break;
                    case 'left':
                        targetX = 30;
                        targetY = 200 + (index * 80);
                        break;
                }
                
                // Posicionar carta fora da tela inicialmente
                card.x = canvasWidth / 2;
                card.y = canvasHeight / 2;
                animateCard(card, targetX, targetY);
            });
        });
    }

    // Desenhar carta no canvas
    function drawCard(card: Card, x: number, y: number) {
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        
        // Desenhar o fundo da carta
        ctx.fillRect(x, y, 70, 100);
        ctx.strokeRect(x, y, 70, 100);
        
        // Desenhar o valor e naipe
        ctx.fillStyle = (card.suit === '♥' || card.suit === '♦') ? 'red' : 'black';
        ctx.font = '20px Arial';
        ctx.fillText(card.value + card.suit, x + 5, y + 25);

        // Armazenar posição da carta para detecção de clique
        card.x = x;
        card.y = y;
        card.width = 70;
        card.height = 100;
    }

    // Verificar se um ponto está dentro de uma carta
    function isPointInCard(x: number, y: number, card: Card): boolean {
        if (!card.x || !card.y || !card.width || !card.height) return false;
        return x >= card.x && x <= card.x + card.width &&
               y >= card.y && y <= card.y + card.height;
    }

    // Calcular força da carta
    function calculateCardStrength(card: Card): number {
        return cardStrength[card.value] || 0;
    }

    // Pedir truco
    function askTruco() {
        if (gameState.trucoAsked || gameState.currentPlayer !== 1) return;
        
        gameState.trucoAsked = true;
        gameState.currentTruco *= 2;
        
        // Passar para o próximo jogador para aceitar ou recusar
        gameState.currentPlayer = (gameState.currentPlayer % 4) + 1;
        drawGame();
    }

    // Aceitar truco
    function acceptTruco() {
        if (!gameState.trucoAsked || gameState.currentPlayer !== 2) return;
        
        gameState.trucoAccepted = true;
        gameState.currentPlayer = 1; // Volta para o jogador que pediu truco
        drawGame();
    }

    // Recusar truco
    function refuseTruco() {
        if (!gameState.trucoAsked || gameState.currentPlayer !== 2) return;
        
        // Time que pediu truco ganha a rodada
        const trucoTeam = gameState.players.find(p => p.id === 1)?.team;
        if (trucoTeam) {
            gameState.players.forEach(player => {
                if (player.team === trucoTeam) {
                    player.points += gameState.currentTruco;
                }
            });
        }
        
        // Resetar estado do truco
        gameState.trucoAsked = false;
        gameState.trucoAccepted = false;
        gameState.currentTruco = 1;
        
        // Iniciar nova rodada
        startNewRound();
    }

    // Determinar vencedor da rodada
    function determineRoundWinner(): number {
        let winner = 1;
        let highestStrength = calculateCardStrength(gameState.playedCards[0]);
        
        for (let i = 1; i < gameState.playedCards.length; i++) {
            const strength = calculateCardStrength(gameState.playedCards[i]);
            if (strength > highestStrength) {
                highestStrength = strength;
                winner = i + 1;
            }
        }
        
        return winner;
    }

    // Atualizar pontuação
    function updateScore(winnerId: number) {
        const winner = gameState.players.find(p => p.id === winnerId);
        if (winner) {
            const winnerTeam = winner.team;
            gameState.players.forEach(player => {
                if (player.team === winnerTeam) {
                    player.points += gameState.currentTruco;
                }
            });
        }
    }

    // Verificar vencedor do jogo
    function checkGameWinner(): number | undefined {
        const team1Points = gameState.players.filter(p => p.team === 1).reduce((sum, p) => sum + p.points, 0);
        const team2Points = gameState.players.filter(p => p.team === 2).reduce((sum, p) => sum + p.points, 0);
        
        if (team1Points >= 12) return 1;
        if (team2Points >= 12) return 2;
        return undefined;
    }

    // Jogar uma carta
    function playCard(card: Card) {
        const currentPlayer = gameState.players.find(p => p.id === gameState.currentPlayer);
        if (!currentPlayer) return;

        // Calcular posição final da carta
        const centerX = canvasWidth / 2 - 35;
        const centerY = canvasHeight / 2 - 50;
        const offsetX = (gameState.playedCards.length - 1.5) * 20;
        const finalX = centerX + offsetX;
        const finalY = centerY;

        // Iniciar animação
        animateCard(card, finalX, finalY);

        // Remover a carta da mão do jogador após um pequeno delay
        setTimeout(() => {
            currentPlayer.cards = currentPlayer.cards.filter(c => c !== card);
            currentPlayer.playedCard = card;
            gameState.playedCards.push(card);

            // Passar para o próximo jogador
            gameState.currentPlayer = (gameState.currentPlayer % 4) + 1;

            // Se todos os jogadores jogaram, determinar vencedor
            if (gameState.playedCards.length === 4) {
                const roundWinner = determineRoundWinner();
                updateScore(roundWinner);
                
                // Verificar vencedor do jogo
                const gameWinner = checkGameWinner();
                if (gameWinner) {
                    gameState.gameWinner = gameWinner;
                    return;
                }
                
                setTimeout(() => {
                    startNewRound();
                }, 2000);
            }

            drawGame();
        }, ANIMATION_DURATION);
    }

    // Iniciar nova rodada
    function startNewRound() {
        gameState.playedCards = [];
        gameState.players.forEach(player => {
            player.playedCard = undefined;
        });

        // Se algum jogador não tiver mais cartas, distribuir novas
        if (gameState.players.some(player => player.cards.length === 0)) {
            if (deck.length < 12) {
                initializeDeck();
            }
            dealCards();
        }

        drawGame();
    }

    // Desenhar o estado do jogo
    function drawGame() {
        // Limpar canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        
        // Desenhar mesa
        ctx.fillStyle = '#2c8a2c';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        
        // Desenhar cartas jogadas no centro
        gameState.playedCards.forEach((card, index) => {
            const centerX = canvasWidth / 2 - 35;
            const centerY = canvasHeight / 2 - 50;
            const offsetX = (index - 1.5) * 20;
            drawCard(card, centerX + offsetX, centerY);
        });
        
        // Desenhar cartas dos jogadores
        gameState.players.forEach(player => {
            const cards = player.cards;
            switch(player.position) {
                case 'bottom':
                    cards.forEach((card, index) => {
                        drawCard(card, 300 + (index * 80), 450);
                    });
                    break;
                case 'right':
                    cards.forEach((card, index) => {
                        drawCard(card, 700, 200 + (index * 80));
                    });
                    break;
                case 'top':
                    cards.forEach((card, index) => {
                        drawCard(card, 300 + (index * 80), 50);
                    });
                    break;
                case 'left':
                    cards.forEach((card, index) => {
                        drawCard(card, 30, 200 + (index * 80));
                    });
                    break;
            }
        });

        // Desenhar indicador de jogador atual
        ctx.fillStyle = 'yellow';
        ctx.font = '20px Arial';
        ctx.fillText(`Vez do Jogador ${gameState.currentPlayer}`, 10, 30);

        // Desenhar pontuação
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        const team1Points = gameState.players.filter(p => p.team === 1).reduce((sum, p) => sum + p.points, 0);
        const team2Points = gameState.players.filter(p => p.team === 2).reduce((sum, p) => sum + p.points, 0);
        ctx.fillText(`Time 1: ${team1Points} | Time 2: ${team2Points}`, 10, 60);

        // Desenhar botões de truco
        if (gameState.currentPlayer === 1 && !gameState.trucoAsked) {
            ctx.fillStyle = 'red';
            ctx.fillRect(700, 10, 80, 30);
            ctx.fillStyle = 'white';
            ctx.fillText('Truco!', 720, 30);
        }

        if (gameState.currentPlayer === 2 && gameState.trucoAsked && !gameState.trucoAccepted) {
            ctx.fillStyle = 'green';
            ctx.fillRect(600, 10, 80, 30);
            ctx.fillStyle = 'white';
            ctx.fillText('Aceita', 620, 30);
            
            ctx.fillStyle = 'red';
            ctx.fillRect(700, 10, 80, 30);
            ctx.fillStyle = 'white';
            ctx.fillText('Recusa', 720, 30);
        }

        // Desenhar vencedor do jogo
        if (gameState.gameWinner) {
            ctx.fillStyle = 'yellow';
            ctx.font = '40px Arial';
            ctx.fillText(`Time ${gameState.gameWinner} Venceu!`, canvasWidth/2 - 100, canvasHeight/2);
        }
    }

    // Iniciar jogo
    function startGame() {
        gameState.gameStarted = true;
        initializeDeck();
        dealCards();
        drawGame();
    }

    onMount(() => {
        const context = canvas.getContext('2d');
        if (context) {
            ctx = context;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            canvas.addEventListener('click', handleCanvasClick);
        }
    });

    // Manipular clique no canvas
    function handleCanvasClick(event: MouseEvent) {
        if (!gameState.gameStarted || gameState.gameWinner) return;

        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Verificar clique no botão de truco
        if (gameState.currentPlayer === 1 && !gameState.trucoAsked) {
            if (x >= 700 && x <= 780 && y >= 10 && y <= 40) {
                askTruco();
                return;
            }
        }

        // Verificar clique nos botões de aceitar/recusar truco
        if (gameState.currentPlayer === 2 && gameState.trucoAsked && !gameState.trucoAccepted) {
            if (x >= 600 && x <= 680 && y >= 10 && y <= 40) {
                acceptTruco();
                return;
            }
            if (x >= 700 && x <= 780 && y >= 10 && y <= 40) {
                refuseTruco();
                return;
            }
        }

        const currentPlayer = gameState.players.find(p => p.id === gameState.currentPlayer);
        if (!currentPlayer) return;

        // Verificar se clicou em alguma carta do jogador atual
        const clickedCard = currentPlayer.cards.find(card => 
            card.x && card.y && isPointInCard(x, y, card)
        );

        if (clickedCard) {
            playCard(clickedCard);
        }
    }

    // Limpar animação ao desmontar
    onDestroy(() => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    });
</script>

<div class="game-container">
    <canvas bind:this={canvas}></canvas>
    <div class="controls">
        <button on:click={startGame} disabled={gameState.gameStarted}>
            Iniciar Jogo
        </button>
    </div>
</div>

<style>
    .game-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
    }

    canvas {
        border: 2px solid #333;
        background-color: #2c8a2c;
    }

    .controls {
        margin-top: 20px;
    }

    button {
        padding: 10px 20px;
        font-size: 16px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
</style>
