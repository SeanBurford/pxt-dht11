/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */

enum DHT11Type {
    //% block="temperature(℃)" enumval=0
    DHT11_temperature_C,

    //% block="temperature(℉)" enumval=1
    DHT11_temperature_F,

    //% block="humidity(0~100)" enumval=2
    DHT11_humidity,
}

namespace DHT11 {
    /**
     * A DHT11 temperature and humidity sensor.
     */

    /**
     * @param dht11type DHT11Type for block that has requested a value.
     * @param dht11pin DigitalPin attached to the data line.
     */
    //% blockId="readdht11" block="value of dht11 %dht11type| at pin %dht11pin"
    export function read(dht11type: DHT11Type, dht11pin: DigitalPin): number {
        pins.digitalWritePin(dht11pin, 0)
        basic.pause(18)

        let unusedI = pins.digitalReadPin(dht11pin)
        pins.setPull(dht11pin, PinPullMode.PullUp);

        while (pins.digitalReadPin(dht11pin) == 1);
        while (pins.digitalReadPin(dht11pin) == 0);
        while (pins.digitalReadPin(dht11pin) == 1);

        let value = 0;
        let counter = 0;

        for (let i = 0; i <= 32 - 1; i++) {
            while (pins.digitalReadPin(dht11pin) == 0);
            counter = 0
            while (pins.digitalReadPin(dht11pin) == 1) {
                counter += 1;
            }
            if (counter > 4) {
                value = value + (1 << (31 - i));
            }
        }

        switch (dht11type) {
            case 0:
                return (value & 0x0000ff00) >> 8
                break;
            case 1:
                return ((value & 0x0000ff00) >> 8) * 9 / 5 + 32
                break;
            case 2:
                return value >> 24
                break;
            default:
                return 0
        }
    }
}