//set up HTML file with boilerplate code
//connect styles.css and app.js
//copy and paste bootstrap link tag into HTML head: <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
//add a <main> section to your HTML file with a class of dogs-container

//fetch dogs from backend and display as cards on frontend
//URL to fetch from: 'https://dogs-backend.herokuapp.com/dogs'
//bootstrap dog card: 
// <div class="card">
//     <img src="..." class="card-img-top" alt="...">
//     <div class="card-body">
//         <h5 class="card-title">Card title</h5>
//         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//         <a href="#" class="btn btn-primary">Go somewhere</a>
//     </div>
// </div>

//create an HTML form (use bootstrap form if you want) in your index.html file that takes in: 
//a dog's name, breed, image url, and age
//add POST functionality to HTML form
//optimistically render the new dog

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
            dogsContainer.appendChild(dogCard)
        })
    })

dogForm.addEventListener('submit', () => {
    event.preventDefault()
    const formData = new FormData(dogForm)
    const image = formData.get('image')
    const name = formData.get('name')
    const breed = formData.get('breed')
    const age = formData.get('age')
    console.log(image, name, breed, age)

    fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, breed, age, image })
    })

})