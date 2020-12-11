/* 
Beskrivning
Du ska använda rest countries API:et för att hämta 3 random länder. Varje land ska vara ett objekt som du skapar med en konstruktor. Varje land ska ha en prototyp-metod som returnerar nuvarande tid på dygnet. För varje land ska du presentera flagga, namn och nuvarande tid.

*/

const countryURL = 'https://restcountries.eu/rest/v2/all';

//skickar in ett promise i fetch och får tillbaka json()
fetch(countryURL).then(
    function(response){
        if(response.status === 404){
            //om url:en är fel får vi tillbaka nedan
            throw 'Error. Not found'
        }
        else{
            return response.json();
        }
    }
).then(
    function(data){
        //skapar en tom array där vi ska lägga in våra 3 random länder
        let randomCountries = [];  
        //genom en for-loop tar vi fram 3 random länder. Lägger även till floor för att det ska avrundas nedåt.
        for (let i = 0; i < 3; i++){
            let random = Math.floor(Math.random()*data.length);
            //lägger till de 3 länderna i vår array vi skapat ovan. Länderna skapar jag som instansobjekt från den constructor (mall) som skapas nedan. Egenskaperna läggs in som parametrar. I det här fallet flag, name och time.
            randomCountries.push(
                new Country(data[random].flag, data[random].name, data[random].timezones[0])
            );
        }
        console.log(randomCountries);
        //genom en for of-loop kallar vi på funktionerna som skapas nedan för att tilldela värdena till varje objekt
        for(country of randomCountries){
            country.displayFlag();
            country.displayName();
            country.displayTime();
        }  
    }
).catch(
    function(error){
        //här fångar vi upp error
        console.log(error);
    }
)

/* -------Här startar mallen som vi använder för att ta fram länderna ------ */

//skapar en constructor med 3 parametrar(egenskaper): flag, name och time
function Country(_flag, _name, _time){
    this.flag = _flag;
    this.name = _name;
    this.timezone = _time;
}

//skapar prototyper för de olika functionerna vi behöver använda oss av för att hämta informationen till våra objekt.
Country.prototype.displayFlag = function(){
//skapar en variabel för body     
let body = document.querySelector('body');
//skapar ett element för img
let imgElement = document.createElement('img');
//ger elementet egenskapen flag, som vi sedan anropar till funktionen 
imgElement.src = this.flag;
imgElement.style.width = '5rem';
//appendar till body
body.appendChild(imgElement);
}


Country.prototype.displayName = function(){
//väljer ett element för body    
let body = document.querySelector('body');
//skapar ett element för h1
let nameElement = document.createElement('h1');
//ger elementet egenskapen name
nameElement.innerText = this.name;
//appendar till body
body.appendChild(nameElement);
}

Country.prototype.displayTime = function(){
let body = document.querySelector('body');
//skapar ett element för h1
let timeElement = document.createElement('h1');
//timeElement.innerText = this.timezone;
let timeZone = this.timezone;

console.log(this.timezone);

//skapar en variabel för att kunna hämta tid
let date = new Date();




//försöker skapa en if-sats som fångar upp de länder som har UTC-time. Här får vi inte upp en string med nummer utan bara en string, alltså inget vi kan plocka ut och räkna med. Men jag lyckas bara få det till noll, så att det inte visas alls, istället för att det står Nan. Lyckas ej lösa detta.
/* if(this.timezone === 'UTC'){
    return 'UTC+00:00';
} */



//Skapar variabler där vi kan spara timezone hours och minutes som nummer. Konverterar sedan till heltal.
//3 för att välja det tredje indexet i string och 3 steg för att vi vill ha ut 3 index, ex '+10' från 'UTC+10:00'
let hours = parseInt(timeZone.substr(3, 3));
//samma med minutes
let minutes = parseInt(timeZone.substr(7, 2));

console.log(hours, minutes); 


//hämtar UTC hours och minutes och ger dem variabler så att vi kan lägga till eller dra ifrån UTC-tiden för respektive land
let UTCHours = date.getUTCHours() + hours;
let UTCMinutes = date.getUTCMinutes() + minutes;

//skapar en variabel som kommer att visa klockan i respektive land med hjälp av template literals där vi lägger in variablerna ovan
let showTime = `${UTCHours}:${UTCMinutes}`

console.log(showTime);

//tilldelar timeElement tiden
timeElement.innerText = `Time: ${showTime}`;
//appendar till body
body.appendChild(timeElement);    
}

/* -------------------------- Slut mall ----------------------------- */

