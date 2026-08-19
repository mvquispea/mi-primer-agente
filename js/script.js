let cuenta = 0;
const historial = [];

function actualizarContador() {
  document.getElementById('contador').textContent = cuenta;
}

function renderHistorial() {
  document.getElementById('historial').innerHTML =
    historial.map(e => `<li>${e}</li>`).join('');
}

function registrar(nombre, anterior, nuevo) {
  historial.push(`${nombre}: ${anterior} → ${nuevo}`);
  if (historial.length > 5) historial.shift();
  renderHistorial();
}

function aplicarOperacion(nombre, fn) {
  const anterior = cuenta;
  cuenta = fn(cuenta);
  actualizarContador();
  registrar(nombre, anterior, cuenta);
}

function aumentar()  { aplicarOperacion('Aumentar',  c => c + 1); }
function duplicar()  { aplicarOperacion('Duplicar',  c => c * 2); }
function triplicar() { aplicarOperacion('Triplicar', c => c * 3); }
function mitad()     { aplicarOperacion('Mitad',     c => Math.floor(c / 2)); }

function disminuir() {
  if (cuenta > 0) {
    const anterior = cuenta;
    cuenta--;
    actualizarContador();
    registrar('Disminuir', anterior, cuenta);
  }
}

function reiniciar() {
  const anterior = cuenta;
  cuenta = 0;
  actualizarContador();
  registrar('Reiniciar', anterior, cuenta);
}
