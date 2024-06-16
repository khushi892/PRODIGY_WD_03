document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box');
    const msgContainer = document.querySelector('.msg-container');
    const msg = document.getElementById('msg');
    const newBtn = document.getElementById('new-btn');
    const resetBtn = document.getElementById('reset-btn');
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];
    
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    
    function handleBoxClick(event) {
      const clickedBox = event.target;
      const clickedBoxIndex = Array.from(boxes).indexOf(clickedBox);
      
      if (gameState[clickedBoxIndex] !== '' || !gameActive) {
        return;
      }
      
      gameState[clickedBoxIndex] = currentPlayer;
      clickedBox.textContent = currentPlayer;
      
      checkResult();
    }
    
    function checkResult() {
      let roundWon = false;
      for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
          roundWon = true;
          break;
        }
      }
      
      if (roundWon) {
        gameActive = false;
        const winner = currentPlayer === 'X' ? player1Input.value || 'Player 1' : player2Input.value || 'Player 2';
        msg.textContent = `${winner} Wins!`;
        msgContainer.classList.remove('hide');
        return;
      }
      
      if (!gameState.includes('')) {
        gameActive = false;
        msg.textContent = 'Draw!';
        msgContainer.classList.remove('hide');
        return;
      }
      
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
    
    function resetGame() {
      gameActive = true;
      currentPlayer = 'X';
      gameState = ['', '', '', '', '', '', '', '', ''];
      boxes.forEach(box => box.textContent = '');
      msgContainer.classList.add('hide');
    }
    
    boxes.forEach(box => box.addEventListener('click', handleBoxClick));
    newBtn.addEventListener('click', resetGame);
    resetBtn.addEventListener('click', resetGame);
  });
  