class GarageElement {
    constructor(object, secondaryState, affectedObject, affectedObjectSecondaryState, eventType) {
        this.object = object
        this.secondaryState = secondaryState
        this.affectedObject = affectedObject
        this.affectedObjectSecondaryState = affectedObjectSecondaryState
        this.eventType = eventType
    }
    singleAction = function (element) {
        element.object.addEventListener(`${element.eventType}`, function (e) {
            if (typeof element.secondaryState === "string") {
                e.target.classList.toggle(`${element.secondaryState}`)
            }
            
            return element.affectedObject.classList.toggle(`${element.affectedObjectSecondaryState}`)
        })
    }

    actionOnHimself = function (element) {
        element.object.addEventListener(`${element.eventType}`, function (e) {
            e.target.classList.toggle(`${element.secondaryState}`)
        })
    }
    
}

let garage = document.querySelector(".garage")

const leftGarageSwitch = new GarageElement(
    document.querySelector(".switches__switch:first-child"),
    null,
    document.querySelector(".garage_door"),
    "opened_garage_door",
    "click"
)

leftGarageSwitch.singleAction(leftGarageSwitch)

const rightGarageSwitch = new GarageElement(
    document.querySelector(".switches__switch:last-child"),
    null,
    document.querySelector(".garage"),
    "lights_off",
    "click"
)

rightGarageSwitch.singleAction(rightGarageSwitch)

const mechaCore = new GarageElement(
    document.querySelector(".mecha_core"),
    "core_incorpored",
    null,
    null,
    "click"
)

mechaCore.canBeIncorpored = false
let canGoOutside = false

mechaCore.incorpore = function () {
    mechaCore.object.addEventListener(mechaCore.eventType, () => {
        if (mechaCore.canBeIncorpored && !batteryChargerPull.itsClickable) {
            canGoOutside = true
            let itsContainingHisSecondClass = batteryChargerPull.object.classList.contains("charging_pull_disarmed")
            if (itsContainingHisSecondClass) {
                batteryChargerPull.object.classList.remove("charging_pull_disarmed")
            }
            mechaCore.object.classList.add(mechaCore.secondaryState)
            document.querySelector(".mecha__body").appendChild(mechaCore.object)

            setTimeout(() => {
                document.querySelector(".garage__background_element:last-child").appendChild(mechaCore.object)
                mechaCore.object.classList.remove(mechaCore.secondaryState)
                mechaCore.canBeIncorpored = false
                canGoOutside = false
                batteryChargerPull.itsClickable = true
            }, 1800000);
        }
    })
}

mechaCore.incorpore()

const batteryChargerPull = new GarageElement(
    document.querySelector(".battery_charger__pull"),
    "charging_pull_disarmed",
    null,
    null,
    "click"
)

batteryChargerPull.itsClickable = true

batteryChargerPull.actionOnHimself(batteryChargerPull)

batteryChargerPull.chargeCore = function () {
    batteryChargerPull.object.addEventListener(batteryChargerPull.eventType, () => {
        if (!mechaCore.canBeIncorpored && batteryChargerPull.itsClickable) {
            setTimeout(() => {
                mechaCore.canBeIncorpored = true
            }, 180000);
            batteryChargerPull.itsClickable = false
        }
    })
}

batteryChargerPull.chargeCore()

const garageLamp = new GarageElement(
    document.querySelector(".background_element__garage_lamp")
)

garageLamp.madedClicks = 0

garageLamp.object.addEventListener("click", () => {
    garageLamp.madedClicks++
    if (garageLamp.madedClicks === 6) {
        rightGarageSwitch.affectedObject.style.filter = "brightness(.3)"
        rightGarageSwitch.object.removeEventListener()
    }
})

let mechaParts = document.querySelectorAll([".mecha__helmet", ".mecha__body_left_armor", ".mecha__body_right_armor", ".right_arm__shoulder", ".mecha__body_left_arm"])

const assignSecondState = (element, elementIndex, secondState) => {
    element[elementIndex].addEventListener("click", () => {
        element[elementIndex].classList.toggle(secondState)
    })    
}

assignSecondState(mechaParts, 0, "helmet_off")
assignSecondState(mechaParts, 1, "left_armor_off")
assignSecondState(mechaParts, 2, "right_armor_off")
assignSecondState(mechaParts, 3, "disarmed_shield")
assignSecondState(mechaParts, 4, "shoulder_off")

