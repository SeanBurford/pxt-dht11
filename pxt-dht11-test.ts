// Add your code here
{
    let dht11 = DHT11.create(DigitalPin.P0);

    control.assert(dht11.convert(0x0000ff00, DHT11Type.temperature_C) == 255,
                   "0x0000ff00 != 255");
    control.assert(dht11.convert(0x00000100, DHT11Type.temperature_C) == 1,
                   "0x00000100 != 1");
    control.assert(dht11.convert(0x00000000, DHT11Type.temperature_C) == 0,
                   "0x00000000 != 0");
    control.assert(dht11.convert(0xffffffff, DHT11Type.temperature_C) == 255,
                   "0xffffffff != 255");
    control.assert(dht11.convert(0xffff01ff, DHT11Type.temperature_C) == 1,
                   "0xffff01ff != 1");
    control.assert(dht11.convert(0xffff00ff, DHT11Type.temperature_C) == 0,
                   "0xffff00ff != 0");

    control.assert(dht11.convert(0x0000ff00, DHT11Type.temperature_F) == 491,
                   "0x0000ff00 != 491");
    control.assert(dht11.convert(0x00000100, DHT11Type.temperature_F) == 33,
                   "0x00000100 != 33");
    control.assert(dht11.convert(0x00000000, DHT11Type.temperature_F) == 32,
                   "0x00000000 != 32");
    control.assert(dht11.convert(0xffffffff, DHT11Type.temperature_F) == 491,
                   "0xffffffff != 491");
    control.assert(dht11.convert(0xffff01ff, DHT11Type.temperature_F) == 33,
                   "0xffff01ff != 33");
    control.assert(dht11.convert(0xffff00ff, DHT11Type.temperature_F) == 32,
                   "0xffff00ff != 32");

    serial.writeNumber(dht11.convert(0x64000000, DHT11Type.humidity));
    control.assert(dht11.convert(0x64000000, DHT11Type.humidity) == 100,
                   "0x64000000 != 100");
    control.assert(dht11.convert(0x01000000, DHT11Type.humidity) == 1,
                   "0x01000000 != 1");
    control.assert(dht11.convert(0x00000000, DHT11Type.humidity) == 0,
                   "0x00000000 != 0");
    control.assert(dht11.convert(0x64ffffff, DHT11Type.humidity) == 100,
                   "0x64ffffff != 100");
    control.assert(dht11.convert(0x01ffffff, DHT11Type.humidity) == 1,
                   "0x01ffffff != 1");
    control.assert(dht11.convert(0x00ffffff, DHT11Type.humidity) == 0,
                   "0x00ffffff != 0");
}