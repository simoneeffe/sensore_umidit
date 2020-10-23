def controlla_umidita_3():
    global umidità_3
    pins.analog_write_pin(AnalogPin.P7, 1023)
    umidità_3 = pins.analog_read_pin(AnalogPin.P2)
    pins.analog_write_pin(AnalogPin.P7, 0)
    if umidità_3 < 500:
        basic.show_leds("""
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            """)
    elif umidità_3 > 710:
        basic.show_leds("""
            # # # # #
            # . # . #
            # # # # #
            # . # . #
            # # # # #
            """)
    else:
        basic.show_leds("""
            . . . . .
            . # # # .
            . # . # .
            . # # # .
            . . . . .
            """)
    basic.pause(5000)
    basic.clear_screen()
def controlla_umidita_1():
    global umidità_1
    pins.analog_write_pin(AnalogPin.P5, 1023)
    umidità_1 = pins.analog_read_pin(AnalogPin.P0)
    pins.analog_write_pin(AnalogPin.P5, 0)
    if umidità_1 < 500:
        basic.show_leds("""
            # # . # #
            . . . . .
            . # # # .
            # # . # #
            # . . . #
            """)
    elif umidità_1 > 710:
        basic.show_leds("""
            # # . # #
            . . . . .
            # . . . #
            # # . # #
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
def controlla_umidita_2():
    global umidità_2
    pins.analog_write_pin(AnalogPin.P6, 1023)
    umidità_2 = pins.analog_read_pin(AnalogPin.P1)
    pins.analog_write_pin(AnalogPin.P6, 0)
    if umidità_2 < 500:
        basic.show_leds("""
            # . # . #
            . . . . .
            # . . # .
            . . . . .
            . # . . #
            """)
    elif umidità_2 > 710:
        basic.show_leds("""
            . # . . .
            # # # # .
            . # . # #
            . . . # #
            . . . . .
            """)
    else:
        basic.show_leds("""
            . . # . .
            # . # . #
            # # # # #
            . # # # .
            # # . # #
            """)
    basic.pause(5000)
    basic.clear_screen()

def on_button_pressed_a():
    basic.clear_screen()
    basic.show_string("pianta uno")
    basic.show_number(umidità_1)
    basic.show_string("pianta due")
    basic.show_number(umidità_2)
    basic.show_string("pianta tre")
    basic.show_number(umidità_3)
input.on_button_pressed(Button.A, on_button_pressed_a)

def AVVIA_POMPA():
    pins.digital_write_pin(DigitalPin.P8, 1)
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
    basic.clear_screen()
    basic.show_leds("""
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        # # # # #
        """)
    basic.pause(5000)
    basic.clear_screen()
    pins.digital_write_pin(DigitalPin.P8, 0)

def on_button_pressed_b():
    AVVIA_POMPA()
input.on_button_pressed(Button.B, on_button_pressed_b)

umidità_3 = 0
umidità_2 = 0
umidità_1 = 0
umidità_1 = 1000
umidità_2 = 1000
umidità_3 = 1000
pins.digital_write_pin(DigitalPin.P8, 0)
pins.digital_write_pin(DigitalPin.P16, 1)
basic.pause(500)
pins.digital_write_pin(DigitalPin.P16, 0)

def on_forever():
    controlla_umidita_1()
basic.forever(on_forever)

def on_forever2():
    basic.pause(50000)
    # SEGNALE POMPA
    if umidità_1 > 0 and umidità_1 < 500:
        pins.servo_write_pin(AnalogPin.P13, 0)
        basic.pause(1000)
        AVVIA_POMPA()
    elif umidità_1 == 0:
        pins.digital_write_pin(DigitalPin.P16, 1)
basic.forever(on_forever2)
