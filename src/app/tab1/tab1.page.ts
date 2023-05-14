import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public results:any;
  public currentHour:number = new Date().getHours();
  public result:any;

  conditionMessage: { title: string; subtitle: string } = ConditionSuggestion.overcast;
  uvMessage: { title: string; subtitle: string } = UVSuggestion.minimal;
  weatherImage: string = WeatherImage.day.clear;

  uvIndex = 0;
  temperature = 0;
  maxTemp = 0;
  minTemp = 0;
  condition = "";



  constructor(
  ) {

  }

  ngOnInit(){
    this.fetchLastDay();
  }

  fetchLastDay = async () => {
    const endDate = new Date(new Date().getTime());
    const startDate = new Date(
      new Date().getTime()
    );
    const url = `https://weatherapi-com.p.rapidapi.com/history.json?q=Tallinn&dt=${startDate.getFullYear()}-${
      startDate.getMonth() + 1
    }-${startDate.getDate()}&end_dt=${endDate.getFullYear()}-${
      endDate.getMonth() + 1
    }-${endDate.getDate()}&lang=en`;
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/octet-stream',
        'X-RapidAPI-Key': 'ba0731616fmshccf9f6fe11502a1p1f4626jsna2eccfca6768',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      this.temperature = Math.round(result.forecast.forecastday[0].hour[this.currentHour].temp_c);
      this.minTemp = Math.round(result.forecast.forecastday[0].day.mintemp_c);
      this.maxTemp = Math.round(result.forecast.forecastday[0].day.maxtemp_c);
      this.condition = result.forecast.forecastday[0].hour[this.currentHour].condition.text;
      this.results = result;
      this.getSuggestions();
      return result || {};
    } catch (error) {
      console.error(error);
      this.results = error || {};
      return error;
    }
  };

  getSuggestions():void{
    if(this.results.forecast.forecastday[0].hour[this.currentHour].condition.text == "Overcast"){
      this.conditionMessage = ConditionSuggestion.overcast;
    } else if(this.results.forecast.forecastday[0].hour[this.currentHour].condition.text == "Sunny"){
      this.conditionMessage = ConditionSuggestion.sunny;
    } else if(this.results.forecast.forecastday[0].hour[this.currentHour].condition.text== "Thunderstorms"){ //To be changed
      this.conditionMessage = ConditionSuggestion.thunderstorm;
    } else if(this.results.forecast.forecastday[0].hour[this.currentHour].condition.text == "Rain"){ //To be changed
      this.conditionMessage = ConditionSuggestion.rain;
    } else if(this.results.forecast.forecastday[0].hour[this.currentHour].condition.text== "Snow"){ //To be changed
      this.conditionMessage = ConditionSuggestion.snow;
    } else if(this.results.forecast.forecastday[0].hour[this.currentHour].condition.text == "Cloudy"){ //To be changed
      this.conditionMessage = ConditionSuggestion.cloudy;
    } else if(this.results.forecast.forecastday[0].hour[this.currentHour].condition.text== "Partly cloudy"){ //To be changed
      this.conditionMessage = ConditionSuggestion.cloudy;
    } else if(this.results.forecast.forecastday[0].hour[this.currentHour].condition.text == "Clear"){ //To be changed
      this.conditionMessage = ConditionSuggestion.clear;
    }
    if(this.results.forecast.forecastday[0].day.uv < 3){
      this.uvMessage = UVSuggestion.minimal;
    } else if(this.results.forecast.forecastday[0].day.uv > 2 && this.results.forecast.forecastday[0].day.uv < 6){
      this.uvMessage = UVSuggestion.low;
    } else if(this.results.forecast.forecastday[0].day.uv > 5 && this.results.forecast.forecastday[0].day.uv < 8){ //To be changed
      this.uvMessage = UVSuggestion.moderate;
    } else if(this.results.forecast.forecastday[0].day.uv > 7 && this.results.forecast.forecastday[0].day.uv < 11){ //To be changed
      this.uvMessage = UVSuggestion.high;
    } else if(this.results.forecast.forecastday[0].day.uv >=11){ //To be changed
      this.uvMessage = UVSuggestion.extreme;
    }

    const image = this.currentHour > 6 && this.currentHour < 20 ? WeatherImage.day : WeatherImage.night;
    const conditionStr = this.results.forecast.forecastday[0].hour[this.currentHour].condition.text;
    console.warn(conditionStr);
    switch (conditionStr) {
      case "Overcast":
        this.weatherImage = image.overcast;
        break;
      case "Sunny":
        this.weatherImage = image.sunny;
        break;
      case "Thunderstorms":
        this.weatherImage = image.thunderstorm;
        break;
      case "Rain":
        this.weatherImage = image.rain;
        break;
      case "Snow":
        this.weatherImage = image.snow;
        break;
      case "Cloudy":
        this.weatherImage = image.cloudy;
        break;
      case "Partly cloudy":
        this.weatherImage = image.cloudy;
        break;
      case "Clear":
        this.weatherImage = image.clear;
        break;
      default:
        this.weatherImage = image.overcast;
        break;
    }

  }
}



export const UVSuggestion = {
  "minimal": {
    title: "UV index is minimal",
    subtitle: "Nothing to worry about!",
  },
  "low": {
    title: "UV index is low",
    subtitle: "Wear a hat and/or sunglasses to protect your eyes.",
  },
  "moderate": {
    title: "UV index is moderate",
    subtitle: "Sunglasses and a hat is recommended. Use sunscreen with an SPF of at least 30.",
  },
  "high": {
    title: "UV index is high",
    subtitle: "Minimize sun exposure during midday(10am - 4pm). Try to stay in shade when outside. SPF with at least 30 sunscreen is a must.",
  },
  "extreme": {
    title: "UV index is extremely high",
    subtitle: "Apply sunscreen of SPF 30 or above every 2 hours or you'll burn in less than 5 minutes. The sun is a deadly laser!",
  }
}

export const ConditionSuggestion = {
  snow: {
    title: "It's snowing!",
    subtitle: "If going outside, wear multiple layers of clothing that can protect you from the cold.",
  },
  cloudy: {
    title: "It's cloudy.",
    subtitle: "Take a jacket with you!",
  },
  overcast: {
    title: "There's overcast.",
    subtitle: "Refer to outside temperature for clothing.",
  },
  sunny: {
    title: "It's sunny!",
    subtitle: "Wear headwear such as hats to protect from direct sunlight. Check UV index!",
  },
  thunderstorm: {
    title: "There is a thunderstorm!",
    subtitle: "Avoid going outside or if you do, avoid powerlines, bodies of water and standing under trees.",
  },
  rain: {
    title: "It's raining.",
    subtitle: "Take an umbrella with you or wear water-resistant clothing.",
  },
  clear: {
    title: "Clear skies!",
    subtitle: "Enjoy the nice weather, with clouds nowhere in sight.",
  }
}

export const WeatherImage = {
  day: {
    sunny: "assets/images/sun/26.png",
    cloudy: "assets/images/sun/27.png",
    overcast: "assets/images/cloud/33.png",
    snow: "assets/images/cloud/23.png",
    thunderstorm: "assets/images/sun/16.png",
    rain: "assets/images/sun/8.png",
    clear: "assets/images/sun/6.png",
  },
  night: {
    sunny: "assets/images/moon/10.png",
    cloudy: "assets/images/moon/15.png",
    overcast: "assets/images/cloud/32.png",
    snow: "assets/images/cloud/23.png",
    thunderstorm: "assets/images/moon/20.png",
    rain: "assets/images/moon/1.png",
    clear: "assets/images/moon/2.2.png",
  }
}
