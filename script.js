var gameWrapper = document.querySelector('.gameWrapper');
var field = document.querySelector('#container');
var buttonWrapper = document.querySelector('.buttonWrapper');
var capacityWrap = document.querySelector('.capacityWrap');
var particle; // хранит последний перетянутый элемент
var tank; // поле смешивания элементов
var number;
var elementComponents = {
  stone: ['fire', 'fire'],
  wind: ['air', 'air'],
  sand: ['air', 'stone'],
  dust: ['soil', 'air'],
  dirt: ['water', 'soil'],
  steam: ['fire', 'water'],
  fog: ['water', 'air'],
  lightning: ['air', 'fire'],
  cloud: ['air', 'fog'],
  sunlight: ['fire', 'lightning'],
  glass: ['fire', 'sand'],
  DNA: ['lightning', 'dirt'],
  ice: ['water', 'fog'],
  brick: ['fire', 'clay'],
  clay:['dirt', 'sand'],
  mushroom:['soil', 'DNA'],
  hourglass: ['sand', 'glass'],
  virus: ['DNA', 'DNA'],
  snow: ['ice', 'cloud'],
  darkness: ['soil', 'sunlight'],
  plankton: ['water', 'DNA'],
  fish: ['water', 'plankton'],
  eel: ['lightning', 'fish'],
  salamander: ['air', 'fish'],
  turtle: ['stone', 'salamander'],
  moon: ['stone', 'sunlight'],
  algae: ['sunlight', 'DNA'],
  moss: ['stone', 'algae'],
  trilobite: ['stone', 'plankton'],
  crab: ['sand', 'trilobite'],
  shrimp: ['water', 'trilobite'],
  grass: ['soil', 'moss'],
  fern: ['air', 'algae'],
  reed: ['water', 'grass'],
  palm: ['sand', 'fern'],
  pot: ['clay', 'wheel'],
  frog: ['dirt', 'salamander'],
  thorn: ['sand', 'grass'],
  gear: ['thorn', 'wheel'],
  clock: ['hourglass', 'gear'],
  stingray: ['fish', 'thorn'],
  lizard: ['sand', 'salamander'],
  tree: ['soil', 'fern'],
  mammal: ['soil', 'lizard'],
  toad: ['soil', 'frog'],
  shrew: ['soil', 'mammal'],
  jerboa: ['sand', 'shrew'],
  flower: ['sunlight', 'grass'],
  cactus: ['sand', 'flower'],
  bird: ['air', 'lizard'],
  bat: ['air', 'shrew'],
  beaver: ['water', 'shrew'],
  water_lily: ['water', 'flower'],
  flute: ['air', 'wood'],
  coal: ['fire', 'wood'],
  duck: ['water', 'bird'],
  duck: ['water', 'bird'],
  whale: ['water', 'mammal'],
  weasel: ['lightning', 'mammal'],
  sheep: ['cloud', 'mammal'],
  panther: ['darkness', 'mammal'],
  wolf: ['moon', 'mammal'],
  pig: ['dirt', 'mammal'],
  chimpanzee: ['tree', 'mammal'],
  house: ['brick', 'wood'],
  amanita: ['mushroom', 'toad'],
  sunflower: ['sunlight', 'flower'],
  owl: ['darkness', 'bird'],
  spruce: ['snow', 'tree'],
  cart: ['wood', 'wheel'],
  squirrel: ['tree', 'shrew'],
  beetle: ['trilobite', 'tree'],
  fox: ['soil', 'wolf'],
  badger: ['soil', 'weasel'],
  red_panda: ['fire', 'fox'],
  arctic_fox: ['snow', 'fox'],
  otter: ['water', 'weasel'],
  scorpio: ['sand', 'beetle'],
  horse: ['grass', 'mammal'],
  bagpipe: ['flute', 'bag'],
  man: ['flute', 'chimpanzee'],
  raven: ['coal', 'bird'],
  bee: ['beetle', 'flower'],
  dragonfly: ['beetle', 'reed'],
  honey: ['flower', 'bee'],
  muskrat: ['reed', 'shrew'],
  rose: ['flower', 'thorn'],
  hedgehog: ['thorn', 'shrew'],
  camel: ['sand', 'horse'],
  penguin: ['bird', 'paint'],
  leo: ['sand', 'panther'],
  bear: ['mammal', 'honey'],
  dog: ['wolf', 'man'],
  cat: ['panther', 'man'],
  killer_whale: ['whale', 'paint'],
  platypus: ['duck', 'beaver'],
  loon: ['duck', 'paint'],
  zebra: ['horse', 'paint'],
  opossum: ['shrew', 'bag'],
  skunk: ['weasel', 'paint'],
  kangaroo: ['jerboa', 'bag'],
  panda: ['bear', 'paint'],
  koala: ['bear', 'bag'],
  rat: ['soil', 'muskrat'],
  magpie: ['raven', 'paint'],
  wombat: ['muskrat', 'bag'],
  zombies: ['human', 'virus'],
  polar_bear: ['snow', 'bear'],
  snowman: ['snow', 'man'],
  sea_lion: ['water', 'lion'],
  catfish: ['fish', 'cat'],
  raccoon: ['tree', 'weasel'],
  snake: ['eel', 'lizard'],
  thrush: ['bird', 'cat'],
  tasmanian_devil: ['rat', 'bag'],
}

