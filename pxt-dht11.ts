/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */

namespace DHT11 {
    enum DHT11Type {
        temperature_C,
        temperature_F,
        humidity,
    }

    export class Dht11 {
        /**
         * A DHT11 temperature and humidity sensor.
         */

        // The pin where the DHT11 is connected, defaults to P0.
        pin: DigitalPin;
        isCelsius: boolean;
        readTimestamp: number;
        readValue: number;

        _pulseCount: number;

        readPulse(): void {
            let duration = pins.pulseDuration();
            this._pulseCount += 1;
        }

        /**
         * Read a temperature and humidity value from the DHT11.
         */
        read(): number {
            let now = input.runningTime();
            serial.writeNumbers([now, this.readTimestamp]);
            if (now - this.readTimestamp < 900) {
                // Use the previous read if it is less than 100ms old.
                serial.writeString("Using cached value\r\n")
                return this.readValue;
            }

            let value = 0;

            this._pulseCount = 0;
            pins.digitalWritePin(this.pin, 0)
            let unusedI = pins.digitalReadPin(this.pin)
            pins.onPulsed(this.pin, PulseValue.High, () => this.readPulse());

            basic.pause(18)
            pins.setPull(this.pin, PinPullMode.PullUp);

            while (this._pulseCount < 40 && (input.runningTime() - now < 100)) {
                basic.pause(1);
            }

            //let counter = 0;
            //for (let i = 0; i <= 32 - 1; i++) {
            //    while (pins.digitalReadPin(this.pin) == 0);
            //    counter = 0
            //    while (pins.digitalReadPin(this.pin) == 1) {
            //        counter += 1;
            //    }
            //    if (counter > 2) {
            //        value = value + (1 << (31 - i));
            //    }
            //}
            this.readTimestamp = now;
            this.readValue = value;
            return this._pulseCount;
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
        //% blockId="temperature" block="%dht11|temperature"
        temperature(): number {
            serial.writeString("Reading\r\n")
            let val = this.read();
            let isC = this.isCelsius ? DHT11Type.temperature_C : DHT11Type.temperature_F;
            serial.writeString("Calculating temperature " + val.toString() + "\r\n")
            return this.convert(val, isC);
        }

        /**
         * Read and return the humidity.
         */
        //% blockId="humidity" block="%dht11|humidity"
        humidity(): number {
            serial.writeString("Reading\r\n")
            let val = this.read();
            serial.writeString("Calculating humidity " + val.toString() + "\r\n")
            return this.convert(val, DHT11Type.humidity);
        }

        /**
         * Set the pin where the DHT11 is connected.
         * @param pin The pin where the DHT11 is connected.
         */
        //% block="%dht11 at pin %pin" advanced=true
        setPin(pin: DigitalPin): void {
            this.pin = pin;
            let unusedI = pins.digitalReadPin(this.pin);
            pins.setPull(this.pin, PinPullMode.PullUp);
        }

        /**
         * Convert temperatures to Celsius.
         */
        //% block="%dht11 temperatures in Celsius" advanced=true
        useCelsius(): void {
            this.isCelsius = true;
        }

        /**
         * Convert temperatures to Fahrenheit.
         */
        //% block="%dht11 temperatures in Fahrenheit" advanced=true
        useFahrenheit(): void {
            this.isCelsius = false;
        }
    }

    /**
     * Create a new Dht11 driver.
     * @param datapin DigitalPin where the DHT11 is connected.
     */
    //% blockId="dht11_create" block="DHT11 at pin %dht11pin"
    //% icon="\uf750" color=190
    //% blockSetVariable=dht11
    export function create(datapin: DigitalPin): Dht11 {
        let dht11 = new Dht11();
        dht11.setPin(datapin);
        dht11.useCelsius();
        dht11.readTimestamp = 0;
        dht11.readValue = 0;
        return dht11;
    }
}