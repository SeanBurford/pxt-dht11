{
    let dht11 = DHT11.create(DigitalPin.P0);

    // Convert DHT11Type.temperature_C
    control.assert(dht11.convert(0x0000ff00, 0) == 255, "0x0000ff00 != 255");
    control.assert(dht11.convert(0x00000100, 0) == 1, "0x00000100 != 1");
    control.assert(dht11.convert(0x00000000, 0) == 0, "0x00000000 != 0");
    control.assert(dht11.convert(0xffffffff, 0) == 255, "0xffffffff != 255");
    control.assert(dht11.convert(0xffff01ff, 0) == 1, "0xffff01ff != 1");
    control.assert(dht11.convert(0xffff00ff, 0) == 0, "0xffff00ff != 0");

    // Convert DHT11Type.temperature_F
    control.assert(dht11.convert(0x0000ff00, 1) == 491, "0x0000ff00 != 491");
    control.assert(dht11.convert(0x00000100, 1) == 33, "0x00000100 != 33");
    control.assert(dht11.convert(0x00000000, 1) == 32, "0x00000000 != 32");
    control.assert(dht11.convert(0xffffffff, 1) == 491, "0xffffffff != 491");
    control.assert(dht11.convert(0xffff01ff, 1) == 33, "0xffff01ff != 33");
    control.assert(dht11.convert(0xffff00ff, 1) == 32, "0xffff00ff != 32");

    // Convert DHT11Type.humidity
    control.assert(dht11.convert(0x64000000, 2) == 100, "0x64000000 != 100");
    control.assert(dht11.convert(0x01000000, 2) == 1, "0x01000000 != 1");
    control.assert(dht11.convert(0x00000000, 2) == 0, "0x00000000 != 0");
    control.assert(dht11.convert(0x64ffffff, 2) == 100, "0x64ffffff != 100");
    control.assert(dht11.convert(0x01ffffff, 2) == 1, "0x01ffffff != 1");
    control.assert(dht11.convert(0x00ffffff, 2) == 0, "0x00ffffff != 0");
}