let cuenta = 0;

function aumentar() {
  cuenta++;
  document.getElementById('contador').textContent = cuenta;
}

function disminuir() {
  if (cuenta > 0) cuenta--;
  document.getElementById('contador').textContent = cuenta;
}

function reiniciar() {
  cuenta = 0;
  document.getElementById('contador').textContent = cuenta;
}

function duplicar() {
  cuenta *= 2;
  document.getElementById('contador').textContent = cuenta;
}

function triplicar() {
  cuenta *= 3;
  document.getElementById('contador').textContent = cuenta;
}
