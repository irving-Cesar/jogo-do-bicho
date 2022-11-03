// ==UserScript==
// @name        resultadofacil
// @namespace   Violentmonkey Scripts
// @match       *://www.resultadofacil.com.br/*
// @grant       none
// @version     1.0
// @author      - Irving Cesar
// @description 02/11/2022 15:12:32
// ==/UserScript==

let div = $('<div />', {
  id: "animais-mais-sorteados",
  class: "div-content"
})

$('.sidenav').append(div);
$(div).append($("<h3> Animais mais sorteados </h3>").addClass("text-title"));

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
})

$("div [data-numero").sort(function(a, b) {
    return parseInt($(b).children('span').text()) - parseInt($(a).children('span').text())
}).each((i, e) => {
    $(div).append(e)
})


let div2 = $('<div />', {
  id: "animais-na-cabeca",
  class: "div-content"
})

$('.sidenav').append(div2);
$("#animais-na-cabeca").append($("<h3> Animais na cabeça </h3>").addClass("text-title"));

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
})

$('div [nome-animal]').sort(function(a, b) {
  return parseInt($(b).children('span').text()) - parseInt($(a).children('span').text());
}).each(function(i, e) {
  $('#animais-na-cabeca').append(e);
})

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

$('.nome').css('border-bottom', 'inset 1px')



