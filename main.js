/*
var B = 3975;
var mraa = require("mraa");

//GROVE Kit A0 Connector --> Aio(0)
var myAnalogPin = new mraa.Aio(1);



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
*/
/////////////////////////////Button////////////////////////////////////

var groveSensor = require('mraa');
var button = new groveSensor.Gpio(3);
var onepulse;
var press=0;
function readButtonValue()
{
    var b = button.read();
    if(b==1)
    {
        press=1;
    }
    else 
    {
        press=0;
        onepulse=0;
    }

}

setInterval(readButtonValue, 10);


///////////////////////////////////Touch Sensor and LED////////////////////////////////////////




var groveSensor2 = require('mraa');


var led = new groveSensor2.Gpio(4);

led.dir(groveSensor2.DIR_OUT);

var groveSensor5 = require('mraa');
var touch = new groveSensor5.Gpio(6);
var touchout;
setInterval(function()
{
    touchout = touch.read();


    if(touchout==1)led.write(1);
    else led.write(0);

},100);




///////////////////////////////LIGHT SENSOR////////////////////////

var groveSensor4 = require('mraa');

var lightsensor = new groveSensor4.Aio(2);
var lightly;

setInterval(function()
{
    lightly = lightsensor.read();
},100);



//////////////////////////////////////LCD///////////////////////////


// we want mraa to be at least version 0.6.1
var mraa = require('mraa');
var version = mraa.getVersion();


if (version >= 'v0.6.1')
{
    console.log('mraa version (' + version + ') ok');
}
else
{
    console.log('meaa version(' + version + ') is old - this code may not work');
}


useLcd();
var used=0;
var first=0;


function rotateColors(display)
{
    var red = 0;
    var green = 0;
    var blue = 0;
    
    display.setColor(red, green, blue);
    setInterval(function()
    {
       
        
        var curdate = new Date();
        var showdate = (curdate.getMonth()+1) + "/"
                       +  curdate.getDate()     + " @ "
                       + curdate.getHours()    + ":"
                       + curdate.getMinutes()    + ":"
                       + curdate.getSeconds();
        display.setColor(red, green, blue);
        if(first==0)
            {
                 display.setCursor(1,0);
                    display.write("                ");
                    display.setCursor(0,0);
                    display.write("                ");
                first=1;
            }
        
        if(press==1&&onepulse==0)
        {
            onepulse=1;
            
            if(used==0)
            {
                 display.setCursor(0,0);
                    display.write("                ");
                display.setCursor(0,0);
                display.write(showdate);
                used=1;
            }
            else
            {
                display.setCursor(1,0);
                    display.write("                ");
                display.setCursor(1,0);
                display.write(showdate);
                used=0;
            }

        }

    }, 10);
}



function useLcd()
{
    var lcd = require('./lcd');
    var display = new lcd.LCD(0);


    // display.setColor(0, 60, 255);
    display.setCursor(1, 1);
    display.write('hi there');
    display.setCursor(0,0);
    display.write('more text');
    display.waitForQuiescent()
    .then(setInterval(function()
    {
        rotateColors(display);
    },1000))
    .fail(function(err)
    {
        console.log(err);
        display.clearError();
        rotateColors(display);
    });
}



//////////////////////////
