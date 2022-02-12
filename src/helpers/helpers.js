const getClientsArr = (clientsText) => {
  const clientsRaw = clientsText.split("\r\n");
  clientsRaw.shift();

  const clients = clientsRaw.map((client) => {
    const details = client.split(",");
    return {
      name: details[0],
      id: details[1],
      ip: details[2],
      phone: details[3].replaceAll("\"", ""),
    };
  });
  return clients;
};

const checkValidity = (name, id, ip, phone) => {
  let isName = /^[a-zA-Z\s]*$/.test(name);
  if (!isName) {
    return false;
  }

  let isId = /^\d+$/.test(id);
  if (!isId) {
    return false;
  }

  let isIp =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ip
    );
  if (!isIp) {
    return false;
  }

  let isPhone = /^[+-\d]*$/.test(phone);
  if (!isPhone) {
    return false;
  }

  return true;
};

module.exports = {
  getClientsArr,
  checkValidity
};