var keys = Object.keys(elementComponents);
var particleX;
var particleY;
field.addEventListener('dragover', function(event) {
  event.preventDefault();
});

field.addEventListener('drop', function(event) {
  field.append(particle);
  particle.style.position = 'absolute';
  particle.style.top = event.pageY - particleY + 'px';
  particle.style.left = event.pageX - particleX + 'px';
  particle.style.display = 'flex';
});
class Element {
  constructor(container, elemName) {
    this._container = container;
    this._elemName = elemName;
    this._run(container, elemName);
  }
  _run(container, elemName) {
    var elem = document.createElement('div');
    container.appendChild(elem);
    elem.draggable = true;
    elem.innerHTML = elemName;
    elem.classList.add(elemName, 'element');
    elem.addEventListener('dragstart', function(event) {
      particle = this;
      particleX = event.offsetX;
      particleY = event.offsetY;
    });
    elem.addEventListener('drag', function() {
      elem.style.position = 'static';
      elem.style.display = 'none';
    });
    elem.addEventListener('dragend', function() {
      elem.style.display = 'flex';
    });

    // Добавляем обработчики событий касания
    elem.addEventListener('touchstart', function(event) {
      var touchPos = getTouchPos(event);
      particleX = touchPos.x - elem.getBoundingClientRect().left;
      particleY = touchPos.y - elem.getBoundingClientRect().top;
      particle = this;
      event.preventDefault();
    }, false);

    elem.addEventListener('touchmove', function(event) {
      var touchPos = getTouchPos(event);
      elem.style.position = 'absolute';
      elem.style.left = touchPos.x - particleX + 'px';
      elem.style.top = touchPos.y - particleY + 'px';
      event.preventDefault();
    }, false);

    elem.addEventListener('touchend', function(event) {
      elem.style.position = 'static';
      event.preventDefault();
    }, false);
  }
}
function getTouchPos(touchEvent) {
  if (touchEvent.touches) {
    if (touchEvent.touches.length > 0) {
      var touch = touchEvent.touches[0]; // Получаем первое касание
      return { x: touch.clientX, y: touch.clientY };
    }
  }
  return { x: 0, y: 0 };
}


field.addEventListener('drop', function(event) {
  field.append(particle);  
  particle.style.position = 'absolute';
  particle.style.top = event.pageY - particleY + 'px';
  particle.style.left = event.pageX - particleX + 'px';
  particle.style.display = 'flex';
  });

class Capacity{
    constructor(container){
      this._container = container;
      this.createCapacity(container);
    }
  createCapacity(container){
      var capacity = document.createElement('div');
      tank = capacity;
      container.appendChild(capacity);
      capacity.classList.add('capacity');
      capacity.innerHTML = 'MIX ELEMENTS'
      capacity.addEventListener('dragover', function(event){
        event.preventDefault();
      });
      capacity.addEventListener('drop', (event)=> {
        capacity.appendChild(particle);  
        particle.style.display = 'flex';
        particle.style.position = 'absolute';
        particle.style.top = event.pageY - particleY + 'px';
        particle.style.left = event.pageX - particleX + 'px';
        this.checkElemMass();
      });
    } 
    checkElemMass(elemsForMix){
      var capacity = document.querySelector('.capacity');
      elemsForMix = capacity.querySelectorAll('div');
      if(elemsForMix.length==2){
        this.chooseElement(elemsForMix);
      }
    }
    chooseElement(elemsForMix, innerText){
      innerText = false;
      for(var i = 0; i<keys.length; i++){
        if((elemsForMix[0].classList[0] == elementComponents[keys[i]][0]&&
            elemsForMix[1].classList[0] == elementComponents[keys[i]][1])||
           (elemsForMix[1].classList[0] == elementComponents[keys[i]][0]&&
            elemsForMix[0].classList[0] == elementComponents[keys[i]][1])){
          innerText = keys[i];
          break;
        }
      }
      this.to_be_or_not_to_be(field, innerText);
    }
    to_be_or_not_to_be(field, innerText){
      if (innerText !=false){
        this.createElem(field, innerText);
      }
      else{
        this.cannotMix();
      }
    }
    createElem(field, elemName){
      this.deleteMixedElems();
      new Element(field, elemName);
      this.checkButton(elemName);
      this.newButton(elemName);
    }
    checkButton(text){
      var buttonWrapperChildren = buttonWrapper.querySelectorAll('button');
      
      for (var i = 0; i<buttonWrapperChildren.length; i++){   
        if(buttonWrapperChildren[i].classList.contains(text)){
          number = false;
          break;
        }
        else{
          number = true;
        }
      }
    }
    newButton(text){
      if(number == true){
        new createButton(text);
        saveProgress();
      }
      number = false;
    }
    deleteMixedElems(){
      var elems = tank.querySelectorAll('div');
        for(var i = 0; i<elems.length; i++){
          tank.removeChild(elems[i]);
        }
    }
    cannotMix(){
      alert('Cannot mix this elements');
      var elems = tank.querySelectorAll('div');
      for(var i = 0; i<elems.length; i++){
        elems[i].style.position = 'static';
        field.appendChild(elems[i]);
      }
    }
  }

