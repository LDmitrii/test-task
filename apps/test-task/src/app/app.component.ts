import {Component} from '@angular/core';
import {weatherService} from "../services/weather.service";
import {TableDataResponse, CityResponse} from '../interfaces/weather.interface'

/**
 * @title Basic use of `<table mat-table>`
 */


@Component({
    selector: 'test-task-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})

export class AppComponent {
    public displayedColumnsHourly: string[] = [
        '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '00:00'
    ];
    public displayedColumnsDaily: string[] = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    public displayedColumns: any[] = []
    public city = '';
    public exclude = 'daily';
    public tableData: any[] = [];

    constructor(public weatherService: weatherService) {
    }

    searchCity(): void {
        this.weatherService.getCity(this.city).subscribe((data: CityResponse[]) => {
            if (data.length === 0) {
                alert("City not found");
                return;
            }
            this.getWeatherByCity(data[0].lat, data[0].lon);
        });
    }

    dtToTime(t: any): string {
        if (t === 'city') {
            return 'City';
        }
        const dt = new Date(t * 1000);
        return ((String(dt.getHours())).length === 1 ? '0' + dt.getHours() : dt.getHours()) + ':' + dt.getMinutes() + '0';
    }

    getWeatherByCity(lng: number, lon: number): void {
        const obj: any = {
            city: this.city,
        };
        let mapArrData;
        this.weatherService.getWeatherByCity(lng, lon, this.exclude).subscribe((data: TableDataResponse) => {
            if (this.exclude === 'daily') {
                mapArrData = data['hourly'].map((el: any) => {
                    const dt = new Date(el.dt * 1000);
                    return {
                        'hours': this.dtToTime(el.dt),
                        'dt': el.dt,
                        'temp': el.temp + "°"
                    }
                });

                mapArrData = mapArrData.filter((item: any) => this.displayedColumnsHourly.indexOf(item.hours) !== -1).slice(0, 8);

                this.displayedColumns = ['city', ...mapArrData.map((i: any) => {
                    return i.dt.toString();
                })];
                for (let i = 0; i < mapArrData.length; i++) {
                    obj[mapArrData[i].dt] = mapArrData[i].temp;
                }
                this.tableData = [obj];
            } else {
                mapArrData = data['daily'].map((el: any) => {
                    return {
                        'temp': el.temp.day + "°"
                    }
                });
                this.displayedColumns = ['city', ...this.displayedColumnsDaily];
                mapArrData = mapArrData.slice(0, 7);
                for (let i = 0; i < this.displayedColumnsDaily.length; i++) {
                    obj[this.displayedColumnsDaily[i]] = mapArrData[i].temp;
                }
                this.tableData = [obj];
            }
        });

    }

    changeType(): void {
        this.searchCity();
        this.tableData = [];
    }
}
