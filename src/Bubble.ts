import {board} from "./main"
export class Bubble{
    losR:number
    losC:number
    col:number
    tabcol:Array<string>
    colpreviev:Array<string>
    constructor(){
        this.losR = 0
        this.losC = 0
        this.col = 0
        this.colpreviev = ["","",""]
        this.tabcol = ["Z", "N", "C", "F", "Y", "O", "B"] //["Zielony", "Niebieski", "Czarny", "Fioletowy", "Żółty", "Pomarańczowy", "Biały"]
        this.start()
    }

    los(){
        let random:number = Math.floor(Math.random()*81)
        if(random<9){
            this.losR = 0
            this.losC = random
        } else {
            this.losR = (random - (random%9))/9
            this.losC = (random%9)
        }
    }

    loscol(){
        this.col = Math.floor(Math.random()*7)
    }

    previevlos(){
        let previevBox:HTMLDivElement = document.createElement("div")
        previevBox.setAttribute("id", "previevBox")
        document.getElementById("infoBox").innerHTML = ""
        document.getElementById("infoBox").append(previevBox)
        for(let i:number = 0;i<3;i++){
            this.loscol()
            let circle:HTMLDivElement = document.createElement("div")
            circle.classList.add("bubble")
            this.colpreviev[i] = this.tabcol[this.col]
            //["Z", "N", "C", "F", "Y", "O", "B"]
            if(this.colpreviev[i] == "Z"){
                circle.classList.add("z")
                document.getElementById("previevBox").append(circle)
            }else if(this.colpreviev[i] == "N"){
                circle.classList.add("n")
                document.getElementById("previevBox").append(circle)
            }else if(this.colpreviev[i] == "C"){
                circle.classList.add("c")
                document.getElementById("previevBox").append(circle)
            }else if(this.colpreviev[i] == "F"){
                circle.classList.add("f")
                document.getElementById("previevBox").append(circle)
            }else if(this.colpreviev[i] == "Y"){
                circle.classList.add("y")
                document.getElementById("previevBox").append(circle)
            }else if(this.colpreviev[i] == "O"){
                circle.classList.add("o")
                document.getElementById("previevBox").append(circle)
            }else if(this.colpreviev[i] == "B"){
                circle.classList.add("b")
                document.getElementById("previevBox").append(circle)
            }
        }
    }

    round(){
        let howmanyempty:number = 0;
        for(let i:number = 0; i<9&&howmanyempty<5;i++){
            for(let j:number = 0; j<9&&howmanyempty<5;j++){
                if(Number(board.tableToCreate[i][j])==0){
                    howmanyempty++
                }
            }
        }
        if(howmanyempty<=3){
            alert("GAME OVER")
        }
        for(let i:number = 0; i<3;i++){
            this.los()
            this.loscol()
            if(Number(board.tableToCreate[this.losR][this.losC])==0){
                board.changingContent(this.losR,this.losC,this.colpreviev[i])
            }else{
                i--
            }
        }
        this.previevlos()
    }

    start(){
        for(let i:number = 0; i<5;i++){
            this.los()
            this.loscol()
            if(Number(board.tableToCreate[this.losR][this.losC])==0){
                board.changingContent(this.losR,this.losC,this.tabcol[this.col])
            }else{
                i--
            }
        }

        this.previevlos()
    }
}