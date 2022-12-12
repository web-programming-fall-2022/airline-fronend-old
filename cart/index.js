$("#navbar").load("/components/navbar.html");
$("#footer").load("/components/footer.html");
$("#cart").load("/components/cart.html");

$.get('/components/thicket.html', function (thicketHtml) {
    $.getJSON("/data/thickets.json", function (data) {
        const html = $('#ticket')

        const i = 0;
        const thicket = data[i];
        html.append(`<div class="thicket-${i}">${thicketHtml}</div>`)

        $(`.thicket-${i} #from-airport`).text(`از ${thicket['from']['airport']['name']} (${thicket['from']['airport']['code']})`)
        $(`.thicket-${i} #to-airport`).text(`به ${thicket['to']['airport']['name']} (${thicket['to']['airport']['code']})`)
        $(`.thicket-${i} #from-city`).text(thicket['from']['airport']['city'])
        $(`.thicket-${i} #to-city`).text(thicket['to']['airport']['city'])

        $(`.thicket-${i} #type`).text(`پرواز ${thicket['type']}`)
        $(`.thicket-${i} #duration`).text(`به مدت ${thicket['duration']} دقیقه`)
        $(`.thicket-${i} #price`).text(`${thicket['price']} تومان`)

        const standardFromDate = Date.parse(thicket['from']['date'])
        const standardToDate = Date.parse(thicket['to']['date'])

        const persianFromDate = new persianDate(standardFromDate)
        const persianToDate = new persianDate(standardToDate)

        $(`.thicket-${i} #from-date`).text(persianFromDate.format('dddd DD MMMM YYYY ساعت h:mm:ss a'));
        $(`.thicket-${i} #to-date`).text(persianToDate.format('dddd DD MMMM YYYY ساعت h:mm:ss a'));
    })
})