class Perro {
  constructor(position, nombreRaza, contador, foto) {
    this.position = position;
    this.nombreRaza = nombreRaza;
    this.contador = contador;
    this.foto = foto;
  }
}
var position = 0;
var contador = 0;

function random() {
  if (localStorage.length < 20) {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((res) => res.json())
      .then((json) => {
        var url = json.message;
        document.getElementById("random").src = url;

        var arrayBarras = url.split("/");
        var nombreRaza = arrayBarras[4];

        var perroExist = false;
        let i = 0;
        while (i < localStorage.length && !perroExist) {
          var infoDog = JSON.parse(localStorage.getItem(i));
        //   console.log(localStorage.getItem(i))
          perroExist = perroExist || nombreRaza == infoDog.nombreRaza;
          i++;
        }
        
        if (perroExist) {
          console.log("REPEEE");
          var infoPerro = JSON.parse(localStorage.getItem(i));
          console.log(infoPerro)
          infoPerro.contador = infoPerro.contador + 1;
        //   console.log(`${infoPerro.position}. ${infoPerro.nombreRaza} está repetido ${infoPerro.contador}`)

          localStorage.setItem(infoPerro.position, JSON.stringify(infoPerro));
        } else {
          var dog = new Perro(position, nombreRaza, 1, url);
          localStorage.setItem(position, JSON.stringify(dog));
          position++;
        }
        pintar();
      });
  } else {
    console.log("TENEMOS A TODOS!!!!!");

    var soloRaza = [];
    var soloContadores = [];
    var info = localStorage;

    for (let i = 0; i < info.length; i++) {
      var infoPerro = JSON.parse(localStorage.getItem(i));
      soloRaza.push(infoPerro.nombreRaza);
      soloContadores.push(infoPerro.contador);
    }

    //! Código de la gráfica

    const data = {
      labels: soloRaza,
      datasets: [
        {
          label: "Album de Perros",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: soloContadores,
        },
      ],
    };

    const config = {
      type: "line",
      data: data,
      options: {},
    };

    const myChart = new Chart(document.getElementById("myChart"), config);

    new Chartist.Bar('.ct-chart', {
        labels: soloRaza,
        series: soloContadores
      }, {
        distributeSeries: true
      });
      
  }
}
//! Pinta el album
function pintar() {
  var info = localStorage;
  for (let i = 0; i < info.length; i++) {
    var infoPerro = JSON.parse(localStorage.getItem(i));
    document.querySelectorAll("img")[i + 1].src = infoPerro.foto;
  }
}

//! Resetea y refresca
function reset(){
    location.reload();
    localStorage.clear();
}