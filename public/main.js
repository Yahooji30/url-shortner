const urlText = document.querySelector("#shorturl");
function addURL(shortCode, fullURL) {
  const data = {
    shortCode: shortCode,
    fullURL: fullURL,
  };
  if (!localStorage.getItem("urls")) {
    let array = [];
    array.push(data);
    localStorage.setItem("urls", JSON.stringify(array));
  } else {
    let array = JSON.parse(localStorage.getItem("urls"));
    const isFound = array.find((item) => item.shortCode == data.shortCode);
    if (!isFound) {
      array.push(data);
      localStorage.setItem("urls", JSON.stringify(array));
    }
  }
}

function copy(data) {
  navigator.clipboard.writeText(data);
}

function loadURLs() {
  let array = JSON.parse(localStorage.getItem("urls"));
  console.log(array);
  const historyBox = document.querySelector("#historyBox");
  let str = "";
  if (array) {
    array.forEach((element) => {
      str += `
        <div class="py-3 md:py-4 md:px-4">
                <div class="flex justify-between items-center gap-x-3">
                    <a href="https://shtner.herokuapp.com/${element.shortCode}" target="_blank" id="shorturl" class="text-blue-800 text-md md:text-2xl">shtner.herokuapp.com/${element.shortCode}
                    </a>
                    <button
                        class="bg-[#ff9f00]/20 p-2 rounded-lg active:bg-[#ff9f00]/30 shadow-md shadow-[#ff9f00]/20 active:shadow-[#ff9f00]/30"
                        onclick="copy('https://shtner.herokuapp.com/${element.shortCode}')">
                        <img src="../images/copy.png" alt="copy" class="w-6 h-6" />
                    </button>
                </div>
                <p class="truncate text-sm text-gray-500 mt-1.5 pr-12">
                    ${element.fullURL}
                </p>
            </div>
        `;
    });
  } else {
    str = `
    <div class="w-full h-full flex justify-center items center">
        <img src="../images/404.svg" alt="not found" class="w-64"/>
    </div>`;
  }
  historyBox.innerHTML = str;
}
