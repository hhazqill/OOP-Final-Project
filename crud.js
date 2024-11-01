const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

var btnCreate = document.getElementById('btnCreate');
var btnRead = document.getElementById('btnRead');
var btnDelete = document.getElementById('btnDelete');
var btnUpdate = document.getElementById('btnUpdate');
var fileName = document.getElementById('fileName');
var fileContents = document.getElementById('fileContents');
var fileListContainer = document.getElementById('fileListContainer');

let pathName = path.join(__dirname, 'Files');

// Ensure the Files directory exists
if (!fs.existsSync(pathName)) {
    fs.mkdirSync(pathName);
}

// Function to update and display file list
function updateFileList() {
    fs.readdir(pathName, (err, files) => {
        if (err) return console.log("Error reading directory:", err);

        // Clear the current list
        fileListContainer.innerHTML = "";

        // Add each file to the list with an option to select for editing
        files.forEach(file => {
            let listItem = document.createElement('li');
            listItem.textContent = file;
            listItem.className = 'file-item';
            listItem.style.cursor = 'pointer';
            
            // Click event to load file contents into the form for editing or deleting
            listItem.addEventListener('click', () => loadFileForEdit(file));

            fileListContainer.appendChild(listItem);
        });
    });
}

// Function to load a selected file for editing or deletion
function loadFileForEdit(filename) {
    let file = path.join(pathName, filename);
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) return console.log("Error reading file:", err);

        // Set form fields with file data
        fileName.value = filename;
        fileContents.value = data;
    });
}

// Call updateFileList initially to load existing files
updateFileList();

btnCreate.addEventListener('click', function() {
    let file = path.join(pathName, fileName.value);
    let contents = fileContents.value;
    fs.writeFile(file, contents, function(err) {
        if (err) return console.log("Error creating file:", err);

        alert(fileName.value + " text file was created");
        updateFileList();
    });
});

btnRead.addEventListener('click', function() {
    let file = path.join(pathName, fileName.value);
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) return console.log("Error reading file:", err);

        fileContents.value = data;
    });
});

btnDelete.addEventListener('click', function() {
    let file = path.join(pathName, fileName.value);
    fs.unlink(file, function(err) {
        if (err) return console.log("Error deleting file:", err);

        fileName.value = "";
        fileContents.value = "";
        alert(fileName.value + " text file was deleted");
        updateFileList();
    });
});

btnUpdate.addEventListener('click', function() {
    let file = path.join(pathName, fileName.value);
    let contents = fileContents.value;
    fs.writeFile(file, contents, function(err) {
        if (err) return console.log("Error updating file:", err);

        alert(fileName.value + " text file was updated");
        updateFileList();
    });
});
