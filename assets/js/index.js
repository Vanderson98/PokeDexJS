let btnRandom = document.querySelector('.btnRandom'); // Botão de gerar os pokemons
let btnSearch = document.querySelector('.btnSearch'); // Botão de pesquisar os pokemons

// Gerar pokemon
let gerarPokemon = (nome)=>{
    pageEmpty();
    const apiPoke = new XMLHttpRequest;
    const namePoke =  `https://pokeapi.co/api/v2/pokemon/${nome}`
    let urlApi = namePoke
    apiPoke.open('get', urlApi);
    apiPoke.send();

    apiPoke.onreadystatechange = ()=>{
        if(apiPoke.readyState == 4 && apiPoke.status == 200){
            let apiTextPoke = apiPoke.responseText;
            let apiJsonPoke = JSON.parse(apiTextPoke);
            
            // let urlPokeGif = `https://play.pokemonshowdown.com/sprites/gen5ani/${nome}.gif` // Gif ** Desativado 
            // let imagePoke = urlPokeGif;
            
            let imagePoke = apiJsonPoke.sprites.other.home.front_default // Imagem
            let nomePoke = apiJsonPoke.name; // Nome
            let kgText = apiJsonPoke.weight; // Peso 
            let tamText = apiJsonPoke.height; // Tamanho
            let hpNumber, atkNumber, defNumber, spdNumber, spaNumber, speedNumber;

            for(let i in apiJsonPoke.stats){
                if(i == 0){
                    hpNumber = apiJsonPoke.stats[i].base_stat; // Numero vida
                }else if(i == 1){
                    atkNumber = apiJsonPoke.stats[i].base_stat; // Numero ataque
                }else if(i == 2){
                    defNumber = apiJsonPoke.stats[i].base_stat; // Numero defesa
                }else if(i == 3){
                    spdNumber = apiJsonPoke.stats[i].base_stat; // Numero defesa especial
                }else if(i == 4){
                    spaNumber = apiJsonPoke.stats[i].base_stat; // Numero ataque espeial
                }else if(i == 5){
                    speedNumber = apiJsonPoke.stats[i].base_stat; // Numero velocidade
                }
            }

            let habilities = apiJsonPoke.abilities; // Habilidades
            createBoxPoke(nomePoke, imagePoke, kgText, tamText, hpNumber, atkNumber, defNumber, spdNumber, spaNumber, speedNumber, habilities)       
        }
    }
}


