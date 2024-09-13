async function heapify(ele, n, i) {
  console.log("In heapify()");
  let largest = i; // Initialize largest as root
  let left = 2 * i + 1; // left = 2*i + 1
  let right = 2 * i + 2; // right = 2*i + 2

  // Color root element
  ele[i].style.background = "red";

  // Check if left child exists and is greater than root
  if (
    left < n &&
    parseInt(ele[left].style.height) > parseInt(ele[largest].style.height)
  ) {
    largest = left;
  }

  // Check if right child exists and is greater than largest so far
  if (
    right < n &&
    parseInt(ele[right].style.height) > parseInt(ele[largest].style.height)
  ) {
    largest = right;
  }

  // If largest is not root
  if (largest !== i) {
    console.log("In heapify() swap");
    swap(ele[i], ele[largest]);
    ele[i].style.background = "orange";
    ele[largest].style.background = "orange";

    // Pause for visualization
    await waitforme(delay);

    // Recursively heapify the affected subtree
    await heapify(ele, n, largest);
  }

  // After heapify process, reset color
  ele[i].style.background = "cyan";
}

async function heapSort(ele) {
  console.log("In heapSort()");
  let n = ele.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(ele, n, i);
  }

  // Extract elements one by one
  for (let i = n - 1; i > 0; i--) {
    console.log("In heapSort() extract");
    // Move current root to end
    swap(ele[0], ele[i]);
    ele[i].style.background = "green";

    // Pause for visualization
    await waitforme(delay);

    // Call heapify on the reduced heap
    await heapify(ele, i, 0);
  }

  // Color the final sorted elements
  for (let i = 0; i < ele.length; i++) {
    ele[i].style.background = "green";
  }
}

const heapSortbtn = document.querySelector(".heapSort");
heapSortbtn.addEventListener("click", async function () {
  let ele = document.querySelectorAll(".bar");
  disableSortingBtn();
  disableSizeSlider();
  disableNewArrayBtn();
  await heapSort(ele);
  enableSortingBtn();
  enableSizeSlider();
  enableNewArrayBtn();
});
