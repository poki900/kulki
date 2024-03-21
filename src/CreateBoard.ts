import {board} from "./main"
import {InLine} from "./InLine"
import {Path} from "./Path"
import {bubble} from "./main"

class Square{
    content:string
    column:number
    row:number
    constructor(row:number,column:number,content:string){
        this.column = column;
        this.row = row;
        this.content = content;
        this.create()
    }
    create(){
        const make:HTMLTableDataCellElement = document.createElement("td")
        make.setAttribute("id",this.row+""+this.column)
        make.onclick = function(){board.click(this)}
        make.onmouseenter = function(){board.mouseenter(this)}
        document.getElementsByTagName("tr")[this.row].appendChild(make);
    }
}

class Row{
    howManyColumn:number
    whichRow:number
    tableToCreate:string[][]
    constructor(whichRow:number, howManyColumn:number,tableToCreate:string[][]){
        this.howManyColumn = howManyColumn;
        this.whichRow = whichRow;
        this.tableToCreate = tableToCreate;
        this.create()
    }
    create(){
        const make:HTMLTableRowElement = document.createElement("tr")
        document.getElementById("board").appendChild(make)
        for(let i:number=0; i<this.howManyColumn;i++){
            let blok:object = new Square(this.whichRow,i,this.tableToCreate[this.whichRow][i].toString());
        }
    }
}

 export class CreateBoard{
    howManyRows:number
    howManyColumn:number
    tableToCreate:string[][]
    firstclickC:number
    firstclickR:number
    ispathexist:boolean
    secoundmoveR:number
    secoundmoveC:number
    constructor(howManyRows:number, howManyColumn:number){
        this.howManyRows = howManyRows
        this.howManyColumn = howManyColumn
        this.tableToCreate = []
        this.firstclickC = undefined;
        this.firstclickR = undefined;
        this.ispathexist = false;
        this.secoundmoveR = undefined;
        this.secoundmoveC = undefined;
        this.create()
    }

    changingContent(row:number,column:number,value:string){
        if(value=="P"){
            if(this.secoundmoveC!=undefined){
                document.getElementById(row+""+column).classList.add("move")
            } else {
                if(isNaN(Number(this.tableToCreate[row][column]))){
                    this.tableToCreate[row][column]="0"
                    this.changeContent(row,column)
                }
                document.getElementById(row+""+column).classList.add("path")
                setTimeout(function(){document.getElementById(row+""+column).classList.remove("path")},500)
            }
        }else if(this.tableToCreate[row][column]=="M"&&value!="0"){
            document.getElementById(row+""+column).classList.add("path")
            setTimeout(function(){document.getElementById(row+""+column).classList.remove("path")},500)
            this.tableToCreate[row][column]=value
            this.changeContent(row,column)
        }else if(value=="M"){
            this.tableToCreate[row][column]=value
        }else{
            this.tableToCreate[row][column]=value
            this.changeContent(row,column)
        }
    }

    changeContent(i:number,j:number){
        /* ["Z", "N", "C", "F", "Y", "O", "B"] //["Zielony", "Niebieski", "Czarny", "Fioletowy", "Żółty", "Pomarańczowy", "Biały"] */
        let el:HTMLDivElement = document.createElement("div")
        el.classList.add("bubble")
        if(this.tableToCreate[i][j] == "Z"){
            el.classList.add("z")
            document.getElementById(i+""+j).append(el)
        }else if(this.tableToCreate[i][j] == "N"){
            el.classList.add("n") 
            document.getElementById(i+""+j).append(el)
        }else if(this.tableToCreate[i][j] == "C"){
            el.classList.add("c") 
            document.getElementById(i+""+j).append(el)
        }else if(this.tableToCreate[i][j] == "F"){
            el.classList.add("f") 
            document.getElementById(i+""+j).append(el)
        }else if(this.tableToCreate[i][j] == "Y"){
            el.classList.add("y") 
            document.getElementById(i+""+j).append(el)
        }else if(this.tableToCreate[i][j] == "O"){
            el.classList.add("o") 
            document.getElementById(i+""+j).append(el)
        }else if(this.tableToCreate[i][j] == "B"){
            el.classList.add("b") 
            document.getElementById(i+""+j).append(el)
        } else {
            document.getElementById(i+""+j).innerHTML=""
        }
        // else{
        //     document.getElementById(i+""+j).innerHTML = this.tableToCreate[i][j];
        // }
    }

    click(that:any){
        if(this.firstclickC==undefined){
            if(Number(this.tableToCreate[that.getAttribute("id").split("")[0]][that.getAttribute("id").split("")[1]])!=0){
                this.firstclickR = that.getAttribute("id").split("")[0]
                this.firstclickC = that.getAttribute("id").split("")[1]
                that.classList.add("firstclick")
            }
        } else {
            if(this.firstclickR==that.getAttribute("id").split("")[0]&&this.firstclickC==that.getAttribute("id").split("")[1]){
                if(document.getElementsByClassName("firstclick")[0]!=undefined){
                    document.getElementsByClassName("firstclick")[0].classList.remove("firstclick")
                }
                this.firstclickR = undefined
                this.firstclickC = undefined
            }else{
            this.mouseleave()
            this.secoundmoveC = undefined
            this.secoundmoveR= undefined
            if(Number(this.tableToCreate[that.getAttribute("id").split("")[0]][that.getAttribute("id").split("")[1]])==0){
                board.changingContent(that.getAttribute("id").split("")[0],that.getAttribute("id").split("")[1],"M")
                let path = new Path( Number(this.firstclickR) , Number(this.firstclickC) ,Number(that.getAttribute("id").split("")[0]),Number(that.getAttribute("id").split("")[1]),board.tableToCreate)
                if(this.ispathexist==true){
                    board.changingContent(that.getAttribute("id").split("")[0],that.getAttribute("id").split("")[1], this.tableToCreate[this.firstclickR][this.firstclickC])
                    board.changingContent(this.firstclickR,this.firstclickC,"P")
                    this.ispathexist = false;
                    let finding = new InLine();
                    bubble.round()
                    let findingsecound = new InLine();
                } else {
                    board.changingContent(that.getAttribute("id").split("")[0],that.getAttribute("id").split("")[1],"0")
                }
                this.firstclickR = undefined
                this.firstclickC = undefined
                if(document.getElementsByClassName("firstclick")[0]!=undefined){
                    document.getElementsByClassName("firstclick")[0].classList.remove("firstclick")
                }
            } else {
                if(document.getElementsByClassName("firstclick")[0]!=undefined){
                    document.getElementsByClassName("firstclick")[0].classList.remove("firstclick")
                }
                this.firstclickR = that.getAttribute("id").split("")[0]
                this.firstclickC = that.getAttribute("id").split("")[1]
                that.classList.add("firstclick")
            }
            }
        }
    }

    mouseenter(that:any){
        if(this.firstclickC!=undefined){
            this.mouseleave()
            if(Number(this.tableToCreate[that.getAttribute("id").split("")[0]][that.getAttribute("id").split("")[1]])==0){
                this.secoundmoveR = that.getAttribute("id").split("")[0]
                this.secoundmoveC = that.getAttribute("id").split("")[1]
                board.changingContent(that.getAttribute("id").split("")[0],that.getAttribute("id").split("")[1],"M")
                let path = new Path( Number(this.firstclickR) , Number(this.firstclickC) ,Number(that.getAttribute("id").split("")[0]),Number(that.getAttribute("id").split("")[1]),board.tableToCreate)
                if(this.ispathexist==true){
                    this.ispathexist = false;
                    that.classList.add("move")
                    document.getElementById(this.firstclickR+""+this.firstclickC).classList.add("move")
                } else {
                    board.changingContent(that.getAttribute("id").split("")[0],that.getAttribute("id").split("")[1],"0")
                }
            }
        }
    }

    mouseleave(){
        if(this.firstclickC!=undefined&&this.secoundmoveR!=undefined){
            board.changingContent(this.secoundmoveR,this.secoundmoveC,"0")
            for(let i:number=0;document.getElementsByClassName("move")[0]!=undefined;i++){
                document.getElementsByClassName("move")[0].classList.remove("move")
            }
        }
    }
    
    create(){
        let table:HTMLTableElement = document.createElement("table")
        table.setAttribute("id", "board")
        document.getElementById("boardBox").append(table)
        for(let i:number=0;i<this.howManyRows;i++){
            this.tableToCreate[i] = [];
            for(let j:number=0; j<this.howManyColumn;j++){
                this.tableToCreate[i][j] = "0";
            }
            let row:object = new Row(i,this.howManyColumn, this.tableToCreate)
        }
        return this.tableToCreate;
    }
}