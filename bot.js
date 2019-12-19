
const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth2.json');
const config = require("./config.json");


var petNum = 0;
var fedNum = 0;
var fedHour;
var petHour;
var happyBar = '';
var healthBar = '';
var hour;
var minute;
var dayMonth;
var dayWeek;
var nowMonth;
var nowYear;
var months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
var days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
var heeHawtime = Math.floor(Math.random() * 24);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  fedNum = 1
  petNum = 1
  updateHappy();
  updateHealth();
  client.setInterval(ServerUpdate, 60000);
  ServerUpdate();
});

client.login(auth.token);

function ServerUpdate() {
  var now = new Date(); // current date
  hour = now.getHours();
  minute = now.getMinutes();
  dayMonth = now.getDate();
  dayWeek = now.getDay();
  nowMonth = now.getMonth();
  nowYear = now.getFullYear();
  //if(hour == 0){
  //  fedHour = 0;
  //  petHour = 0;
  //}

  if (hour >= fedHour + 2) {
    if (fedNum == 0) {

    }
    else {
      fedNum--;
      updateHealth();
      fedHour = hour;
    }
  }

  if (hour >= petHour + 1) {
    if (petNum == 0) {

    }
    else {
      petNum--;
      updateHappy();
      petHour = hour;
    }
  }

  if (petNum == 0) {
    client.channels.find("id", "639160062916689947").send("give luv");
  }

  if (fedNum == 0) {
    client.channels.find("id", "639160062916689947").send("give food");
  }

  if (hour == 9 && minute == 0) {
    GoodMorning();
  }

  if (hour == 0 && minute == 0) {
    heeHawtime = Math.floor(Math.random() * 24)
  }

  if (hour == heeHawtime && minute == 0) {
    heeHaw();
  }
};

function GoodMorning() {
  if (minute < 10) {
    minute = `0${minute}`;
  }
  client.channels.find(
    "id",
    "639160062916689947"
  ).send(
    `good morning! it is ${hour}:${minute} on ${days[dayWeek]}, ${months[nowMonth]} ${dayMonth}, ${nowYear}`
  );
}


client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'general');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`welcome to the stuniverse, ${member}`);
});



