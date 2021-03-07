import * as moment from 'moment';
let domUser = value => {
  let arrUser = value.split(',');
  for (let i = 0; i < arrUser.length; i++) {
    let dealuser = arrUser[i];
    if (dealuser.indexOf('CN=') > -1) {
      dealuser = dealuser.substring(dealuser.indexOf('CN=') + 3);
    }
    if (dealuser.indexOf('/O=') > -1) {
      dealuser = dealuser.substring(0, dealuser.indexOf('/O='));
    }
    arrUser[i] = dealuser.replace(/\d*$/g, '');
  }
  return arrUser.join(',');
};
let datetime = value => {
  if (value.indexOf(' ZE8') > -1) {
    value = value.substring(0, value.indexOf(' ZE8'));
  }
  let otime = moment(value);
  return otime.format('YYYY-MM-DD HH:MM');
};
export { domUser, datetime };
