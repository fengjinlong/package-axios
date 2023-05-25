export interface Channel111 {
  status: number;
  result: Result;
}

export interface Result {
  location: Location;
  realtime: Realtime;
  last_update: string;
}

export interface Location {
  areacode: string;
  name: string;
  country: string;
  path: string;
}

export interface Realtime {
  text: string;
  code: string;
  temp: number;
  feels_like: number;
  rh: number;
  wind_class: string;
  wind_speed: number;
  wind_dir: string;
  wind_angle: number;
  prec: number;
  prec_time: Date;
  clouds: number;
  vis: number;
  pressure: number;
  dew: number;
  uv: number;
  weight: number;
  brief: string;
  detail: string;
}
