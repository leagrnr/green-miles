document.addEventListener('DOMContentLoaded', () => {
    fetch('quiz.json')
        .then(response => response.json())
        .then(data => {
            const quizContainer = document.getElementById('quiz');
            const questionElement = quizContainer.querySelector('.question');
            const optionsElement = quizContainer.querySelector('.options');
            const explanationElement = quizContainer.querySelector('.explanation');
            const nextButton = document.getElementById('next-question');

            nextButton.style.display = 'none';
            nextButton.style.margin = '20px auto';
            nextButton.style.padding = '10px 20px';
            nextButton.style.backgroundColor = 'white';
            nextButton.style.border = '2px solid #0fbf00';
            nextButton.style.borderRadius = '20px';
            nextButton.style.cursor = 'pointer';
            nextButton.style.textAlign = 'center';
            nextButton.style.display = 'block';

            let currentQuestionIndex = 0;

            function showQuestion(questionData) {
                questionElement.textContent = questionData.question;
                optionsElement.innerHTML = '';
                explanationElement.textContent = '';
                nextButton.style.display = 'none';

                questionData.options.forEach(option => {
                    const button = document.createElement('button');
                    button.textContent = option;
                    button.addEventListener('click', () => {
                        // Disable all buttons
                        const buttons = optionsElement.querySelectorAll('button');
                        buttons.forEach(btn => btn.disabled = true);

                        if (option === questionData.answer) {
                            button.style.backgroundColor = 'green';
                            button.style.color = 'white';
                        } else {
                            button.style.backgroundColor = 'red';
                            button.style.color = 'white';
                            // Highlight the correct answer
                            buttons.forEach(btn => {
                                if (btn.textContent === questionData.answer) {
                                    btn.style.backgroundColor = 'green';
                                    btn.style.color = 'white';
                                }
                            });
                        }
                        explanationElement.textContent = questionData.explanation;
                        nextButton.style.display = 'block';
                    });
                    optionsElement.appendChild(button);
                });
            }

            nextButton.addEventListener('click', () => {
                currentQuestionIndex++;
                if (currentQuestionIndex < data.length && currentQuestionIndex < 5) {
                    showQuestion(data[currentQuestionIndex]);
                } else {
                    window.location.href = 'gratitude.html';
                }
            });

            showQuestion(data[currentQuestionIndex]);
        })
        .catch(error => console.error('Error loading quiz data:', error));
});