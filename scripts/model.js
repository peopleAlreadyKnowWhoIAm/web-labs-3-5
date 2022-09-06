
class ElectricDecoration {
  
    constructor(
    name, //String
    material, //String
    usage, //String
    amountAvalaible, //Integer
    colors, //String
    length, //Float
    lampsPerMeter, //Integer
    power, //Integer
    price, //Float
    id // Number
  ) {
    this.name = name;
    this.material = material;
    this.usage = usage;
    this.amount_avalaible = amountAvalaible;
    this.colors = colors;
    this.length = length;
    this.lamps_per_meter = lampsPerMeter;
    this.power = power;
    this.price = price;
    this.id = id;
  }

  //Translate object and format usage
  getCorrectedEntries() {
    let obj = Object.assign({}, this);
    delete obj.id;
    obj["usage"] = this.usage.toLowerCase().replace("_"," ");
    return Object.entries(obj);
  }

  getEntries() {
    let obj = Object.assign({}, this);
    delete obj.id;
    return Object.entries(obj);
  }
}
