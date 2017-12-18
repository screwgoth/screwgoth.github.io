$(function() {
var anim = false;
function typed(finish_typing) {
  return function(term, message, delay, finish) {
      anim = true;
      var prompt = term.get_prompt();
      var c = 0;
      if (message.length > 0) {
          term.set_prompt('');
          var interval = setInterval(function() {
              term.insert(message[c++]);
              if (c == message.length) {
                  clearInterval(interval);
                  // execute in next interval
                  setTimeout(function() {
                      // swap command with prompt
                      finish_typing(term, message, prompt);
                      anim = false
                      finish && finish();
                  }, delay);
              }
          }, delay);
      }
  };
}
var typed_prompt = typed(function(term, message, prompt) {
  // swap command with prompt
  term.set_command('');
  term.set_prompt(message + ' ');
});
var typed_message = typed(function(term, message, prompt) {
  term.set_command('');
  term.echo(message)
  term.set_prompt('[[;#f7efae;]screwgoth@raseel.in:~] ');
});

function progress(percent, width) {
    var size = Math.round(width*percent/100);
    var left = '', taken = '', i;
    for (i=size; i--;) {
        taken += '=';
    }
    if (taken.length > 0) {
        taken = taken.replace(/=$/, '>');
    }
    for (i=width-size; i--;) {
        left += ' ';
    }
    return '[' + taken + left + '] ' + percent + '%';
}
var animation = false;
var timer;
var prompt;
var string;
$('body').terminal(function(cmd, term) {
  var finish = false;
  var msg = "Wait I'm executing ajax call";
  term.set_prompt('[[;#f7efae;]man15h@tilda:~] ');
  var commandText = function(text){
    return "[[;#90ca9a;]" + text + "]";
  }
  var list = function(text){
    return "[[;#2196F3;]" + text + "]";
  }
  var listHead = function(text){
    return "[[;#d0d4e5;]" + text + "]";
  }
  var listText = function(text){
    return "[[i;#90ca9a;]" + text + "]";
  }
  var highLight = function(text){
    return "[[iu;#90ca9a;]" + text + "]";
  }
  var whoami = "[[ib;#d0d4e5;]Hello world!, my name is  ]"+highLight("Manish Kumar,")
  +"[[;#d0d4e5;]A designer, developer, gamer, engineer, loser and ...I don't know. May be I'm not an expert in any particular field but I just do things.]";

  if (cmd == 'help') {
      term.echo(commandText("   contact")+"          display contact infomation");
      term.echo(commandText("   whoami")+"           display my short brief");
      term.echo(commandText("   clear")+"            clear terminal text");
      term.echo(commandText("   address")+"          display address infomation");
      term.echo(commandText("   about")+"            information about this page");
      term.echo(commandText("   techskills")+"       display my technical skills");
      term.echo(commandText("   age")+"              display my Age");
    }
  else if (cmd=='whoami'){
      term.echo("[[i;#d0d4e5;]Hello world!, my name is \n]"+highLight("Raseel Bhagat\n")
      +"[[;#d0d4e5;]A designer, developer, gamer, engineer, loser and ...I don't know. May be I'm not an expert in any particular field but I just do things.]\n"
    );
  }
  else if (cmd == 'age') {
      term.echo("[[i;#d0d4e5;]0b100100 (Years)]");
    }
  else if (cmd == 'about') {
      term.echo("[[i;#FF9800;] V 0.1\n");
    }
  else if (cmd == 'school') {
      term.echo("[[i;#d0d4e5;]KReSIT, IIT Mumbai, India]");
    }
  else if (cmd == 'address') {
      term.echo("[[i;#d0d4e5;]@home]");
    }
  else if (cmd == 'ls') {
      term.echo("[[i;#dd4b39;]/Game of Thrones   /Documents    /Videos   /Games]");
    }
  else if (cmd == 'ok') {
      term.echo("Thanks!");
    }
  else if (cmd=='contact'){
    term.echo(listHead("    Get in touch via: \n \n")+"[[i;#dd4b39;]     Email:]"+"          raseelbhagat@gmail.com\n"
    +"[[i;#55acee;]     Twitter:]"+"        @raseel\n"
    +"[[i;#dd4b39;]     LinkedIn:]"+"    raseelbhagat\n"
    +"[[i;#0084ff;]     Facebook:]"+"       raseelbhagat");
  }
    else if (cmd == 'techskills') {
        term.echo(listHead("Skills: \n")+
      listText("      - AngularJS, C++, CSS3, Django, Flask, Git, HTML5, Java, JavaScript, MongoDB, MySQL, Nlp, NodeJS, php, Python\n")+
      listText("      - Adobe suits, Android Studio, Ansys Fluent, Ansys, ICEM CFD, Atom, Autodesk Inventor, Creo, MATLAB, MS Office, SolidWorks"));
      }
    else if (cmd == 'web') {
           var i = 0, size =91;
           prompt = term.get_prompt();
           string = progress(0, size);
           term.set_prompt(progress);
           animation = true;
           (function loop() {
               string = progress(i++, size);
               term.set_prompt(string);
               if (i <60) {
                   timer = setTimeout(loop, 100);
               }
               else if (60<i<100) {
                  window.location.href = "http://raseel.in/";
               }else {
                   term.echo(progress(i, size) + ' [[b;green;]OK]')
                       .set_prompt(prompt);
                   animation = false

               }
           })();
         }
  else{
    term.echo("[[;#f45957;]this is not a valid command, try 'help' for more information]");
  }
}, {
  name: 'xxx',
  greetings: null,
  width: 1200,
  height: 300,
  onInit: function(term) {
      // first question
      var msg = '“Who is John Galt?”                            - Ayn Rand \n \n';
      var msg = '“Disclaimer : This page is heavily inspired from : https://man15h.github.io/”\n \n';
      typed_message(term, msg, 40, function() {
          // typed_prompt(term, "what's your name:", 100);
      });
  },
  keydown: function(e) {
      //disable keyboard when animating
      if (anim) {
          return false;
      }
  }
});
});
