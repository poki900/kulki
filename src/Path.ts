import {board} from "./main"
export class Path{
    table
    startR:number
    startC:number
    metaR:number
    metaC:number
    tab:number[][]
    constructor(startR:number, startC:number, metaR:number, metaC:number, table:string[][]){
        this.table = table;
        this.startR = startR;
        this.startC = startC;
        this.metaR = metaR;
        this.metaC = metaC;
        this.tab = [[-1,0,+1,0],[0,+1,0,-1]] //kolejność sprawdzania [(row)[(operation)],(column)[(operation)]]
        this.pathFind()
    }

    pathPrint(min:number){
        let focusR:number = 0;
        let focusC:number = 0;
        for(var n:number=0;n<4;n++){
            if(this.metaR+this.tab[0][n]>=0&&this.metaC+this.tab[1][n]>=0&&this.metaR+this.tab[0][n]<9&&this.metaC+this.tab[1][n]<9&&Number(this.table[this.metaR+this.tab[0][n]][this.metaC+this.tab[1][n]])!=0&&Number(this.table[this.metaR+this.tab[0][n]][this.metaC+this.tab[1][n]])<=min){
                min = Number(this.table[this.metaR+this.tab[0][n]][this.metaC+this.tab[1][n]])
                focusC = this.metaC+this.tab[1][n]
                focusR = this.metaR+this.tab[0][n]
            }
        }
        board.changingContent(focusR,focusC,"P")
        for(min;min>=1;min--){
            let ispathfind:boolean = false
            for(var n:number=0;n<4&&ispathfind==false;n++){
                if(focusR+this.tab[0][n]>=0&&focusC+this.tab[1][n]>=0&&focusR+this.tab[0][n]<9&&focusC+this.tab[1][n]<9&&Number(this.table[focusR+this.tab[0][n]][focusC+this.tab[1][n]])==(min-1)){
                    board.changingContent(focusR,focusC,"P")
                    focusC = focusC+this.tab[1][n]
                    focusR = focusR+this.tab[0][n]
                    if(min==2){
                        board.changingContent(focusR,focusC,"P")
                    }
                    ispathfind=true
                }
            }
        }
    }

    clearTab(){
        for(let r:number=0;r<9;r++){
            for(let c:number=0;c<9;c++){
                if(Number(this.table[r][c])>0){
                    this.table[r][c] = "0" 
                }
            }
        }
    }

    pathFind(){
        let ispathfind:boolean = false
        let ispathexist:boolean = true
        let nexttoeachother:boolean = false
        for(var n:number=0;n<4;n++){
            if(this.startR+this.tab[0][n]>=0&&this.startC+this.tab[1][n]>=0&&this.startR+this.tab[0][n]<9&&this.startC+this.tab[1][n]<9&&Number(this.table[this.startR+this.tab[0][n]][this.startC+this.tab[1][n]])==0){
                board.tableToCreate[(this.startR+this.tab[0][n])][(this.startC+this.tab[1][n])]="1"
            } else if (this.startR+this.tab[0][n]>=0&&this.startC+this.tab[1][n]>=0&&this.startR+this.tab[0][n]<9&&this.startC+this.tab[1][n]<9&&this.table[this.startR+this.tab[0][n]][this.startC+this.tab[1][n]]=="M"){
                nexttoeachother = true
                ispathfind = true
            }
        }
        let min:number = 0;
        for(let i:number = 1; ispathfind==false && ispathexist ==true;i++){
            ispathexist = false
            for(let r:number=0;r<9;r++){
                for(let c:number=0;c<9;c++){
                    if(Number(this.table[r][c])==i){
                        for(var j:number=0;j<4;j++){
                            if(r+this.tab[0][j]>=0&&c+this.tab[1][j]>=0&&r+this.tab[0][j]<9&&c+this.tab[1][j]<9&&Number(this.table[r+this.tab[0][j]][c+this.tab[1][j]])==0){
                                board.tableToCreate[(r+this.tab[0][j])][(c+this.tab[1][j])] = (i+1).toString()
                                ispathexist = true
                            } else if(r+this.tab[0][j]>=0&&c+this.tab[1][j]>=0&&r+this.tab[0][j]<9&&c+this.tab[1][j]<9&&this.table[r+this.tab[0][j]][c+this.tab[1][j]]=="M"){
                                ispathfind=true;
                                ispathexist = true
                            }
                        }
                    }
                }
            }
            min = (i+1)
        }
        if(ispathexist==true){
            if(nexttoeachother==false){
                this.pathPrint(min)
            }
            board.ispathexist = true;
        }
        this.clearTab()
    }
}