document.addEventListener("DOMContentLoaded", () => {
  const sala = document.getElementById("sala");
  const asientoInput = document.getElementById("asientoSeleccionado");
  const form = document.getElementById("reservaForm");
  const resumen = document.getElementById("resumen");
  const detalle = document.getElementById("detalle");

  // Asientos ocupados de ejemplo
  let ocupados = ["A1", "B3", "C5"];

  // Generar asientos (8 columnas x 5 filas)
  const filas = ["A", "B", "C", "D", "E"];
  for (let fila of filas) {
    for (let i = 1; i <= 8; i++) {
      const id = fila + i;
      const div = document.createElement("div");
      div.textContent = i;
      div.classList.add("asiento");
      div.setAttribute("data-id", id);

      if (ocupados.includes(id)) {
        div.classList.add("ocupado");
      }

      sala.appendChild(div);
    }
  }

  // Selección de asiento (solo uno a la vez por reserva)
  sala.addEventListener("click", e => {
    if (e.target.classList.contains("asiento") && !e.target.classList.contains("ocupado")) {
      // Quitar selección previa
      document.querySelectorAll(".asiento.seleccionado").forEach(a => a.classList.remove("seleccionado"));

      // Marcar nuevo
      e.target.classList.add("seleccionado");
      asientoInput.value = e.target.dataset.id;
    }
  });

  // Validar antes de enviar
  form.addEventListener("submit", e => {
    e.preventDefault();

    if (asientoInput.value === "") {
      alert("Debes seleccionar un asiento.");
      return;
    }

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const pelicula = document.getElementById("pelicula").value;
    const asiento = asientoInput.value;

    // Actualizar asientos ocupados
    ocupados.push(asiento);
    const asientoDiv = document.querySelector(`[data-id="${asiento}"]`);
    asientoDiv.classList.remove("seleccionado");
    asientoDiv.classList.add("ocupado");

    // Mostrar historial en lugar de solo un resumen
    const p = document.createElement("p");
    p.textContent = `Nombre: ${nombre}, Email: ${email}, Película: ${pelicula}, Asiento: ${asiento}`;
    detalle.appendChild(p);
    resumen.classList.remove("oculto");

    // Limpiar formulario
    form.reset();
    asientoInput.value = "";
  });
});