// Criar caixa para mostrar pokemons
let createBoxPoke = (
    nomePoke, imagePoke, kgTextAPI, tamTextAPI, hpNumber, atkNumber, defNumber,  spdNumber, spaNumber, speedNumber, habilities
)=>{
    let sectionBox = document.createElement('section'); // Criar caixa principal
    sectionBox.className = 'pokemonBox';

    let imageBoxPoke = document.createElement('img'); // Criar imagem do pokemon
    imageBoxPoke.src= imagePoke
    imageBoxPoke.className = "img-fluid";
    imageBoxPoke.id = "pokemonImage";

    let namePoke = document.createElement('h3'); // Criar nome do pokemon
    namePoke.className = "pokemonName text-capitalize";
    namePoke.innerHTML = nomePoke;

    let divDetais = document.createElement('div'); // Criar descrição do pokemon
    divDetais.className = 'descriptionPokemon';
    for(let i = 0; i<2; i++){ // Criar duas div
        let divDetailsBox = document.createElement('div');
        divDetailsBox.className = 'detailsPokemon'; 
        if(i == 0){ // Criar tamanho texto
            let spanTamanho = document.createElement('span');
            spanTamanho.className = "tamanhoTextPokemon"; 
            if(parseFloat(tamTextAPI / 10) < 1){
                spanTamanho.innerHTML = `${parseFloat(tamTextAPI * 100)} cm` // Se for menor que 1 metro, transforma em CM
            }else{
                spanTamanho.innerHTML = `${parseFloat(tamTextAPI / 10).toFixed(2)} m`
            }
            
            let tamanhoText = document.createElement('h3');
            tamanhoText.innerHTML = 'Tamanho'

            divDetailsBox.appendChild(spanTamanho)
            divDetailsBox.appendChild(tamanhoText)
        }else if(i == 1){ // Criar peso texto
            let spanKg = document.createElement('span');
            spanKg.className = 'pesoTextPokemon'
            spanKg.innerHTML = `${parseFloat(kgTextAPI / 10).toFixed(1)} kg`

            let kgText = document.createElement('h3');
            kgText.innerHTML = 'Peso'

            divDetailsBox.appendChild(spanKg)
            divDetailsBox.appendChild(kgText)
        }
        divDetais.appendChild(divDetailsBox)
    }

    let divPowers = document.createElement('div'); // Mostrar habilidades
    divPowers.className = 'powersHabilitiesPoke'
    for(let i in habilities){
        let divHabilities = document.createElement('div');
        divHabilities.className = 'habilitiesPoke text-capitalize';
        divHabilities.innerHTML = habilities[i].ability.name
        divHabilities.id = `habilities${i}`
        divPowers.appendChild(divHabilities)
    }


    let barDiv = document.createElement('div'); // Criar barra de divisão
    barDiv.className = 'bar';

    let statsPokemonDiv = document.createElement("div"); // Criar caixa de stats
    statsPokemonDiv.className = "statsPokemon";

    let statsTitle = document.createElement('h3'); // Criar titulo
    statsTitle.className = 'text-capitalize';
    statsTitle.innerHTML = 'estatisticas';

    let statsBox = document.createElement('div'); // Cria div para receber os poderes
    statsBox.className = 'powerPokemon';

    for(let i = 0; i <= 5; i++){
        let divPower = document.createElement('div'); // Criar div para colocar cada poder
        divPower.className='power';
        statsBox.appendChild(divPower)

        let titlePower = document.createElement('h3'); // Titulo
        titlePower.className = 'titlePower text-uppercase';
        divPower.appendChild(titlePower)
        
        let divWidth = document.createElement('div'); // Div para ficar embaixo da outra
        divWidth.className = 'widthToPower';
        divPower.appendChild(divWidth);

        let divPowerWidth = document.createElement('div'); // Div para colocar o percentual
        divPowerWidth.className="powerPorcentage";
        divWidth.appendChild(divPowerWidth)

        let spanPower = document.createElement('span');
        divPowerWidth.appendChild(spanPower)
        let largura = 0;
        let larguraMax = 0;


        switch(i){ // Atribuir os valores
            case 0:
                titlePower.innerHTML = 'Vida'; // Setar hp
                divPowerWidth.className += ' bg-danger'
                largura = hpNumber + '%'
                spanPower.innerHTML = largura
                larguraMax = hpNumber;
                break;

            case 1:
                titlePower.innerHTML = 'Ataque'; // Setar ataque
                largura = atkNumber + "%"
                larguraMax = atkNumber;
                spanPower.innerHTML = largura
                divPowerWidth.className += ' bg-warning'
                break;
            
            case 2:
                titlePower.innerHTML = 'defesa'; // Setar defesa
                largura = defNumber + "%"
                larguraMax = defNumber;
                spanPower.innerHTML = largura
                divPowerWidth.className += ' bg-primary'
                break;
            
            case 3:
                titlePower.innerHTML = 'defesa especial'; // Setar defesa especial
                largura = spdNumber + "%"
                larguraMax = spdNumber;
                spanPower.innerHTML = largura
                divPowerWidth.className += ' bg-secondary'
                break;
            
            case 4:
                titlePower.innerHTML = 'ataque especial'; // Setar ataque especial
                largura = spaNumber + "%"
                larguraMax = spaNumber;
                spanPower.innerHTML = largura
                divPowerWidth.className += ' bg-success'
                break;

            case 5: 
                titlePower.innerHTML = 'velocidade'; // Setar velocidade
                largura =   speedNumber + "%"
                larguraMax = speedNumber;
                spanPower.innerHTML = largura
                divPowerWidth.className += ' bg-dark'
                break;
        }
        if(larguraMax >= 100){ // Se for maior que 100, seta width:auto; que se adapta sozinho
            divPowerWidth.style.width = 'auto';
            divPowerWidth.style.setProperty('width','auto', 'important')
        }else{
            divPowerWidth.style.width = largura; // Senão pega a largura e transforma em width
            divPowerWidth.style.setProperty('width', largura, 'important');
        }
        

    }
    statsPokemonDiv.appendChild(statsTitle);
    statsPokemonDiv.appendChild(statsBox);

    sectionBox.appendChild(imageBoxPoke);
    sectionBox.appendChild(namePoke);
    sectionBox.appendChild(divDetais);
    sectionBox.appendChild(divPowers);
    sectionBox.appendChild(barDiv);
    sectionBox.appendChild(statsPokemonDiv);

    document.querySelector('.boxPokes').appendChild(sectionBox); // Adicionar ao body
}

