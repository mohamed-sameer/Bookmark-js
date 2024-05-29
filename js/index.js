var siteName = document.getElementById("siteName");
var siteLink = document.getElementById("siteLink");
var tableBody = document.getElementById("tableBody");
var dialog = document.getElementById("dialog");
// get whats in the localstorage or make a new array
var bookmarksArr = JSON.parse(localStorage.getItem("bookmarksContainer")) || [];

displayData(bookmarksArr);

function validateSiteName() {
  var regex = /^[A-Za-z0-9- ]{3,}$/;
  var siteNameVal = siteName.value;

  if (regex.test(siteNameVal)) {
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
    return true;
  } else {
    siteName.classList.add("is-invalid");
    siteName.classList.remove("is-valid");
    return false;
  }
}

function validateSiteUrl() {
  var regex =
    /^((http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/;
  var siteUrlVal = siteLink.value;

  if (regex.test(siteUrlVal)) {
    siteLink.classList.add("is-valid");
    siteLink.classList.remove("is-invalid");
    return true;
  } else {
    siteLink.classList.add("is-invalid");
    siteLink.classList.remove("is-valid");
    return false;
  }
}

function deleteBookmark(bookmarkIndex) {
  bookmarksArr.splice(bookmarkIndex, 1);
  localStorage.setItem("bookmarksContainer", JSON.stringify(bookmarksArr));
  displayData(bookmarksArr);
}

function clearForm() {
  siteName.value = null;
  siteLink.value = null;
  siteName.classList.remove("is-valid");
  siteLink.classList.remove("is-valid");
}

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
        <button class="btn btn-danger" onClick="deleteBookmark(${i})">
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
  if (validateSiteName() && validateSiteUrl()) {
    bookmarksArr.push(bookmark);
    localStorage.setItem("bookmarksContainer", JSON.stringify(bookmarksArr));
  } else {
    dialog.classList.toggle("d-none");
  }
}

function addBookmark() {
  if (siteName.value !== "" && siteLink.value !== "") {
    getData();
    displayData(bookmarksArr);
    clearForm();
  } else {
    dialog.classList.toggle("d-none");
  }
}

function toggleDialog() {
  dialog.classList.toggle("d-none");
}
