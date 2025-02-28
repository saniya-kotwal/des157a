(function() {
    'use strict';
    console.log('reading js');

    // DOM elements
    const collageView = document.querySelector('#collage-view');
    const recipeView = document.querySelector('#recipe-view');
    const recipeImage = document.querySelector('#recipe-image');
    const hotspots = document.querySelectorAll('.hotspot');
    const grandmaImage = document.querySelector('#grandma');

    const tableImage = document.querySelector('#table img');
    const mombdayImage = document.querySelector('#mombday img');
    const panipuriImage = document.querySelector('#panipuri img');

    // Recipe data
    const marathiTitle = 'Pani Puri';
    const marathiDescription = 'Pani Puri is a classic Indian snack and everyone has their own take, but this is the very recipe my grandmother recorded in her diary in our mother-tongue, Marathi.';
    const marathiImage = 'images/recipe-marathi.jpg';

    const englishTitle = 'Prawn Curry';
    const englishDescription = 'This is a twist on the traditional prawn curry that has become one of my favorites. It features sautéed tomato and onion with small shrimp in a spiced sauce. She wrote this recipe in English in her diary.';
    const englishImage = 'images/recipe-english.jpg';

    const lonsaTitle = 'Tomato Lonsa';
    const lonsaDescription = 'Tomato Lonsa was a recipe passed down from my great-grandmother. My aunt and uncle even started a small business selling it on the East Coast a couple of years ago. We served it at my mom\'s birthday party, along with this printed brochure to learn more about the company and the cause.';
    const lonsaImage = 'images/lonsa.jpg';

    const kanavleTitle = 'Kheema Kanavle';
    const kanavleDescription = 'Kheema Kanavle is my grandmother\'s signature dish that no one else can quite replicate it. I began translating her recipes into English in 2019 and hope to revisit this project soon.';
    const kanavleImage = 'images/kanavle.jpg';

    // Functions to show recipes
    function showRecipe(title, description, imageSrc) {
        console.log('Showing recipe:', title);
        
        document.querySelector('.recipe-title').textContent = title;
        document.querySelector('.recipe-description').textContent = description;
        recipeImage.src = imageSrc;
        
        collageView.className = 'hidden';
        recipeView.className = 'showing';
    }

    // Event listeners for hotspots
    hotspots.forEach(function(hotspot) {
        hotspot.addEventListener('click', function() {
            console.log('Hotspot clicked:', hotspot.className);
            
            // Check classes to determine which recipe to show
            if (hotspot.classList.contains('recipe-marathi')) {
                showRecipe(marathiTitle, marathiDescription, marathiImage);
            } else if (hotspot.classList.contains('recipe-english')) {
                showRecipe(englishTitle, englishDescription, englishImage);
            } else if (hotspot.classList.contains('lonsa')) {
                showRecipe(lonsaTitle, lonsaDescription, lonsaImage);
            } else if (hotspot.classList.contains('kanavle')) {
                showRecipe(kanavleTitle, kanavleDescription, kanavleImage);
            }
        });
    });
    
    // Transition back to collage view
    recipeView.addEventListener('click', function() {
        console.log('back to collage view');
        recipeView.className = 'hidden';
        collageView.className = 'showing';
    });

    // Image movement on mouse move
    document.addEventListener('mousemove', function(event) {
        const xCenter = window.innerWidth / 2;
        const yCenter = window.innerHeight / 2;
        const xOffset = (event.pageX - xCenter) / 80;
        const yOffset = (event.pageY - yCenter) / 80;
    
        if (tableImage) tableImage.style.transform = `translateX(calc(-50% + ${xOffset * 0.6}px)) translateY(${yOffset * 0.6}px)`;
        if (mombdayImage) mombdayImage.style.transform = `translateX(calc(0% + ${xOffset}px)) translateY(calc(-50% + ${yOffset}px))`;
        if (panipuriImage) panipuriImage.style.transform = `translateX(calc(0% + ${xOffset}px)) translateY(calc(-50% + ${yOffset}px))`;
    
        if (grandmaImage) grandmaImage.style.transform = `translate(-50%, -50%) rotate(${xOffset / 6}deg)`;
    });
})();