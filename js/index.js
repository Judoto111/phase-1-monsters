document.addEventListener('DOMContentLoaded', function() {
  const monsterContainer = document.getElementById('monster-container');

  fetch('http://localhost:3000/monsters?_limit=50')
    .then(function(response) {
      return response.json();
    })
    .then(function(monsters) {
      monsters.forEach(function(monster) {
        const monsterCard = document.createElement('div');
        monsterCard.innerHTML = `
          <h2>${monster.name}</h2>
          <p>Age: ${monster.age}</p>
          <p>Description: ${monster.description}</p>
        `;
        monsterContainer.appendChild(monsterCard);
      });
    })
    .catch(function(error) {
      console.error('Error fetching monsters:', error);
    });
});

const monsterForm = document.getElementById('monster-form');

monsterForm.addEventListener('submit', event => {
  event.preventDefault();

  const formData = {
    name: document.getElementById('name').value,
    age: parseFloat(document.getElementById('age').value),
    description: document.getElementById('description').value
  };

  fetch('http://localhost:3000/monsters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(newMonster => {
      
      const monsterCard = document.createElement('div');
      monsterCard.innerHTML = `
        <h2>${newMonster.name}</h2>
        <p>Age: ${newMonster.age}</p>
        <p>Description: ${newMonster.description}</p>
      `;
      monsterContainer.appendChild(monsterCard);

      
      monsterForm.reset();
    })
    .catch(error => console.error('Error creating monster:', error));
});

let currentPage = 1;

const loadMoreButton = document.getElementById('load-more');

loadMoreButton.addEventListener('click', () => {
  currentPage++;

  fetch(`http://localhost:3000/monsters?_limit=50&_page=${currentPage}`)
    .then(response => response.json())
    .then(newMonsters => {
      newMonsters.forEach(monster => {
        const monsterCard = document.createElement('div');
        monsterCard.innerHTML = `
          <h2>${monster.name}</h2>
          <p>Age: ${monster.age}</p>
          <p>Description: ${monster.description}</p>
        `;
        monsterContainer.appendChild(monsterCard);
      });
    })
    .catch(error => console.error('Error loading more monsters:', error));
});

