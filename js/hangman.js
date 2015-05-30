ahorcado = new Array();
var toGuess;
var guessChoices;
var win=0, lose=0, user="", pass="";
var val = "nothing";
var users;
//var guessChoices = JSON.parse("data.json");
selectCat();


function initialize(){	
    if(localStorage!==null){
        users = localStorage.getItem("players");
    }
    
    guesses = 0;
    guessed = " ";


    len = guessChoices.length - 1;


    ahorcado[0] = new Image(119, 165);
    ahorcado[0].src = "img/hgm/hgm1.png";
    ahorcado[1] = new Image(119, 165);
    ahorcado[1].src = "img/hgm/hgm2.png";
    ahorcado[2] = new Image(119, 165);
    ahorcado[2].src = "img/hgm/hgm3.png";
    ahorcado[3] = new Image(119, 165);
    ahorcado[3].src = "img/hgm/hgm4.png";
    ahorcado[4] = new Image(119, 165);
    ahorcado[4].src = "img/hgm/hgm5.png";
    ahorcado[5] = new Image(119, 165);
    ahorcado[5].src = "img/hgm/hgm6.png";
    ahorcado[6] = new Image(119, 165);
    ahorcado[6].src = "img/hgm/hgm7.png";
	
    max = ahorcado.length-1;
    
    document.getElementById("botones").innerHTML = '<div id="oreo"><div id="bloque1"><input class="btnn" name="A" type="button" value=" A " onclick="guess(\'A\')">'
            + '<input class="btnn" name="B" type="button" value=" B " onclick="guess(\'B\')">'	
            + '<input class="btnn" name="C" type="button" value=" C " onclick="guess(\'C\')">'	             
            + '<input class="btnn" name="D" type="button" value=" D " onclick="guess(\'D\')">'
            + '<input class="btnn" name="E" type="button" value=" E " onclick="guess(\'E\')">'
            + '<input class="btnn" name="F" type="button" value=" F " onclick="guess(\'F\')">'
            + '<input class="btnn" name="G" type="button" value=" G " onclick="guess(\'G\')">'
            + '<input class="btnn" name="H" type="button" value=" H " onclick="guess(\'H\')"></div>'
            + '<div id="bloque2">'
			+ '<input class="btnn" name="I" type="button" value=" I " onclick="guess(\'I\')">'
            + '<input class="btnn" name="J" type="button" value=" J " onclick="guess(\'J\')">'
            + '<input class="btnn" name="K" type="button" value=" K " onclick="guess(\'K\')">'
            + '<input class="btnn" name="L" type="button" value=" L " onclick="guess(\'L\')">'
            + '<input class="btnn" name="M" type="button" value=" M " onclick="guess(\'M\')">'
            + '<input class="btnn" name="N" type="button" value=" N " onclick="guess(\'N\')">'
            + '<input class="btnn" name="O" type="button" value=" O " onclick="guess(\'O\')">'
            + '<input class="btnn" name="P" type="button" value=" P " onclick="guess(\'P\')"></div>'
			+ '<div id="bloque3">'
            + '<input class="btnn" name="Q" type="button" value=" Q " onclick="guess(\'Q\')">'
            + '<input class="btnn" name="R" type="button" value=" R " onclick="guess(\'R\')">'
            + '<input class="btnn" name="S" type="button" value=" S " onclick="guess(\'S\')">'
			+ '<input class="btnn" name="T" type="button" value=" T " onclick="guess(\'T\')">'
            + '<input class="btnn" name="U" type="button" value=" U " onclick="guess(\'U\')">'
            + '<input class="btnn" name="V" type="button" value=" V " onclick="guess(\'V\')"></div>'
			+ '<div id="bloque4">'
            + '<input class="btnn" name="W" type="button" value=" W " onclick="guess(\'W\')">'
            + '<input class="btnn" name="X" type="button" value=" X " onclick="guess(\'X\')">'
            + '<input class="btnn" name="Y" type="button" value=" Y " onclick="guess(\'Y\')">'
            + '<input class="btnn" name="Z" type="button" value=" Z " onclick="guess(\'Z\')"></div></div>';
		
    document.getElementById("text1").innerHTML = '<p>Word to guess</p><input type="TEXT" name="toGuess" onfocus="stayAway()"><BR> '
                                                +'<p>Letters guessed so far</p><input type="TEXT" name="guessed" onfocus="stayAway()"><BR>';

/*	document.getElementById("lec").innerHTML = '<div id="eleccion">'
												+ '<input type="radio" name="selection" value="fullname" onclick="selectCat()">Full name'
												+ '<input type="radio" name="selection" value="city" onclick="selectCat()" onclick="selectCat()">City'
												+ '<input type="radio" name="selection" value="company" onclick="selectCat()">Company</div>'*/
	
	
	//document.getElementById("comenzar").innerHTML = '	<button id="btnPlay" class="btn btn-primary btn-lg" onclick="initialize()">Comenzar juego</button>';
    
    displayHangman();
    
    displayToGuess();
   
    displayGuessed();
	//alert("termino initialize")
} 


