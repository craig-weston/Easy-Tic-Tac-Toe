$(document).ready(function() {
	

	var startUpScreen = '<div class="screen screen-start" id="start"><header><h1>Tic Tac Toe</h1><a href="#" class="button">Start game</a></header></div>';
	
	var winScreen = '<div class="screen screen-win" id="finish"><header><h1>Tic Tac Toe</h1><p class="message"></p><a href="#" class="button">New game</a></header></div>';
	
	var playerOne = $('#player1');
	var playerTwo = $('#player2');
	var winner = "";

	$('body').append(startUpScreen);
	$('#board').hide();
	$('body').append(winScreen);
	$('#finish').hide();

	$('.button').click(function() {
		$('#start').hide();
		$('#finish').hide();
		$('#board').show();
		
		var userName1 = prompt("Hi, Please enter your name:");
	
		var userName2 = prompt("Hi, Please enter player's 2 name:");
		
		$("#player1").html(`<h2>${userName1}</h2>
		 <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg>
			`);
		$("#player2").html(`<h2>${userName2}</h2>
		 <svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg>
		`);

		$('.box').each(function() {
			$(this).removeClass('box-filled-1');
			$(this).removeClass('box-filled-2');
			$(this).css('background-image', '');
	
			// When the current player mouses over an empty square on the board, 
			// it's symbol the X or O should appear on the square.
			$(this).mouseover(function() {
				if (playerOne.hasClass('active')) {
					$(this).css('background-image', "url('./img/o.svg')");
				} else {
					$(this).css('background-image', "url('./img/x.svg')");
				}
			});

			// Remove background image when mouse leaves out
			$(this).mouseleave(function() {
				$(this).css('background-image', '');
			})

		});

		playerOne.addClass('active');
	});
	
	
// Click event handling for each boxes
	$('.box').click(function() {

			if ($(this).hasClass('box-filled-1') === false && $(this).hasClass('box-filled-2') === false) {

				if(playerOne.hasClass('active')) {

					// Bind the current this context
					checkGame.call(this,'p1');
				} else {

					// Bind the current this context
					checkGame.call(this,'p2');
				}
			}
	
		/**
		 * function : checkGame
		 * @param - player - which player clicked
		 */
		function checkGame(player) {

			var boxArray = [];

			// Players can only click on empty squares. When the player clicks on an empty square, 
			// attach the class box-filled-1 (for O) or box-filled-2 (for X) to the square. 
			if (player === 'p1') {
				$(this).addClass('box-filled-1');
				playerOne.removeClass('active');
				playerTwo.addClass('active');
			} else if (player === 'p2') {
				$(this).addClass('box-filled-2');
				playerTwo.removeClass('active');
				playerOne.addClass('active');
			}

			// Detach event handler once box is clicked
			$(this).unbind('mouseover mouseleave');

			// boxArray will be used to calculate the winner
			$('.box').each(function() {
				if($(this).hasClass('box-filled-1') === true) {
					boxArray.push('player1');
				} else if ($(this).hasClass('box-filled-2') === true) {
					boxArray.push('player2');
				} else {
					boxArray.push('null');
				}
			})	
			
	
			// The game ends when one player has three of their symbols in a row either horizontally, vertically or diagonally. 
			if (boxArray[0]!== 'null' && boxArray[0] === boxArray[1] && boxArray[1] === boxArray[2]) {
				winner = boxArray[0];
				showGameStatus();

			} else if (boxArray[3]!== 'null' && boxArray[3] === boxArray[4] && boxArray[4] === boxArray[5]) {
				winner = boxArray[3];
				showGameStatus();

			} else if (boxArray[6]!== 'null' && boxArray[6] === boxArray[7] && boxArray[7] === boxArray[8]) {
				winner = boxArray[6];
				showGameStatus();

			} else if (boxArray[0]!== 'null' && boxArray[0] === boxArray[3] && boxArray[3] === boxArray[6]) {
				winner = boxArray[0];
				showGameStatus();

			} else if (boxArray[1]!== 'null' && boxArray[1] === boxArray[4] && boxArray[4] === boxArray[7]) {
				winner = boxArray[1];
				showGameStatus();

			} else if (boxArray[2]!== 'null' && boxArray[2] === boxArray[5] && boxArray[5] === boxArray[8]) {
				winner = boxArray[2];
				showGameStatus();

			} else if (boxArray[0]!== 'null' && boxArray[0] === boxArray[4] && boxArray[4] === boxArray[8]) {
				winner = boxArray[0];
				showGameStatus();

			} else if (boxArray[2]!== 'null' && boxArray[2] === boxArray[4] && boxArray[4] === boxArray[6]) {
				winner = boxArray[2];
				showGameStatus();

			// If all of the squares are filled and no players have three in a row the game is a tie.
			} else if (boxArray.includes('null') === false) {
				winner = "tie";
				showGameStatus();
			}
			
		
		function showGameStatus() {
				// Player1 winning screen
				if (winner === "player1") {
					$("#finish").removeClass("screen-win-two");
					$("#finish").removeClass("screen-win-tie");
					$(".message").html("Player 1 wins!");
					$("#finish").addClass("screen-win-one");
					
				// Player2 winning screen
				} else if (winner === "player2") {
					$("#finish").removeClass("screen-win-one");
					$("#finish").removeClass("screen-win-tie");
					$(".message").html("Player 2 wins!");
					$("#finish").addClass("screen-win-two");

				// Game tie screen
				} else if (winner === "tie") {
					$("#finish").removeClass("screen-win-one");
					$("#finish").removeClass("screen-win-two");
					$(".message").html("It's a Tie!");
					$("#finish").addClass("screen-win-tie");
				}

				$("#finish").show();
				$("#board").hide();
			}

		};
	});


});