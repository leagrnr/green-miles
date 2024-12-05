document.addEventListener('DOMContentLoaded', () => {
    const firstPlayerId = localStorage.getItem('firstPlayer');
    const playerIds = ['player1', 'player2', 'player3', 'player4'];
    const tbody = document.querySelector('tbody');
    const players = [];
    let incrementValue = 25; // Default increment value

    if (firstPlayerId) {
        const firstPlayerName = localStorage.getItem(firstPlayerId) || 'Unknown Player';
        if (firstPlayerName !== 'Unknown Player') {
            players.push({ id: firstPlayerId, name: firstPlayerName });
        }
    }

    playerIds.forEach(id => {
        if (id !== firstPlayerId) {
            const playerName = localStorage.getItem(id) || 'Unknown Player';
            if (playerName !== 'Unknown Player') {
                players.push({ id, name: playerName });
            }
        }
    });

    players.forEach(player => {
        const score = localStorage.getItem(`${player.id}-score`) || 0;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player.name}</td>
            <td>
                <button class="decrease" data-id="${player.id}">-</button>
                <span id="${player.id}-score">${score}</span>
                <button class="increase" data-id="${player.id}">+</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    tbody.addEventListener('click', (event) => {
        if (event.target.classList.contains('increase') || event.target.classList.contains('decrease')) {
            const playerId = event.target.getAttribute('data-id');
            const scoreElement = document.getElementById(`${playerId}-score`);
            let score = parseInt(scoreElement.textContent);

            if (event.target.classList.contains('increase')) {
                score += incrementValue;
            } else if (event.target.classList.contains('decrease') && score >= incrementValue) {
                score -= incrementValue;
            }

            if (score >= 1000) {
                const playerName = localStorage.getItem(playerId) || 'Unknown Player';
                if (confirm(`Does ${playerName} have 1000 points?`)) {
                    window.location.href = 'podium.html';
                } else {
                    score = 975;
                }
            }

            scoreElement.textContent = score;
            localStorage.setItem(`${playerId}-score`, score);
        }
    });

    const set25Button = document.getElementById('set-25');
    const set100Button = document.getElementById('set-100');

    set25Button.addEventListener('click', () => {
        incrementValue = 25;
        set25Button.classList.add('active');
        set100Button.classList.remove('active');
    });

    set100Button.addEventListener('click', () => {
        incrementValue = 100;
        set100Button.classList.add('active');
        set25Button.classList.remove('active');
    });

    const malusButton = document.getElementById('malus');
    malusButton.addEventListener('click', () => {
        window.location.href = 'malus.html';
    });
});