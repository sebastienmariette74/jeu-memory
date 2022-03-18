

$(function(){
  $('.modal').css('display','none');
  $('.modal1').css('display','none');
  let start = $('.button_start');
  let submit = $('.submit');
  start.css('cursor', 'pointer');
  $('.restart').css('cursor', 'pointer');
  submit.css('cursor', 'pointer');
  let progressBar = $('#MaBarreProgression');
  progressBar.css('display', 'none');
  let score;
  let bestScore = 12000;
  let bestScoreDisplay;
  let time, radio;
  let clicForbidden = false;

  /* ------------------ le bouton start clignote ------------------- */
  let bindStart;

  let bind = ()=>{
    if(start.css('font-size') === '16px'){
      start.css('font-size', '18px');
    } else {
      start.css('font-size', '16px');
    };
  };

  bindStart = setInterval(bind, 500); 
  /* ________________________________________________________________*/


  /* ----------------- création de la grille ---------------- */
  let numberRows = 4;
  let numberCols = 4;
  let grid = $('.grid');

  for (let i = 1 ; i <= numberRows ; i++){
  
    let createDiv = document.createElement('div');
    createDiv.id = 'row';  
    grid.append(createDiv);
    createDiv.style.display = 'flex';
    createDiv.style.justifyContent = 'center';
    createDiv.style.textAlign = 'center';
    for (let j = 1 ; j <= numberCols; j++){
      let creatBox = document.createElement('div');
      // creatBox.id = 'box'+ (j + numberCols*(i-1));
      creatBox.classList = 'box';    
      createDiv.appendChild(creatBox);    
    };
  };
  
  /* __________________________________________________________________ */


  /* ------------------- tableau des figurines ---------------------------- */
  let cow = "<img class='animal' src='images/cow.png' alt=''>";
  let elephent = "<img class='animal' src='images/elephent.png' alt=''>";
  let herisson = "<img class='animal' src='images/herisson.png' alt=''>";
  let hippo = "<img class='animal' src='images/hippo.png' alt=''>";
  let penguin = "<img class='animal' src='images/penguin.png' alt=''>";
  let shark = "<img class='animal' src='images/shark.png' alt=''>";
  let snake = "<img class='animal' src='images/snake.png' alt=''>";
  let tortle = "<img class='animal' src='images/tortle.png' alt=''>";

  let animals = [cow, elephent, herisson, hippo, penguin, shark, snake, tortle, cow, elephent, herisson, hippo, penguin, shark, snake, tortle];
  /* ______________________________________________________________________ */

  /* ----------- TABLEAU DES CASES ----------------*/
  let table1 = $('.box');
  let boxes = [...table1];

  /* -------------- INITITIALISATION DE LA GRILLE ----------------------------*/
  

  let home = ()=>{
    animals = [cow, elephent, herisson, hippo, penguin, shark, snake, tortle, cow, elephent, herisson, hippo, penguin, shark, snake, tortle];
    for (let box of boxes) {
      let numberOfRemainingBoxes = animals.length; 
      let randomNumber = function() { 
        return Math.floor(Math.random() * (numberOfRemainingBoxes));
      };        
      let nb = randomNumber();
      box.innerHTML = animals[nb];
      console.log(box.innerHTML);
  
      // if (box.hasChildNodes()) {
      //   let children = box.childNodes;
      
      //   for (let child of children) {
      //     child.style.opacity = '1';
      //   }
      // }       
      animals.splice(nb, 1);
    };     
  };

  let homeDisplay = setInterval(()=> {
    home();
  }, 300);


  /* ___________________________________________________________________________*/





  /* --------------------- BARRE DE PROGRESSION ------------------------------- */   
  
  let value=0, max;

  function chrono (sec){
    let time = 10;
    let chronometer = ()=> {
      progressBar.attr('max',sec);
      max = progressBar.attr('max');
      if (!endGame){
        value += 1;
      } else {
        clearInterval(animation);   
      }
      // addValue = progressBar.val(value);
      progressBar.val(value);
      if (value == max) {
        endGame = true;
        clearInterval(animation);   
        $('.modal_text').html('Partie perdue !');  

        $('.modal1').css('display','block');    

      }
    };
  
    let animation = setInterval(()=> {
        chronometer();
    }, time);
  }
  
  /* _________________________________________________________________________________*/  



  /* ----------------   START ----------------------------------------------- */
  start.click(()=>{
    $('section').css('backgroundColor','rgba(0, 0, 0, 0)');
    $('.modal').css('display','block');
    clearInterval(bindStart);
    clearInterval(homeDisplay);
    start.prop('disabled', true);
  })  
  /* ________________________________________________________________________ */


  /* ----------------------------------- action lorsqu'on clique sur une case ------------------------------*/
  let nbClic = 1;
  let firstPicture = '';
  let secondPicture = '';
  let foundPairs = 0;
  let endGame = false;
  let clic = (event) => {
    event.addEventListener('click', (e)=>{
      let children = event.childNodes;      
      for (let child of children) {
        if (child.style.opacity === '1' || value === max || clicForbidden || endGame){
          e.preventDefault();
          } else if (nbClic < 2){
            nbClic++;
            if (event.hasChildNodes()) {
              let children = event.childNodes;      
              for (let child of children) {
                child.style.opacity = '1';
                firstPicture = child;
                firstPictureAttribute = child.getAttribute('src');
              }
            };
          } else {
            nbClic = 1;
            if (event.hasChildNodes()) {
              let children = event.childNodes;      
              for (let child of children) {
                child.style.opacity = '1';
                secondPicture = child;
                secondPictureAttribute = child.getAttribute('src');
              }
            };

            if(firstPictureAttribute === secondPictureAttribute){
              foundPairs++;
              if (foundPairs === 8){
                endGame = true;
                score = value;
                scoreDisplay = parseInt(value/100) + '"' + Math.round(((value/100)-parseInt(value/100))*100) + '.';
                

                if (radio === 'oui'){
                  if (score < bestScore){
                    bestScore = score;
                    bestScoreDisplay = "c'est ton meilleur temps.";
                    $('.modal_text').html('BRAVO !!! Tu as mis ' + scoreDisplay + bestScoreDisplay);  
                  } else {
                    // bestScoreDisplay = "Ton meilleur temps est de " + bestScore + '.';
                    $('.modal_text').html('BRAVO !!! Tu as mis ' + scoreDisplay + '.');  
                  };
                } else {
                  $('.modal_text').html('BRAVO !!!');  
                }
                $('.modal1').css('display','block');
                progressBar.css('display','none');
              }
            } else {
              clicForbidden = true;
              setTimeout(()=>{
                firstPicture.style.opacity ='0';
                secondPicture.style.opacity ='0';          
                clicForbidden = false;  
              },1000);
            };
        };
      };
    });
  };

  for (let box of boxes){
    box.style.cursor = 'pointer';
    clic(box);
  };
  /*__________________________________________________________________________________________________________*/  

  
  
  /* --------------------------------------- BOUTON OK ----------------------------- */
  submit.click(()=>{
    endGame = false;
    value = 0;
    progressBar.val(value);
    time = $('select option:selected').text();
    radio = $('input[name=chrono]:checked').val();
    if (radio === 'oui'){
      if (time === '30s'){
        let sec = 3000;
        progressBar.css('display', 'block');
        $('.modal1').css('display', 'none');
        chrono(sec);
      } else if (time === '60s'){
        let sec = 6000;
        progressBar.css('display', 'block');
        $('.modal1').css('display', 'none');
        chrono(sec);
      } else if (time === '90s'){
        let sec = 9000;
        progressBar.attr('max','900');
        progressBar.css('display', 'block');
        $('.modal1').css('display', 'none');
        chrono();
      } else {
        let sec = 12000;
        progressBar.css('display', 'block');
        $('.modal1').css('display', 'none');
        chrono();
      } 
    } else {
      progressBar.css('display', 'none');
      $('.modal1').css('display', 'none');
    };

    /* -------------- INITITIALISATION DE LA GRILLE ----------------------------*/
    let animals = [cow, elephent, herisson, hippo, penguin, shark, snake, tortle, cow, elephent, herisson, hippo, penguin, shark, snake, tortle];
    let table1 = $('.box');
    let boxes = [...table1];

    for (let box of boxes) {
      let numberOfRemainingBoxes = animals.length; 
      let randomNumber = function() { 
        return Math.floor(Math.random() * (numberOfRemainingBoxes));
      };        
      let nb = randomNumber();
      box.innerHTML = animals[nb];

      if (box.hasChildNodes()) {
        let children = box.childNodes;
      
        for (let child of children) {
          child.style.opacity = '0';
        }
      }       
      animals.splice(nb, 1);
    };     
    /* ___________________________________________________________________________*/

    $('.modal').css('display','none');
    foundPairs = 0;
  })
  /* __________________________________________________________________________ */


  /* --------------------------------- BOUTON RESTART --------------------------*/
  $('.restart').click(()=>{
    $('.modal').css('display','block');
  });
  /* _____________________________________________________________________________*/

  


}); /* fin du code */



