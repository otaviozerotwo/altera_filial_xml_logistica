const formSelect = document.getElementById('formSelect');
const saveButton = document.getElementById('saveButton');
const closeButton = document.getElementById('closeButton');

window.api.buscarOpcoes().then(resposta => {
  if (resposta.sucesso === false) {
    alert(resposta.mensagem);
    return;
  }
  
  resposta.forEach(o => {
    const opt = document.createElement('option');

    opt.value = o.cd_filial;
    opt.textContent = `${o.cd_filial} - ${o.nm_fant}`;

    opt.dataset.cnpj = o.cgc;
    opt.dataset.rzFilial = o.nm_fant;

    opt.classList.add('option');
    
    formSelect.appendChild(opt);
  });
});

saveButton.onclick = async () => {
  const selectedOption = formSelect.selectedOptions[0];
  const resultado = await window.api.processarOpcao({
    cdFilial: selectedOption.value,
    cnpj: selectedOption.dataset.cnpj,
    rzFilial: selectedOption.dataset.rzFilial,
  });

  if (!resultado.sucesso) {
    alert('Erro: ' + resultado.message);
  }
};

closeButton.onclick = () => {
  window.api.fecharJanelaPrincipal();
};