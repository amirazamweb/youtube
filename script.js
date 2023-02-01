let search = document.querySelector("#search");

async function searchVideoFunction(data) {

    let query = data || search.value;

    console.log(query);

    let api_key = "AIzaSyA_DrGgp4PFLwYzRba_a4g__jlX5NFxNV8";

    let url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=28&q=${query}&key=${api_key}`;

    try {
        let response = await fetch(url);
        let result = await response.json();
        // console.log(result.items);
        storeLocal(result.items);

    }
    catch (error) {
        console.log(error);
    }
    search.value = "";
}

//suggestion click 

let suggestions = document.querySelectorAll('#sugestion div');
for (let i = 0; i < suggestions.length; i++) {
    suggestions[i].addEventListener("click", (e) => {
        searchVideoFunction(e.target.innerText)
    })
}



//page reload data

let getData = JSON.parse(localStorage.getItem("youtubeKey")) || [
    {
        title: "Dil Ki Tanhai Ko | Kumar Sanu | Chaahat | Shah Rukh Khan, Ramya Krishnan, Pooja Bhatt",
        channelTitle: "Red Chillies Entertainment", videoId: "8mweiZlvxsE"
    },
    {
        title: "Maine payal hai chhankai | Nivi and Ishanvi | Mom daughter dance | Laasya dance choreography",
        channelTitle: "Laasya", videoId: "sg0cVs1I_no"
    },
    {
        title: "Sajan Tumse Pyar Ki Ladai Mein | Sudhakar Sharma Song | Sonu Nigam, Alka Yagnik | Himesh Reshammiya",
        channelTitle: "Lyricist Sudhakar Sharma", videoId: "j6X7PwSEGsQ"
    },
    {
        title: "#Video | #Pawan Singh New Song | लाल घाघरा | Lal Ghaghra | Shilpi Raj | Namrita Malla| Bhojpuri Gana",
        channelTitle: "Saregama Hum Bhojpuri", videoId: "qZId59qml_4"
    },
    {
        title: "Tera pyar hai meri zindagi Nusrat Fateh Ali khan best Qawali | Mere baad kis ko sataogy",
        channelTitle: "All In One", videoId: "BNy2PJNJG1o"
    }
];

appendData(getData);


function storeLocal(data) {
    let storeData = [];
    data.map((e) => {
        let obj = {
            title: e.snippet.title,
            channelTitle: e.snippet.channelTitle,
            videoId: e.id.videoId
        }
        storeData.push(obj);
    })

    localStorage.setItem("youtubeKey", JSON.stringify(storeData));

    let getData = JSON.parse(localStorage.getItem("youtubeKey"));

    appendData(storeData);
}



function appendData(keydata) {

    document.querySelector("#container").innerHTML = "";

    keydata.map((e) => {
        let div = document.createElement("div");
        let iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${e.videoId}`;
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.setAttribute("allowfullscreen", "");
        let p1 = document.createElement("p");
        p1.innerText = e.title;
        p1.id = "title";
        let p2 = document.createElement("p");
        p2.innerText = e.channelTitle;
        p2.id = "channel";
        div.append(iframe, p1, p2);
        document.querySelector("#container").append(div);
    })
}





