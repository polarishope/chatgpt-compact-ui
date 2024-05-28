function addSidebar(mutationList, observer) {
  const sidebar = document.createElement("div");
  sidebar.id = "my-sidebar";
  sidebar.className = 'overflow-x-hidden flex-shrink-0 w-64';

  const groupElements = document.querySelectorAll(
    `[data-message-author-role="user"]`
  );

  const contentContainer = document.createElement("div");
  contentContainer.className = "sidebar-content";
  groupElements.forEach((element, index) => {
    const allText = element.textContent.trim();
    const newItem = createDomElement(`
    <button class="jumpbutton w-60" id=jumpto${index}>
    </button>
    `);
    newItem.appendChild(document.createTextNode(allText))
    contentContainer.appendChild(newItem);
  });

  sidebar.appendChild(contentContainer);

  const sidebar_prev = document.querySelector("#my-sidebar");
  if (sidebar_prev === null) {
    document.querySelector('.relative.z-0.flex.h-full.w-full.overflow-hidden').appendChild(sidebar);
    groupElements.forEach((element, index) => {
        document.getElementById(`jumpto${index}`).addEventListener('click', function() {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        })
    });
  } else {
    const parentElement = sidebar_prev.parentNode;
    if (sidebar_prev.outerHTML === sidebar.outerHTML) return;
    parentElement.replaceChild(sidebar, sidebar_prev);
    groupElements.forEach((element, index) => {
        document.getElementById(`jumpto${index}`).addEventListener('click', function() {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        })
    });
  }
}


function createDomElement(html) {
  const dom = new DOMParser().parseFromString(html, "text/html");
  return dom.body.firstElementChild;
}
const observer = new MutationObserver(addSidebar);
const targetNode = document.querySelector('body>div>div>div.relative')
observer.observe(targetNode, { childList: true, subtree: true });
