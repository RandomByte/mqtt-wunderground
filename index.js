const Wunderground = require("wundergroundnode");
const mqtt = require("mqtt");

const apiKey = process.env.MQTT_WUNDERGROUND_API_KEY;
const location = process.env.MQTT_WUNDERGROUND_LOCATION;
const mqttBroker = process.env.MQTT_WUNDERGROUND_MQTT_BROKER;
const mqttTopic = process.env.MQTT_WUNDERGROUND_MQTT_TOPIC;

if (!apiKey || !location || !mqttBroker || !mqttTopic) {
	console.log("Configuration environment variable(s) missing");
	process.exit(1);
}

console.log(`Monitoring weather conditions for ${location} and ` +
	`publishing updates to the MQTT broker at ${mqttBroker} on topic ${mqttTopic}...`);

const mqttClient = mqtt.connect(mqttBroker);
const wuClient = new Wunderground(apiKey);

function updateWeatherData() {
	wuClient.conditions().forecast().request(location, function(err, response) {
		const forecast = response.forecast.simpleforecast.forecastday[0];
		const weather = {
			temperature: {
				current: response.current_observation.feelslike_c,
				low: forecast.low.celsius,
				high: forecast.high.celsius
			},
			humidity: forecast.avehumidity,
			conditions: forecast.conditions
		};
		console.log(weather);
		console.log(`Publishing weather for ${response.current_observation.display_location.full}...`);
		mqttClient.publish(mqttTopic, JSON.stringify(weather), {
			qos: 2, // must arrive and must arrive exactly once - also ensures order
			retain: true
		});

		console.log("Done. Sleeping for 5 minutes.");
		setTimeout(updateWeatherData, 1000 * 60 * 5); // repeat after 5 min
	});
}


mqttClient.on("connect", function() {
	updateWeatherData();
});
