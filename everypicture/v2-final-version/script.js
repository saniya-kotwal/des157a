(function() {
    'use strict';
    console.log('reading js');

    // DOM elements
    const elements = {
        collageView: document.querySelector('#collage-view'),
        recipeView: document.querySelector('#recipe-view'),
        recipeImage: document.querySelector('#recipe-image'),
        hotspots: document.querySelectorAll('.hotspot'),
        grandmaImage: document.querySelector('#grandma'),
        surroundingImages: {
            table: document.querySelector('#table'),
            mombday: document.querySelector('#mombday'),
            panipuri: document.querySelector('#panipuri')
        }
    };

    // Recipe data
    const recipes = {
        'recipe-marathi': {
            title: 'Pani Puri',
            description: 'Pani Puri is a classic Indian snack and everyone has their own take, but this is the very recipe my grandmother recorded in her diary in our mother-tongue, Marathi.',
            image: 'images/recipe-marathi.jpg'
        },
        'recipe-english': {
            title: 'Prawn Curry',
            description: 'This is a twist on the traditional prawn curry that has become one of my favorites. It features sautéed tomato and onion with small shrimp in a spiced sauce. She wrote this recipe in English in her diary.',
            image: 'images/recipe-english.jpg'
        },
        'lonsa': {
            title: 'Tomato Lonsa',
            description: 'Tomato Lonsa was a recipe passed down from my great-grandmother. My aunt and uncle even started a small business selling it on the East Coast a couple of years ago. We served it at my mom\'s birthday party, along with this printed brochure to learn more about the company and the cause.',
            image: 'images/lonsa.jpg'
        },
        'kanavle': {
            title: 'Kheema Kanavle',
            description: 'Kheema Kanavle is my grandmother\'s signature dish that no one else can quite replicate it. I began translating her recipes into English in 2019 and hope to revisit this project soon.',
            image: 'images/kanavle.jpg'
        }
    };

    // Event listeners
    elements.hotspots.forEach(function(hotspot) {
        hotspot.addEventListener('click', function() {
            const recipeType = hotspot.classList[1];
            generateRecipe(recipeType);
            
            elements.collageView.className = 'hidden';
            elements.recipeView.className = 'showing';
        });
    });

    // Transition back to collage view
    elements.recipeView.addEventListener('click', function() {
        console.log('back to collage view');
        elements.recipeView.className = 'hidden';
        elements.collageView.className = 'showing';
    });

    // Image movement on mouse move
    document.addEventListener('mousemove', handleMouseMove);

    // Generate recipe content
    function generateRecipe(recipeType) {
        const recipe = recipes[recipeType];
        
        if (!recipe) {
            console.error('Recipe not found:', recipeType);
            return;
        }

        const recipeContent = `
            <h2 class="recipe-title">${recipe.title}</h2>
            <p class="recipe-description">${recipe.description}</p>
            <img id="recipe-image" src="${recipe.image}" alt="${recipe.title}">
            <p class="back-instruction">Click anywhere to go back</p>
        `;
        elements.recipeView.innerHTML = recipeContent;
    }

    // Handle mouse movement for parallax effect
    function handleMouseMove(event) {
        const xCenter = window.innerWidth / 2;
        const yCenter = window.innerHeight / 2;
        const xOffset = (event.pageX - xCenter) / 80;
        const yOffset = (event.pageY - yCenter) / 80;
    
        elements.surroundingImages.table.style.transform = `translateX(calc(-50% + ${xOffset * 0.6}px)) translateY(${yOffset * 0.6}px)`;
        elements.surroundingImages.mombday.style.transform = `translateX(calc(0% + ${xOffset}px)) translateY(calc(-50% + ${yOffset}px))`;
        elements.surroundingImages.panipuri.style.transform = `translateX(calc(0% + ${xOffset}px)) translateY(calc(-50% + ${yOffset}px))`;
    
        elements.grandmaImage.style.transform = `translate(-50%, -50%) rotate(${xOffset / 6}deg)`;
    }
})();