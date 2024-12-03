document.addEventListener('DOMContentLoaded', () => {
    const playerIds = ['player1', 'player2', 'player3', 'player4'];
    const tbody = document.getElementById('podium-tbody');

    const players = playerIds.map(id => {
        return {
            id: id,
            name: localStorage.getItem(id) || 'Unknown Player',
            score: parseInt(localStorage.getItem(`${id}-score`)) || 0
        };
    });

    players.sort((a, b) => b.score - a.score);

    players.forEach((player, index) => {
        setTimeout(() => {
            const row = document.createElement('tr');
            let medal = '';
            if (index === 0) {
                medal = '🥇';
            } else if (index === 1) {
                medal = '🥈';
            } else if (index === 2) {
                medal = '🥉';
            }
            row.innerHTML = `
                <td>${medal} ${player.name}</td>
                <td>${player.score}</td>
            `;
            tbody.appendChild(row);
        }, index * 100);
    });
});