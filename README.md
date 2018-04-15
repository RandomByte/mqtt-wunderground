# mqtt-wunderground
Poll weather data from Weather Underground and publish it via MQTT.

## Usage
mqtt-traffic can be configured using environment variables:

- **MQTT_WUNDERGROUND_API_KEY:** Your [Weather Underground API Key](http://www.wunderground.com/weather/api/)
- **MQTT_WUNDERGROUND_LOCATION:** Location. If you want to specify a station, use `pws:<STATION ID>`
- **MQTT_WUNDERGROUND_MQTT_BROKER:** URL of your MQTT broker, e.g. `mqtt://test.mosquitto.org`
- **MQTT_WUNDERGROUND_MQTT_TOPIC:** MQTT topic to publish states on, e.g. `Home/Weather`

### Example
````sh
MQTT_WUNDERGROUND_LOCATION="pws:IKSHEIDE5" \
MQTT_WUNDERGROUND_API_KEY="<your Weather Underground API key>" \
MQTT_WUNDERGROUND_MQTT_BROKER="mqtt://test.mosquitto.org" \
MQTT_WUNDERGROUND_MQTT_TOPIC="Home/Weather" \
npm start
````

### MQTT Message Payload
````json
{
    "temperature": {
        "current": "15.1",
        "low": "11",
        "high": "21"
    },
    "humidity": 82,
    "conditions": "Mostly Cloudy"
}
````

## Docker Image
A Docker image for the **armhf** architecture (Raspberry Pi et al.) is available on [Docker Hub](https://hub.docker.com/r/randombyte/armhf-mqtt-wunderground).

**Example:**
````sh
docker run --rm -it \
-e MQTT_WUNDERGROUND_LOCATION="pws:IKSHEIDE5" \
-e MQTT_WUNDERGROUND_API_KEY="<your Weather Underground API key>" \
-e MQTT_WUNDERGROUND_MQTT_BROKER="mqtt://test.mosquitto.org" \
-e MQTT_WUNDERGROUND_MQTT_TOPIC="Home/Weather" \
randombyte/armhf-mqtt-wunderground:latest
````

## License
Released under the [MIT License](https://opensource.org/licenses/MIT).