const mechaDisarmerPull = new GarageElement(
    document.querySelector(".pull_mecha_disarmer"),
    "disarmer_actioned",
    null,
    null,
    "click"
)

mechaDisarmerPull.actionOnHimself(mechaDisarmerPull)

mechaDisarmerPull.singleAction = function () {
    mechaDisarmerPull.object.addEventListener(mechaDisarmerPull.eventType, () => {
        mechaParts[0].classList.toggle("helmet_off")
        mechaParts[1].classList.toggle("left_armor_off")
        mechaParts[2].classList.toggle("right_armor_off")
        mechaParts[3].classList.toggle("disarmed_shield")
        mechaParts[4].classList.toggle("shoulder_off")
    })
}

mechaDisarmerPull.singleAction()

const outsideOfTheGarage = document.querySelector("picture.image_alignment")

outsideOfTheGarage.addEventListener("click", () => {
    if (canGoOutside) {
        let mechaTravelAnimation = document.querySelector(".bt_1n_simulation")
        garage.style.top = "-100vh"
        mechaTravelAnimation.style.animationPlayState = "running"
        setTimeout(() => {
        document.querySelector(".garage").style.top = "-0vh"
        }, 4000)
    }
})

const larryDialogueBox = new GarageElement(
    document.querySelector(".larry_dialogue_box"),
    null,
    null,
    null,
    "click"
)

larryDialogueBox.phrases = [
    " ¡Oh! Hola, no te ví ahí... ¿como te llamas? Tu debes ser el chico que va a encargarse de la lata oxidada que cuida este pueblo ¡Mucho gusto! Mi nombre es Larry, y soy el dueño de este garage viejo.",

    "Bienvenido a Kabilari, ojalá te guste el pueblo y se te haga comodo trabajar con el viejo BT-1N y no tengas tantas complicaciones con el mantenimiento...",

    'Este... BT-1N es el modelo Mech con el que trabajarás, nosotros de cariño le llamamos "Bin". Pero en fin..',

    "Ya que te vas a encargar de Bin tu solo, te daré una pequeña guía por acá para hacerte más comodo esto...",

    "Primero que nada, Bin tiene ciertas partes que mantener, para eso tendrás que desarmarlas, si quieres chequear alguna solo haz click sobre ella ¡Y echale un ojo!",

    "Si necesitas mirar bien todo el panoráma, puedes usar la palanca que tienes en el suelo para desarmar a Bin por completo.",

    "Si necesitas algo de aire fresco o las luces del garage te molestan para dormir puedes manipularlas con los switches del garage ¡De nada!",

    "Algo más, Bin necesita estar bien cargado para ir por algo de acción, así que carga el nucleo de energía con la palanca al lado de los switches, el nucleo toma 3 minutos en cargarse, y le tomará alrededor de 30 minutos agotarse...",

    "Para incorporar el nucleo en Bin solo haz click sobre él y listo...",

    "Cuando ya todo esté listo, solo abre la puerta del garage, saca a Bin afuera para que se fije si hay alguna anomalía en este viejo pueblo (Para hacerlo solo abre la puerta del garage y haz click sobre el paisaje).",

    "Y por amor a Dios, no te pongas a golpear las luces del garage... *guiño guiño*",

    "¡Y NO TE TOMES MI REFRESCO!",

    "Chau..."
]

larryDialogueBox.father = document.querySelector(".introduction_container")

larryDialogueBox.showingPhrases = function () {
    let index = 0
    if (index <= larryDialogueBox.phrases.length) {
        const dialogueChanging = setInterval(() => {
            larryDialogueBox.object.textContent = larryDialogueBox.phrases[index]
            index++
            if (index > larryDialogueBox.phrases.length) {
                garage.classList.add("cinematic_ended")
                larryDialogueBox.father.style.display = "none"
                clearInterval(dialogueChanging)
            }
        }, 6000)
    }
}

const skipButton = document.querySelector(".introduction_container__skip_button")

skipButton.addEventListener("click", () => {
    garage.classList.add("cinematic_ended")
    larryDialogueBox.father.style.display = "none"
})

const playButton = document.querySelector(".play_modal__play_button")

playButton.addEventListener("click", () => {
    let playModal = document.querySelector(".play_modal")
    playModal.style.display = "none"
    larryDialogueBox.showingPhrases()
})