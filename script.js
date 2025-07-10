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

  // Aqui você vai adicionar os formulários de cada figura
  if (figura === "triangulo") {
    container.innerHTML = `
      <label>Lado A:</label><input type="number" id="a" />
      <label>Lado B:</label><input type="number" id="b" />
      <label>Lado C:</label><input type="number" id="c" />
      <button onclick="calcularTriangulo()">Calcular</button>
    `;
  }

  // Outras figuras vêm aqui (quadrado, retângulo etc.)
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
    <p><strong>Diagonais:</strong> 0 (triângulo não tem diagonais internas)</p>
  `;
}

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
    <label>Área da base:</label><input type="number" id="areaBase" />
    <label>Altura da pirâmide:</label><input type="number" id="altura" />
    <button onclick="calcularPiramide(${lados})">Calcular</button>
  `;
}

function calcularPiramide(lados) {
  const areaBase = parseFloat(document.getElementById("areaBase").value);
  const altura = parseFloat(document.getElementById("altura").value);
  const volume = (areaBase * altura) / 3;

  const nomePoligono = {
    3: "Triângulo",
    4: "Quadrado",
    5: "Pentágono",
    6: "Hexágono",
    7: "Heptágono",
    8: "Octógono"
  }[lados] || `${lados}-lados`;

  document.getElementById("resultadoPiramide").innerHTML = `
    <p><strong>Base:</strong> ${nomePoligono}</p>
    <p><strong>Área da Base:</strong> ${areaBase.toFixed(2)}</p>
    <p><strong>Altura:</strong> ${altura.toFixed(2)}</p>
    <p><strong>Volume:</strong> ${volume.toFixed(2)}</p>
    <p><strong>Área da Superfície:</strong> (Cálculo detalhado opcional)</p>
  `;
}
