document.addEventListener('DOMContentLoaded', () => {
    fetch('malus.json')
        .then(response => response.json())
        .then(data => {
            const randomQuestion = data[Math.floor(Math.random() * data.length)];
            displayQuestion(randomQuestion);
        })
        .catch(error => console.error('Error loading questions:', error));
});

function displayQuestion(question) {
    const questionDiv = document.querySelector('.question');
    const optionsDiv = document.querySelector('.options');
    const explanationDiv = document.querySelector('.explanation');
    const redirectDiv = document.querySelector('.redirect');
    const redirectButton = document.getElementById('redirect-button');

    questionDiv.textContent = question.question;
    optionsDiv.innerHTML = '';
    explanationDiv.textContent = ''; // Clear previous explanation
    redirectDiv.style.display = 'none'; // Hide redirect button initially

    question.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => {
            // Disable all buttons
            document.querySelectorAll('.options button').forEach(btn => btn.disabled = true);

            if (option === question.answer) {
                button.style.backgroundColor = 'green';
                button.style.color = 'white';
                button.style.border = 'none';
            } else {
                button.style.backgroundColor = 'red';
                button.style.color = 'white';
                button.style.border = 'none';
                document.querySelectorAll('.options button').forEach(btn => {
                    if (btn.textContent === question.answer) {
                        btn.style.backgroundColor = 'green';
                        btn.style.color = 'white';
                        btn.style.border = 'none';
                    }
                });
            }
            explanationDiv.textContent = question.explanation;
            redirectDiv.style.display = 'block';
        });
        optionsDiv.appendChild(button);
    });

    redirectButton.addEventListener('click', () => {
        window.location.href = 'score.html';
    });
}