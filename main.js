
var B = 3975;
var mraa = require("mraa");

//GROVE Kit A0 Connector --> Aio(0)
var myAnalogPin = new mraa.Aio(1);

/*
Function: startSensorWatch(socket)
Parameters: socket - client communication channel
Description: Read Temperature Sensor and send temperature in degrees of Fahrenheit every 4 seconds
*/
function startSensorWatch()
{
    'use strict';
    setInterval(function ()
    {
        var a = myAnalogPin.read();
        console.log("Analog Pin (A1) Output: " + a);
        //console.log("Checking....");

        var resistance = (700 - a) * 10000 / a; //get the resistance of the sensor;
        //console.log("Resistance: "+resistance);
        var celsius_temperature = 1 / (Math.log(resistance / 10000) / B + 1 / 298.15) - 273.15;//convert to temperature via datasheet ;
        console.log("Celsius Temperature "+celsius_temperature);
        var fahrenheit_temperature = (celsius_temperature * (9 / 5)) + 32;
        //console.log("Fahrenheit Temperature: " + fahrenheit_temperature);
    }, 1000);
}

console.log("Sample Reading Grove Kit Temperature Sensor");
startSensorWatch();

///////////////////////////////////Button and LED////////////////////////////////////////

var groveSensor = require('mraa');


var button = new groveSensor.Gpio(3);

var press=0;


// Load Grove module
var groveSensor2 = require('mraa');

var groveSensor3 = require('mraa');

var led = new groveSensor2.Gpio(4);
var button = new groveSensor3.Gpio(3);
led.dir(groveSensor2.DIR_OUT);


// Read the input and print, waiting one second between readings
function readButtonValue()
{
    var b = button.read();
    if(b==1)press=1;
    else press=0;

    
    if(press==1)
    {
        led.write(1);
    }
    else
    {
            led.write(0);
    }
}

setInterval(readButtonValue, 10);

///////////////////////////////LIGHT SENSOR////////////////////////

var groveSensor4 = require('mraa');

var lightsensor = new groveSensor4.Aio(2);
var lightly;

setInterval(function(){
     lightly = lightsensor.read();    
                      },100);



//////////////////////////////////////LCD///////////////////////////


// we want mraa to be at least version 0.6.1
var mraa = require('mraa');
var version = mraa.getVersion();


if (version >= 'v0.6.1') {
    console.log('mraa version (' + version + ') ok');
}
else {
    console.log('meaa version(' + version + ') is old - this code may not work');
}


    useLcd();



function rotateColors(display) {
    var red = 0;
    var green = 0;
    var blue = 0;
    display.setColor(red, green, blue);
    setInterval(function() {
     /*   blue += 64;
        if (blue > 255) {
            blue = 0;
            green += 64;
            if (green > 255) {
                green = 0;
                red += 64;
                if (red > 255) {
                    red = 0;
                }
            }
        }
         */  
        display.setColor(red, green, blue);
        display.setCursor(1,1);
        display.write("             ");
        display.setCursor(0,0);
        display.write("             ");
        display.setCursor(0,0);
        display.write(lightly.toString());
    }, 100);
}



function useLcd() {
    var lcd = require('./lcd');
    var display = new lcd.LCD(0);
    

   // display.setColor(0, 60, 255);
    display.setCursor(1, 1);
    display.write('hi there');
    display.setCursor(0,0);  
    display.write('more text');
   display.waitForQuiescent()
    .then(setInterval(function() {
        rotateColors(display);
    },1000))
    .fail(function(err) {
        console.log(err);
        display.clearError();
        rotateColors(display);
    });
}



//////////////////////////