let gerarPokeRandom = ()=>{ // Gerar pokemon aleatorio
    const pokeApi = new XMLHttpRequest;
    pokeApi.open('get', 'https://pokeapi.co/api/v2/pokemon/?limit=256&offset=0');
    pokeApi.send();

    pokeApi.onreadystatechange = ()=>{
        if(pokeApi.readyState == 4 && pokeApi.status == 200){
            let pokeApiXml = pokeApi.responseText;
            let pokeApiJson = JSON.parse(pokeApiXml);
            let itemPoke = pokeApiJson.results;

            let pokemonsGerados = new Set();
            
            for (let i = 0; i < 6; i++) { // Gerar 6 pokemons aleatorios
                let pokeRandom;
            
                do {
                    pokeRandom = Math.floor(Math.random() * 256); // Gerar numero aleatorio de 1 a 256
                } while (pokemonsGerados.has(pokeRandom));
            
                pokemonsGerados.add(pokeRandom); // Adiciona na variavel de pokemons gerados        
                let nomePokemon = itemPoke[pokeRandom].name; // Pega o nome do pokemon que foi gerado
                gerarPokemon(nomePokemon); // Chama a funçao para gerar o pokemon
            }
        }
    }
}

let searchPoke = ()=>{ // Procurar pokemon
    let inputValue = document.querySelector('.pokeNameSearch');
    pageEmpty();
    let namePokeSearch = inputValue.value;
    namePokeSearch = namePokeSearch.toLowerCase();
    if(namePokeSearch == '' || namePokeSearch == undefined || namePokeSearch == null){ // Mostrar mensagem de erro caso não seja inserido nenhum dado!
        errorMessage();
    }else{
        gerarPokemon(namePokeSearch);
    }
}


let gerarPoke = ()=>{ // Gerar pokemon botão    
    btnRandom.disabled = true; // Coloca o botão como desativado, para não chamar a funçao de pokeRandom varias vezes

    gerarPokeRandom();

    setTimeout(()=>{ // Coloca o botão como ativado depois de 3 segundos
        btnRandom.disabled = false;
    }, 3000);
}

let pageEmpty = ()=>{ // Apagar os conteudos da pagina
    document.querySelector('.boxPokes').innerHTML = ''
}

gerarPokeRandom()

let errorMessage = ()=>{ // Mensagem de erro
    let textError = document.createElement('h3');
    textError.className = 'text-danger text-center mt-2';
    textError.innerHTML = `
    <span class="text-capitalize">digite</span> o nome do 
    <span class="text-capitalize">pokemon</span> corretamente!`;

    let sectionBox = document.querySelector('.boxPokes');
    sectionBox.appendChild(textError)
    btnRandom.disabled = true;
    btnSearch.disabled = true;
    setTimeout(()=>{
        btnRandom.disabled = false;
        btnSearch.disabled = false;
        gerarPokeRandom()
    },4000)

}