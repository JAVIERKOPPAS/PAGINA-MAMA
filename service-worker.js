self.addEventListener("install", (event) => {
  console.log("Service Worker instalado");
});

self.addEventListener("fetch", (event) => {
  // Deja pasar todas las solicitudes sin cache especial
});