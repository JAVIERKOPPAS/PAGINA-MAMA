// Registrar el service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker registrado"))
    .catch(e => console.log("Error:", e));
}

const CAMPOS = ["costo_cerakilo", "costo_esencia", "costo_recipiente", "costo_conservador", "costos_extras", "gr_cera"];
const CARGO_FIJO = 5; // costo de la mecha

const pesos = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" });

function valor(id) {
  const n = parseFloat(document.getElementById(id).value);
  return isNaN(n) ? 0 : n;
}

function poner(id, texto) {
  document.getElementById(id).textContent = texto;
}

// ------------ CALCULADORA ------------
function calcular(evento) {
  if (evento) evento.preventDefault();

  const aviso = document.getElementById("aviso");
  aviso.textContent = "";

  const costo_cerakilo = valor("costo_cerakilo");
  const costo_esencia = valor("costo_esencia");
  const costo_recipiente = valor("costo_recipiente");
  const costo_conservador = valor("costo_conservador");
  const costos_extras = valor("costos_extras");
  const gr_cera = valor("gr_cera");

  if (gr_cera <= 0) {
    aviso.textContent = "Escribe los gramos de cera utilizados.";
    return;
  }
  if (gr_cera > 1000) {
    aviso.textContent = "Los gramos de cera no pueden ser más de 1000 (un kilo).";
    return;
  }

  const porcentaje_utilizado = Math.round((gr_cera / 1000) * 100);
  const porcentaje_esencia = Math.round(gr_cera * 10 / 100);
  const gr_utilizado_conservador = gr_cera * 0.01;

  const gr_cera_restante = Math.round(1000 - gr_cera);

  const gastado_cera = Math.round(costo_cerakilo * porcentaje_utilizado) / 100;
  const gastado_esencia = Math.round(costo_esencia * porcentaje_esencia) / 100;
  const gastado_conservador = costo_conservador * gr_utilizado_conservador / 100;

  const total = gastado_cera + gastado_esencia + costo_recipiente + costos_extras + gastado_conservador + CARGO_FIJO;

  poner("r_total", pesos.format(total));
  poner("r_porcentaje", `${porcentaje_utilizado}%`);
  poner("r_restante", `${gr_cera_restante} g`);
  poner("r_esencia_ml", `${porcentaje_esencia} ml`);
  poner("r_conservador_g", `${gr_utilizado_conservador.toFixed(2)} g`);
  poner("r_gasto_cera", pesos.format(gastado_cera));
  poner("r_gasto_esencia", pesos.format(gastado_esencia));
  poner("r_gasto_conservador", pesos.format(gastado_conservador));
  poner("r_recipiente", pesos.format(costo_recipiente));
  poner("r_extras", pesos.format(costos_extras));
  poner("r_fijo", pesos.format(CARGO_FIJO));

  const resultado = document.getElementById("resultado");
  resultado.hidden = false;
  const barra = document.getElementById("r_barra");
  barra.style.width = "0";
  requestAnimationFrame(() => { barra.style.width = Math.min(porcentaje_utilizado, 100) + "%"; });
  resultado.scrollIntoView({ behavior: "smooth", block: "start" });
}

function limpiar() {
  CAMPOS.forEach(id => { document.getElementById(id).value = ""; });
  document.getElementById("aviso").textContent = "";
  document.getElementById("resultado").hidden = true;
  document.getElementById("costo_cerakilo").focus();
}
