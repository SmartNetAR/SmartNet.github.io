const getRepositorios = async () =>
{
    const response = await fetch("https://api.github.com/users/SmartNetAR/events");
    const json = await response.json();
    return json;
}

const $list = document.getElementsByTagName("ul")[0];
$list.innerHTML = "<li>Cargando eventos ...</li>";
const types = {
    PushEvent: "envié nuevos commits",
    CreateEvent: "cree el repo",
    PullRequestReviewEvent: "revisé un PR",
    PullRequestReviewCommentEvent: "comenté un PR"
}
getRepositorios().then(events =>
    {
        let $items = [];
        let lastEvent = null;
        events.forEach( event => {
            if (lastEvent !== event.repo.name + event.type)
            {
                $items.push(`<li><span>${event.repo.name} - ${types[event.type] || event.type}</span></li>`)
            }
            lastEvent = event.repo.name + event.type
        })
        $list.innerHTML = $items.join("");
    })