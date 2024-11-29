import { Injectable } from '@angular/core';
import { Location } from '../types/location.interface';


const OPPENING_HOUR = {
  morning: {
    first: '06',
    last: '12',
  },
  afternoon: {
    first: '12',
    last: '18,'
  },
  night:{
    first:'18',
    last:'23'
  }
}

type HOUR_INDEXES = 'morning' | 'afternoon' | 'night'

@Injectable({
  providedIn: 'root'
})



export class FilterUnitsService {

  constructor() { }

  
  
  transformWeekday(weekday: number){
    switch(weekday){
      case 0:
        return 'Dom.'
      case 6: 
        return 'Sab.'
      default:
        return 'Seg. à Sex.'
    }

  }
  filterUnits(unit:Location, open_hour: string, close_hour: string){
    if(!unit.schedules) return true
    let open_hour_filter = parseInt(open_hour, 10)
    let close_hour_filter = parseInt(close_hour, 10)
    let today_weekday = this.transformWeekday(new Date().getDay())

    for (let i = 0; i < unit.schedules.length; i++) {
      let schedule_hour = unit.schedules[i].hour
      let schedule_weekday = unit.schedules[i].weekdays
      if(today_weekday === schedule_weekday){
        if(schedule_hour !== 'Fechada'){
          let[unit_open_hour, unit_close_hour] = schedule_hour.split('às') 
          let unit_open_hour_int = parseInt(unit_open_hour.replace('h',''), 10)
          let unit_close_hour_int = parseInt(unit_close_hour.replace('h',''), 10)

          if(unit_open_hour_int <= open_hour_filter && unit_close_hour_int >= close_hour_filter) return true
          else return false
        }
      }
    }

    return false
  }

  filter(results: Location[], showClosed: boolean, hour: string){
    let intermediateResults = results;
    

    if(!showClosed){
     intermediateResults = results.filter(location => location.opened === true)
    }
 
    if(hour){
     const OPEN_HOURS = OPPENING_HOUR[hour as HOUR_INDEXES].first
     const CLOSE_HOURS = OPPENING_HOUR[hour as HOUR_INDEXES].last
     return intermediateResults.filter(location => this.filterUnits(location, OPEN_HOURS, CLOSE_HOURS))
    }else{
     return intermediateResults
    }
  }
}
