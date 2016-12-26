export class DoneValueConverter {

    toView(value) {
        if(value === undefined){
            return;
        }

if(value){
    return '<i class="fa fa-check"></i>';
} else {
    return '<i class="fa fa-square-o"></i>';
}


    }


}
