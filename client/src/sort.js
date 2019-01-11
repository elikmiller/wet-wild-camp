const handleSort = (elem, data, sortStatus) => {
  let { id, value } = elem.target;

  // sort based on id and value properties of clicked button. checks if
  // value to be sorted is nested or not.
  const sortedArray = data.sort((a, b) => {
    if (sortStatus[id]["ascending"]) {
      if (id === value) return compare(a[id], b[id]);
      else return compare(a[id][value], b[id][value]);
    } else {
      if (id === value) return compare(b[id], a[id]);
      else return compare(b[id][value], a[id][value]);
    }
  });

  function compare(item1, item2) {
    if (item1 < item2) return -1;
    if (item1 > item2) return 1;
    return 0;
  }

  // update values and return data object
  Object.entries(sortStatus).forEach(([key, value]) => (value.engaged = false));

  sortStatus[id]["engaged"] = true;
  sortStatus[id]["ascending"] = !sortStatus[id]["ascending"];

  return {
    data: sortedArray,
    sortStatus: sortStatus
  };
};

export default handleSort;
