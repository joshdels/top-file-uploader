function copyFileName() {
  const fileInput = document.getElementById("file-upload");
  const nameInput = document.getElementById("file-name");
  const infoDisplay = document.getElementById("file-info");

  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];

    // Extract name
    const fullFileName = file.name;
    nameInput.value = fullFileName

    // Calculate size in MB
    const sizeInBytes = file.size;
    const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2);

    // Print size info
    infoDisplay.innerText = `File size: ${sizeInMB} MB`;

    // Block file if it exceeds 20MB limit
    if (sizeInMB > 20) {
      infoDisplay.innerText = `Error: File is too large (${sizeInMB} MB). Max limit is 5MB.`;
      fileInput.value = "";
      nameInput.value = "";
    }
  }
}
