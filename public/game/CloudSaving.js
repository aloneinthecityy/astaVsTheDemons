
class CloudSaving extends RenJS.Plugin {
  async onInit() {
    const userId = localStorage.getItem('userId');
    console.log(userId);
  }

  onSave(slot, data) { //  --> vai receber o slot e os dados a serem salvos

    // O handle onSave é chamado logo antes do jogo ser salvo localmente,
    // recebendo o slot e os dados para salvar. Qualquer modificação que você
    // fizer no parâmetro de dados também será salva.

    // salva na nuvem como uma string com o slot fornecido
    const userId = localStorage.getItem('userId');


    let serializedData = JSON.stringify(data);
    console.log(serializedData);
    cloudSave(`MyRenJSGame_slot_${slot}`,serializedData, userId);
  }

  onLoad(slot, data) {
    // O identificador onLoad é chamado quando os dados são recuperados, pouco antes de configurar o jogo.
    // Assim como o onSave, ele receberá o slot e os dados para carregar. Ao modificar o parâmetro de dados,
    // você pode alterar também o que acabará sendo carregado.

    // data é um objeto carregado do localstorage
    // se nenhum dado for encontrado localmente o objeto estará vazio
    // você pode adicionar/substituir qualquer propriedade que desejar no parâmetro de dados

    // carrega dados da nuvem com o slot fornecido
    const userId = document.getElementById('userId').value;
    let serializedData = JSON.stringify(data);
    console.log(serializedData);

    cloudLoad(`MyRenJSGame_slot_${slot}`, userId);

    const dataString = loadSave();
    console.log(dataString);

    Object.assign(data, dataString);
  }
}

RenJSGame.addPlugin('CloudSaving', CloudSaving);
