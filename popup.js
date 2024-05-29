document.getElementById('saveButton').addEventListener('click', function() {
  const title = document.getElementById('title').value;
  const link = document.getElementById('link').value;
  const feedback = document.getElementById('feedback');

  if (title && link) {
    chrome.storage.sync.get({ links: [] }, function(data) {
      const links = data.links;
      links.push({ title: title, link: link });

      chrome.storage.sync.set({ links: links }, function() {
        displayLinks();
        document.getElementById('title').value = '';
        document.getElementById('link').value = '';
        feedback.textContent = 'Link saved successfully!';
      });
    });
  } else {
    feedback.textContent = 'Please enter both title and link.';
  }

  setTimeout(() => {
    feedback.textContent = '';
  }, 3000);
});

function displayLinks() {
  chrome.storage.sync.get({ links: [] }, function(data) {
    const linkList = document.getElementById('linkList');
    linkList.innerHTML = '';

    data.links.forEach((item, index) => {
      const listItem = document.createElement('div');
      listItem.className = 'link-item';

      const titleSpan = document.createElement('span');
      titleSpan.textContent = item.title;
      listItem.appendChild(titleSpan);

      const openButton = document.createElement('button');
      openButton.className = 'icon-button';
      const openImg = document.createElement('img');
      openImg.src = '/link.png';
      openButton.appendChild(openImg);
      openButton.addEventListener('click', function() {
        window.open(item.link, '_blank');
      });
      listItem.appendChild(openButton);

      const deleteButton = document.createElement('button');
      deleteButton.className = 'icon-button';
      const deleteImg = document.createElement('img');
      deleteImg.src = '/delete.png';
      deleteButton.appendChild(deleteImg);
      deleteButton.addEventListener('click', function() {
        chrome.storage.sync.get({ links: [] }, function(data) {
          const links = data.links;
          links.splice(index, 1);
          chrome.storage.sync.set({ links: links }, function() {
            displayLinks();
          });
        });
      });
      listItem.appendChild(deleteButton);

      linkList.appendChild(listItem);
    });
  });
}

// Initial call to display links when the popup is opened
displayLinks();
