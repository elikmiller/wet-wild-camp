const handleSort = (elem, data, sortStatus) => {
  let { id, value } = elem.target;

  // sort based on id and value properties of clicked button. checks if
  // value to be sorted is nested or not.
  const sortedArray = data.sort((a, b) => {
    if (sortStatus[id]["ascending"]) {
      return id === value ? a[id] > b[id] : a[id][value] > b[id][value];
    } else return id === value ? a[id] < b[id] : a[id][value] < b[id][value];
  });

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
