function maskAddress(_address:String) {
  return(_address.slice(0, 4)+".."+_address.slice(_address.length - 4));
}

export default maskAddress;