let cuenta = 0;
const historial = [];

function registrar(nombre, anterior, nuevo) {
  historial.push(`${nombre}: ${anterior} → ${nuevo}`);
  if (historial.length > 5) historial.shift();
  const lista = document.getElementById('historial');
  lista.innerHTML = historial.map(e => `<li>${e}</li>`).join('');
}

function aumentar() {
  const anterior = cuenta;
  cuenta++;
  document.getElementById('contador').textContent = cuenta;
  registrar('Aumentar', anterior, cuenta);
}

function disminuir() {
  if (cuenta > 0) {
    const anterior = cuenta;
    cuenta--;
    document.getElementById('contador').textContent = cuenta;
    registrar('Disminuir', anterior, cuenta);
  }
}

function reiniciar() {
  const anterior = cuenta;
  cuenta = 0;
  document.getElementById('contador').textContent = cuenta;
  registrar('Reiniciar', anterior, cuenta);
}

function duplicar() {
  const anterior = cuenta;
  cuenta *= 2;
  document.getElementById('contador').textContent = cuenta;
  registrar('Duplicar', anterior, cuenta);
}

function triplicar() {
  const anterior = cuenta;
  cuenta *= 3;
  document.getElementById('contador').textContent = cuenta;
  registrar('Triplicar', anterior, cuenta);
}

function mitad() {
  const anterior = cuenta;
  cuenta = Math.floor(cuenta / 2);
  document.getElementById('contador').textContent = cuenta;
  registrar('Mitad', anterior, cuenta);
}
