//Inicializacion
let tarjetasDestapadas = 0;
let target1 = null;
let target2 = null;
let firstResult = null;
let secondResult = null;
let movimiento = 0;
let aciertos = 0;
let temporizador = false;

let tiempoRegresivoId = null;

const card = document.querySelectorAll(".card");
const start = document.querySelector(".start");

let mostrarMov = document.getElementById("contador_movimiento");
let mostarAciertos = document.getElementById("contador_aciertos");

let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

document.addEventListener("DOMContentLoaded", () => {
    estadoApp(true);
});

start.addEventListener("click", () => {
  cronometro();
});

function valorAleatorio() {
  numbers = numbers.sort(() => {
    return Math.random() - 0.5;
  });
  //console.log(numbers);
}

function estadoApp(estado) {
  for (let i = 0; i < card.length; i++) {
    card[i].disabled = estado;
  }
}

const fire =(title,icon)=>{ return Swal.fire({
    position: "center",
    icon: icon,
    title: title,
    showConfirmButton: true,
  }).then((result) => {
    if (result.isConfirmed) {
      location.reload();
    }
  });}

function cronometro() {
    estadoApp(false);
  let time = 60;
  start.classList.add("disabled");
  const contador = setInterval(() => {
    time--;
    contador_tiempo.innerHTML = time;
    if (time == 0) {
      clearInterval(contador);
      fire("Se te acabo el tiempo",'error');
      
    }
  }, 1000);
}

function comenzar(id) {
  tarjetasDestapadas++;
  if (tarjetasDestapadas == 1) {
    //Mostrar 1er numero
    target1 = document.getElementById(id);
    firstResult = numbers[id];
    target1.innerHTML = firstResult;
    target1.disabled = true;
    //Disabled button
  } else if (tarjetasDestapadas == 2) {
    //Mostrar 2do numero
    target2 = document.getElementById(id);
    secondResult = numbers[id];
    target2.innerHTML = secondResult;

    target2.disabled = true;

    //incrementar movimiento
    movimiento++;
    mostrarMov.innerHTML = `${movimiento}`; //Movimiento : 0

    if (firstResult == secondResult) {
      //Encerrar contador
      tarjetasDestapadas = 0;
      //Aciertos aumentar
      aciertos++;
      mostarAciertos.innerHTML = `${aciertos}`;

      if (aciertos == 8) {
        fire("Felicidades completaste el juego!!!",'success');
      }
    } else {
      //Muestra valores y los tapa
      setTimeout(() => {
        target1.innerHTML = " ";
        target2.innerHTML = " ";
        target1.disabled = false;
        target2.disabled = false;
        tarjetasDestapadas = 0;
      }, 500);
    }
  }
}

valorAleatorio();
