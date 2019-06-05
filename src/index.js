let fs = require('fs')
let Tokenizr = require('tokenizr')

let lexer = new Tokenizr()
//let s = "xx${id}${name}xxx$"
let s = "this is a $[comp-name::textinput::I am placeholder], and we support $[comp_business::list::I am a list::style1], thanks for watching."

function parse_tag(s) {

    // ${comp-name::textinput::I am placeholder::style-as-line}
    console.log('>>>parsing tag>>>', s)
    
    let list = s.split('::');
    let varName = list[0];
    let varCompType = list[1];
    let varNote = list[2];
    let varCompStyle = list[3];

    let tag = {
        //head: l[0],
        var_name: varName,
        var_comp_type: varCompType,
        var_note: varNote,
        var_comp_style: varCompStyle,
        type: 'variable'
    }
    return tag
}

lexer.rule(/\$\[([^\[\]]+)\]/, (ctx, match) => {
    ctx.accept(
        "tag", parse_tag(match[1])
        )
})

lexer.rule(/(?:\$$|$[^\[]|[^\$\[\]])+/, (ctx, match) => {
    ctx.accept("text")
})

lexer.input(s)
lexer.debug(true)
let arr = lexer.tokens();
arr.forEach((token) => {
    console.log('>>>token>>> ', token.toString())
})
console.log(arr);


