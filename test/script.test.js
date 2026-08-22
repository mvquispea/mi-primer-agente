'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { cargarContador, leerContador, leerHistorial } = require('./helpers/dom-stub.js');

test('aumentar incrementa el contador en 1', () => {
  const { contexto, elementos } = cargarContador();
  contexto.aumentar();
  assert.equal(leerContador(elementos), 1);
  contexto.aumentar();
  assert.equal(leerContador(elementos), 2);
});

test('aumentar registra la operación en el historial', () => {
  const { contexto, elementos } = cargarContador();
  contexto.aumentar();
  const historial = leerHistorial(elementos);
  assert.equal(historial.length, 1);
  assert.equal(historial[0], 'Aumentar: 0 → 1');
});

test('disminuir decrementa el contador en 1 cuando es mayor a 0', () => {
  const { contexto, elementos } = cargarContador();
  contexto.aumentar();
  contexto.aumentar();
  contexto.disminuir();
  assert.equal(leerContador(elementos), 1);
});

test('disminuir nunca baja de 0', () => {
  const { contexto, elementos } = cargarContador();
  contexto.disminuir();
  assert.equal(leerContador(elementos), 0);
});

test('disminuir en 0 no agrega entrada al historial', () => {
  const { contexto, elementos } = cargarContador();
  contexto.disminuir();
  assert.equal(leerHistorial(elementos).length, 0);
});

test('reiniciar vuelve el contador a 0', () => {
  const { contexto, elementos } = cargarContador();
  contexto.aumentar();
  contexto.aumentar();
  contexto.aumentar();
  contexto.reiniciar();
  assert.equal(leerContador(elementos), 0);
});

test('reiniciar registra la operación', () => {
  const { contexto, elementos } = cargarContador();
  contexto.aumentar();
  contexto.reiniciar();
  const historial = leerHistorial(elementos);
  assert.equal(historial[historial.length - 1], 'Reiniciar: 1 → 0');
});

test('duplicar multiplica el contador por 2', () => {
  const { contexto, elementos } = cargarContador();
  contexto.aumentar();
  contexto.aumentar();
  contexto.duplicar();
  assert.equal(leerContador(elementos), 4);
});

test('duplicar en 0 se mantiene en 0', () => {
  const { contexto, elementos } = cargarContador();
  contexto.duplicar();
  assert.equal(leerContador(elementos), 0);
});

test('triplicar multiplica el contador por 3', () => {
  const { contexto, elementos } = cargarContador();
  contexto.aumentar();
  contexto.aumentar();
  contexto.triplicar();
  assert.equal(leerContador(elementos), 6);
});

test('mitad divide el contador entre 2 redondeando hacia abajo', () => {
  const { contexto, elementos } = cargarContador();
  for (let i = 0; i < 5; i++) contexto.aumentar();
  contexto.mitad();
  assert.equal(leerContador(elementos), 2);
});

test('mitad en 0 se mantiene en 0', () => {
  const { contexto, elementos } = cargarContador();
  contexto.mitad();
  assert.equal(leerContador(elementos), 0);
});

test('el historial se limita a las últimas 5 operaciones', () => {
  const { contexto, elementos } = cargarContador();
  for (let i = 0; i < 7; i++) contexto.aumentar();
  const historial = leerHistorial(elementos);
  assert.equal(historial.length, 5);
});

test('el historial descarta las operaciones más antiguas al superar el límite', () => {
  const { contexto, elementos } = cargarContador();
  for (let i = 0; i < 7; i++) contexto.aumentar();
  const historial = leerHistorial(elementos);
  assert.equal(historial[0], 'Aumentar: 2 → 3');
  assert.equal(historial[4], 'Aumentar: 6 → 7');
});
