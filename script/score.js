document.addEventListener('DOMContentLoaded', () => {
    const playerIds = ['player1', 'player2', 'player3', 'player4'];
    const tbody = document.querySelector('tbody');

    playerIds.forEach(id => {
        const playerName = localStorage.getItem(id) || 'Unknown Player';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${playerName}</td>
            <td>
                <button class="decrease" data-id="${id}">-</button>
                <span id="${id}-score">0</span>
                <button class="increase" data-id="${id}">+</button>
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
                score += 25;
            } else if (event.target.classList.contains('decrease') && score >= 25) {
                score -= 25;
            }

            scoreElement.textContent = score;
        }
    });
});