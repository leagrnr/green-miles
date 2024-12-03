document.addEventListener('DOMContentLoaded', (event) => {
    const playerInputs = document.querySelectorAll('#form-player input[type="text"]');
    const form = document.getElementById('form-player');
    const resetButton = document.getElementById('reset');

    playerInputs.forEach(input => {
        const savedName = localStorage.getItem(input.id);
        if (savedName) {
            input.value = savedName;
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        playerInputs.forEach(input => {
            localStorage.setItem(input.id, input.value);
        });
        window.location.href = './choice.html';
    });

    resetButton.addEventListener('click', (event) => {
        localStorage.clear();
        playerInputs.forEach(input => {
            localStorage.removeItem(input.id);
            input.value = '';
        });
    });
});
