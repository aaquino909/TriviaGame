$(document).ready(function () {


var triviaQuestions = [{

    question: "Season 4 of Drag Race was full of legendary dramatic moments. One such moment was in the werkroom between rivals Phi Phi O’Hara and Sharon Needles, in which Needles calls O’Hara a ___ ___ ___ and O’Hara tells Needles to “go back to ___ ___” where she belongs.",
    answerOptions: ["-Tired Ass Showgirl; Party City", "-Ashy Clown Queen; The Circus", "-Two-Faced B*tch; The Cemetery", "-Cheap Oompa Loompa; Pizza Hut"],
    answer: 0
},

{   question: "Mimi Imfurst became famous, or should I say infamous, for lifting which fellow drag race contestant during their “Lip Sync For Your Life” performance, dubbing the quote “Drag is not a contact sport”?",
    answerOptions: ["-Laganja Estranja", "-Mystique Summers Madison", "-India Ferra", "-Kenywa Michaels"],
    answer: 2
},
{   question: "In the regular cycles of RuPaul’s Drag Race, there are only four queens who have won the crown without needing to lip sync for their lives. Who are those winning queens?",
    answerOptions: ["-BeBe Zehara Benet, Sharon Needles, Bianca Del Rio, Violet Chachki", "-Tyra Sanchez, Bianca Del Rio, Violet Chachki, Sasha Velour", "-Raja, Jinkx Monsoon, Alaska, Bob the Drag Queen", "-Chad Michaels, Roxxxy Andrews, Bianca Del Rio, Bob the Drag Queen"],
    answer: 2

},
{   question: "Who did Naomi Smalls lip sync against in the Madonna look challenge of season 8, famously dubbed the “Kimono-she-better-don’t” runway, where four of the remaining six queens all wore the same outfit?",
    answerOptions: ["-Derrick Barry", "-Jade Jolie", "-The Princess", "-Acid Betty"],
    answer: 3

},
{   question: "Who is the only queen to ever have been disqualified from RuPaul’s Drag Race?",
    answerOptions: ["-Kelly Mantle", "-Naysha Lopez", "-Willam Belli", "-Adore Delano"],
    answer: 2

},
{   question: "What song did Season 9 winner Sasha Velour lip sync to in which she revealed rose petals hidden in her gloves and wig?",
    answerOptions: ["-It’s Not Right But It’s Okay – Whitney Houston", "-So Emotional – Whitney Houston", "-Stronger – Britney Spears", "-Tell It To My Heart – Taylor Dayne"],
    answer: 2

},
{   question: "Who were the first two queens to ever experience a Double Elimination, in which neither of the queens survive the Lip Sync for Your Life?",
    answerOptions: ["-Dax ExclamationPoint, Laila McQueen", "-Alyssa Edwards, Tatianna", "-Vivienne Pinay, Honey Mahogany", "-Kameron Michaels, Eureka O’Hara"],
    answer: 2

},
{   question: "How many times has Shangela competed for the Drag Race crown?",
    answerOptions: ["1", "2", "3", "4"],
    answer: 2

},
{   question: "Which queen first said the catchphrase “HIIIIIIIIEEEE” in a high-pitched, nasally voice?",
    answerOptions: ["-Tatianna", "-Alaska", "-Ongina", "-Ivy Winters"],
    answer: 2

},
{   question: "Who was in the top three of the first season of RuPaul’s Drag Race All Stars?",
    answerOptions: ["-Alexis Mateo, Raja, Manila Luzon", "-Alaska, Detox, Katya", "-Raven, Jujubee, Chad Michaels", "-None of the above. It was a top four"],
    answer: 3

}];

var currentQuestion; 
var correctAnswer;
var incorrectAnswer;
var answered;
var unanswered;
var seconds;
var time;
var userSelect;
var messages = {
    correct: "CORRECT! YASSS QUEEEEN",
        incorrect: "WRONG! Sashay Away!",
        timesUp: "Always late to the Party!",
        finished: "If you don't love yourself! HOW THE HELL YOU GONNA LOVE SOMEBODY ELSE!"
}

$("#startButton").on("click", function() {
    $(this).hide();
    newGame();
});

$('#startOverBtn').on("click", function() {
    $(this).hide();
    $("#correctAnswers").empty();
    $("#score").empty();
    newGame();
});

function newGame(){
    $("#finalMessage").empty();
    $("#correctedAnswers").empty();
    $("#incorrectAnswers").empty();
    $("#unanswered").empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
}

function newQuestion() {
    $("#message").empty();
    $("#correctedAnswer").empty();
    answered = true;

    $("#currentQuestion").html("Question " + (currentQuestion+1) + "/" + triviaQuestions.length);
    $(".question").html(triviaQuestions[currentQuestion].question);
    for(var i = 0; i < 4; i++) {
        var choices = $('<div>');
        choices.text(triviaQuestions[currentQuestion].answerOptions[i]);
        choices.attr({'data-index': i});
        choices.addClass('thisChoice');
        $('.answerOptions').append(choices);
    }

    countdown();
    $('.thisChoice').on('click', function(){
        userSelect = $(this).data('index');
        clearInterval(time);
        answerPage();
    });
}

    function countdown(){
        seconds = 15;
        $('#timeLeft').html("Time Remaining: " + seconds);
        answered = true;
        time = setInterval(showCountdown, 1000);
        console.log("time", time);
    }

    function showCountdown(){
        seconds--;
        $('#timeLeft').html('Time Remaining: ' + seconds);
        if(seconds < 1){
            clearInterval(time);
            answered = false;
            answerPage();
        }
    }

    function answerPage (){
        $("#currentQuestion").empty();
        $(".thisChoice").empty();
        $(".question").empty();

        var rightAnswerText = triviaQuestions[currentQuestion].answerOptions[triviaQuestions[currentQuestion].answer];
        var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
        if((userSelect == rightAnswerIndex) && (answered == true)){
            correctAnswer++;
            $("#message").html(messages.correct);
        }
        else if((userSelect != rightAnswerIndex) && (answered == true)){
            incorrectAnswer++;
            $("#message").html(messages.incorrect);
            $("#correctedAnswer").html("The correct answer is: " + rightAnswerText);
        }
        else{
            unanswered++;
            $('#message').html(messages.timesUp);
            $('#correctedAnswer').html("The correct answer is: " + rightAnswerText);
            answered = true;
        }

        if(currentQuestion == (triviaQuestions.length-1)){
            setTimeout(scoreboard, 3000)
            $('#timeLeft').empty();
        }
        else{
            currentQuestion++;
            setTimeout(newQuestion, 3000);
            $('#timeLeft').empty();

        }
    }

    function scoreboard(){
        $("#timeLeft").empty;
        $("#message").empty;
        $("#correctedAnswer").empty;
        $("#finalMessage").html(messages.finished);
        $("#correctAnswers").html("Correct Answers: " + correctAnswer + " out of " + triviaQuestions.length);
        $("#incorrectAnswer").html("Incorrect Answers: " + incorrectAnswer + " out of " + triviaQuestions.length);
        $("#unanswered").html("Unanswered: " + unanswered);  
        $("#startOverBtn").addClass('#startButton');
        $("#startOverBtn").addClass('reset');
        $("#startOverBtn").show();
        $("#startOverBtn").html("Start Over");
        if(correctAnswer >= 5) {
        $("#score").html("Don't f**k it up!");
        }
        else {
        $("#score").html("LipSync for your LIFE!");
        }

    }


    

}); //document.ready
