function controlla_umidita_3 () {
    pins.analogWritePin(AnalogPin.P7, 1023)
    umidità_3 = pins.analogReadPin(AnalogPin.P2)
    pins.analogWritePin(AnalogPin.P7, 0)
    if (umidità_3 < 500) {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
    } else if (umidità_3 > 710) {
        basic.showLeds(`
            # # # # #
            # . # . #
            # # # # #
            # . # . #
            # # # # #
            `)
    } else {
        basic.showLeds(`
            . . . . .
            . # # # .
            . # . # .
            . # # # .
            . . . . .
            `)
    }
    basic.pause(5000)
    basic.clearScreen()
}
function controlla_umidita_1 () {
    pins.analogWritePin(AnalogPin.P5, 1023)
    umidità_1 = pins.analogReadPin(AnalogPin.P0)
    pins.analogWritePin(AnalogPin.P5, 0)
    if (umidità_1 < 500) {
        basic.showLeds(`
            # # . # #
            . . . . .
            . # # # .
            # # . # #
            # . . . #
            `)
    } else if (umidità_1 > 710) {
        basic.showLeds(`
            # # . # #
            . . . . .
            # . . . #
            # # . # #
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
}
function controlla_umidita_2 () {
    pins.analogWritePin(AnalogPin.P6, 1023)
    umidità_2 = pins.analogReadPin(AnalogPin.P1)
    pins.analogWritePin(AnalogPin.P6, 0)
    if (umidità_2 < 500) {
        basic.showLeds(`
            # . # . #
            . . . . .
            # . . # .
            . . . . .
            . # . . #
            `)
    } else if (umidità_2 > 710) {
        basic.showLeds(`
            . # . . .
            # # # # .
            . # . # #
            . . . # #
            . . . . .
            `)
    } else {
        basic.showLeds(`
            . . # . .
            # . # . #
            # # # # #
            . # # # .
            # # . # #
            `)
    }
    basic.pause(5000)
    basic.clearScreen()
}
input.onButtonPressed(Button.A, function () {
    basic.clearScreen()
    basic.showString("pianta uno")
    basic.showNumber(umidità_1)
    basic.showString("pianta due")
    basic.showNumber(umidità_2)
    basic.showString("pianta tre")
    basic.showNumber(umidità_3)
})
function AVVIA_POMPA () {
    pins.digitalWritePin(DigitalPin.P8, 1)
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
    basic.clearScreen()
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        # # # # #
        `)
    basic.pause(5000)
    basic.clearScreen()
    pins.digitalWritePin(DigitalPin.P8, 0)
}
input.onButtonPressed(Button.B, function () {
    AVVIA_POMPA()
})
let umidità_2 = 0
let umidità_1 = 0
let umidità_3 = 0
pins.digitalWritePin(DigitalPin.P8, 0)
basic.forever(function () {
    controlla_umidita_1()
    umidità_2 = 1000
    umidità_3 = 1000
})
basic.forever(function () {
    basic.pause(1000)
    // SEGNALE POMPA
    if (umidità_1 < 500) {
        pins.servoWritePin(AnalogPin.P13, 0)
        basic.pause(1000)
        AVVIA_POMPA()
    }
    if (umidità_2 < 500) {
        pins.servoWritePin(AnalogPin.P13, 90)
        basic.pause(1000)
        AVVIA_POMPA()
    }
    if (umidità_3 < 500) {
        pins.servoWritePin(AnalogPin.P13, 180)
        basic.pause(1000)
        AVVIA_POMPA()
    }
    basic.pause(60000)
})
