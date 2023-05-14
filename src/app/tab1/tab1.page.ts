import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public isLoaded2:boolean = false;
  public results:any;
  public currentHour:number = new Date().getHours();
  public result:any;
  public isLoaded:boolean=false;
  public UVsuggestions:any = [
    "UV index is minimal, nothing to worry about",
    "UV index is low. Wear a hat and/or sunglasses to protect your eyes",
    "UV index is moderate. Sunglasses and a hat is recommended. Use sunscreen with an SPF of at least 30",
    "UV index is high! Minimize sun exposure during midday(10am - 4pm). Try to stay in shade when outside. SPF with at least 30 sunscreen is a must",
    "UV index is extremely high! Apply sunscreen of SPF 30 or above every 2 hours or you'll burn in less than 5 minutes. The sun is a deadly laser!"];
  public TempSuggestions:any = [
    "It's very cold outside. Wear winter attire or stay indoors.",
    "It's cold outside. Wear long sleeved clothes, hat, gloves and a scarf",
    "Not too hot, not too cold. Wear spring or autumn attire (jacket, long pants etc)",
    "It's pretty warm. You'll manage with just a jumper and long sleeved pants",
    "Summertime! T-shirts, shorts and flippers. Don't forget to drink lots of water to avoid dehydration. Just in case check UV index!"
  ];
  public conditionSuggestions:any= [
    "It's snowing! If going outside, wear multiple layers of clothing that can protect you from the cold",
    "It's cloudy. Take a jacket with you!",
    "There's overcast. Refer to outside temperature for clothing",
    "It's sunny. Wear headwear such as hats to protect from direct sunlight. Check UV index!",
    "There is a thunderstorm! Avoid going outside or if you do, avoid powerlines, bodies of water and standing under trees",
    "It's raining. Take an umbrella with you or wear water-resistant clothing."
  ];
  public UVmessage:any;
  public TempMessage:any;
  public conditionMessage:any;
  public tempHTML:any;
  public UVHTML:any;
  public conditionHTML:any;

  
  
  constructor(
  ) {
    
  }

  ngOnInit(){
    this.fetchLastDay();
    
    this.tempHTML = document.getElementById("tempSuggestion");
    this.UVHTML = document.getElementById("UVSuggestion");
    this.conditionHTML = document.getElementById("conditionSuggestion");
    
  }

  fetchLastDay = async () => {
    const endDate = new Date(new Date().getTime() +0 * (1000 * 60 * 60 * 24));
    const startDate = new Date(
      new Date().getTime() -0 * (1000 * 60 * 60 * 24)
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
      console.log(result);
      this.results = result;
      this.getSuggestions();
      this.isLoaded = true;
      return result || {};
    } catch (error) {
      console.error(error);
      this.results = error || {};
      return error;
    }
  };

  getSuggestions():void{
    if(this.results.forecast.forecastday[0].hour[this.currentHour].temp_c < 0.0){
      this.TempMessage = this.TempSuggestions[0];
    } else if(this.results.forecast.forecastday[0].hour[this.currentHour].temp_c > 0.0 && this.results.forecast.forecastday[0].hour[this.currentHour].temp_c < 10.0){
      this.TempMessage = this.TempSuggestions[1];
    } else if(this.results.forecast.forecastday[0].hour[this.currentHour].temp_c > 10.0 && this.results.forecast.forecastday[0].hour[this.currentHour].temp_c < 15.0){
      this.TempMessage = this.TempSuggestions[2];
    }else if(this.results.forecast.forecastday[0].hour[this.currentHour].temp_c >= 15.0 && this.results.forecast.forecastday[0].hour[this.currentHour].temp_c < 20.0){
      this.TempMessage = this.TempSuggestions[3];
    }else if(this.results.forecast.forecastday[0].hour[this.currentHour].temp_c > 20.0 ){
      this.TempMessage = this.TempSuggestions[4];
    }

    if(this.results.forecast.forecastday[0].day.condition.text == "Overcast"){
      this.conditionMessage = this.conditionSuggestions[2];
    } else if(this.results.forecast.forecastday[0].day.condition.text == "Sunny"){
      this.conditionMessage = this.conditionSuggestions[3];
    } else if(this.results.forecast.forecastday[0].day.condition.text == "Thunderstorms"){ //To be changed
      this.conditionMessage = this.conditionSuggestions[4];
    } else if(this.results.forecast.forecastday[0].day.condition.text == "Rain"){ //To be changed
      this.conditionMessage = this.conditionSuggestions[5];
    } else if(this.results.forecast.forecastday[0].day.condition.text == "Snow"){ //To be changed
      this.conditionMessage = this.conditionSuggestions[0];
    } else if(this.results.forecast.forecastday[0].day.condition.text == "Partly cloudy"){ //To be changed
      this.conditionMessage = this.conditionSuggestions[1];
    }
    if(this.results.forecast.forecastday[0].day.uv < 3){
      this.UVmessage = this.UVsuggestions[0];
    } else if(this.results.forecast.forecastday[0].day.uv > 2 && this.results.forecast.forecastday[0].day.uv < 6){
      this.UVmessage = this.UVsuggestions[1];
    } else if(this.results.forecast.forecastday[0].day.uv > 5 && this.results.forecast.forecastday[0].day.uv < 8){ //To be changed
      this.UVmessage = this.UVsuggestions[2];
    } else if(this.results.forecast.forecastday[0].day.uv > 7 && this.results.forecast.forecastday[0].day.uv < 11){ //To be changed
      this.UVmessage = this.UVsuggestions[3];
    } else if(this.results.forecast.forecastday[0].day.uv >=11){ //To be changed
      this.UVmessage = this.UVsuggestions[4]
    }

    this.tempHTML.innerHTML = this.TempMessage;
    this.conditionHTML.innerHTML = this.conditionMessage;
    this.UVHTML.innerHTML = this.UVmessage;
    this.isLoaded2 = true;
  }



}
