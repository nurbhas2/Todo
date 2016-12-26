export class HideCompletedValueConverter {
    
    toView(value, hide) {
        if(value === undefined){
            return;
        }
        if(hide){
            var displayArray = new Array();
            value.forEach(function(item){
                if(!item.completed) { 
                    displayArray.unshift(item);
}

            })
            return displayArray;
        } else {
            return value;
        }
    }
}