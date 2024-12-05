document.addEventListener('DOMContentLoaded', () => {
    fetch('quiz.json')
        .then(response => response.json())
        .then(data => {
            const quizContainer = document.getElementById('quiz');
            const questionElement = quizContainer.querySelector('.question');
            const optionsElement = quizContainer.querySelector('.options');
            const explanationElement = quizContainer.querySelector('.explanation');
            const nextButton = document.getElementById('next-question');
            const showAnswerButton = document.createElement('button');

            showAnswerButton.textContent = 'Show the answer';
            showAnswerButton.style.margin = '20px auto';
            showAnswerButton.style.padding = '10px 20px';
            showAnswerButton.style.backgroundColor = 'white';
            showAnswerButton.style.border = '2px solid #0fbf00';
            showAnswerButton.style.borderRadius = '20px';
            showAnswerButton.style.cursor = 'pointer';
            showAnswerButton.style.textAlign = 'center';
            showAnswerButton.style.display = 'block';
            quizContainer.appendChild(showAnswerButton);

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
                explanationElement.style.display = 'none';
                nextButton.style.display = 'none';
                showAnswerButton.style.display = 'block';

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
                        explanationElement.style.display = 'block';
                        nextButton.style.display = 'block';
                        showAnswerButton.style.display = 'none';
                    });
                    optionsElement.appendChild(button);
                });
            }

            showAnswerButton.addEventListener('click', () => {
                const buttons = optionsElement.querySelectorAll('button');
                buttons.forEach(btn => {
                    if (btn.textContent === data[currentQuestionIndex].answer) {
                        btn.style.backgroundColor = 'green';
                        btn.style.color = 'white';
                    }
                });
                explanationElement.textContent = data[currentQuestionIndex].explanation;
                explanationElement.style.display = 'block';
                nextButton.style.display = 'block';
                showAnswerButton.style.display = 'none';
            });

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