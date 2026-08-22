'use strict';

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const RUTA_SCRIPT = path.join(__dirname, '..', '..', 'js', 'script.js');

function crearElementoFalso(estadoInicial) {
  return { textContent: '', innerHTML: '', ...estadoInicial };
}

function crearDocumentoFalso(elementos) {
  return {
    getElementById(id) {
      if (!elementos[id]) elementos[id] = crearElementoFalso();
      return elementos[id];
    },
  };
}

// Carga js/script.js en un contexto vm aislado, con un `document` simulado,
// para poder ejecutar las funciones globales del contador sin un navegador.
// Los elementos se pre-crean con el mismo estado inicial que index.html
// (contador en '0', historial vacío) porque el script no los toca hasta
// que se registra la primera operación.
function cargarContador() {
  const elementos = {
    contador: crearElementoFalso({ textContent: '0' }),
    historial: crearElementoFalso({ innerHTML: '' }),
  };
  const contexto = { document: crearDocumentoFalso(elementos) };
  vm.createContext(contexto);

  const codigo = fs.readFileSync(RUTA_SCRIPT, 'utf8');
  vm.runInContext(codigo, contexto, { filename: RUTA_SCRIPT });

  return { contexto, elementos };
}

function leerContador(elementos) {
  return Number(elementos.contador.textContent);
}

function leerHistorial(elementos) {
  const html = elementos.historial.innerHTML;
  if (!html) return [];
  return [...html.matchAll(/<li>(.*?)<\/li>/g)].map((m) => m[1]);
}

module.exports = { cargarContador, leerContador, leerHistorial };
