export interface TableDataResponse {
    hourly?: any,
    daily?: any,
    lat: number,
    lon: number,
    timezone: string
    timezone_offset: string
}

export interface CityResponse {
    country: string,
    lat: number,
    local_names: object,
    lon: number,
    name: string
    state: string
}
