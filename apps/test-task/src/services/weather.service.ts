import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TableDataResponse, CityResponse} from '../interfaces/weather.interface'

@Injectable({
    providedIn: 'root'
})



export class weatherService {
    private baseUrl = 'http://api.openweathermap.org/';
    private apiKey = '808c33f14afd5adff9aa3c4adad640ef';

    constructor(private httpClient: HttpClient) {
    }

    getCity(cityName: string) {
        return this.httpClient.get<CityResponse[]>(
            this.baseUrl + `geo/1.0/direct?q=${cityName}&limit=1&appid=${this.apiKey}`);
    }

    getWeatherByCity(lat: number, lon: number, mod: string) {
        console.log(mod);
        return this.httpClient.get<TableDataResponse>(
            this.baseUrl +
            `data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=current,minutely,${mod},alerts&appid=${this.apiKey}`)


    }


}