function selectCat(){
	//para que seleccione de mis radio buttons el valor checkeado
	radios = document.getElementsByName("selection"); 
    for (var i=0, len=radios.length; i<len; i++) {
        if ( radios[i].checked ) { // radio checked?
            val = radios[i].value; // if so, hold its value in val
            break; // and break out of for loop
        }
    }
	if(val==="nothing")
		val= "fullname";
	
	switch (val)
	{
		case "fullname":
				$.getJSON("data.json",function(data){ 
					for(datos in data){
						toGuess=data[Math.round(len*Math.random())].fullname.toUpperCase(); 
					} 	
					//alert(toGuess);
					guessChoices = data;
						initialize();

				});
		break;
		case "city":
				$.getJSON("data.json",function(data){ 
					for(datos in data){
						toGuess=data[Math.round(len*Math.random())].city.toUpperCase(); 
					} 	
					guessChoices = data;
					//alert(toGuess);
						initialize();

				});
		break;
		case "company":
				$.getJSON("data.json",function(data){ 
					for(datos in data){
						toGuess=data[Math.round(len*Math.random())].company.toUpperCase(); 
					} 	
					
					guessChoices = data;
					//alert(toGuess);
						initialize();

				});
		break;
			
	}
}

function guess(s){
    //alert('antro a guess')
    if(guessed.indexOf(s) === -1) guessed = s + guessed;
    if(badGuess(s)) ++guesses;
 //   alert("guesses"+guesses)
 //   alert("max"+max)
    displayHangman();
    displayToGuess();
    displayGuessed();
    if(guesses >= max){
       	lose++;
		alert("You're dead "+user+". The word you missed was "+toGuess+".\n"+"Win:"+win+" - lose:"+lose);
			savePlayer();
		    initialize();

    }
    if(winner()) {
        win++;
		alert("You won!\n"+"Win:"+win+" - lose:"+lose);
		savePlayer();    
		initialize();

    }

}	


function player(){
    if(localStorage===null)
    {
        user = document.getElementById("email").value;
	pass = document.getElementById("password").value;
        users = {user:user,pass:pass};
    }else{
        /*
    for (var i = 0; i < localStorage.length; i++) {
        if(localStorage.key(i).getItem(user)===user)
        {   user = document.getElementById("email").value;
            pass = document.getElementById("password").value;
            users[i] = [email,pass];
        }*/
    for (var i = 0; i < users.length; i++) {
        if(users[i].user ===user && users[i].pass ===pass)
        {   user = document.getElementById("email").value;
            pass = document.getElementById("password").value;
            if(user===null){
                users[i].user = "Anonimo";
                users[i].pass = "";
            }else{   
                users[i].user = user;
                users[i].pass = pass;
            }
        }else{
            user = document.getElementById("email").value;
            pass = document.getElementById("password").value;
            users[i].user = user;
            users[i].pass = pass;        
        }
    }
    }
}
function savePlayer(){
        localStorage.setItem("players", JSON.stringify(users));
        localStorage.setItem("email", user );
	localStorage.setItem("password", pass );
	localStorage.setItem("Lose", lose );
	localStorage.setItem("Win", win );
        alert("KEY"+localStorage.key(n))
}
	
function stayAway() {
 //   alert("entro a stayaway")
 document.getElementById("text1").focus()
 alert("Don't mess with this form element!")
}
	
function displayHangman() {
    
    var x = ahorcado[guesses].src
//alert(x);
    document.getElementById("img").innerHTML = '<img src="'+x+'"></img>'
    
}
	
function displayToGuess() {
    //alert("entro a displaytogues")
 //alert("displayToGuess"+guessed)
 //alert("displayToGuess"+toGuess)
 //alert("displayToGuess.length"+toGuess.length)

 pattern=""
 for(i=0;i<toGuess.length;++i) {
	 if(guessed.indexOf(toGuess.charAt(i)) != -1)
	 {
	  //alert("i"+i);
	  pattern += (toGuess.charAt(i)+" ")
	 }
	 else pattern += "_ "
  	  //alert("ifuera"+i+"   Pattern"+pattern+"     toGuess.charAt(i)"+toGuess.charAt(i));

 }
 document.game.toGuess.value=pattern
}
	
function displayGuessed() {
    //alert("entro a displayGuessed")
 document.game.guessed.value=guessed
}
	
function badGuess(s) {
 if(toGuess.indexOf(s) == -1) return true
 return false
}
	
	
function winner() {
 for(i=0;i<toGuess.length;++i) {
  if(guessed.indexOf(toGuess.charAt(i)) == -1) return false
 }
 return true
}
	
	
	
//
	
