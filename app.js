
//add a delete button to each dog card that:
//pessimistically renders the delete action
//DELETEs dog from the backend

//create a form on each dog card that UPDATEs the dog's information
const BASE_URL = 'https://dogs-backend.herokuapp.com/dogs'
const dogsContainer = document.querySelector('.dogs-container')
const dogForm = document.querySelector('.dog-form')

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
            const deleteButton = document.createElement('button')
            deleteButton.textContent = 'DELETE'
            deleteButton.addEventListener('click', () => {
                fetch(`${BASE_URL}/${dog.id}`, {
                    method: 'DELETE'
                }).then(event.target.parentNode.remove())
            })
            dogCard.append(deleteButton)
            dogsContainer.appendChild(dogCard)
        })
    })

function createDogCard(dog) {
    const dogCard = document.createElement('div')
    dogCard.className = 'card'
    dogCard.innerHTML = `
        <img src=${dog.image} class="card-img-top" alt=${dog.name}>
        <div class="card-body">
            <h5 class="card-title">${dog.name}</h5>                <p class="card-text">Breed: ${dog.breed}</p>
            <p class="card-text">Age: ${dog.age}</p>
        </div>
    `
    dogsContainer.appendChild(dogCard)
}

dogForm.addEventListener('submit', () => {
    event.preventDefault()
    const formData = new FormData(dogForm)
    const image = formData.get('image')
    const name = formData.get('name')
    const breed = formData.get('breed')
    const age = formData.get('age')
    //optimistic rendering
    createDogCard({ name, image, breed, age })
    fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, breed, age, image })
    }).then(dogForm.reset())

})