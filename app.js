//fetch dogs from backend and display as cards on frontend
const BASE_URL = 'https://dogs-backend.herokuapp.com/dogs'
//create an HTML form in your index.html file that takes in: 
//a dog's name, breed, image url, and age
//add POST functionality to HTML form
//optimistically rendeer the new dog
//add a delete button to each dog card that:
//pessimistically renders the delete action
//deletes dog from the backend
//create a form on each dog card that UPDATEs the dog's information
const dogsContainer = document.querySelector('.dogs-container')
fetch(BASE_URL)
    .then(response => response.json())
    .then(dogs => {
        dogs.map(dog => {
            const dogCard = document.createElement('div')
            dogCard.className = 'card'
            dogCard.innerHTML = `
                <img src=${dog.image} class="card-img-top" alt=${dog.name}>
                <div class="card-body">
                    <h5 class="card-title">${dog.name}</h5>
                    <p class="card-text">Breed: ${dog.breed}</p>
                    <p class="card-text">Age: ${dog.age}</p>
                </div>
            `
            dogsContainer.appendChild(dogCard)
        })
    })