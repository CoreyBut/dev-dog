$(function() {
 
  $('.shoe').append(`<img src="shoeIcon.png" class="img-fluid"></img>`);
  $('.shoe').css('background-color', 'transparent'); //🐶11 Fix: Remove default color

  let score = 0; // Score starts at 0

  function getWin() {
    return Math.floor(Math.random() * 3) + 1; //🐶12 Fix: Ensure correct range (1-3)
  }

  let win = getWin(); // Get the first winning number
  console.log('cheat code: ', win); //🐶 Debugging (Remove before production)

  // Enable drag & drop for Shelly
  $('#shellySeal').draggable({ revert: "valid" });

  $('.shoe').droppable({  
    drop: function() {
      let shoeNo = $(this).attr('id')[4]; // Get shoe number

      if (shoeNo == win) {
        score += 1; 
        $(this).removeClass('loseColor').addClass('winColor');
        $('#gameResult').text('u win'); 
      } else { 
        score -= 1; //🐶14 Fix: Deduct score on loss
        $(this).removeClass('winColor').addClass('loseColor'); //🐶15 Fix: Ensure proper colors
        $('#gameResult').text('u not win'); 
      }

      $('#score').text(score); // Update score
      $('#shellySeal').draggable("disable"); // Disable movement after drop
    }
  });

  //🐶16 Add comment for function ending
  // ↑ Ends main game logic

  $('#replay').on('click', () => {
    $('.shoe').removeClass('winColor').removeClass('loseColor'); 
    win = getWin();
    $('#shellySeal').draggable('enable');
    $('#gameResult').text('');
  });

  $('#reset').on('click', () => {
    $('#resetModal').modal('show'); //🐶18 Show Bootstrap modal instead of confirm()
  });

  $('#confirmReset').on('click', () => {
    score = 0;
    $('#score').text(score); 
    $('.shoe').removeClass('winColor').removeClass('loseColor');
    $('#gameResult').text('');
    win = getWin();
    $('#shellySeal').draggable('enable');
    $('#resetModal').modal('hide'); // Close modal after reset
  });

  //🐶 Debugging cheat code (Should be removed)
  $('#secretSeal').on('click', () => { score = 89978798978 }); 

});
// ↑ Ends document ready function
