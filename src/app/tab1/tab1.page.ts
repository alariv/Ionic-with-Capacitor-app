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
  public isLoaded:boolean=false;
  
  
  constructor(
  ) {
    
  }

  ngOnInit(){
    this.fetchLastDay();
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
      this.isLoaded = true;
      return result || {};
    } catch (error) {
      console.error(error);
      this.results = error || {};
      return error;
    }
  };

}
