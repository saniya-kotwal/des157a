( function(){
    'use strict';
    console.log('Reading JS');

	const messageForm = document.querySelector('#messageForm');
    const formScreen = document.querySelector('#formScreen');
    const messageScreen = document.querySelector('#messageScreen');
    const generatedMessage = document.querySelector('#generatedMessage');
    const formData = document.querySelectorAll('input[type=text]');

    messageForm.addEventListener('submit', function(event) {
        event.preventDefault();
        processFormData(formData);
    });

    function processFormData(formData) {
        const words = [];
        const emptyFields = [];
        let counter = 0;

        for(const eachWord of formData) {
            if(eachWord.value) {
                words.push(eachWord.value);
            } else {
                emptyFields.push(counter);
            }
            counter++;
        }

        if(emptyFields.length > 0) {
            showErrors(formData, emptyFields);
        } else {
            generateMessage(words);
            showMessageScreen();
        }
    }

    function showErrors(formData, emptyFields) {
        const errorId = formData[emptyFields[0]].id;
        const errorText = `Please fill out this field: ${errorId}`;
        alert(errorText);
        document.querySelector(`#${errorId}`).focus();
    }

    function generateMessage(words) {
        const message = `
            <p>Hi <span>${words[0]}</span>,</p>
            
            <br>
            
            <p>I hope you're doing <span>${words[1]}</span>! My name is <span>${words[2]}</span>, and I'm a <span>${words[3]}</span> at <span>${words[4]}</span> majoring in <span>${words[5]}</span>. I came across your profile while exploring opportunities in <span>${words[6]}</span> and was impressed by your work with <span>${words[7]}</span>.</p>
            
            <br>
            
            <p>I'm particularly interested in <span>${words[8]}</span>, and I'd love to learn more about <span>${words[7]}</span>'s approach to <span>${words[10]}</span>.</p>
            
            <br>
            
            <p>If you're available, I'd <span>${words[9]}</span> the chance to connect and perhaps chat briefly about <span>${words[11]}</span> or any advice you might have for someone looking to enter <span>${words[6]}</span>.</p>
            
            <br>
            
            <p>Looking forward to connecting!</p>
            
            <br>
            
            <p>Best regards,<br><span>${words[2]}</span></p>
        `;
        generatedMessage.innerHTML = message;
    }

    function showMessageScreen() {
        formScreen.classList.remove('showing');
        formScreen.classList.add('hidden');
        messageScreen.classList.remove('hidden');
        messageScreen.classList.add('showing');
    }

} )();