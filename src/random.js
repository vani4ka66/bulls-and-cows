export function random4Digit(desireLenght, checkbox) {
    let arr = ""
    if(checkbox){
      arr = "0123456789"
    }
    else{
      arr = "123456789"
    }
    return shuffle(arr.split(""))
      .join("")
      .substring(0, desireLenght);
    }
    
    function shuffle(o) {
      for (
        var j, x, i = o.length;
        i;
        j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
      );
      return o;
    }
  