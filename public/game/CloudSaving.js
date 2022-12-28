
class CloudSaving extends RenJS.Plugin {
    onInit(data,slot){

      // let serializedData = JSON.stringify(data);


      renderizaSlot();

      if(renderizaSlot() == null ){
        localStorage.removeItem('RenJSDATAQuickstart0');
        localStorage.removeItem('RenJSThumbnailQuickstart0');
        localStorage.removeItem('RenJSDATAQuickstart1');
        localStorage.removeItem('RenJSThumbnailQuickstart1');
        localStorage.removeItem('RenJSDATAQuickstart2');
        localStorage.removeItem('RenJSThumbnailQuickstart2');
        localStorage.removeItem('RenJSChoiceLogQuickstart');
      }
      if(renderizaSlot() != []){
        if(slot == "MyRenJSGame_slot_0"){
          localStorage.setItem('RenJSDATAQuickstart0', data);
          console.log("Slot 0 preenchido");

        }
        if(slot == "MyRenJSGame_slot_1"){
          localStorage.setItem('RenJSDATAQuickstart1', data);
          console.log("Slot 1 preenchido");

        }
        if(slot == "MyRenJSGame_slot_2"){
          localStorage.setItem('RenJSDATAQuickstart2', data);
          console.log("Slot 2 preenchido");
        }        
      }

      console.log("CloudSaving plugin initialized");
      //const dataString = loadSave();
      getJSON((err, data) => {

          if (err != null) {
              console.error(err);
          } else {
              console.log(data);
        }
      });
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
    

    // if(serializedData != null){
    //   storage.removeItem(slot);
    //   storage.setItem()
    // }
  }

  onLoad(slot, data, userId) {
    // O identificador onLoad é chamado quando os dados são recuperados, pouco antes de configurar o jogo.
    // Assim como o onSave, ele receberá o slot e os dados para carregar. Ao modificar o parâmetro de dados,
    // você pode alterar também o que acabará sendo carregado.

    // data é um objeto carregado do localstorage
    // se nenhum dado for encontrado localmente o objeto estará vazio
    // você pode adicionar/substituir qualquer propriedade que desejar no parâmetro de dados

    // carrega dados da nuvem com o slot fornecido

    // let serializedData = JSON.stringify(data);
    // console.log(serializedData);

    
    let serializedData = cloudLoad(`MyRenJSGame_slot_${slot}`, userId)

    if (serializedData) {
      let loadedData = JSON.parse(serializedData)
      Object.assign(data, loadedData)
    }
  }
}

RenJSGame.addPlugin('CloudSaving', CloudSaving);
