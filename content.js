function calculateTotalRepoSize() {    
    let totalSizeBytes = 0;
  
    $$('a[title="Download file"]').forEach(element => {
      let [size, unit, ...rest] = element.textContent.trim().split(/\s/);
      let sizeInBytes = parseFloat(size);
      
      switch(unit) {
        case 'GB': sizeInBytes *= 1024 * 1024 * 1024; break;
        case 'MB': sizeInBytes *= 1024 * 1024; break;
        case 'kB': sizeInBytes *= 1024; break;
        case 'Bytes': break;
        default: console.warn(`Unknown size unit: ${unit}`);
      }
      totalSizeBytes += sizeInBytes;
    });
    const totalSizeGB = totalSizeBytes / (1024 * 1024 * 1024);
    return totalSizeGB.toFixed(2) + ' GB';
}

function insertSizeIntoDOM(size) {
    const targetElement = $('.relative.mb-2.flex.flex-wrap.items-center');
  
    if (targetElement) {
      const existingSizeElement = $('.repo-size', targetElement);
      if (existingSizeElement) existingSizeElement.remove();
      let sizeElement = $H`<span class="ml-2 text-sm text-gray-500 repo-size">(${size})</span>`;

      // Insert the size element after the existing link
      targetElement.insertBefore(sizeElement, targetElement.firstElementChild.nextSibling);
    } else console.error('Target element not found');
  }

insertSizeIntoDOM(calculateTotalRepoSize());
