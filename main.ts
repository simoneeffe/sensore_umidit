input.onButtonPressed(Button.A, function () {
    basic.clearScreen()
    basic.showNumber(umidità)
})
function AVVIA_POMPA () {
    pins.digitalWritePin(DigitalPin.P2, 1)
    basic.showLeds(`
        . . # # .
        . # # # #
        # # . . #
        # # . . .
        # # # # #
        `)
    basic.pause(5000)
    pins.digitalWritePin(DigitalPin.P2, 0)
}
input.onButtonPressed(Button.B, function () {
    AVVIA_POMPA()
})
let umidità = 0
pins.digitalWritePin(DigitalPin.P2, 0)
basic.forever(function () {
    pins.analogWritePin(AnalogPin.P1, 1023)
    umidità = pins.analogReadPin(AnalogPin.P0)
    pins.analogWritePin(AnalogPin.P1, 0)
    if (umidità < 500) {
        basic.showLeds(`
            # # . # #
            . . . . .
            . # # # .
            # # # # #
            # . . . #
            `)
    } else if (umidità > 710) {
        basic.showLeds(`
            # # . # #
            . . . . .
            # . . . #
            # # # # #
            . # # # .
            `)
    } else {
        basic.showLeds(`
            # # . # #
            . . . . .
            . . . . .
            # # # # #
            # # # # #
            `)
    }
    basic.pause(5000)
    basic.clearScreen()
})
basic.forever(function () {
    basic.pause(1000)
    // SEGNALE POMPA
    if (umidità < 350) {
        AVVIA_POMPA()
        basic.showLeds(`
            . . # # .
            . # # # #
            # # . . #
            # # . . .
            # # # # #
            `)
        basic.pause(500)
        basic.showLeds(`
            . . . . .
            . # # . .
            # # . # .
            # # . . .
            # # # # #
            `)
        basic.pause(500)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            # # # # #
            `)
        basic.pause(500)
    }
    basic.pause(60000)
})
