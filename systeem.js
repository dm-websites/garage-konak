const Open_Menu = document.querySelector(".open-menu")
const Nav_Menu = document.querySelector(".telefoon-menu")

const Template = document.querySelector("[data-template]")

const AVDW_Container = document.querySelector("[data-avdw-container]")
const Occ_Container = document.querySelector("[data-occ-container]")

function showDivs(n, j) {
    var i;
    var z = document.getElementsByClassName("slideshow")[j];
    var x = z.getElementsByClassName("slideshow-img");
    var dots = z.getElementsByClassName("dot");
    if (n > x.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = x.length;
    }
    //set custom data attribute to current image index
    z.setAttribute("data-currentslide", slideIndex);
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    x[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}


function fetch_from_json(){

    fetch("informatie.json")
    .then(response => response.json())
    .then(data => {

        item = data.map(item =>{

            if (Object.keys(item) == "auto_van_de_week"){

                data.forEach(other_item => {

                    if (item != other_item){

                        if (item.auto_van_de_week.toLowerCase() === other_item.naam.toLowerCase()){

                            console.log(other_item)
    
                            const card = Template.content.cloneNode(true).children[0]
                    
                            const plaatjes_container = card.querySelector("[data-plaatjes]")
                            const dots_container = card.querySelector("[data-dots]")
            
                            const model = card.querySelector("[data-model]")
                            const beschrijving = card.querySelector("[data-beschrijving]")
                            const prijs = card.querySelector("[data-prijs]")
            
                            const kenmerken = card.querySelector("[data-kenmerken]")
            
                            model.textContent = other_item.naam
                            beschrijving.textContent = other_item.beschrijving
                            prijs.textContent = other_item.prijs
            
                            Object.entries(other_item.kenmerken).forEach(kenmerk => {
                                
                                const type_kenmerk = kenmerk[0]
                                const kenmerk_waarde = kenmerk[1]
            
                                const li = document.createElement("li")
                                li.textContent = `${type_kenmerk}: ${kenmerk_waarde}`
            
                                kenmerken.append(li)
            
                            });
    
                            var folder = `plaatjes/${other_item.naam.toLowerCase()}`;
            
                            var plaatje_index = 1;
                            $.ajax({
                                url : folder,
                                success: function (data) {
                                    $(data).find("a").attr("href", function (i, val) {
                                        if( val.match(/\.(jpe?g|png|gif)$/) ) { 
                                            $(plaatjes_container).append( "<img class='slideshow-img' src='" + val +"'>" );
            
                                            const dot = document.createElement("span")
            
                                            console.log("appending")
            
                                            if (plaatje_index === 1) {
            
                                                dot.className = "dot active"
            
                                            } else {
            
                                                dot.classList.add("dot")
            
                                            }
            
                                            dot.setAttribute("onclick", `currentDiv(${plaatje_index},0)`)
                                            $(dots_container).append(dot)
            
                                            plaatje_index++;
            
                                        } 
                                    });
                                }
                            });
            
                            AVDW_Container.append(card)
    
                        }
    

                    }

                });

            } else {

                const card = Template.content.cloneNode(true).children[0]
                
                const plaatjes_container = card.querySelector("[data-plaatjes]")
                const dots_container = card.querySelector("[data-dots]")

                const model = card.querySelector("[data-model]")
                const beschrijving = card.querySelector("[data-beschrijving]")
                const prijs = card.querySelector("[data-prijs]")

                const kenmerken = card.querySelector("[data-kenmerken]")
                
                const contact = card.querySelector("[data-auto-contact]")

                model.textContent = item.naam
                beschrijving.textContent = item.beschrijving
                if (item.prijs.toLowerCase() != "verkocht") {

                    prijs.textContent = item.prijs

                } else {

                    prijs.classList.add("verkocht")
                    contact.classList.add("verkocht")
                    contact.textContent = "VERKOCHT"

                }

                Object.entries(item.kenmerken).forEach(kenmerk => {
                    
                    const type_kenmerk = kenmerk[0]
                    const kenmerk_waarde = kenmerk[1]

                    const li = document.createElement("li")
                    li.textContent = `${type_kenmerk}: ${kenmerk_waarde}`

                    kenmerken.append(li)

                });

                var folder = `plaatjes/${item.naam.toLowerCase()}`;

                var plaatje_index = 1;
                $.ajax({
                    url : folder,
                    success: function (data) {
                        $(data).find("a").attr("href", function (i, val) {
                            if( val.match(/\.(jpe?g|png|gif)$/) ) { 
                                $(plaatjes_container).append( "<img class='slideshow-img' src='" + val +"'>" );

                                const dot = document.createElement("span")

                                console.log("appending")

                                if (plaatje_index === 1) {

                                    dot.className = "dot active"

                                } else {

                                    dot.classList.add("dot")

                                }

                                dot.setAttribute("onclick", `currentDiv(${plaatje_index},0)`)
                                $(dots_container).append(dot)

                                plaatje_index++;

                            } 
                        });
                    }
                });

                Occ_Container.append(card)

            }

        })

    })

}

fetch_from_json();

var slideIndex = 1;

var Slideshow_Index = 0
var s = document.getElementsByClassName("slideshow");

Open_Menu.addEventListener("click", () =>{

    Nav_Menu.classList.toggle("telefoon")
    Open_Menu.classList.toggle("telefoon")

})

document.querySelectorAll(".menu-link").forEach(link => link.addEventListener("click", () =>{

    Nav_Menu.classList.remove("telefoon")
    Open_Menu.classList.remove("telefoon")

}));

setTimeout(() => {
    
    console.log("now")
    var d = document.getElementsByClassName("dots")

    for (var a = 0; a < d.length; a++) {

        const dot_container = d.item(a)

        const d_active = dot_container.getElementsByClassName("dot active")
        const d_normal = dot_container.getElementsByClassName("dot")

        for (var b = 0; b < d_active.length; b++) {

            const obj = d_active.item(b)
            const attribute = obj.getAttribute("onclick")
    
            const splitted_attribute = attribute.split(",")
    
            const first_section = splitted_attribute[0]
            const second_section = splitted_attribute[1]
    
            const changed_second_section = second_section.replace(/\d+/, Slideshow_Index)
            console.log(`${first_section},${changed_second_section}`)
            obj.setAttribute("onclick", `${first_section},${changed_second_section}`)
    
        }

        for (var b = 0; b < d_normal.length; b++) {

            const obj = d_normal.item(b)
            const attribute = obj.getAttribute("onclick")
    
            const splitted_attribute = attribute.split(",")
    
            const first_section = splitted_attribute[0]
            const second_section = splitted_attribute[1]
    
            const changed_second_section = second_section.replace(/\d+/, Slideshow_Index)
            console.log(`${first_section},${changed_second_section}`)
            obj.setAttribute("onclick", `${first_section},${changed_second_section}`)
    
        }

        Slideshow_Index++;

    }

    Slideshow_Index = 0

    for (var b = 0; b < s.length; b++) {
        //set custom data attribute to first current image index
    
        const current_slideshow = s.item(b)
        const img_container = current_slideshow.querySelector("[data-plaatjes]")

        const prev = document.createElement("a")

        prev.classList.add("prev")
        prev.setAttribute("onclick", `plusDivs(-1,${Slideshow_Index})`)
        prev.textContent = "\u276e"

        const next = document.createElement("a")

        next.classList.add("next")
        next.setAttribute("onclick", `plusDivs(1,${Slideshow_Index})`)
        next.textContent = "\u276f"

        img_container.append(prev)
        img_container.append(next)

        s[b].setAttribute("data-currentslide", 1);
        // d_a.setAttribute("onclick", "currentDiv()")

        showDivs(s[b].getAttribute("data-currentslide"), b);

        Slideshow_Index++;

    }

}, 500);

function plusDivs(n, j) {
    //get custom data attribute value of current image index to slideshow class index j
    slideIndex = parseInt(s[j].getAttribute("data-currentslide"));
    showDivs(slideIndex += n, j);
}
function currentDiv(n, j) {
    showDivs(slideIndex = n, j); /* showDivs Not showSlides*/
}