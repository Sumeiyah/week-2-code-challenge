document.addEventListener('DOMContentLoaded', function() {
  const animalListContainer = document.getElementById('animalList');
  const animalDetailsContainer = document.getElementById('animalDetails');

  let currentAnimal = null; // Track the currently displayed animal

  // Fetch the animal data
  fetch('http://localhost:3000/characters')
    .then(response => response.json())
    .then(data => {
      // Create animal cards
      data.forEach(animal => {
        const animalCard = document.createElement('div');
        animalCard.classList.add('animalCard');
        animalCard.innerHTML = animal.name;
        animalCard.addEventListener('click', function() {
          displayAnimalDetails(animal);
        });
        animalListContainer.appendChild(animalCard);
      });
    })
    .catch(error => console.error(error));

  function displayAnimalDetails(animal) {
    // Clear previous details
    animalDetailsContainer.innerHTML = '';

    // Create elements for the animal details
    const animalImage = document.createElement('img');
    animalImage.src = animal.image;

    const votesText = document.createElement('p');
    votesText.classList.add('votes');
    votesText.textContent = `Votes: ${animal.votes}`;

    const voteButton = document.createElement('button');
    voteButton.textContent = 'Vote +';
    voteButton.addEventListener('click', function() {
      animal.votes++; // Increment the votes for the animal
      votesText.textContent = `Votes: ${animal.votes}`; // Update the displayed votes
    });

    const unvoteButton = document.createElement('button');
    unvoteButton.textContent = 'Vote -';
    unvoteButton.addEventListener('click', function() {
      if (animal.votes > 0) {
        animal.votes--; // Decrement the votes for the animal
        votesText.textContent = `Votes: ${animal.votes}`; // Update the displayed votes
      }
    });

    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Votes';
    resetButton.addEventListener('click', function() {
      animal.votes = 0; // Reset the votes for the animal
      votesText.textContent = `Votes: ${animal.votes}`; // Update the displayed votes
    });

    // Add elements to the details container
    animalDetailsContainer.appendChild(animalImage);
    animalDetailsContainer.appendChild(votesText);
    animalDetailsContainer.appendChild(voteButton);
    animalDetailsContainer.appendChild(unvoteButton);
    animalDetailsContainer.appendChild(resetButton);

    // Update the currently displayed animal
    currentAnimal = animal;
  }
});
