import { Component, OnInit, ViewEncapsulation } from '@angular/core';
// import RouterOutlet from 'ion-router-outlet';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Tab3Page {
  constructor() {}

  ngOnInit() {}
  initialForecast = {
    location: {
      name: '',
      region: '',
      country: '',
      lat: 59.43,
      lon: 24.73,
      tz_id: '',
      localtime_epoch: 1682281899,
      localtime: '',
    },
    forecast: {
      forecastday: [
        {
          date: '',
          date_epoch: 1681689600,
          day: {
            maxtemp_c: 10.7,
            maxtemp_f: 51.3,
            mintemp_c: 1.7,
            mintemp_f: 35.1,
            avgtemp_c: 5.5,
            avgtemp_f: 41.9,
            maxwind_mph: 8.1,
            maxwind_kph: 13,
            totalprecip_mm: 0,
            totalprecip_in: 0,
            avgvis_km: 10,
            avgvis_miles: 6,
            avghumidity: 63,
            condition: {
              text: '',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
              code: 1000,
            },
            uv: 4,
          },
        },
      ],
    },
  };
  result: any = {};

  fetchLastTenDays = async () => {
    console.log('fetchLastTenDays');
    const endDate = new Date(new Date().getTime() - 1 * (1000 * 60 * 60 * 24));
    const startDate = new Date(
      new Date().getTime() - 7 * (1000 * 60 * 60 * 24)
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
      this.result = result;
      return result || {};
    } catch (error) {
      console.error(error);
      this.result = error || {};
      return error;
    }
  };

  lastTenDays = this.fetchLastTenDays();
}
