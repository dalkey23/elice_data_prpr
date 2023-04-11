function sanitizeObject(obj) {
  const result = Object.entries(obj).reduce((map, [key, value]) => {
    if (value !== undefined) {
      map[key] = value;
    }
    return map;
  }, {});
  return result;
}

function buildResponse(data, errorMessage) {
  return {
    error: errorMessage ?? null,
    data,
  };
}

// password 제거
function removePassword(obj) {
  const result = Object.entries(obj).reduce((map, [key, value]) => {
    if(key !== "password") {
      map[key] = value;
    }
    return map;
  }, {})
  return result;
}

module.exports = {
  sanitizeObject,
  buildResponse,
  removePassword,
};
