var siteName = document.getElementById("siteName");
var siteLink = document.getElementById("siteLink");
var tableBody = document.getElementById("tableBody");
// get whats in the localstorage or make a new array
var bookmarksArr = JSON.parse(localStorage.getItem("bookmarksContainer")) || [];
displayData(bookmarksArr);

function displayData(bookmarks) {
  var html = "";
  for (var i = 0; i < bookmarks.length; i++) {
    var htmlCell = `
    <tr>
      <th>${i + 1}</th>
      <td>${bookmarks[i].site}</td>
      <td>
        <a class="btn btn-success" href="https://${
          bookmarks[i].url
        }" target="_blank">
          <span>
            <i class="fa-solid fa-eye"></i>
          </span>
          <span>Visit</span>
        </a>
      </td>
      <td>
        <button class="btn btn-danger">
          <span>
            <i class="fa-solid fa-trash-can"></i>
          </span>
          <span>Delete</span>
        </button>
      </td>
    </tr>
    `;
    html += htmlCell;
  }
  tableBody.innerHTML = html;
}

function getData() {
  var bookmark = {
    site: siteName.value,
    url: siteLink.value,
  };
  bookmarksArr.push(bookmark);
  localStorage.setItem("bookmarksContainer", JSON.stringify(bookmarksArr));
}

function addBookmark() {
  getData();
  displayData(bookmarksArr);
}
