def AVVIA_POMPA():
    pins.digital_write_pin(DigitalPin.P2, 1)
    basic.show_leds("""
        . . # # .
        . # # # #
        # # . . #
        # # . . .
        # # # # #
        """)
    basic.pause(1000)
    pins.digital_write_pin(DigitalPin.P2, 0)

def on_button_pressed_ab():
    AVVIA_POMPA()
input.on_button_pressed(Button.AB, on_button_pressed_ab)

umidità = 0
pins.digital_write_pin(DigitalPin.P2, 0)

def on_forever():
    global umidità
    pins.analog_write_pin(AnalogPin.P1, 1023)
    umidità = pins.analog_read_pin(AnalogPin.P0)
    pins.analog_write_pin(AnalogPin.P1, 0)
    if umidità < 500:
        basic.show_leds("""
            # # . # #
            . . . . .
            . # # # .
            # # # # #
            # . . . #
            """)
    elif umidità > 710:
        basic.show_leds("""
            # # . # #
            . . . . .
            # . . . #
            # # # # #
            . # # # .
            """)
    else:
        basic.show_leds("""
            # # . # #
            . . . . .
            . . . . .
            # # # # #
            # # # # #
            """)
    basic.pause(5000)
    basic.clear_screen()
basic.forever(on_forever)

def on_forever2():
    basic.pause(1000)
    # SEGNALE POMPA
    if umidità < 350:
        AVVIA_POMPA()
        basic.show_leds("""
            . . # # .
            . # # # #
            # # . . #
            # # . . .
            # # # # #
            """)
        basic.pause(500)
        basic.show_leds("""
            . . . . .
            . # # . .
            # # . # .
            # # . . .
            # # # # #
            """)
        basic.pause(500)
        basic.show_leds("""
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            # # # # #
            """)
        basic.pause(500)
    basic.pause(3000000)
basic.forever(on_forever2)
