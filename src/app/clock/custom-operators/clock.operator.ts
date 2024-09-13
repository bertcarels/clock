import { Observable, map } from 'rxjs';
import { HandTransformations } from '../clock.interface';

function rotateAngle(seconds: number, minutes: number, hours: number): HandTransformations {
  const secondsDegrees = (seconds / 60) * 360 ;
  const minsDegrees = (minutes / 60) * 360 + (seconds / 60) * 6 ;
  const hourDegrees = (hours / 12) * 360 + (minutes / 60) * 30 ;

  var mytime = document.querySelector('.mytime')

  var hourstr = "";
  var minstr = "";
  var secstr = "";
  

  if (hours < 10) {
     hourstr = "0" + hours.toString();
  } else {
    hourstr = "" + hours.toString();
  }

  if (minutes < 10) {
    minstr = "0" + minutes.toString();
 } else {
   minstr = "" + minutes.toString();
 }

 if (seconds < 10) {
  secstr = "0" + seconds.toString();
} else {
  secstr = "" + seconds.toString();
}
     
  if (mytime) {
    mytime.innerHTML = " " + hourstr + ":" + minstr +":" + secstr;

  }
  
  return {
    secondHandTransform: `rotate(${secondsDegrees}deg)`,
    minuteHandTransform: `rotate(${minsDegrees}deg)`,
    hourHandTransform: `rotate(${hourDegrees}deg)`,
  };
}

export function currentTime() {
  return map(() => {
    const time = new Date();
    return {
      seconds: time.getSeconds(),
      minutes: time.getMinutes(),
      hours: time.getHours(),
    };
  });
}

export function rotateClockHands() {
  return function (source: Observable<{ seconds: number; minutes: number; hours: number }>) {
    return source.pipe(map(({ seconds, minutes, hours }) => rotateAngle(seconds, minutes, hours)));
  };
}
