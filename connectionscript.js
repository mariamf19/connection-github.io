
    const wordData = [
      { word: 'gardening', group: 'personalImpact' },
      { word: 'hiking', group: 'personalImpact' },
      { word: 'painting', group: 'personalImpact' },
      { word: 'recycling', group: 'personalImpact' },
      { word: 'memory', group: 'personalConnections' },
      { word: 'keepsake', group: 'personalConnections' },
      { word: 'gift', group: 'personalConnections' },
      { word: 'photograph', group: 'personalConnections' },
      { word: 'piano', group: 'musicAndArt' },
      { word: 'poetry', group: 'musicAndArt' },
      { word: 'film', group: 'musicAndArt' },
      { word: 'song', group: 'musicAndArt' },
      { word: 'cat', group: 'casualCompanions' },
      { word: 'dog', group: 'casualCompanions' },
      { word: 'bird', group: 'casualCompanions' },
      { word: 'fish', group: 'casualCompanions' }
    ];
  
    const gameBoard = document.getElementById('game-board');
    const message = document.getElementById('message');
    const retryButton = document.getElementById('retry-button');
    let selectedWords = [];
    let correctGroups = 0;
  
    const groups = {
      'personalImpact': ['Gardening', 'Hiking', 'Painting', 'Recycling'],
      'personalConnections': ['Memory', 'Keepsake', 'Gift', 'Photograph'],
      'musicAndArt': ['Piano', 'Poetry', 'Film', 'Song'],
      'casualCompanions': ['Cat', 'Dog', 'Bird', 'Fish']
    };
  
    // Fisher-Yates Shuffle Algorithm
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  
    // Initialize the game
    function initGame() {
      gameBoard.innerHTML = ''; // Clear the board
      shuffle(wordData); // Shuffle the words
      selectedWords = [];
      correctGroups = 0;
  
      // Add shuffled words to the grid
      wordData.forEach(({ word, group }) => {
        const wordDiv = document.createElement('div');
        wordDiv.classList.add('word');
        wordDiv.textContent = word;
        wordDiv.dataset.group = group;
        gameBoard.appendChild(wordDiv);
      });
  
      attachClickEvents(); // Reattach click events to words
      message.textContent = '';
      retryButton.style.display = 'none';
    }
  
    // Check if selected words form a group
    function checkGroup() {
      const group = selectedWords.map(word => word.dataset.group);
      const groupName = group[0];
  
      if (group.every(g => g === groupName)) {
        selectedWords.forEach(word => word.classList.add('correct'));
        correctGroups++;
        const groupMessages = {
          'personalImpact': "You’ve identified a connection between activities that influence and shape our lives!",
          'personalConnections': "This group represents the meaningful items that hold personal significance and memories.",
          'musicAndArt': "You've grouped together elements that express creativity and artistic expression.",
          'casualCompanions': "This selection highlights the animals that provide companionship and enrich our lives."
        };
        message.textContent = groupMessages[groupName];
  
        // Disable selected words
        selectedWords.forEach(word => word.style.pointerEvents = 'none');
        selectedWords = []; // Clear the selectedWords array
  
        // Check if all groups are found
        if (correctGroups === 4) {
          message.textContent = 'Congratulations! You found all groups!';
          retryButton.style.display = 'block';
        }
      } else {
        // Deselect the incorrect words after a delay
        setTimeout(() => {
          selectedWords.forEach(word => word.classList.remove('selected'));
          selectedWords = []; // Clear the selectedWords array
          message.textContent = 'That selection is incorrect. Try again!';
        }, 500);
      }
    }
  
    // Handle word click with deselect functionality
    function attachClickEvents() {
      const words = document.querySelectorAll('.word');
      words.forEach(word => {
        word.addEventListener('click', () => {
          if (word.classList.contains('selected')) {
            // If the word is already selected, deselect it
            word.classList.remove('selected');
            selectedWords = selectedWords.filter(selectedWord => selectedWord !== word);
          } else if (!word.classList.contains('correct') && selectedWords.length < 4) {
            // If the word is not selected and there are fewer than 4 selected, select it
            word.classList.add('selected');
            selectedWords.push(word);
  
            // Check the group when 4 words are selected
            if (selectedWords.length === 4) {
              setTimeout(checkGroup, 500);
            }
          }
        });
      });
    }
  
    // Retry button logic
    retryButton.addEventListener('click', initGame);
  
    // Start the game initially
    initGame();
    let slideIndex = 1;
  showDivs(slideIndex);

  function plusDivs(n) {
    showDivs(slideIndex += n);
  }

  function showDivs(n) {
    const slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
  }
  
