document.addEventListener('DOMContentLoaded', (event) => {
    const playerInputs = document.querySelectorAll('#form-player input[type="text"]');
    const form = document.getElementById('form-player');

    // Load saved names on page load
    playerInputs.forEach(input => {
        const savedName = localStorage.getItem(input.id);
        if (savedName) {
            input.value = savedName;
        }
    });

    // Save names on form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form from submitting
        playerInputs.forEach(input => {
            localStorage.setItem(input.id, input.value);
        });
        logSavedNames();
    });

    function logSavedNames() {
        console.clear();
        playerInputs.forEach(input => {
            const savedName = localStorage.getItem(input.id);
            if (savedName) {
                console.log(`${input.name}: ${savedName}`);
            }
        });
    }
});