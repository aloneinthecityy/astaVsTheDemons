
        const  LocalStorage = require('node-localstorage'); 


        function save(){
            console.log("oiiiiii buceta caralho inferno");
        }


        function userId(){
            var localStorage = new LocalStorage('./scratch'); 

                //Setting localStorage Item
                localStorage.setItem('userId', usuarioController.req.session.user);
                console.log("id do usuário armazenado no localstorage: ");
                console.log(localStorage.getItem('userId'));

        }