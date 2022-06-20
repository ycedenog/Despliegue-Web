let cargarDatos = () => {
    fetch("https://dataserverdaw.herokuapp.com/escritores/xml")
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "application/xml");
            let escritores = xml.getElementsByTagName('escritor');
            for (let escritor of escritores) {
                let id = escritor.getElementsByTagName('id')[0].textContent
                let nombre = escritor.getElementsByTagName('nombre')[0].textContent

                let plantilla = `<option value="${id}">${nombre}</option>`
                document.querySelector('div.input-group > select').innerHTML += plantilla;
            }
        })
        .catch(console.error);
}

let cargarFrases = (index, text) => {
    fetch("https://dataserverdaw.herokuapp.com/escritores/frases")
        .then(response => response.json())
        .then(data => {
            for (let datos of data['frases']) {
                if (datos['id_autor'] === Number(index)) {
                    let plantilla = `<div class="col-lg-3">
                <div class="test-inner ">
                    <div class="test-author-thumb d-flex">
                        <div class="test-author-info">
                            <h4>${text}</h4>                                            
                        </div>
                    </div>
                    <span>${datos['texto']}</span>
                    <i class="fa fa-quote-right"></i>
                </div>
            </div>`;
                    document.getElementById('frases').innerHTML += plantilla;
                }

            }

        })
        .catch(console.error);
}



window.addEventListener('DOMContentLoaded', (event) => {
    cargarDatos();
});


window.addEventListener('change', (event) => {
    let selection = document.querySelector('div.input-group > select');
    let indexOption = selection.options[selection.selectedIndex].value;
    let textOption = selection.options[selection.selectedIndex].text;
    cargarFrases(indexOption, textOption);
    document.getElementById('frases').innerHTML = "";
})