// ==UserScript==
// @name        resultadofacil
// @namespace   Violentmonkey Scripts
// @match       *://www.resultadofacil.com.br/resultado-do-jogo-do-bicho/*
// @grant       none
// @version     1.0
// @author      - Irving Cesar
// @description 02/11/2022 15:12:32
// ==/UserScript==


let contentPai = $("<div />", {
  id: "div-content-pai",
});

let div = $('<div />', {
  id: "animais-mais-sorteados",
  class: "div-content"
});

let div2 = $('<div />', {
  id: "animais-na-cabeca",
  class: "div-content"
});

$('.sidenav').append(contentPai);
$(contentPai).append(div);

$(div).append($("<h3> Animais mais sorteados do dia </h3>").addClass("text-title"));

$(contentPai).append(div2);
$(div2).append($("<h3> Animais 1° prêmio (do dia)</h3>").addClass("text-title"));

$("table td").filter("td:nth-child(4)").each(function(idx, el) {
  let elemento = $("[data-numero = " + $(this).text() + "]");
  if (elemento.length) {
    var numero = elemento.children('span');
    numero.text(parseInt(numero.text()) + 1);
    parseInt(numero.text()) >= 7 ? (elemento.css('background-color', 'green'),
                                    elemento.css('color', 'white'),
                                    elemento.css('border', 'solid white 1px')) : ""
  } else {
    $(div).append('<div class="nome" data-numero ="' + $(this).text() +'">' + $(this).text() + ': <span>1</span></div>');
  }
});

$('table td').filter("tr:nth-child(1) td:nth-child(4)").each(function (i, e) {
  let elemento = $('[nome-animal = ' +$(this).text() + ']');
  if (elemento.length) {
    var numero = elemento.children('span');
    numero.text(parseInt(numero.text()) + 1);
    parseInt(numero.text()) >= 2 ? (elemento.css('background-color', 'green'),
                                    elemento.css('color', 'white'),
                                    elemento.css('border', 'solid white 1px')) : ""
  } else {
    $(div2).append('<div class="nome" nome-animal="' + $(this).text() +'">' + $(this).text() + ': <span>1</span></div>');
  }
});

$("div [data-numero").sort(function(a, b) {
    return parseInt($(b).children('span').text()) - parseInt($(a).children('span').text());
}).each((i, e) => {
    $(div).append(e);
});

$('div [nome-animal]').sort(function(a, b) {
  return parseInt($(b).children('span').text()) - parseInt($(a).children('span').text());
}).each(function(i, e) {
  $('#animais-na-cabeca').append(e);
});


//Separando animais mais sorteados dos meses (apenas os 2 meses anteriores e o mes atual). Ex: mês novembro => jogos de setembro, outubro e novembro
async function getFetch() {
  try {

    var meses = ["Janeiro", "Fevereiro","Março", "Abril", "Maio", "Junho", "Julho",  "Agosto",  "Setembro",  "Outubro",   "Novembro",  "Dezembro"];
    let date = new Date();
    var urlSite = "";

    //div content
    var divContent = $('<div />', {
      id: "animais-mais-sorteados-meses",
      class: "div-content"
    });

    $(divContent).append($("<h3> Animais mais sorteados dos meses: <span></span> </h3>").addClass("text-title"));

    $(divContent).children('h3').children('span').text(meses[date.getMonth()-1] + " e " + meses[date.getMonth()-2] );


    var divContent2 = $('<div />', {
      id: "animais-na-cabeca-anual",
      class: "div-content"
    });

    $(divContent2).append($("<h3> Animais 1° prêmio (do ano) </h3>").addClass("text-title"));

    $(contentPai).append(divContent);
    $(contentPai).append(divContent2);

    function daysInMonth(mes, ano) {
      var dataLocal = new Date(mes, ano, 0);
      return dataLocal.getDate();
    }

    let mes = date.getMonth()-2;
    for(mes; mes <= date.getMonth(); mes++) {
      var dia = 1;
      let limite = (mes != date.getMonth() ? daysInMonth(mes, date.getFullYear()) : date.getDate());

      for(dia; dia <= limite; dia++) {
        urlSite = "https://www.resultadofacil.com.br/resultado-do-jogo-do-bicho/BA/do-dia/2022-"+((mes+1).toString().length < 2? "0"+(mes).toString() : mes+1)+"-"+
                  (dia.toString().length < 2? "0"+dia.toString() : dia);

        //pegando html e convertendo em text
        let response = await fetch(urlSite);
        let dataText = await response.text();

        //convertendo text para html
        let dParser = new DOMParser();
        let htmlData = dParser.parseFromString(dataText, "text/html");

        //separando e pegando o valor apenas da coluna 4 das tabelas
        $(htmlData.querySelectorAll('table td')).filter("tr:not(:contains('-')) td:nth-child(4)").each(function(i, e) {

          let element = $('[data-animal=' +$(this).text()+']');

          if (element.length) {
            let numero = element.children('span');
            numero.text(parseInt(numero.text()) + 1);
            parseInt(numero.text()) >= 175 ? (element.css('background-color', 'green'),
                                            element.css('color', 'white'),
                                            element.css('border', 'solid white 1px')) : ""

          } else {
            divContent.append('<div class="nome" data-animal= "'+$(this).text()+'">' + $(this).text() +': <span>1</span></div>');
          }

        });

        $(htmlData.querySelectorAll('table td')).filter("tr:nth-child(1) td:nth-child(4)").each(function(i, e) {

          let element = $('[data-animal2=' +$(this).text()+']');

          if (element.length) {
            let numero = element.children('span');
            numero.text(parseInt(numero.text()) + 1);
            parseInt(numero.text()) >= 30 ? (element.css('background-color', 'green'),
                                            element.css('color', 'white'),
                                            element.css('border', 'solid white 1px')) : ""

          } else {
            divContent2.append('<div class="nome" data-animal2= "'+$(this).text()+'">' + $(this).text() +': <span>1</span></div>');
          }

        });

      }

    }

    $("div [data-animal]").sort(function(a, b) {
      return parseInt($(b).children('span').text()) - parseInt($(a).children('span').text());
    }).each(function(i, e) {
      $("#animais-mais-sorteados-meses").append(e);
    })


    $("div [data-animal2]").sort(function(a, b) {
      return parseInt($(b).children('span').text()) - parseInt($(a).children('span').text());
    }).each(function(i, e) {
      $("#animais-na-cabeca-anual").append(e);
    })

    $('.nome').css('border-bottom', 'inset 1px');

  } catch (e) {
    console.log("ERROR :", e);
  }
} getFetch();


$('.div-content').css('border-radius', '5px')
                 .css('border-style', 'outset')
                 .css('padding', '5px')
                 .css('cursor', 'context-menu')
                 .css('margin-top', '10px')
                 .css('box-shadow', '5px 5px 10px gray')

$('.text-title').css('border', 'solid gray 1.5px')
                .css('border-radius', '10px')
                .css('background-color', '#F0F0FF')
                .css('font-size', '28px');

$('.nome').css('border-bottom', 'inset 1px');
