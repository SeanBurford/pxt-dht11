/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */

enum DHT11Type {
    temperature_C,
    temperature_F,
    humidity,
}

namespace DHT11 {

    export class Dht11 {
        /**
         * A DHT11 temperature and humidity sensor.
         */

        // The pin where the DHT11 is connected, defaults to P0.
        pin: DigitalPin;

        /**
         * Read a temperature and humidity value from the DHT11.
         */
        read(): number {
            let value = 0;

            pins.digitalWritePin(this.pin, 0)
            basic.pause(18)

            let unusedI = pins.digitalReadPin(this.pin)
            pins.setPull(this.pin, PinPullMode.PullUp);

            while (pins.digitalReadPin(this.pin) == 1);
            while (pins.digitalReadPin(this.pin) == 0);
            while (pins.digitalReadPin(this.pin) == 1);

            let counter = 0;
            for (let i = 0; i <= 32 - 1; i++) {
                while (pins.digitalReadPin(this.pin) == 0);
                counter = 0
                while (pins.digitalReadPin(this.pin) == 1) {
                    counter += 1;
                }
                if (counter > 4) {
                    value = value + (1 << (31 - i));
                }
            }
            return value;
        }

        /**
         * Convert a temperature and humidity value to the requested type.
         * @param value A value read from a DHT11.
         * @param dht11type DHT11Type for block that has requested a value.
         */
        convert(value: number, dht11type: DHT11Type): number {
            let result = 0;
            switch (dht11type) {
                case DHT11Type.temperature_C:
                    result = (value & 0x0000ff00) >> 8;
                    break;
                case DHT11Type.temperature_F:
                    result = ((value & 0x0000ff00) >> 8) * 9 / 5 + 32;
                    break;
                case DHT11Type.humidity:
                    result = value >> 24;
                    break;
            }
            return Math.trunc(result);
        }

        /**
         * Read and return the temperature.
         * @param isCelsius True if you want celsius, false for Fahrenheit.
         */
        //% blockId="temperature" block="%dht11Block|temperature" blockGap=8
        temperature(isCelsius: boolean): number {
            let isC = isCelsius ? DHT11Type.temperature_C : DHT11Type.temperature_F;
            return this.convert(this.read(), isC);
        }

        /**
         * Read and return the humidity.
         */
        //% blockId="humidity" block="%dht11Block|humidity" blockGap=8
        humidity(): number {
            return this.convert(this.read(), DHT11Type.humidity);
        }

        /**
         * Set the pin where the DHT11 is connected.
         */
        //% weight=10
        //% parts="DHT11" advanced=true
        setPin(pin: DigitalPin): void {
            this.pin = pin;
            let unusedI = pins.digitalReadPin(this.pin);
            pins.setPull(this.pin, PinPullMode.PullUp);
        }
    }

    /**
     * Create a new Dht11 driver.
     * @param datapin DigitalPin where the DHT11 is connected.
     */
    //% blockId="dht11_create" block="DHT11 at pin %dht11pin"
    //% weight=90 blockGap=8
    //% parts="DHT11"
    //% trackArgs=0
    //% blockSetVariable=dht11Block
    export function create(datapin: DigitalPin): Dht11 {
        let dht11 = new Dht11();
        dht11.setPin(datapin);
        return dht11;
    }
}