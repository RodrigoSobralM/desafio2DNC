document.querySelector("#buscar").addEventListener("click", function (event) {
  event.preventDefault();
  let cep = document.querySelector("#cep").value;
  let latitude = document.querySelector("#latitude").value;
  let longitude = document.querySelector("#longitude").value;

  if (cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        document.querySelector("#logradouro").innerText = `${data.logradouro}`;
        document.querySelector("#bairro").innerText = `${data.bairro}`;
        document.querySelector("#uf").innerText = `${data.uf}`;
      })
      .catch((error) => {
        console.error("Erro ao obter os dados do cep: ", error);
      });

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.hourly.temperature_2m[0]);
        document.querySelector(
          "#forecastLocation"
        ).innerText = `Previsão de tempo de acordo com a região: ${data.hourly.temperature_2m[0]}°C`;
      })
      .catch((error) => {
        console.error("Erro ao obter a temperatura da região: ", error);
      });
  } else {
    alert("Por favor, informe o CEP. Se quiser saber a previsão de temperatura da região digite a latitude e a longitude tambem!");
  }
});
