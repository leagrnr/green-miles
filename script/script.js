document.addEventListener('DOMContentLoaded', (event) => {
    localStorage.clear();

    const playerInputs = document.querySelectorAll('#form-player input[type="text"]');
    const form = document.getElementById('form-player');

    playerInputs.forEach(input => {
        input.value = '';
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let playerCount = 0;
        playerInputs.forEach(input => {
            if (input.value.trim() !== '') {
                playerCount++;
            }
        });
         if (playerCount < 2) {
            alert('Please enter at least two players to start the game.');
            return;
        }
         playerInputs.forEach(input => {
            localStorage.setItem(input.id, input.value);
        });
        window.location.href = './choice.html';
    });
});