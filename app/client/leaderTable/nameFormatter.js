export default function(external, name) {
    if(name.length > 25) {
        name = name.substring(0, 21) + '...';
    }

    return external === true ? `${name}*` : name
}