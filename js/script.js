

$(document).ready(function () {

    // tableau cartes
    const deck = [
        'SeptCarreau', 'HuitCarreau', 'NeufCarreau', 'DixCarreau', 'ValetCarreau', 'DameCarreau', 'RoiCarreau', 'AsCarreau',
        'SeptTrefle', 'HuitTrefle', 'NeufTrefle', 'DixTrefle', 'ValetTrefle', 'DameTrefle', 'RoiTrefle', 'AsTrefle',
        'SeptCoeur', 'HuitCoeur', 'NeufCoeur', 'DixCoeur', 'ValetCoeur', 'DameCoeur', 'RoiCoeur', 'AsCoeur',
        'SeptPique', 'HuitPique', 'NeufPique', 'DixPique', 'ValetPique', 'DamePique', 'RoiPique', 'AsPique'
    ];
    // valeur cartes
    const values = {
        'SeptCarreau': 0, 'HuitCarreau': 1, 'NeufCarreau': 2, 'DixCarreau': 3, 'ValetCarreau': 4, 'DameCarreau': 5, 'RoiCarreau': 6, 'AsCarreau': 7,
        'SeptTrefle': 0, 'HuitTrefle': 1, 'NeufTrefle': 2, 'DixTrefle': 3, 'ValetTrefle': 4, 'DameTrefle': 5, 'RoiTrefle': 6, 'AsTrefle': 7,
        'SeptCoeur': 0, 'HuitCoeur': 1, 'NeufCoeur': 2, 'DixCoeur': 3, 'ValetCoeur': 4, 'DameCoeur': 5, 'RoiCoeur': 6, 'AsCoeur': 7,
        'SeptPique': 0, 'HuitPique': 1, 'NeufPique': 2, 'DixPique': 3, 'ValetPique': 4, 'DamePique': 5, 'RoiPique': 6, 'AsPique': 7
    };
    // obj joueurs
    class Player {
        constructor(name) {
            this.name = name;
            this.score = 0;
            this.deck = [];
        }

        drawCard() {
            return this.deck.pop();
        }

        addCards(cards) {
            this.deck = cards.concat(this.deck);
        }

        addScore(points) {
            this.score += points;
        }
    }

    let player = new Player("Joueur");
    let computer = new Player("Ordinateur");
    var newTab = [];




    let playerName = "Joueur";

    function promptForPlayerName() {
        $("#namePrompt").fadeIn(); // Affiche  modale
    }

    function setPlayerName(name) {
        playerName = name || "Joueur"; // Utilisez "Joueur" par défaut si champ  vide
        $("#playerVictory").text(playerName); // Met à jour affichage
        $("#namePrompt").fadeOut(); // Cache  modale
    }

    $(document).ready(function () {
        //  boîte de dialogue au début
        promptForPlayerName();

        $("#startGameBtn").click(function () {
            const nameInput = $("#playerNameInput").val();
            setPlayerName(nameInput); // Enregistre  nom et met à jour l'affichage
            resetGame(); // Démarre jeu
        });

        // Réinitialiser  jeu avec demande de nom
        function resetGame() {
            player.score = 0;
            player.deck = [];
            computer.score = 0;
            computer.deck = [];
            newTab = [];

            // Réinitialiser l'affichage
            $("#joueurcarte img").attr("src", "img/backcartegrande.png");
            $("#ordinateurcarte img").attr("src", "img/backcartebleuegrande.png");
            $("#playerVictory").text(playerName); // Met à jour le nom du joueur
            $("#computerVictory").text("Ordinateur");
            $("#playerBataille").empty();
            $("#computerBataille").empty();

            // Réinitialiser les cartes et scores
            dealCards();
            updateScore();
            updateCardCount();
        }
    });



    // melange
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    // distrib cartes
    function dealCards() {
        shuffle(deck);
        player.deck = deck.slice(0, 16);
        computer.deck = deck.slice(16);
        updateCardCount();
    }
    console.log("Deck joueur :", player.deck);
    console.log("Deck ordinateur :", computer.deck);
    //afficher cartes
    function updateCardCount() {
        $("#nombrecartejoueur").text(player.deck.length);
        $("#nombrecarteordinateur").text(computer.deck.length);
    }
    // AFFICHAGE DU SCORE
    function updateScore() {
        $("#scorevaleurjoueur").text(player.score);
        $("#scorevaleurordinateur").text(computer.score);
    }


    function resetGame() {
        // Réinitialiser les données des joueurs
        player.score = 0;
        player.deck = [];
        computer.score = 0;
        computer.deck = [];
        newTab = [];

        // Réinitialiser l'affichage visuel
        $("#joueurcarte img").attr("src", "img/backcartegrande.png");
        $("#ordinateurcarte img").attr("src", "img/backcartebleuegrande.png");
        $("#playerVictory img, #computerVictory img").attr("src", "");
        $("#playerBataille").empty();
        $("#computerBataille").empty();

        // Réinitialiser les cartes
        dealCards();

        // Mettre à jour les scores et compte des cartes
        updateScore();
        updateCardCount();
    }







    //fontction tours

    function playRound(cardsInPlay = []) {
        if (computer.deck.length === 0) {
            alert("Vous avez gagné la partie!");
            $("#playerVictory img").attr("src", `img/CoupeGagnant50-44.png`);
            setTimeout(resetGame);
            return;

        }

        if (player.deck.length === 0) {
            alert("Vous avez perdu la partie!");
            $("#computerVictory img").attr("src", `img/CoupeGagnant50-44.png`);
            setTimeout(resetGame);
            return;
        }

        let playerCard = player.drawCard();
        let computerCard = computer.drawCard();
        cardsInPlay.push(playerCard, computerCard); // tableau temporaire

        // Mise à jour des images des cartes
        $("#joueurcarte img").attr("src", `img/${playerCard}.png`);
        $("#ordinateurcarte img").attr("src", `img/${computerCard}.png`);
        $("#playerBataille").empty(); // 
        $("#computerBataille").empty(); // 

        if (values[playerCard] > values[computerCard]) {
            player.addCards(cardsInPlay);
            player.score = player.score + values[playerCard] + values[computerCard];
            if (newTab.length > 0) {

                $.each(newTab, function (index, card) {
                    var img = $('<img>').attr('src', `img/${card}.png`).addClass('tailleminicarte', 'inline-block');
                    $("#playerBataille").append(img);
                });
                player.addCards(newTab);
                newTab = []; // rein ta add cards
            }

            $("#joueurdos img").attr("src", `img/backcartegrande.png`);
            $("#ordinateurdos img").attr("src", `img/backcartebleuegrande.png`);

        } else if (values[playerCard] < values[computerCard]) {
            computer.addCards(cardsInPlay);
            computer.score = computer.score + values[playerCard] + values[computerCard];
            if (newTab.length > 0) {
                $.each(newTab, function (index, card) {
                    var img = $('<img>').attr('src', `img/${card}.png`).addClass('tailleminicarte', 'd-flex', 'inline-block');
                    $("#computerBataille").append(img);
                });
                computer.addCards(newTab);
                newTab = []; // reinntabcards
            }

            $("#joueurdos img").attr("src", `img/backcartegrande.png`);
            $("#ordinateurdos img").attr("src", `img/backcartebleuegrande.png`);
        } else {
            // Bataille 
            if (player.deck.length < 2) {
                // Si le joueur n'a pas assez de cartes pour continuer la bataille, il perd
                alert("L'ordinateur gagne !");
                $("#computerVictory img").attr("src", `img/CoupeGagnant50-44.png`);
                setTimeout(resetGame);
                return;
            }
            if (computer.deck.length < 2) {
                // Si l'ordinateur n'a pas assez de cartes pour continuer la bataille, il gagne
                alert("Vous avez gagné!");
                $("#playerVictory img").attr("src", `img/CoupeGagnant50-44.png`);
                setTimeout(resetGame);
                return;
            }

            $("#joueurdos img").attr("src", `img/backcartegrandebatrect.png`);
            $("#ordinateurdos img").attr("src", `img/backcartebleuegrandebatrect.png`);
            cardsInPlay.push(player.drawCard(), computer.drawCard());

            // Ajout des cartes en bataille à newTab
            while (cardsInPlay.length > 0) {
                newTab.push(cardsInPlay.splice(0, 1)[0]);
            }
        }

        updateScore();
        updateCardCount();
        console.log(values[computerCard]);
        console.log(values[playerCard]);
        console.log(computer.deck);
        console.log(player.deck);
        console.log(cardsInPlay);
        console.log(newTab);
    }

    $("#joueurdos").click(function () {
        playRound();
    });

    dealCards();

});