client.on('message', async message => { //reads every incoming message
  if (message.author.bot) return; //ignore if bot
  let incMes = message.content
  Regular();
  BerateCal();
  
  let command;
  if (incMes.indexOf(config.prefix) !== -1) {
    const mArray = incMes.trim(incMes.indexOf(config.prefix)).split(" ");
    for(let i = 0; i <= mArray.length; i++) {
      if (mArray[i].indexOf(config.prefix) == 0){ //&& mArray[1].length > 1) {
        command = mArray[i].toLowerCase();
        command = command.substr(1);
        i = mArray.length;
      }
    }
  } //ignore if not command


  switch (command) {
    //a command for displaying links to all of Alex's stuff
    case "links":
      //say the links text
      message.channel.send("instagram: <https://instagram.com/stupidstupidshirts/>\ntwitch stream: <https://www.twitch.tv/stupidstupidshirts/>\ntwitter: <https://twitter.com/Stupid_shirts/>\nshirts: <https://stupidstupidshirts.com/>");
      break;
    //a command for displaying the rules
    case "rules":
      message.channel.send({
        embed: {
          color: 3447003,
          author: {
            name: "A.S.S sponsored message",
            icon_url: client.user.avatarURL
          },
          title: "dont get caught horsin around :horse:",
          fields: [{
            name: "rule 1:",
            value: "dont insult Stu"
          },
          {
            name: "rule 2:",
            value: "no NSFW images, im baby and so r u"
          },
          {
            name: "rule 3:",
            value: "don't ask for free stuff, i do giveaways"
          },
          {
            name: "rule 4:",
            value: "try not to spam pls"
          },
          {
            name: "rule 5:",
            value: "be nice"
          },
          {
            name: "rule 6:",
            value: "have fun"
          }
          ],
          footer: {
            icon_url: client.user.avatarURL,
            text: "© Alex's Stupid Shirts LLC in collaboration with the Alex's Stupid Software team"
          }
        }
      });
      break;
    case "regulars":
      let role = message.guild.roles.find("name", "Regulars");
      var memberNameList = role.members.array().map(
        member => member.displayName.toLowerCase()
      ); //array of all Regular names
      var userList = memberNameList.join(', ');

      message.channel.send(`nice squad: ${userList}`); //send the string
      break;
    case "superregulars":
      let roleS = message.guild.roles.find("name", "Super Regular");
      var memberNameList = roleS.members.array().map(
        member => member.displayName.toLowerCase()
      ); //array of all super Regular names
      var userList = memberNameList.join(', ');

      message.channel.send(`extra nice squad: ${userList}`); //send the string
      break;
    case "megasuperregulars":
      let roleM = message.guild.roles.find("name", "Mega Super Regular");
      var memberNameList = roleM.members.array().map(
        member => member.displayName.toLowerCase()
      ); //array of all mega super Regular names
      var userList = memberNameList.join(', ');

      message.channel.send(`mega extra nice squad: ${userList}`); //send the string
      break;
    case "pet":
      if (petNum < 10) {
        petNum++;
        updateHappy();
        if (hour >= 22){
          petHour = 0; 
        } 
        else{
        petHour = hour;
        }
        //message.channel.send("happiness: " + happyBar + "\nhealth: " + healthBar);
        message.channel.send("uwu");
      }
      else {
        message.channel.send("Stu is content, come back later.");
      }
      break;
    case "feed":
      if (fedNum < 10) {
        fedNum++;
        updateHealth();
        
        if (hour >= 22){
          fedHour = 0; 
        } 
        else{
        fedHour = hour;
        }
        //message.channel.send("happiness: " + happyBar + "\nhealth: " + healthBar);
        message.channel.send("monch");
      }
      else {
        message.channel.send("Stu is full, come back later.");
      }
      break;
    case "stu":
      message.channel.send(`happiness: ${happyBar}\nhealth: ${healthBar}\nthanks for checking on me!`);
      break;
    case "stutime":
      var designation;
      var tempHour;

      if (minute < 10) {
        minute = "0" + minute;
      }

      if (hour < 12) {
        tempHour = hour;
        designation = "am";
      }
      if (hour == 12){
        designation = "pm";
        tempHour = hour;
      }
      if (hour > 12) {
        tempHour = hour - 12;
        designation = "pm";
      }

      message.channel.send(`it is currently ${tempHour}:${minute} ${designation} at A.S.S headquarters`);
      break;
    case "kiss":
      var rChance = Math.floor(Math.random() * 200);

      if (rChance == 7) {
        message.channel.send("i am flattered but i am currently taken by <@241814679033348098>");
      }
      else {
        message.channel.send("mwah :heart:");
        if (petNum < 10) {
          petNum++;
          updateHappy();
        }
      }
      break;
    case "pee":
      message.channel.send("banned");
      break;
    case "piss":
      message.channel.send("banned");
      break;
    case "shid":
      message.channel.send("https://gyazo.com/b779ce218d6fe64ea5534372252e8cb7");
      break;
    case "commands":
      message.channel.send("current commands: !links, !rules, !pet, !feed, !stu, !stutime, !kiss, !regulars, !superregulars, !megasuperregulars, !serverpop");
      break;
    case "frick":
      message.channel.send("no swer please");
      break;
    case "ded":
      message.channel.send("https://cdn.discordapp.com/attachments/639169397474459649/639615204673454090/image0.jpg");
      break;
    case "furry":
      message.delete().catch(O_o => { });
      message.channel.send("There is no one single definition of what a furry is. Even within the furry fandom, people cannot always agree on just what makes a person a furry or not. Some would argue that to be a furry, you must think and talk like one (i.e. use furry specific words and phrases). Even if you go to conventions, wear a fursuit, draw the art, writes the stories etc but don't talk using furry lingo, you're not a furry. Basically, someone that may walk the walk but doesn’t talk the talk. Others would argue that even liking anthropomorphic creatures makes you a furry. You may have no idea the furry fandom exists or have ever heard of a furry convention, let alone any of the websites; simply liking 'anthro' critters makes you a furry. The way I see it, if or if you don’t consider yourself a furry is a matter of personal opinion. As with any hobby, most furries are normal people just like anyone you'll meet at work/school or going to/from work/school or anywhere. Then there is the small percent that are hard core fans and have taken what for most is a hobby and perverted it (sometimes in an all to literal sense). As is with so many other things in life, the few that take it too far tend to be the loudest. The silent majority are often forced into silence by the loud majority for fear that people will label them as being in the same class as the minority that have perverted it. One unfortunate side effect of the internet and the relative anonymity that some sites grant their users is people are able to engage in activities (even if only on a virtual level) that they would never even consider doing in real life. An example of this is trolls of message boards that say things to people they’d never say to them in person. I think a lot of the stereotypes associated with furries are because of this. In conclusion, as with any hobby, there are some furries that have taken it too far and/or perverted what for many is a fun harmless hobby.");
      break;
    case "john":
      message.channel.send("excuse me, it's jon. thank you");
      break;
    case "serverpop":
      message.channel.send(`there are ${message.guild.memberCount} lovely people on the stuver`);
      break;
    case "woohee":
      message.channel.send("wee hoo");
      break;
    case "reviews":
      message.channel.send("https://gyazo.com/04e9fb6504ea10c29be2937f017a431f");
      break;
    case "gay":
      message.channel.send("https://media.discordapp.net/attachments/639160062916689947/651879175371620388/image0.png");
      break;
    case "alexis":
      message.channel.send("https://cdn.discordapp.com/attachments/639203849889906699/643546490043760690/image0.jpg");
      break;
    case "historyfact":
      message.channel.send("https://www.history.com/this-day-in-history");
      break;
    case "croccers":
      message.channel.send("<:croccers:643489110777921537>");
    break;
    case "vibecheck":
      message.channel.send("Mr. <@537882200960532491>, your presence is requested in " + message.channel.name)
    break;
    case "school":
      message.channel.send("it's where sam is from")
    break;
    case "drumk":
        message.channel.send("https://cdn.discordapp.com/attachments/639160062916689947/651245882691551233/drumk.png");
    break;
    case "baby":
        message.channel.send("<@108340775430946816>, step on me");
    break;
    case "supersecretcommandslistthatyoushouldn'taccessyoufool":
        message.channel.send("!links, !rules, !pet, !feed, !stu, !stutime, !kiss, !regulars, !superregulars, !megasuperregulars, !serverpop, !drumk, !baby, !school, !vibecheck, !croccers, !historyfact, !alexis, !gay, !reviews, !woohee, !serverpop, !john, !furry, !ded, !frick, !commands, !shid, !piss, !pee");
    break;

    case "testcommand": //use to test stuff
      
    break;
  }

  //Random Chance to be a Regular (KEEP AT THE BOTTOM)
  function Regular() {
    let roleR = message.guild.roles.find("id", "639277446298075146"); //Find the Regulars role
    let roleR2 = message.guild.roles.find("id", "641831471157477387");
    let roleR3 = message.guild.roles.find("id", "641831568700211212");
    let sender = message.member;
    if (sender.roles.has(roleR.id)) {
      if (sender.roles.has(roleR2.id)) {
        if (sender.roles.has(roleR3.id)) {
          return;
        }
        else {
          const rngNumber = Math.ceil(Math.random() * 4200); //get a number between 1 and 4200
          if (rngNumber == 242) { //if you hit a 242
            sender.addRole(roleR3.id); //give them the regular role
            message.channel.send("dude, mega super nice"); //say nice on the 242!
          }
        }
      }
      else {
        const rngNumber = Math.ceil(Math.random() * 690); //get a number between 1 and 690
        if (rngNumber == 420) { //if you hit a 420
          sender.addRole(roleR2.id); //give them the regular role
          message.channel.send("dude, super nice"); //say nice on the 420!
        }
      }
    }
    else {
      const rngNumber = Math.ceil(Math.random() * 420); //get a number between 1 and 420
      if (rngNumber == 69) { //if you hit a 69
        sender.addRole(roleR.id) //give them the regular role
        message.channel.send("nice") //say nice on the 69!
      }
    }
  }

  function BerateCal() {
    let member = message.member;
    if (member.id == config.CAL) {
      const rngNumber = Math.ceil(Math.random() * 1000); //get a number between 1 and 420
      if (rngNumber == 69) {
        message.channel.send("cal....really?");
      }
    }
  }
});

function generateBar(barNum, maxBarLength, fillCharacter = 'x', emptyCharacter = 'o') {
  let bar = '';
  for (let i = 0; i < barNum; ++i) {
    bar += fillCharacter;
  }
  for (let i = barNum; i < maxBarLength; ++i) {
    bar += emptyCharacter;
  }
  return bar;
}

function updateHappy() {
  happyBar = generateBar(petNum, 10);
}

function updateHealth() {
  healthBar = generateBar(fedNum, 10);
}

function heeHaw() {
  client.channels.find("id", "639160062916689947").send("hee haw");
}

/*
function getNextSunday() {
  var now = new Date();
  var nextSunday = new Date();
  nextSunday.setDate(now.getDate() + (6 - 1 - now.getDay() + 7) % 7 + 1);
  nextSunday.setHours(20, 0, 0, 0);
  return nextSunday;
}
*/