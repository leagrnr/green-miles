document.addEventListener('DOMContentLoaded', (event) => {
    // Clear localStorage on page load
    localStorage.clear();

    const playerInputs = document.querySelectorAll('#form-player input[type="text"]');
    const form = document.getElementById('form-player');
    const resetButton = document.getElementById('reset');

    // Clear input values on page load
    playerInputs.forEach(input => {
        input.value = '';
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