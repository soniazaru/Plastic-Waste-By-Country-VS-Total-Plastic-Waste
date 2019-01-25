$(function () {

    $.getJSON(
        "https://api.myjson.com/bins/r9718",
        function (data) {
            //console.log(data);

            /*
            1) Calcolo il totale sommando i valori dei singoli paesi
            */
            var globalPlastic = 0;
            for (let i = 0; i < data.length; i++) {
                globalPlastic += data[i].Plastic;
            }

            //console.log(globalPlastic);

            /*
            2) Generi la select mettendo come value il valore del singolo paese
            */

            let t = Handlebars.compile('<option value="{{ Entity }}">{{ Entity }}</option>');

            data.forEach(function (el) {
                $("#select").append(t(el));
            })

            /*
            3) Quando l'utente sceglie il paese disegno il grafico 
            */

            $("#select").change(function () {
                let statoSel = document.getElementById('select').value;
                let labels = [];
                let test = [];
                //console.log(statoSel)
                for (let i = 0; i < data.length; i++) {
                    if (statoSel == data[i].Entity) {
                        labels.push(statoSel);
                        test.push(data[i].Plastic);
                        //console.log(data[i].Plastic);
                    }
                }

                var TPWBC = document.getElementById("totalPlasticWasteByCountry");
                var myChart = new Chart(TPWBC, {
                    type: 'doughnut',
                    data: {
                        labels: labels, globalPlastic,
                        datasets: [
                            {
                                label: "Plastic Waste By Country VS Global Plastic",
                                data: [test, globalPlastic - test],
                                backgroundColor: ["#29a3a3", "#6666ff"],
                                hoverBackgroundColor: ["#29a3a3", "#6666ff"],
                                hoverBorderColor: "rgb(255, 255, 255, 0)",
                                borderColor: "rgba(255, 255, 255, 0)",
                            }
                        ],
                        options: {
                            responsive: true,
                            maintainAspectRatio: true,
                        }
                    },
                })
            })
        }
    )
})
