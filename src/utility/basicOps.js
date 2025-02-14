export default function basicOps(
  products,
  searchTerm,
  sortDir,
  currCategory,
  pageNum,
  pageSize
) {
  if (products == null) {
    return;
  }
  /*************filtering -> hiding  products*************/
  let filteredArr = products;
  if (searchTerm != "") {
    filteredArr = filteredArr.filter((product) => {
      let lowerSearchTerm = searchTerm.toLowerCase();
      let lowerTitle = product.name.toLowerCase();
      return lowerTitle.includes(lowerSearchTerm);
    });
  }
  /***********************sorting -> rearrange**********************************/
  let filteredSortedArr = filteredArr;
  if (sortDir != 0) {
    // increasing
    if (sortDir == 1) {
      filteredSortedArr = filteredSortedArr.sort(incComparator);
    }
    //    decreasing order
    else {
      filteredSortedArr = filteredSortedArr.sort(decComparator);
    }
  }

  /**************************categorization**********************************************/
  let filteredSortedgroupByArr = filteredSortedArr;
  if (currCategory != "All categories") {
    filteredSortedgroupByArr = filteredSortedgroupByArr.filter((product) => {
      return product?.categories?.includes(currCategory);
    });
  }

  let totalPages = Math.ceil(filteredSortedgroupByArr.length / pageSize);
  /************************Pagination *********************/
  let sidx = (pageNum - 1) * pageSize;
  let eidx = sidx + pageSize;
  filteredSortedgroupByArr = filteredSortedgroupByArr.slice(sidx, eidx);
  //   console.log(filteredSortedArr);

  return { filteredSortedgroupByArr, totalPages };
}

// total elem /elemperPage-> totalNumPages

function incComparator(product1, product2) {
  if (product1.price > product2.price) {
    return 1;
  } else {
    return -1;
  }
}
function decComparator(product1, product2) {
  if (product1.price < product2.price) {
    return 1;
  } else {
    return -1;
  }
}

export function loadScript(src, id) {
  return new Promise((resolve) => {
    const scriptRef = document.getElementById(id);
    if (scriptRef) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}
