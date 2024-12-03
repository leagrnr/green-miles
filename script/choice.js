document.addEventListener('DOMContentLoaded', () => {
    const namesList = document.getElementById('names-list');

    const playerIds = ['player1', 'player2', 'player3', 'player4'];

    playerIds.forEach(id => {
        const playerName = localStorage.getItem(id);
        if (playerName) {
            const listItem = document.createElement('button');
            listItem.textContent = playerName;
            listItem.addEventListener('click', () => {
                 window.location.href = './score.html';
            });
            namesList.appendChild(listItem);
        }
    });

    async function fetchRandomQuestion() {
        try {
            const response = await fetch('questions.json');
            const data = await response.json();
            const randomIndex = Math.floor(Math.random() * data.length);
            const randomQuestion = data[randomIndex];
            document.getElementById('question').textContent = randomQuestion.question;
        } catch (error) {
            console.error('Erreur lors du chargement des questions :', error);
        }
    }
    fetchRandomQuestion();
});
