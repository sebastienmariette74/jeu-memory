

$(function(){
  $('.modal').css('display','none');
  let start = $('.button_start');
  let restart = $('.button_restart');
  start.css('cursor', 'pointer');
  restart.css('cursor', 'pointer');
  let progressBar = $('#MaBarreProgression');
  progressBar.css('display', 'none');
  // progressBar.progressbar("disabled");
  


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

  start.click(()=>{
    $('body').css('backgroundColor','rgba(0, 0, 0, 0)');

    /* ---------- disposition des figurines dans le tableau ----------------- */  
    for (let box of boxes) {
      box.style.backgroundColor = '#fffaba';
      box.style.borderColor = '#fffaba';
      let numberOfRemainingBoxes = animals.length; 
      let randomNumber = function() { 
        return Math.floor(Math.random() * (numberOfRemainingBoxes-1));
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
    /* _____________________________________________________________________ */

    start.prop('disabled', true);
    progressBar.css('display', 'block');


    /* --------------------- BARRE DE PROGRESSION ------------------------------- */
    let max = progressBar.attr('max');
    let time = 1;
    let value = progressBar.val();

    let Telechargement = ()=> {
        value += 1;
        addValue = progressBar.val(value);

        $('.progress-value').html('Téléchargement '+ value + '%');

        if (value == max) {
            clearInterval(animation);   
            $('.progress-value').html('Téléchargement Terminé !');                 
        }
    };

    let animation = setInterval(()=> {
        Telechargement();
    }, time);
  /* _________________________________________________________________________________*/
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
      // console.log(event.style.opacity);
      let children = event.childNodes;      
      for (let child of children) {
        console.log(child.style.opacity);
        if (child.style.opacity === '1'){
          e.preventDefault();
          console.log('if');
          } else if (nbClic < 2){

            console.log('else if');
            console.log(nbClic);      

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
            console.log('else');
            console.log(nbClic);      
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
              console.log('ok');
              foundPairs++;
              console.log(foundPairs);
              if (foundPairs === 8){
                endGame = true;
                console.log('gagné');
                $('.modal').css('display','block');

                

              }

            } else {
              console.log('non');
              setTimeout(()=>{
                firstPicture.style.opacity ='0';
                secondPicture.style.opacity ='0';            
              },1000);
            };
        };
      };
    });
    console.log(nbClic);
  };

  for (let box of boxes){
    box.style.cursor = 'pointer';
    clic(box);
  };

  restart.click(()=>{
    /* -------------- REINITITIALISATION DE LA GRILLE ----------------------------*/
    let animals = [cow, elephent, herisson, hippo, penguin, shark, snake, tortle, cow, elephent, herisson, hippo, penguin, shark, snake, tortle];
    let table1 = $('.box');
    let boxes = [...table1];

    for (let box of boxes) {
      let numberOfRemainingBoxes = animals.length; 
      let randomNumber = function() { 
        return Math.floor(Math.random() * (numberOfRemainingBoxes-1));
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

//   /* --------------------- BARRE DE PROGRESSION ------------------------------- */
//   // let MaBarreProgression = $('#MaBarreProgression');
//   // let max = MaBarreProgression.attr('max');
//   // let time = 1;
//   // let value = MaBarreProgression.val();

//   // let Telechargement = ()=> {
//   //     value += 1;
//   //     addValue = MaBarreProgression.val(value);

//   //     $('.progress-value').html('Téléchargement '+ value + '%');

//   //     if (value == max) {
//   //         clearInterval(animation);   
//   //         $('.progress-value').html('Téléchargement Terminé !');                 
//   //     }
//   // };

//   // let animation = setInterval(()=> {
//   //     Telechargement();
//   // }, time);
//   /* _________________________________________________________________________________*/

// /* --------------------- BARRE DE PROGRESSION ------------------------------- */
// let max = progressBar.attr('max');
// let time = 1;
// let value = progressBar.val();

// let Telechargement = ()=> {
//     value += 1;
//     addValue = progressBar.val(value);

//     $('.progress-value').html('Téléchargement '+ value + '%');

//     if (value == max) {
//         clearInterval(animation);   
//         $('.progress-value').html('Téléchargement Terminé !');                 
//     }
// };

// let animation = setInterval(()=> {
//     Telechargement();
// }, time);
// /* _________________________________________________________________________________*/

//   function init(){ // four progress bars 
//     $("#pbar0").progressbar({ "value": 63 }); 
//     $("#pbar1").progressbar({ "value": 47 }); 
//     $("#pbar2").progressbar({ "value": 33 }); 
//     $("#pbar3").progressbar({ "value": 21 }); 
//     // the zero'th progressbar gets the default theme 
//     // set colors for progressbar #1 
//     $("#pbar1").css({ 'background': 'url(images/white-40x100.png) #ffffff repeat-x 50% 50%;' }); 
//     $("#pbar1 > div").css({ 'background': 'url(images/lime-1x100.png) #cccccc repeat-x 50% 50%;' }); 
//     // set colors for progressbar #2 
//     $("#pbar2").css({ 'background': 'url(images/lt-blue-40x100.png) #ffffff repeat-x 50% 50%' }); 
//     $("#pbar2 > div").css({ 'background': 'url(images/dustyblue-1x100.png) #cccccc repeat-x 50% 50%' }); 
//     // set colors for progressbar #3 
//     $("#pbar3").css({ 'background': 'LightYellow' }); 
//     $("#pbar3 > div").css({ 'background': 'Orange' }); 
//   };

//   $("#pbar0").bind('progressbarchange', function(event, ui) { 
//     var selector = "#" + this.id + " > div"; 
//     var value = this.getAttribute( "aria-valuenow" ); 
//     if (value < 10){ 
//       $(selector).css({'background': 'Red' }); 
//     } else if (value < 30){ 
//       $(selector).css({ 'background': 'Orange' 
//     }); 
//     } else if (value < 50){ 
//       $(selector).css({ 'background': 'Yellow' 
//     }); 
//     } else{ 
//       $(selector).css({ 'background': 'LightGreen' 
//       }); 
//     } 
//   });



}); /* fin du code */



