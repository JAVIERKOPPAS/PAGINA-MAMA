// Registrar el service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker registrado"))
    .catch(e => console.log("Error:", e));
}


// ------------ CALCULADORA ------------
function calcular() {

    let costo_cerakilo = parseFloat(document.getElementById("costo_cerakilo").value);
    let costo_esencia = parseFloat(document.getElementById("costo_esencia").value);
    let costo_recipiente = parseFloat(document.getElementById("costo_recipiente").value);
    let costo_conservador = parseFloat(document.getElementById("costo_conservador").value);
    let costos_extras = parseFloat(document.getElementById("costos_extras").value);
    let gr_cera = parseFloat(document.getElementById("gr_cera").value);

    let porcentaje_utilizado = Math.round((gr_cera / 1000) * 100);
    let porcentaje_esencia = Math.round(gr_cera * 10 / 100);
    let gr_utilizado_conservador = gr_cera * 0.01;

    let gr_cera_restante = Math.round(1000 - gr_cera);
    let gr_conservador_restante = Math.round(1000 - gr_utilizado_conservador);

    let gastado_cera = Math.round(costo_cerakilo * porcentaje_utilizado) / 100;
    let gastado_esencia = Math.round(costo_esencia * porcentaje_esencia) / 100;
    let gastado_conservador = costo_conservador * gr_utilizado_conservador / 100;

    let total = gastado_cera + gastado_esencia + costo_recipiente + costos_extras + gastado_conservador + 5;

    document.getElementById("resultado").innerText =
        `Utilizaste el ${porcentaje_utilizado}% del kilo de cera.
Te quedan ${gr_cera_restante} g.

Esencia necesaria: ${porcentaje_esencia} ml
Conservador utilizado: ${gr_utilizado_conservador.toFixed(2)} g

Gasto en cera: ${gastado_cera} pesos
Gasto en esencia: ${gastado_esencia} pesos
Gasto en conservador: ${gastado_conservador.toFixed(2)} pesos

Costo total: ${total} pesos`;
}