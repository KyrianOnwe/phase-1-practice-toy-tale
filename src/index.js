let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
//fetch[GET] toys from server and..
function getToys(){
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toyData => toyData.forEach(toy => renderToy(toy)))
}

//add NEW TOY via form
document.querySelector('.add-toy-form').addEventListener('submit', toyUp)

//handle toy card creation
function toyUp(e){
  e.preventDefault()
  let newToy = {
    name: e.target.name.value,
    imageUrl: e.target.image.value,
  }
  //render the card?
  //renderToy(newToy)
  //post to server
  storeToy(newToy)

}

//create cards and render them to the DOM
function renderToy(toy){
  let card = document.createElement('li')
  card.className = 'card'
  card.innerHTML = `
    <div class="card">
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>4 ${toy.likes} Likes</p>
      <button class="like-btn" id="[toy_id]">Like ❤️</button>
    </div>`

    //Add like button functionality
    card.querySelector('.like-btn').addEventListener('click', () => {
      toy.likes += 1
      card.querySelector('p').textContent = `4 ${toy.likes} Likes`
      patchLikes(toy)
    })

    //Add toy to DOM
    document.querySelector('#toy-collection').appendChild(card)
}

function letsGo(){
  getToys()
}

//post to server
function storeToy(newToy){
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },

    body: JSON.stringify(newToy)
  })
  .then(res => res.json())
  .then(toy =>renderToy(toy))
}

function patchLikes(toy){
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method:'PATCH',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({"likes": toy.likes})
  })
  .then(res => res.json())
  .then(toy => renderToy(toy))
}

letsGo()