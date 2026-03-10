const daysContainer=document.getElementById("days")
const monthYear=document.getElementById("monthYear")
const eventList=document.getElementById("eventList")

const practiceBar=document.getElementById("practiceBar")
const matchBar=document.getElementById("matchBar")

const totalSessions=document.getElementById("totalSessions")

const popup=document.getElementById("popup")

const playerName=document.getElementById("playerName")
const eventType=document.getElementById("eventType")
const eventTime=document.getElementById("eventTime")

let selectedDate=null
let date=new Date()

let events=JSON.parse(localStorage.getItem("tennisEvents"))||{}

function render(){

daysContainer.innerHTML=""

const year=date.getFullYear()
const month=date.getMonth()

const firstDay=new Date(year,month,1).getDay()
const totalDays=new Date(year,month+1,0).getDate()

monthYear.innerText=
date.toLocaleString("default",{month:"long"})+" "+year

for(let i=0;i<firstDay;i++){
daysContainer.appendChild(document.createElement("div"))
}

for(let i=1;i<=totalDays;i++){

const day=document.createElement("div")

day.classList.add("day")
day.innerText=i

const fullDate=year+"-"+month+"-"+i

if(events[fullDate]) day.classList.add("eventDay")

const today=new Date()

if(
i===today.getDate() &&
month===today.getMonth() &&
year===today.getFullYear()
){
day.classList.add("today")
}

day.onclick=()=>{
selectedDate=fullDate
popup.style.display="flex"
}

daysContainer.appendChild(day)

}

displayEvents()

}

function saveEvent(){

if(!playerName.value) return

events[selectedDate]=
playerName.value+" | "+eventType.value+" | "+eventTime.value

localStorage.setItem("tennisEvents",JSON.stringify(events))

playerName.value=""
eventType.value=""
eventTime.value=""

popup.style.display="none"

render()

}

function closePopup(){
popup.style.display="none"
}

function displayEvents(){

eventList.innerHTML=""

let count=0
let practice=0
let match=0

for(let d in events){

const div=document.createElement("div")

div.classList.add("event")
div.innerText=d+" : "+events[d]

eventList.appendChild(div)

count++

if(events[d].toLowerCase().includes("practice")) practice++
if(events[d].toLowerCase().includes("match")) match++

}

totalSessions.innerText="Total Sessions: "+count

practiceBar.style.width=(practice*30)+"px"
matchBar.style.width=(match*30)+"px"

}

function toggleMode(){
document.body.classList.toggle("light")
}

document.getElementById("prev").onclick=()=>{
date.setMonth(date.getMonth()-1)
render()
}

document.getElementById("next").onclick=()=>{
date.setMonth(date.getMonth()+1)
render()
}

render()