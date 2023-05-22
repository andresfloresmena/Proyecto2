function mostrarModal() {
    // Obtener el div de la ventana modal
    var modal = document.getElementById("modal");
    // Mostrar la ventana modal
    modal.classList.remove("hidden");
    modal.classList.add("block");
}

function closeModal() {
    // Obtener el elemento modal
    const modal = document.getElementById("modal");

    // Ocultar el modal
    modal.classList.add("hidden");
}