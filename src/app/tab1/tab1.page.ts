import { Component } from '@angular/core';
import {ConditionSuggestion, UVSuggestion, WeatherImage} from "./suggestions";

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

    this.uvIndex = this.results.forecast.forecastday[0].hour[this.currentHour].uv;

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

