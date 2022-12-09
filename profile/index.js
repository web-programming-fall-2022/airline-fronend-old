// $("#navbar").load("/components/navbar.html");

$.get('/components/thicket.html', function (thicketHtml) {
    $.getJSON("/data/thickets.json", function (data) {
        const html = $('#profile')

        for (let i = 0; i < data.length; i++) {
            const thicket = data[i];
            html.append(`<div class="thicket-${i}">${thicketHtml}</div>`)

            $(`.thicket-${i} #from-airport`).text(thicket['from']['airport']['name'])
            $(`.thicket-${i} #to-airport`).text(thicket['to']['airport']['name'])
            $(`.thicket-${i} #from-airport-code`).text(thicket['from']['airport']['code'])
            $(`.thicket-${i} #to-airport-code`).text(thicket['to']['airport']['code'])
            $(`.thicket-${i} #from-city`).text(thicket['from']['airport']['city'])
            $(`.thicket-${i} #to-city`).text(thicket['to']['airport']['city'])

            $(`.thicket-${i} #type`).text(thicket['type'])
            $(`.thicket-${i} #duration`).text(thicket['duration'])
            $(`.thicket-${i} #price`).text(thicket['price'])

            const standardFromDate = Date(thicket['from']['date'])
            const standardToDate = Date(thicket['to']['date'])

            const persianFromDate = new persianDate(standardFromDate)
            const persianToDate = new persianDate(standardToDate)

            $(`.thicket-${i} #from-date`).text(persianFromDate.format('dddd DD MMMM YYYY ساعت h:mm:ss a'));
            $(`.thicket-${i} #to-date`).text(persianToDate.format('dddd DD MMMM YYYY ساعت h:mm:ss a'));
        }
    })
})