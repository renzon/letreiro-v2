const palavrasValidas = ['ARROZ', 'AMORA', 'TESTE']

const palavraDoDia = 'ARROZ'

let linha = 1

let entrada = []

let tamanhoMaximoPalavra = 5;
const ouvinteDeTeclas = (event) => {

    let char = event.key.toUpperCase();
    let alfabeto = [
        'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q',
        'R','S','T','U','V','W','X','Y','Z', 'ENTER', 'BACKSPACE'];

    if (!alfabeto.includes(char)) {
        console.log('tecla inválida', char)
        return null;
    }


    if (char == 'ENTER') {
        validarEntrada()
        return;
    }

    if (char == 'BACKSPACE'){
        if (entrada.length > 0){
            exibeLetra('')
        }
        entrada.pop()
        console.log(entrada)
        return;
    }

    if (entrada.length ===tamanhoMaximoPalavra) {
        validarEntrada()
    }

    entrada.push(char)
    console.log(entrada)

    exibeLetra(char)
}

function exibeLetrasComParametros(letra, linhaAtual, coluna){
    let elId = `l${linhaAtual}c${coluna}`
    const el = document.getElementById(elId)
    el.textContent = letra
}

function exibeLetra(letra) {
    exibeLetrasComParametros(letra, linha, entrada.length)
}

function validarEntradaComParametros(palavraInserida, linhaAtual) {
    // //Remover depois que implementação acabar
    // for (let i=0; i < palavraInserida.length; ++i){
    //     exibeLetrasComParametros(palavraInserida[i], 1, i+1 )
    // }
    // // Aqui acaba a remoção

    let classesDeCores= ['incorrect','incorrect','incorrect','incorrect','incorrect']

    function calcularPosicioesDeLetras(palavra) {
        let posicoesPorLetra = {} //{'A':[], 'R':[], 'O':[], 'Z':[]};
        for (let letra of palavra){
            posicoesPorLetra[letra]=[]
        }

        for(let indice=0; indice< palavra.length; ++ indice){
            let posicoes = posicoesPorLetra[palavra[indice]]
            posicoes.push(indice)
        }
        return posicoesPorLetra
    }

    let posicoesLetrasPalavraDoDia = calcularPosicioesDeLetras(palavraDoDia)
    let posicoesLetrasDigitadas = calcularPosicioesDeLetras(palavraInserida)
    // Resolver caso de letras nas posicoes fullcorretas, contar quantas foram pintadas
    for (let letraDaPalavraDoDia in posicoesLetrasPalavraDoDia){
        let posicoesDaLetraDaPalavraDoDia = posicoesLetrasPalavraDoDia[letraDaPalavraDoDia]
        let posicoesDaLetraDigitada = posicoesLetrasDigitadas[letraDaPalavraDoDia]
        if (posicoesDaLetraDigitada === undefined){
            // Esse é caso em que a letra não foi digitada
            continue
        }
        let maximoDeLetrasCorretas = posicoesDaLetraDaPalavraDoDia.length
        // Logica de marcar letras fullcorretas
        for (let posicaoDeLetraDoDia of posicoesDaLetraDaPalavraDoDia){
            for (let posicaoDeLetraDigitada of posicoesDaLetraDigitada){
                if (posicaoDeLetraDoDia === posicaoDeLetraDigitada){
                    classesDeCores[posicaoDeLetraDigitada] = 'fullcorrect'
                    --maximoDeLetrasCorretas
                }
            }
        }
        // Logica de marcar letras corretas
        for (let posicaoDeLetraDigitada of posicoesDaLetraDigitada){
            if (maximoDeLetrasCorretas<=0){
                // Todas corretas já foram pintadas
                break
            }
            let letraEncontrada = false
            for (let posicaoDeLetraDoDia of posicoesDaLetraDaPalavraDoDia){
                if (posicaoDeLetraDoDia === posicaoDeLetraDigitada){
                    letraEncontrada=true
                }
            }
            if (!letraEncontrada){
                classesDeCores[posicaoDeLetraDigitada] = 'correct'
                --maximoDeLetrasCorretas
            }

        }





    }
    // Pintar corretas baseado na informação anterior e posicoes.
    return classesDeCores
}

function pintarCoresDeLetras(linha, classesDeCores) {
    for (let i=0; i < classesDeCores.length; ++i){
        let elId = `l${linha}c${i + 1}`
        const el = document.getElementById(elId)
        el.classList.add(classesDeCores[i])
    }
}

// //Apagar após implementação
// let cores=validarEntradaComParametros(['R', 'A', 'R', 'O', 'R'], 0)
//
// pintarCoresDeLetras(1, cores)
//
// linha=2
//
// // Apagar até aqui

function validarEntrada() {
    if (entrada.length === tamanhoMaximoPalavra){
        console.log('validar se ' + entrada + ' é igual ' + palavraDoDia)
        let classesDeCores = validarEntradaComParametros(entrada, linha)
        pintarCoresDeLetras(linha, classesDeCores)
        linha +=1
        entrada=[]
    }

}


document.body.addEventListener('keydown', ouvinteDeTeclas)
