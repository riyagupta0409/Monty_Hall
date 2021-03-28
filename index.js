var chosen = -1
var doors = ['door-1', 'door-2', 'door-3']
var randomNum = Math.floor(Math.random() * 3);
var winner = doors[randomNum];
var opened = -1
var decision = "Changed"
var remaining = -1
var verdict = "Lost"


function showResult() {
    if (verdict == 'Won') {
        color = 'green'
    } else {
        color = 'red'
    }
    document.getElementById('verdict').innerHTML = `
    <h4>Door Chosen : ${chosen}</h4>
    <h4>Door Opened : ${opened}</h4>
    <h4>Winner      : ${winner}</h4>
    <h4 style="color:${color}">Verdict     : ${verdict}</h4>
    `
}

function check_result(door) {
    console.log(opened, chosen, remaining)
    if (door === winner && door == chosen) {
        var rowNum = document.getElementById(door).parentElement.getElementsByTagName('h3')[0]
        rowNum.style.color = 'green'
        document.getElementById(remaining).src = 'open.jpg'
        var rowNum = document.getElementById(remaining).parentElement.getElementsByTagName('h3')[0]
        rowNum.style.display = 'none'
        verdict = "Won"

    }
    if (door !== winner && winner == chosen) {
        var rowNum = document.getElementById(chosen).parentElement.getElementsByTagName('h3')[0]
        rowNum.style.color = 'green'
        document.getElementById(door).src = 'open.jpg'
        var rowNum = document.getElementById(door).parentElement.getElementsByTagName('h3')[0]
        rowNum.style.display = 'none'
        verdict = "Lost"

    }
    if (door === winner && door != chosen) {
        var rowNum = document.getElementById(door).parentElement.getElementsByTagName('h3')[0]
        rowNum.style.color = 'green'
        document.getElementById(chosen).src = 'open.jpg'
        var rowNum = document.getElementById(chosen).parentElement.getElementsByTagName('h3')[0]
        rowNum.style.display = 'none'
        verdict = "Won"
    }
    if (door !== winner && door != chosen) {
        document.getElementById(door).src = 'open.jpg'
        var rowNum = document.getElementById(door).parentElement.getElementsByTagName('h3')[0]
        rowNum.style.display = 'none'
        verdict = "Lost"

    }
    showResult()

}

function ask_user() {
    setTimeout(function (ev) {
        var decision = prompt('Do you want to change your guess ??')
        d = decision.slice(0, 1).toLowerCase()
        for (let i = 0; i < 3; i++) {
            if (doors[i] !== chosen && doors[i] !== opened) {
                remaining = doors[i]

                if (d === 'n') {
                    decision = "Same"
                    console.log(decision)
                    check_result(chosen)
                } else {
                    check_result(remaining)
                }
                break
            }
            console.log(remaining, chosen)

        }
    }, 1000);


}

function openAnotherDoor(id) {
    for (let i = 0; i < 3; i++) {
        if (doors[i] !== winner && doors[i] !== id) {
            document.getElementById(doors[i]).src = 'open.jpg'
            opened = doors[i]
            var rowNum = document.getElementById(doors[i]).parentElement.getElementsByTagName('h3')[0]
            rowNum.style.display = 'none'
            break
        }
    }
    ask_user()
}


document.addEventListener('click', function (e) {
    var t = e.target;

    if (t.className === 'door-img' && chosen === -1) {
        chosen = t.id
        var rowNum = t.parentElement.getElementsByTagName('h3')[0]
        rowNum.style.color = ' red'
        openAnotherDoor(t.id)

    }
})