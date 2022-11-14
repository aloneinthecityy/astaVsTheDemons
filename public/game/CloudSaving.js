class CloudSaving extends RenJS.Plugin {

    onInit() {
		// chamado depois que tudo é carregado (a menos que seja carregado com preguiça), antes de mostrar qualquer menu 
        // plugin básico não faz nada
        
	}

    onSave(slot,data) {
        // O handle onSave é chamado logo antes do jogo ser salvo localmente, 
        // recebendo o slot e os dados para salvar. Qualquer modificação que você 
        // fizer no parâmetro de dados também será salva.

        // salva na nuvem como uma string com o slot fornecido
        let serializedData = JSON.stringify(data)
        cloudAPI.set(`MyRenJSGame_slot_${slot}`,serializedData)
    }

    onLoad(slot,data){
        // O identificador onLoad é chamado quando os dados são recuperados, pouco antes de configurar o jogo. 
        // Assim como o onSave, ele receberá o slot e os dados para carregar. Ao modificar o parâmetro de dados, 
        // você pode alterar também o que acabará sendo carregado.

        // data é um objeto carregado do localstorage 
        // se nenhum dado for encontrado localmente o objeto estará vazio 
        // você pode adicionar/substituir qualquer propriedade que desejar no parâmetro de dados 

        // carrega dados da nuvem com o slot fornecido
        let serializedData = cloudAPI.get(`MyRenJSGame_slot_${slot}`)

        if (serializedData) {
            // analisar como JSON
            let loadedData = JSON.parse(serializedData)
            // adiciona dados carregados ao parâmetro de dados enviado
            Object.assign(data, loadedData)
        }
    }
}

RenJSGame.addPlugin('CloudSaving',CloudSaving)