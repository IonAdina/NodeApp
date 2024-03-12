function previewImage(event) {
  var input = event.target;
  var reader = new FileReader();

  reader.onload = function() {
    var imageContainer = document.getElementById('imageContainer');
    var img = document.createElement('img');
    img.src = reader.result;
    imageContainer.innerHTML = '';
    imageContainer.appendChild(img);
  };

  reader.readAsDataURL(input.files[0]);
}

function adaugaTextInFooter() {
  var inputText = document.getElementById('text-input').value;
  var footerElement = document.querySelector('.footer-text');
  footerElement.textContent = inputText;
}

function schimbaCuloare(culoare) {
  var obiect = document.getElementById('planeta');
  obiect.style.setProperty('background-color', culoare);
  var aura = document.getElementById('aura');
  aura.style.boxShadow = `0 0 100px 100px rgba(255, 255, 255, 0.5) inset, 0 0 80px ${culoare}`;
}

function random() {
  let name1 = ['Nice', 'Big', 'Small', 'Fire', 'LP-203k', 'Wonderland']
  var footerElement = document.querySelector('.footer-text');
  result = Math.round(Math.random() * 5);
  footerElement.textContent = name1[result] + 'Planet';
  let colors = ['aqua', 'blue', 'fuchsia', 'gray', 'green', 'lime', 'maroon', 'navy', 'olive', 'purple', 'red', 'silver', 'teal', 'yellow']
  result2 = Math.round(Math.random() * 13);
  result3 = Math.round(Math.random() * 13);

  var obiect = document.getElementById('planeta');
  obiect.style.setProperty('background-color', colors[result2]);
  var aura = document.getElementById('aura');
  aura.style.boxShadow = `0 0 100px 100px rgba(255, 255, 255, 0.5) inset, 0 0 80px ${colors[result3]}`;
}

var planeta = {
  "id": 0,
  "name": 'MyPlanet',
  "img": null,
  "color": 'white',
  "aura": 'white',
}
auto_id = 0
let lista_planete = []
lista_planete.push(planeta)
console.log(lista_planete)

function save() {
  auto_id++;
  var aura = document.getElementById("aura");
  var aura_style = window.getComputedStyle(aura);
  var aura_backgroundColor = aura_style.getPropertyValue("box-shadow");

  var planeta = document.getElementById("planeta");
  var planeta_style = window.getComputedStyle(planeta);
  var planeta_backgroundColor = planeta_style.backgroundColor;
  var name = document.getElementById('text-input').value;

  var imageContainer = document.getElementById("imageContainer");
  if(imageContainer)
  var imageSrc = imageContainer.firstChild.src;
else
var imageSrc = null
  var obj = {
    "id": auto_id,
    "name": name,
    "img": imageSrc || null,
    "color": planeta_backgroundColor,
    "aura": aura_backgroundColor,
  }
  lista_planete.push(obj)
  console.log(lista_planete)

  var circlesContainer = document.getElementById('circlesContainer-all');
  var html = '';

  for (var i = 1; i < lista_planete.length; i++) {
    var current_planet_data = lista_planete[i];

    var current_planet_style = `
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: ${current_planet_data.color};
      box-shadow: -6px 0 0 2px rgb(59, 59, 59);
    `;

    var current_aura_style = `
      width: 100px;
      height: 100px;
      border-radius: 50%;
      box-shadow:${current_planet_data.aura};
      background-color: radial-gradient(ellipse at center, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.5) 100%);
    `;

    if (current_planet_data.img != null) {
      var current_planet = `
        <div id="planet-${current_planet_data.id}">
          <div style="${current_aura_style}">
            <div style="${current_planet_style}">
              <img src="${current_planet_data.img}" alt="" id="imageContainer2">
              <div style=" text-align: center;
              margin-top: 10px;
              font-size: 16px;
              font-weight: bold;
              color: white;
              position: relative;
              top: calc(50% + 50px); /* Ajustează valoarea 50px la nevoie */
              transform: translateY(-50%);">${current_planet_data.name}</div>
              <div class="buton" id="${current_planet_data.id}" onclick="stergeelement(this)"></div>
            </div>
          </div>
        </div>
      `;
    } else {
      var current_planet = `
        <div id="planet-${current_planet_data.id}">
          <div style="${current_aura_style}">
            <div style="${current_planet_style}">
              <div style="position: absolute;
              bottom: -20px;
              left: 0;
              width: 100%;
              text-align: center;
              font-size: 16px;
              font-weight: bold;
              color: white;
              text-shadow: 1px 1px 2px black;
            ">${current_planet_data.name}</div>
            <div class="buton" id="${current_planet_data.id}" onclick="stergeelement(this)"></div>
            </div>
          </div>
        </div>
      `;
    }
    html += current_planet;
  }

  circlesContainer.innerHTML = html;
}

function stergeelement(buton) {
  number = buton.id
  console.log(number)
  let i = 1;
  while (i < lista_planete.length) {
    if (lista_planete[i].id == number) {
      lista_planete.splice(i, 1)
    }
    i++
  }
  console.log(lista_planete)
  let planet = document.getElementById("planet-" + number)
  console.log(planet)
  planet.remove()
}

window.addEventListener('DOMContentLoaded', (e) => renderPosts() );


// javascript fetch
 const container22 = document.querySelector('.read-container')
 const container2 = document.getElementById('circlesContainer-all')

const renderPosts = async() =>//tutorial
{
    let uri = 'http://localhost:3000/galaxy';

      const res = await fetch(uri);
      const posts = await res.json()
      console.log(posts);

      let template = ''
      posts.forEach(post => {
        template += `
        <div class="post">
        <h2>${post.name}</h2>
        <p>${post.id}</p>
        <div  class="button" onclick="stergeGal(${post.id})">Delete</div>
        </div>
        `
      })
      console.log(template)
      console.log(container22)
      container22.innerHTML = template;
}



function stergeGal(id){
  console.log(id)
  console.log("salut")
  fetch("http://localhost:3000/galaxy/"+id, 
  {method: 'delete', 
  }).then(function(response)
      {
      console.log(response); window.location.reload();}
      );
   
}


function editareGal(){
  
  const iddeschimbat = document.getElementById("update-input").value
  id = Number(iddeschimbat)
  console.log(id)
  const numenou =document.getElementById("newName").value
  fetch("http://localhost:3000/galaxy/"+id, 
 
  {method: 'put', 
  headers: 
  {
    'Content-Type' : 'application/json'
  },
  body: JSON.stringify({name:numenou})
 
  }
  ).then(function(response)
      {
      console.log(response); window.location.reload();}
      );
   
}



function adaugareGal(){
  const name = document.getElementById("create-input").value;
	
	const newG= { name: name };
	
	
	fetch("http://localhost:3000/galaxy", 
		  {method: 'post', 
		   headers: 
		   {
			   'Content-Type' : 'application/json'
		   },
		   body: JSON.stringify(newG)
		  }).then(function(response)
				  {
					console.log(response); window.location.reload();}
				  );
}