/*****/  
class createButton{
  constructor(text){
    this._text = text;
    this.makeButton(text);
  }
  makeButton(text){
    var elemButton = document.createElement('button');
    elemButton.classList.add(text, 'create');
    elemButton.innerHTML = text;
    elemButton.addEventListener('click', (innerText)=>{
      innerText = elemButton.innerHTML;
      new Element(field, innerText);
    });
    buttonWrapper.append(elemButton);
  }
}

/******/

class Element{
  constructor(container, elemName){
    this._container = container;
    this._elemName = elemName;
    this._run(container, elemName);
  }  
  _run(container, elemName){
    var elem = document.createElement('div');
    container.appendChild(elem);
    elem.draggable = true;
    elem.innerHTML = elemName;
    //elem.style.backgroundImage = 'url(image/'+elemName+'.png)';
    elem.classList.add(elemName, 'element');
    elem.addEventListener('dragstart', function(event){
      particle = this;
      particleX = event.offsetX;
      particleY = event.offsetY;
    });
    elem.addEventListener('drag', function(){ //позволяет перетаскивать элемент в другой контейнер, абсолютно позиционированный не перетаскивается
      elem.style.position = 'static';
      elem.style.display = 'none';
    });
    elem.addEventListener('dragend', function(){
      elem.style.display = 'flex';
    })
  }
}

/*****/
class DeleteArea{
  constructor(container){
    this._container = container;
    this._run(container);
  }
  _run(container){
    var area = document.createElement('div');
    container.appendChild(area);
    area.classList.add('deleteArea');
    area.innerHTML = 'DELETE ELEMENT';
    area.addEventListener('dragover', function(event){
      event.preventDefault();
    });
    area.addEventListener('drop', ()=> {
      area.appendChild(particle);
      area.removeChild(particle);
    });
  }
}
var fireButton = new createButton('fire');
var airButton = new createButton('air');
var waterButton = new createButton('water');
var soilButton = new createButton('soil');

var fire = new Element(field, 'fire', 'fire');
var water = new Element(field, 'water', 'water');
var air = new Element(field, 'air', 'air');
var soil = new Element(field, 'soil', 'soil');

var cap = new Capacity(capacityWrap);
var del = new DeleteArea(capacityWrap);

var savedButtonsJson = localStorage.getItem('savedButtons');
function saveProgress(){
  var buttons = buttonWrapper.querySelectorAll('button');
  var massButtons = [];
  for(var i = 0; i<buttons.length; i++){
    massButtons[i] = buttons[i].classList[0];
  }
  save('savedButtons', massButtons);
  var jsonString = JSON.stringify(massButtons);
  localStorage.setItem('savedButtons', jsonString);
  savedButtonsJson = localStorage.getItem('savedButtons');
  return savedButtonsJson;
}

function save(id, mass){
  var json = JSON.stringify(mass);
  localStorage.setItem(id, json);
}

function restoreProgress(){
  deleteExcessButtons();
  let savedButtons = JSON.parse(savedButtonsJson);
  for(var i = 0; i<savedButtons.length; i++){
    var btn = new createButton(savedButtons[i]);
  }  
}
function deleteExcessButtons(){
  var buttons = buttonWrapper.querySelectorAll('button');
  for(var i=0; i<buttons.length; i++){
    buttonWrapper.removeChild(buttons[i]);
  }
}

var restoreButton = document.querySelector('.restoreButton');
restoreButton.addEventListener('click', restoreProgress);

// Функция для получения координат касания
function getTouchPos(touchEvent) {
  if (touchEvent.touches) {
    if (touchEvent.touches.length > 0) {
      var touch = touchEvent.touches[0]; // Получаем первое касание
      return { x: touch.clientX, y: touch.clientY };
    }
  }
  return { x: 0, y: 0 };
}
const draggableElement = document.getElementById('draggableElement');
  
  let offsetX, offsetY;

  draggableElement.addEventListener('mousedown', startDrag);
  draggableElement.addEventListener('touchstart', startDrag);

  function startDrag(event) {
    event.preventDefault();
  
    if (event.type === 'touchstart') {
      offsetX = event.touches[0].clientX - draggableElement.getBoundingClientRect().left;
      offsetY = event.touches[0].clientY - draggableElement.getBoundingClientRect().top;
    } else {
      offsetX = event.clientX - draggableElement.getBoundingClientRect().left;
      offsetY = event.clientY - draggableElement.getBoundingClientRect().top;
    }

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('touchmove', onDrag);
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
  }

  function onDrag(event) {
    event.preventDefault();
  
    let clientX, clientY;
    if (event.type === 'touchmove') {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }

    draggableElement.style.left = clientX - offsetX + 'px';
    draggableElement.style.top = clientY - offsetY + 'px';
  }

  function stopDrag() {
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchend', stopDrag);
  }
