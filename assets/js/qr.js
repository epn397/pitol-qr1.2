prepareData(
type,
value
){


switch(type){


case "wifi":

return `
WIFI:T:WPA;
S:${value.ssid};
P:${value.password};
`;



case "email":

return `
MATMSG:
TO:${value.email};
SUB:${value.subject};
BODY:${value.body};
`;



case "phone":

return `
TEL:${value}
`;



default:

return value;


}


}
