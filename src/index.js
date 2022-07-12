let addToy = false;

document.addEventListener("DOMContentLoaded", () => {

  //initial fetch
  fetch('http://localhost:3000/toys/')
  .then(res => res.json())
  .then(toyData => toyData.forEach(toy => {
    makeToyCard(toy);
  }))

  //hides and unhides form
   const addBtn = document.querySelector("#new-toy-btn");
   const toyFormContainer = document.querySelector(".container");
   addBtn.addEventListener("click", () => {
     // hides the form until you click the add new toy button
     addToy = !addToy;
     if (addToy) {
       toyFormContainer.style.display = "block";
     } else {
       toyFormContainer.style.display = "none";
     }
   });

   // form event listener
   const form = document.querySelector(".add-toy-form");
   form.addEventListener("submit", addNewToy);

  function makeToyCard(toy) {
    const toyCard = document.createElement("div");
    toyCard.setAttribute("class", "card");
    toyCard.innerHTML = 
    `<h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar"/>
    <p>${toy.likes} Likes</p>
    <button class="like-btn" id="${toy.id}" value="${toy.likes}">Like ❤️</button>`;
    document.getElementById('toy-collection').appendChild(toyCard);
    const likeBtn = document.getElementById(`${toy.id}`);
    likeBtn.addEventListener("click", handleLike)
  }

  function addNewToy(e) {
    fetch('http://localhost:3000/toys/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      Accept: "application/json"
      },
      body: JSON.stringify({
        "name": `${document.querySelector("#toy-name").value}`,
        "image": `${document.querySelector("#toy-image-url").value}`,
        "likes": 0
      })
    })
    .then(res => res.json())
    .then(toy => {
      makeToyCard(toy)
      form.reset();
    })
  }

  function handleLike(e) {
    let numOfLikes = parseInt(e.target.value);
    fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": numOfLikes + 1,
      })
    })
    .then(res => res.json())
    .then(toyData => {
      const parentDiv = e.target.parentNode;
      parentDiv.querySelector("p").innerText = `${numOfLikes + 1} Likes`;
      e.target.setAttribute("value", `${numOfLikes + 1}`)
    })
  }

});
