import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private https: Http) { }

  newDate;
  cityName;
  humidity;
  location;
  summary;
  pressure;
  tempK;
  tempC;
  rain;
  fullImagePath;

    ngOnInit() {
      this.geoFind();
      setTimeout(() => {
        this.searchCity();
     }, 1000);   
    }

    geoFind() {
      this.https.get('https://ipinfo.io')
      .subscribe (
      (res: Response) => {
      const currCity = res.json();
      this.cityName = currCity.city;
    });
  }

    searchCity() {
      this.newDate = new Date().toDateString();
      this.fullImagePath = './assets/11.png';
      this.https.get('https://api.openweathermap.org/data/2.5/weather?APPID=0ba5e82df49a15a79cec569618c56215&q=' + this.cityName)
      .subscribe (
      (res: Response) => {
      const weatherCity = res.json();
      this.humidity = `Humidity: ${weatherCity.main.humidity}%`;
      this.pressure = `Pressure: ${weatherCity.main.pressure} hPa`;
      this.location = weatherCity.name + ', ' + weatherCity.sys.country;
      this.summary = weatherCity.weather[0].main;
      this.tempK = weatherCity.main.temp;
      this.tempC = `${Math.round(this.tempK - 273.15)}°C`;

      if(this.summary === 'Rain') {
        this.fullImagePath = './assets/14.png';
      }
    });
  }
}



