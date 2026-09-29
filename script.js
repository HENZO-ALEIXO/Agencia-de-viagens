const containerCards = document.getElementById('carrossel-cards');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const bntTema = document.getElementById('btn-tema');
const btnCalcular = document.getElementById('btn-calcular');
const selectDestino = document.getElementById('destino');
const inputCheckin = document.getElementById('checkin');
const inputCheckout = document.getElementById('checkout');
const spanDias = document.getElementById('qtd-dias');
const spanTotal = document.getElementById('valor-total');
const formatoMoeda = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
});

// Limpa a estimativa quando os dados mudam para não mostrar um total antigo.
function limparResultado() {
    spanDias.textContent = '0';
    spanTotal.textContent = formatoMoeda.format(0);
}

[selectDestino, inputCheckin, inputCheckout].forEach(function(campo) {
    campo.addEventListener('input', limparResultado);
    campo.addEventListener('change', limparResultado);
});
 
// O valor em pixels que o carrossel vai andar a cada clique
// 320 é ideal porque é a largura do card (300px) + o gap (20px)
const tamanhoRolagem = 320;
 
 
btnNext.addEventListener('click', function() {
    // Rola o container para a DIREITA
    containerCards.scrollBy({
        left: tamanhoRolagem,
        behavior: 'smooth'
    });
});
 
btnPrev.addEventListener('click', function() {
    // Rola o container para a ESQUERDA (por isso o valor é negativo)
    containerCards.scrollBy({
        left: -tamanhoRolagem,
        behavior: 'smooth'
    });
});
 
bntTema.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme')
   
    if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('tema', 'escuro');
        bntTema.innerHTML = '☀️Claro';
      } else {
        localStorage.setItem('tema', 'claro');
        bntTema.innerHTML = '🌙Escuro';
      }
    });
 
    btnCalcular.addEventListener('click', function() {
     
           
            if (!selectDestino.value) {
                alert('Por favor, selecione um destino!');
                return;
            }
            if (!inputCheckin.value || !inputCheckout.value) {
                alert('Por favor, preencha as duas datas!');
                return;
            }
     
            // 2. Converte as strings de data em objetos Date do JavaScript
            // valueAsNumber usa UTC, evitando diferenças causadas pelo horário de verão.
            const dataEntrada = inputCheckin.valueAsNumber;
            const dataSaida = inputCheckout.valueAsNumber;
     
            // 3. Validação: a data de saída precisa ser DEPOIS da data de entrada
            if (!Number.isFinite(dataEntrada) || !Number.isFinite(dataSaida) || dataSaida <= dataEntrada) {
                alert('A data de saída precisa ser depois da data de entrada!');
                return;
            }
     
            // 4. Calcula a diferença em milissegundos e converte para dias
            const diferencaMs = dataSaida - dataEntrada;
            const diasTotais = diferencaMs / (1000 * 60 * 60 * 24);
     
            // 5. Pega o valor da diária do destino selecionado
            const valorDiaria = Number(selectDestino.value);
     
            // 6. Calcula o valor total (dias x diária)
            const valorTotal = diasTotais * valorDiaria;
     
            // 7. Exibe os resultados na tela
            spanDias.textContent = diasTotais;
            spanTotal.textContent = formatoMoeda.format(valorTotal);
        });
