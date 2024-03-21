import {board} from "./main"
export class InLine{
    columncandidate:Array<number>
    columntodelete:number[][]

    rowcandidate:Array<number>
    rowtodelete:number[][]

    // leftcrosstodelete
    // leftcrosscandidate:Array<number>
    constructor(){
        this.columncandidate = []
        this.columntodelete = []
        this.column()
        this.columneliminate()

        this.rowcandidate = []
        this.rowtodelete = []
        this.row()
        this.roweliminate()

        // this.leftcrosscandidate = []
        // this.leftcrosstodelete = []
        // this.leftcross()
        // this.leftcrosseliminate()

        this.delete()
    }

    column(){
        this.columncandidate = []
        for(let i:number=0;i<9;i++){
            if(Number(board.tableToCreate[i][4])!=0){
                if(board.tableToCreate[i][4]==board.tableToCreate[i][3]||board.tableToCreate[i][4]==board.tableToCreate[i][5]){
                    this.columncandidate.push(i)
                }
            }
        }
    }

    columneliminate(){
        this.columntodelete = []
        if(this.columncandidate[0]!=undefined){
            for(let i:number=0;i<this.columncandidate.length;i++){
                let startDel:number = undefined
                let endDel:number = undefined
                for(let l:number = 0; l<5;l++){
                    for(let j:number=0;j<(9-l);j++){
                        if(board.tableToCreate[this.columncandidate[i]][l+j]==board.tableToCreate[this.columncandidate[i]][4]){
                            if(j==0){
                                startDel = l+j
                            } else if ((l+j) - startDel>=4){
                                endDel = l+j
                            }
                        }else {
                            j = 10;
                        }
                    }
                    if(endDel!=undefined){
                        l=5
                    }
                }
                if(endDel!=undefined){
                    this.columntodelete.push([this.columncandidate[i],startDel,endDel])
                }
            }
        }
    }

    row(){
        this.rowcandidate = []
        for(let i:number=0;i<9;i++){
            if(Number(board.tableToCreate[4][i])!=0){
                if(board.tableToCreate[4][i]==board.tableToCreate[3][i]||board.tableToCreate[4][i]==board.tableToCreate[5][i]){
                    this.rowcandidate.push(i)
                }
            }
        }
    }

    roweliminate(){
        this.rowtodelete = []
        if(this.rowcandidate[0]!=undefined){
            for(let i:number=0;i<this.rowcandidate.length;i++){
                let startDel:number = undefined
                let endDel:number = undefined
                for(let l:number = 0; l<5;l++){
                    for(let j:number=0;j<(9-l);j++){
                        if(board.tableToCreate[l+j][this.rowcandidate[i]]==board.tableToCreate[4][this.rowcandidate[i]]){
                            if(j==0){
                                startDel = l+j
                            } else if ((l+j) - startDel>=4){
                                endDel = l+j
                            }
                        }else {
                            j = 10;
                        }
                    }
                    if(endDel!=undefined){
                        l=5
                    }
                }
                if(endDel!=undefined){
                    this.rowtodelete.push([this.rowcandidate[i],startDel,endDel])
                }
            }
        }
    }

    // leftcross(){
    //     this.leftcrosscandidate = []
    //     for(let i:number=2;i<7;i++){
    //         if(board.tableToCreate[i][i]!=0){
    //             if(board.tableToCreate[i][i]==board.tableToCreate[i-1][i+1]||board.tableToCreate[i][i]==board.tableToCreate[i+1][i-1]){
    //                 this.leftcrosscandidate.push(i)
    //                 console.log(i)
    //             }
    //         }
    //     }
    // }

    // leftcrosseliminate(){
    //     this.leftcrosstodelete = []
    //     if(this.leftcrosscandidate[0]!=undefined){
    //         for(let i:number=0;i<this.leftcrosscandidate.length;i++){
    //             if(i<=5){
    //                 let k:number =0
    //                 let isittrue:boolean = true
    //                 let startDel = undefined
    //                 for(let j:number = 2*i;j!=i&&2*j-k>=4;j--){
    //                     if(board.tableToCreate[i][i]!=board.tableToCreate[j][k]){
    //                         isittrue=false
    //                     } else {
    //                         if()
    //                         startDel = j
    //                     }
    //                 }
    //             }else{

    //             }
    //         }
    //     }
    // }


    delete(){
        //column
        for(let r:number=0; r < this.columntodelete.length; r++){
            for(let i:number = this.columntodelete[r][1]; i<= this.columntodelete[r][2]; i++){
                board.changingContent(this.columntodelete[r][0],i,"0")
            }
        }

        //row
        for(let r:number=0; r < this.rowtodelete.length; r++){
            for(let i:number = this.rowtodelete[r][1]; i<= this.rowtodelete[r][2]; i++){
                board.changingContent(i,this.rowtodelete[r][0],"0")
            }
        }

        
    }
}