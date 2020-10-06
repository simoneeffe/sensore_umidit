let lettura = 0
basic.forever(function () {
    pins.analogWritePin(AnalogPin.P1, 1023)
    lettura = pins.analogReadPin(AnalogPin.P0)
    pins.analogWritePin(AnalogPin.P1, 0)
    led.plotBarGraph(
    lettura,
    1023
    )
    if (input.buttonIsPressed(Button.A)) {
        basic.showNumber(lettura)
    }
    basic.pause(5000)
})
