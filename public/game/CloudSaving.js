
class CloudSaving extends RenJS.Plugin {
  onInit(){  
    // localStorage.removeItem('RenJSDATAQuickstart0');
    // localStorage.removeItem('RenJSThumbnailQuickstart0');
    // localStorage.removeItem('RenJSDATAQuickstart1');
    // localStorage.removeItem('RenJSThumbnailQuickstart1');
    // localStorage.removeItem('RenJSDATAQuickstart2');
    // localStorage.removeItem('RenJSThumbnailQuickstart2');
    // localStorage.removeItem('RenJSChoiceLogQuickstart');
    // getJSON((err, dados) => {
    //     if (err != null) {
    //         console.error(err);
    //     } else {
    //       var dado = JSON.parse(dados)
    //       var slot
    //       var thumb
    //         if(dado[0]['slot_1']){
    //           slot = JSON.parse(dado[0]['slot_1'])
    //           thumb = "/game/assets/backgrounds/" +slot['background'] + ".png"
    //           localStorage.setItem('RenJSDATAQuickstart0', dado[0]['slot_1']);
    //           localStorage.setItem('RenJSThumbnailQuickstart0', thumb);
    //         }
    //         if(dado[0]['slot_2']){
    //           slot = JSON.parse(dado[0]['slot_2'])
    //           thumb = "/game/assets/backgrounds/" +slot['background'] + ".png"
    //           localStorage.setItem('RenJSDATAQuickstart1', dado[0]['slot_2']);
    //           localStorage.setItem('RenJSThumbnailQuickstart1', thumb);
    //         }
              
    //         if(dado[0]['slot_3']){
    //           slot = JSON.parse(dado[0]['slot_3'])
    //           thumb = "/game/assets/backgrounds/" +slot['background'] + ".png"
    //           localStorage.setItem('RenJSDATAQuickstart2', dado[0]['slot_3']);
    //           localStorage.setItem('RenJSThumbnailQuickstart2', thumb);
    //         }
    //   }
    //   });
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
    

    // let serializedData = cloudLoad(`MyRenJSGame_slot_${slot}`, userId)

    // if (serializedData) {
    //   let loadedData = JSON.parse(serializedData)
    //   Object.assign(data, loadedData)
    // }

  }
}

RenJSGame.addPlugin('CloudSaving', CloudSaving);
