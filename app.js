const BASE_URL = "https://dogs-backend.herokuapp.com/dogs";
const dogsContainer = document.querySelector(".dogs-container");
const dogForm = document.querySelector(".dog-form");

fetch(BASE_URL)
  .then(response => response.json())
  .then(dogs => {
    dogs.map(createDogCard);
  });

function createDogCard(dog) {
  const dogCard = document.createElement("div");
  dogCard.className = "card";
  dogCard.innerHTML = `
          <img class="card-img-top" src=${dog.image} >
          <div class="card-body">
            <h5 class="card-title">${dog.name}</h5>
            <p class="card-text">Breed:${dog.breed}</p>
            <p class="card-text">Age:${dog.age}</p>
          </div>
         `;

  const editDogForm = document.createElement("form");
  editDogForm.className = "form-group";
  editDogForm.innerHTML = `
      <label for="age">Dog Age:</label>
      <input type="number" name="age" id="${dog.id}" placeholder="fucking old" />
      <button type="submit" class="btn btn-primary"> submit</button>

  `;

  editDogForm.addEventListener("submit", () => {
    // event.preventDefault();
    const age = document.getElementById(`${dog.id}`).value;
    console.log(age);

    fetch(`${BASE_URL}/${dog.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ age })
    });
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "DELETE";
  deleteButton.addEventListener("click", () => {
    fetch(`${BASE_URL}/${dog.id}`, {
      method: "DELETE"
    }).then(event.target.parentNode.remove());
  });
  dogCard.append(editDogForm, deleteButton);
  dogsContainer.append(dogCard);
}

dogForm.addEventListener("submit", () => {
  event.preventDefault();
  const formData = new FormData(dogForm);
  const name = formData.get("name"); //use name from HTML form
  const breed = formData.get("breed");
  const image = formData.get("image");
  const age = formData.get("age");

  createDogCard({ name, breed, image, age });
  fetch(BASE_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      breed,
      image,
      age
    })
  }).then(dogForm.reset());
});
