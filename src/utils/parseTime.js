export function parseTime(val) {
    var parseDate = new Date()
    parseDate.setTime(val)
    var year = parseDate.getFullYear(); 
    var month = parseDate.getMonth()+1; 
    var date = parseDate.getDate(); 
    var hour = parseDate.getHours(); 
    var minute = parseDate.getMinutes(); 
    var second = parseDate.getSeconds(); 
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
}