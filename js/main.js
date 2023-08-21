const colores = ["Naranja", "Amarillo", "Verde", "Azul", "Rojo", "Gris", "Negro", "Blanco", "Celeste", "Violeta"]
const palabraElegida = []
const coincidencias = []
const listaRanking = []

let validacion = true
let chances = 5
let opciones = 0
let intentos = 0

do{

    do{
        opciones = prompt(`Bienvenido a Ahorcado, Jugar?: \n
        1- SI\n
        0- NO`)        

        if(isNaN(opciones) || opciones == ""){
            validacion = false
        }else{
            if(opciones > 1 || opciones < 0){
                validacion = false
            }
            else{
                validacion = true
            }
        }        

        if(!validacion){
            alert(`Opción no valida, volver a ingresar`)
        }

    }while(!validacion)

    if(opciones == 1){

        let usuario = prompt(`Ingrese su nombre`)     

        palabraElegida.splice(0,palabraElegida.length)
        coincidencias.splice(0,coincidencias.length)
        intentos = 0

        alert(`Comienza el juego, tenes ${chances} chances para adivinar si la letra ingresada existe en la palabra`)

        let numeroAleatorio = Math.floor(Math.random() * 10)

        for (let i = 0; i < colores[numeroAleatorio].length; i++) {
            palabraElegida.push(colores[numeroAleatorio][i].toLowerCase())
            coincidencias.push("*")
        }        
    
        alert(`La palabra a adivinar tiene ${palabraElegida.length} letras`)
    
        for (let index = 1; index <= chances; index++) {
            let letra = prompt(`Ingrese una letra o arriesga con la palabra completa en una sola chance`)        
            if(isNaN(letra)){
                if(letra.length == 1){
                    let existeLetra = buscarLetra(letra)
                    if(existeLetra){
                        alert(`Bien!! La letra ${letra} se encuentra en la palabra elegida. Letras adivinadas hasta ahora: ${coincidencias.join("")}`)
                        let gano = revisarSiGano()
                        if(gano){
                            alert(`Ganaste!!!! La palabra es ${coincidencias.join("")}!!!`)                    
                            break
                        }
                    }else{
                        alert(`La letra ${letra} no se encuentra en la palabra elegida! Letras adivinadas hasta ahora: ${coincidencias.join("")}`)
                    } 
                }else{
                    let gano = buscarPalabra(letra)
                    if(gano){
                        alert(`Ganaste!!!! La palabra es ${palabraElegida.join("")}!!!`)                    
                        break
                    }else{
                        index = 5
                    }
                } 
            }else{
                alert(`No ingresaste una letra y perdiste una oportunidad!`)
            }  
            if(index == chances){
                alert(`Perdiste!!!!`)
            }else{
                alert(`Te quedan ${chances - index} chances`)
            }
            intentos = index
        }

        let juego = new Ranking(palabraElegida.join(""), intentos, usuario)
        listaRanking.push(juego)

    }else{
        alert(`Juego Finalidado.`)
        if(listaRanking.length > 0){
            let html = "Ranking de posiciones:\n"
            html = html + "Palabra\tIntentos\tUsuario\n"
            listaRanking.sort(function (a, b) {
                if (a.intentos > b.intentos) {
                  return 1;
                }
                if (a.intentos < b.intentos) {
                  return -1;
                }
                return 0;
              });            
            for (let i = 0; i < listaRanking.length; i++) {
                html = html + `${listaRanking[i].palabra}\t${listaRanking[i].intentos}\t${listaRanking[i].usuario}\n`
            }
            alert(html)
        }
    }       

}while(opciones != 0)


function buscarLetra(letra){
    let letraEncontrada = false
    for (let i = 0; i < palabraElegida.length; i++) {
        if (palabraElegida[i] === letra) {
            coincidencias[i] = letra
            letraEncontrada = true
        }
    }
    return letraEncontrada
}

function buscarPalabra(palabra){
    let palabraEncontrada = true
    if(palabra.length == palabraElegida.length){
        for (let i = 0; i < palabra.length; i++) {
            if (palabraElegida[i] !== palabra[i]) {
                palabraEncontrada = false
            }
        }
    }else{
        palabraEncontrada = false
    }
    return palabraEncontrada
}

function revisarSiGano(){
    for (let i = 0; i < palabraElegida.length; i++) {
        if (palabraElegida[i] !== coincidencias[i]) {
            return false
        }
    }
    return true
}



