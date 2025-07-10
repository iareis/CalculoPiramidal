function showSection(sectionId) {
  document.getElementById("planas").style.display = sectionId === "planas" ? "block" : "none";
  document.getElementById("piramide").style.display = sectionId === "piramide" ? "block" : "none";
}

function exibirFormulario() {
  const figura = document.getElementById("figura").value;
  const container = document.getElementById("formularioPlanas");
  const resultado = document.getElementById("resultadoPlanas");
  container.innerHTML = '';
  resultado.innerHTML = '';

  if (figura === "triangulo") {
    container.innerHTML = `
      <label>Lado A:</label><input type="number" id="a" />
      <label>Lado B:</label><input type="number" id="b" />
      <label>Lado C:</label><input type="number" id="c" />
      <button onclick="calcularTriangulo()">Calcular</button>
    `;
  }
}

function calcularTriangulo() {
  const a = parseFloat(document.getElementById("a").value);
  const b = parseFloat(document.getElementById("b").value);
  const c = parseFloat(document.getElementById("c").value);

  const s = (a + b + c) / 2;
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
  const perimetro = a + b + c;

  document.getElementById("resultadoPlanas").innerHTML = `
    <p><strong>Área:</strong> ${area.toFixed(2)}</p>
    <p><strong>Perímetro:</strong> ${perimetro.toFixed(2)}</p>
    <p><strong>Diagonais:</strong> 0 (triângulo não tem diagonais)</p>
  `;
}

// PIRÂMIDE ----------------------------

function gerarBasePoligono() {
  const lados = parseInt(document.getElementById("ladosBase").value);
  const container = document.getElementById("formularioPiramide");
  const resultado = document.getElementById("resultadoPiramide");

  container.innerHTML = '';
  resultado.innerHTML = '';

  if (lados < 3) {
    container.innerHTML = '<p>Informe pelo menos 3 lados para formar um polígono.</p>';
    return;
  }

  container.innerHTML = `
    <label>Os lados da base são todos iguais?</label>
    <select id="ladosIguais" onchange="configurarLados(${lados})">
      <option value="">--Selecione--</option>
      <option value="sim">Sim</option>
      <option value="nao">Não</option>
    </select>
    <div id="inputsLados"></div>
  `;
}

function configurarLados(lados) {
  const iguais = document.getElementById("ladosIguais").value;
  const container = document.getElementById("inputsLados");
  container.innerHTML = '';

  if (iguais === "sim") {
    container.innerHTML = `
      <label>Comprimento do lado:</label>
      <input type="number" id="ladoUnico" />
      <label>Altura da pirâmide:</label>
      <input type="number" id="alturaPiramide" />
      <button onclick="calcularPiramideReg(${lados})">Calcular</button>
    `;
  } else if (iguais === "nao") {
    let inputs = '';
    for (let i = 1; i <= lados; i++) {
      inputs += `<label>Lado ${i}:</label><input type="number" id="lado${i}" />`;
    }
    container.innerHTML = `
      ${inputs}
      <label>Altura da pirâmide:</label>
      <input type="number" id="alturaPiramide" />
      <button onclick="calcularPiramideIrreg(${lados})">Calcular</button>
    `;
  }
}

function calcularPiramideReg(lados) {
  const lado = parseFloat(document.getElementById("ladoUnico").value);
  const altura = parseFloat(document.getElementById("alturaPiramide").value);

  const apotemaBase = lado / (2 * Math.tan(Math.PI / lados));
  const areaBase = (lados * lado * apotemaBase) / 2;

  const volume = (areaBase * altura) / 3;

  const alturaFace = Math.sqrt(altura ** 2 + apotemaBase ** 2);
  const areaLateral = (lados * lado * alturaFace) / 2;

  const areaTotal = areaBase + areaLateral;

  const nomePoligono = obterNomePoligono(lados);

  exibirResultadoPiramide(nomePoligono, areaBase, volume, areaTotal, altura);
}

function calcularPiramideIrreg(lados) {
  let perimetro = 0;
  const altura = parseFloat(document.getElementById("alturaPiramide").value);

  for (let i = 1; i <= lados; i++) {
    const lado = parseFloat(document.getElementById(`lado${i}`).value);
    perimetro += lado;
  }

  const raioAprox = perimetro / (2 * Math.PI);
  const areaBase = (perimetro * raioAprox) / 2;

  const volume = (areaBase * altura) / 3;

  const alturaFace = Math.sqrt(altura ** 2 + raioAprox ** 2);
  const areaLateral = (perimetro * alturaFace) / 2;

  const areaTotal = areaBase + areaLateral;

  const nomePoligono = obterNomePoligono(lados);

  exibirResultadoPiramide(nomePoligono + " irregular", areaBase, volume, areaTotal, altura);
}

function exibirResultadoPiramide(base, areaBase, volume, areaTotal, altura) {
  document.getElementById("resultadoPiramide").innerHTML = `
    <p><strong>Base:</strong> ${base}</p>
    <p><strong>Área da base:</strong> ${areaBase.toFixed(2)}</p>
    <p><strong>Altura:</strong> ${altura.toFixed(2)}</p>
    <p><strong>Volume:</strong> ${volume.toFixed(2)}</p>
    <p><strong>Área da superfície total:</strong> ${areaTotal.toFixed(2)}</p>
  `;
}

function obterNomePoligono(lados) {
  const nomes = {
    3: "Triângulo",
    4: "Quadrado",
    5: "Pentágono",
    6: "Hexágono",
    7: "Heptágono",
    8: "Octógono",
    9: "Eneágono",
    10: "Decágono"
  };
  return nomes[lados] || `${lados}-lados`;
}
