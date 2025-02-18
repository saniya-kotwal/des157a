(function() {
    'use strict';
    console.log('reading js');

    // DOM Elements
    const collageView = document.querySelector('#collageView');
    const recipeView = document.querySelector('#recipeView');
    const recipeImage = document.querySelector('#recipeImage');
    const hotspots = document.querySelectorAll('.hotspot');
    const grandmaImage = document.querySelector('#grandma');
    const surroundingImages = {
        table: document.querySelector('#table'),
        mombday: document.querySelector('#mombday'),
        panipuri: document.querySelector('#panipuri')
    };

    // Recipe paths
    const recipes = {
        'recipe-marathi': 'images/recipe-marathi.jpg',
        'recipe-english': 'images/recipe-english.jpg'
    };

    // Experiment 1: Hotspots
    hotspots.forEach(function(hotspot) {
        hotspot.addEventListener('mouseenter', function() {
            console.log('Hotspot entered:', hotspot.classList[1]);
            hotspot.style.transform = 'scale(1.2)';
            hotspot.style.background = 'rgba(255,255,255,0.8)';
        });
        
        hotspot.addEventListener('mouseleave', function() {
            console.log('Hotspot left:', hotspot.classList[1]);
            hotspot.style.transform = 'scale(1)';
            hotspot.style.background = 'rgba(255,255,255,0.5)';
        });

        hotspot.addEventListener('click', function() {
            const recipeType = hotspot.classList[1];
            console.log('Recipe selected:', recipeType);
            recipeImage.src = recipes[recipeType];
            collageView.className = 'hidden';
            recipeView.className = 'showing';
        });
    });

    // Experiment 2: Image movement on mouse move
    let lastMouseX = 0;
    let lastMouseY = 0;

    document.addEventListener('mousemove', function(move) {
		const mouseX = move.pageX;
		const mouseY = move.pageY;
		
		if (Math.abs(mouseX - lastMouseX) > 100 || Math.abs(mouseY - lastMouseY) > 100) {
			console.log('Mouse position:', { x: mouseX, y: mouseY });
			lastMouseX = mouseX;
			lastMouseY = mouseY;
		}
	
		const xCenter = window.innerWidth / 2;
		const yCenter = window.innerHeight / 2;
		const xOffset = (mouseX - xCenter) / 50;
		const yOffset = (mouseY - yCenter) / 50;
	
		surroundingImages.table.style.transform = `translateX(${-50 + xOffset}%) translateY(${yOffset}px)`;
		surroundingImages.mombday.style.transform = `translateX(${xOffset}px) translateY(${-50 + yOffset}%)`;
		surroundingImages.panipuri.style.transform = `translateX(${xOffset}px) translateY(${-50 + yOffset}%)`;
		
		grandmaImage.style.transform = `translate(-50%, -50%) rotate(${xOffset/5}deg)`;
	});

    // Go back to collage view on click
    recipeView.addEventListener('click', () => {
        console.log('back to collage view');
        recipeView.className = 'hidden';
        collageView.className = 'showing';
    });

})();